"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { CodeDrawer } from "@/components/builder/code-drawer"
import { FlowCanvas } from "@/components/builder/flow-canvas"
import { ScreenPreview } from "@/components/builder/screen-preview"
import { generateScreen, parseScreen, WIDGET_DEFS, WIDGET_KINDS, type WidgetKind, type WidgetNode } from "@/lib/builder/codec"
import { useBuilderDoc } from "@/lib/builder/use-builder-doc"

export function TabBuilder() {
  const { nodes, peers, collab, cursors, addNode, moveNode, patchProps, removeNode, replaceNodes, publishCursor } = useBuilderDoc()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const [draft, setDraft] = useState(() => generateScreen([]))
  const [error, setError] = useState<string | null>(null)
  const focused = useRef(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const selected = nodes.find((node) => node.id === selectedId) ?? null

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const previousHtml = html.style.overflow
    const previousBody = body.style.overflow
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    return () => {
      html.style.overflow = previousHtml
      body.style.overflow = previousBody
    }
  }, [])

  useEffect(() => {
    if (focused.current) return
    setDraft(generateScreen(nodes))
    setError(null)
  }, [nodes])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Backspace" && event.key !== "Delete") return
      if (focused.current || !selectedId) return
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return
      if (target instanceof HTMLElement && target.closest(".monaco-editor")) return
      removeNode(selectedId)
      setSelectedId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [removeNode, selectedId])

  function applyDraft(source: string) {
    const parsed = parseScreen(source)
    if (!parsed.ok) {
      setError(parsed.error)
      return
    }
    setError(null)
    replaceNodes(parsed.nodes)
  }

  function download() {
    const file = new Blob([generateScreen(nodes)], { type: "text/plain" })
    const url = URL.createObjectURL(file)
    const link = document.createElement("a")
    link.href = url
    link.download = "screen.tsx"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-black font-mono text-white">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#27272a] px-3 sm:px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[11px] tracking-[0.18em] text-[#10b981]">
            JR
          </Link>
          <span className="text-[11px] tracking-[0.18em] text-[#a1a1aa]">TAB / APP BUILDER</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] tracking-[0.14em] text-[#10b981]">
            {String(peers).padStart(2, "0")} {collab === "live" ? "LIVE" : "LOCAL"}
          </span>
          <button
            type="button"
            onClick={() => setPreview((open) => !open)}
            className="h-7 border border-[#27272a] px-3 text-[11px] tracking-[0.14em] text-[#a1a1aa] hover:border-[#10b981] hover:text-[#10b981]"
          >
            PREVIEW
          </button>
          <button
            type="button"
            onClick={download}
            className="h-7 border border-[#10b981] px-3 text-[11px] tracking-[0.14em] text-[#10b981] hover:bg-[#10b981] hover:text-black"
          >
            PUBLISH
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr_auto] lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:grid-rows-[minmax(0,1fr)_220px]">
        <Library
          onAdd={(kind) => {
            const spot = addAt(nodes.length)
            setSelectedId(addNode(kind, spot.x, spot.y))
          }}
        />
        <div className="relative h-full min-h-0 lg:col-start-2 lg:row-start-1">
          <FlowCanvas
            canvasRef={canvasRef}
            nodes={nodes}
            selectedId={selectedId}
            cursors={cursors}
            onSelect={setSelectedId}
            onDropKind={(kind, x, y) => setSelectedId(addNode(kind, x, y))}
            onMove={moveNode}
            onCursor={publishCursor}
          />
          {preview ? <ScreenPreview nodes={nodes} onClose={() => setPreview(false)} /> : null}
        </div>
        <Inspector
          node={selected}
          onChange={(props) => {
            if (selected) patchProps(selected.id, props)
          }}
          onRemove={() => {
            if (!selected) return
            removeNode(selected.id)
            setSelectedId(null)
          }}
        />
        <CodeDrawer
          value={draft}
          error={error}
          onFocus={() => {
            focused.current = true
          }}
          onBlur={() => {
            focused.current = false
            setDraft(generateScreen(nodes))
            setError(null)
          }}
          onChange={(value) => {
            setDraft(value)
            applyDraft(value)
          }}
        />
      </div>
    </div>
  )
}

