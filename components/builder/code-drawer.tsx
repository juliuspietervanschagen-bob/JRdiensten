"use client"

import dynamic from "next/dynamic"
import { useCompile } from "@/lib/builder/use-compile"

const Editor = dynamic(() => import("@/components/builder/monaco-screen").then((mod) => mod.MonacoScreen), {
  ssr: false,
  loading: () => <p className="px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-mist">screen.tsx</p>,
})

export function CodeDrawer({
  value,
  error,
  onChange,
  onFocus,
  onBlur,
}: {
  value: string
  error: string | null
  onChange: (value: string) => void
  onFocus: () => void
  onBlur: () => void
}) {
  const compiled = useCompile(value)
  const synced = error ?? "AST SYNCED"
  const compiledLabel = error ? "—" : compiled.label

  return (
    <section className="flex h-44 min-h-0 flex-col border-t border-[#ecece8] bg-white lg:col-start-2 lg:row-start-2 lg:h-auto">
      <div className="flex h-8 shrink-0 items-center justify-between gap-3 border-b border-[#ecece8] px-3">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-mist">app/screen.tsx</p>
        <p className="truncate text-[10px] font-semibold tracking-[0.14em] text-brand">
          <span className={error ? "text-mist" : "text-brand"}>{synced}</span>
          <span className="text-[#d5d5d0]"> · </span>
          <span className={compiledLabel === "COMPILED" ? "text-brand" : "text-mist"}>{compiledLabel}</span>
        </p>
      </div>
      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          language="typescript"
          theme="jr-os"
          value={value}
          loading={<p className="px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-mist">screen.tsx</p>}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("jr-os", {
              base: "vs",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#ffffff",
                "editor.foreground": "#141414",
                "editorLineNumber.foreground": "#5e5e5e",
                "editorCursor.foreground": "#16a34a",
              },
            })
          }}
          onChange={(next) => {
            if (typeof next === "string") onChange(next)
          }}
          onMount={(editor) => {
            editor.onDidFocusEditorText(onFocus)
            editor.onDidBlurEditorText(onBlur)
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            lineNumbers: "off",
            glyphMargin: false,
            folding: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
            padding: { top: 8, bottom: 8 },
            renderLineHighlight: "none",
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </div>
    </section>
  )
}
