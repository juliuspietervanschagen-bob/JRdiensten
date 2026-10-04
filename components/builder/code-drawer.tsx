"use client"

import dynamic from "next/dynamic"
import { useCompile } from "@/lib/builder/use-compile"

const Editor = dynamic(() => import("@/components/builder/monaco-screen").then((mod) => mod.MonacoScreen), {
  ssr: false,
  loading: () => <p className="px-3 py-2 text-[11px] tracking-[0.14em] text-[#a1a1aa]">screen.tsx</p>,
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
    <section className="flex h-44 min-h-0 flex-col border-t border-[#27272a] bg-black lg:col-start-2 lg:row-start-2 lg:h-auto">
      <div className="flex h-8 shrink-0 items-center justify-between gap-3 border-b border-[#27272a] px-3">
        <p className="text-[10px] tracking-[0.16em] text-[#a1a1aa]">app/screen.tsx</p>
        <p className="truncate text-[10px] tracking-[0.14em] text-[#10b981]">
          <span className={error ? "text-[#a1a1aa]" : "text-[#10b981]"}>{synced}</span>
          <span className="text-[#27272a]"> · </span>
          <span className={compiledLabel === "COMPILED" ? "text-[#10b981]" : "text-[#a1a1aa]"}>{compiledLabel}</span>
        </p>
      </div>
      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          language="typescript"
          theme="jr-os"
          value={value}
          loading={<p className="px-3 py-2 text-[11px] tracking-[0.14em] text-[#a1a1aa]">screen.tsx</p>}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("jr-os", {
              base: "vs-dark",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#000000",
                "editor.foreground": "#a1a1aa",
                "editorLineNumber.foreground": "#3f3f46",
                "editorCursor.foreground": "#10b981",
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