function Library({ onAdd }: { onAdd: (kind: WidgetKind) => void }) {
  return (
    <aside className="flex gap-2 overflow-x-auto border-b border-[#27272a] bg-[#09090b] p-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0">
      <p className="hidden text-[10px] tracking-[0.18em] text-[#a1a1aa] lg:block">LIBRARY</p>
      {WIDGET_KINDS.map((kind) => (
        <button
          key={kind}
          type="button"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/x-widget", kind)
            event.dataTransfer.effectAllowed = "copy"
          }}
          onClick={() => onAdd(kind)}
          className="min-w-40 shrink-0 border border-[#27272a] bg-black px-3 py-2 text-left hover:border-[#10b981] lg:min-w-0"
        >
          <span className="block text-[11px] text-white">{kind}</span>
          <span className="mt-1 block text-[10px] text-[#a1a1aa]">{WIDGET_DEFS[kind].blurb}</span>
        </button>
      ))}
    </aside>
  )
}

function Inspector({
  node,
  onChange,
  onRemove,
}: {
  node: WidgetNode | null
  onChange: (props: WidgetNode["props"]) => void
  onRemove: () => void
}) {
  return (
    <aside className="max-h-48 overflow-y-auto border-t border-[#27272a] bg-[#09090b] p-3 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:max-h-none lg:border-t-0 lg:border-l">
      <p className="text-[10px] tracking-[0.18em] text-[#a1a1aa]">INSPECTOR</p>
      {!node ? (
        <p className="mt-4 text-[11px] leading-5 text-[#a1a1aa]">Select a node. Delete removes it from the file.</p>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-[11px] text-[#10b981]">{node.kind}</p>
          <p className="text-[10px] text-[#a1a1aa]">
            {node.id} · {node.x},{node.y}
          </p>
          {WIDGET_DEFS[node.kind].fields.map((field) => {
            const value = node.props[field.key as keyof typeof node.props]
            return (
              <label key={field.key} className="block">
                <span className="text-[10px] tracking-[0.14em] text-[#a1a1aa] uppercase">{field.label}</span>
                {field.type === "boolean" ? (
                  <input
                    type="checkbox"
                    className="mt-1 block accent-[#10b981]"
                    checked={value === true}
                    onChange={(event) => onChange({ ...node.props, [field.key]: event.target.checked } as WidgetNode["props"])}
                  />
                ) : field.type === "enum" ? (
                  <select
                    className="mt-1 h-8 w-full border border-[#27272a] bg-black px-2 text-xs text-white outline-none focus:border-[#10b981]"
                    value={String(value)}
                    onChange={(event) => onChange({ ...node.props, [field.key]: event.target.value } as WidgetNode["props"])}
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="mt-1 h-8 w-full border border-[#27272a] bg-black px-2 text-xs text-white outline-none focus:border-[#10b981]"
                    value={String(value)}
                    inputMode={field.type === "number" ? "numeric" : "text"}
                    onChange={(event) => {
                      const next = field.type === "number" ? Number(event.target.value) : event.target.value
                      onChange({ ...node.props, [field.key]: next } as WidgetNode["props"])
                    }}
                  />
                )}
              </label>
            )
          })}
          <button type="button" onClick={onRemove} className="h-8 border border-[#27272a] px-3 text-[11px] text-[#a1a1aa] hover:border-[#10b981] hover:text-white">
            DELETE NODE
          </button>
        </div>
      )}
    </aside>
  )
}

function addAt(index: number): { x: number; y: number } {
  return { x: 6 + (index % 3) * 28, y: 8 + (index % 4) * 16 }
}
