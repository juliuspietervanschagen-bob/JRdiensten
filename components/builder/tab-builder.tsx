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

  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-mist">
              <Link href="/diensten/webshop" className="hover:text-ink">
                Webshop
              </Link>
              <span className="px-2">/</span>
              <span className="text-ink">App bouwer</span>
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Zet het scherm in elkaar</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-mist">
              Kies onderdelen, sleep ze op het vlak, en het bestand eronder blijft hetzelfde scherm.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-1 text-xs font-semibold tracking-[0.12em] text-brand">
              {String(peers).padStart(2, "0")} {collab === "live" ? "LIVE" : "LOKAAL"}
            </span>
            <Link
              href="/diensten/webshop"
              className="inline-flex h-10 items-center rounded-full bg-white px-4 text-xs font-semibold text-ink ring-1 ring-[#e8e8e3] hover:ring-brand"
            >
              Terug naar de webshop
            </Link>
            <button
              type="button"
              onClick={() => setPreview((open) => !open)}
              className="inline-flex h-10 items-center rounded-full bg-brand px-4 text-xs font-semibold text-white hover:bg-brand-dark"
            >
              Voorbeeld
            </button>
          </div>
        </div>

      <div className="grid h-[min(820px,calc(100vh-11rem))] min-h-[560px] overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[#e8e8e3] grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:grid-rows-[minmax(0,1fr)_200px]">
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
    </div>
  )
}

function Library({ onAdd }: { onAdd: (kind: WidgetKind) => void }) {
  return (
    <aside className="flex gap-2 overflow-x-auto border-b border-[#ecece8] bg-[#f6f6f4] p-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0">
      <p className="hidden text-[10px] font-semibold tracking-[0.18em] text-brand lg:block">ONDERDELEN</p>
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
          className="min-w-40 shrink-0 rounded-xl bg-white px-3 py-2 text-left ring-1 ring-[#e8e8e3] hover:ring-brand lg:min-w-0"
        >
          <span className="block text-[11px] font-semibold text-ink">{kind}</span>
          <span className="mt-1 block text-[10px] text-mist">{WIDGET_DEFS[kind].blurb}</span>
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
    <aside className="max-h-48 overflow-y-auto border-t border-[#ecece8] bg-[#f6f6f4] p-3 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:max-h-none lg:border-t-0 lg:border-l">
      <p className="text-[10px] font-semibold tracking-[0.18em] text-brand">INSPECTIE</p>
      {!node ? (
        <p className="mt-4 text-[11px] leading-5 text-mist">Kies een onderdeel. Verwijderen haalt het uit het bestand.</p>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-[11px] font-semibold text-brand">{node.kind}</p>
          <p className="text-[10px] text-mist">
            {node.id} · {node.x},{node.y}
          </p>
          {WIDGET_DEFS[node.kind].fields.map((field) => {
            const value = node.props[field.key as keyof typeof node.props]
            return (
              <label key={field.key} className="block">
                <span className="text-[10px] font-semibold tracking-[0.14em] text-mist uppercase">{field.label}</span>
                {field.type === "boolean" ? (
                  <input
                    type="checkbox"
                    className="mt-1 block accent-brand"
                    checked={value === true}
                    onChange={(event) => onChange({ ...node.props, [field.key]: event.target.checked } as WidgetNode["props"])}
                  />
                ) : field.type === "enum" ? (
                  <select
                    className="mt-1 h-8 w-full rounded-lg border border-[#e8e8e3] bg-white px-2 text-xs text-ink outline-none focus:border-brand"
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
                    className="mt-1 h-8 w-full rounded-lg border border-[#e8e8e3] bg-white px-2 text-xs text-ink outline-none focus:border-brand"
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
          <button type="button" onClick={onRemove} className="h-8 rounded-full px-3 text-[11px] font-semibold text-mist ring-1 ring-[#e8e8e3] hover:text-ink hover:ring-brand">
            Verwijder
          </button>
        </div>
      )}
    </aside>
  )
}

function addAt(index: number): { x: number; y: number } {
  return { x: 6 + (index % 3) * 28, y: 8 + (index % 4) * 16 }
}
