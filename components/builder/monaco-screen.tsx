"use client"

import Editor, { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import type { ComponentProps } from "react"

loader.config({ monaco })

window.MonacoEnvironment = {
  getWorker() {
    return new Worker(new URL("monaco-editor/esm/vs/editor/editor.worker.js", import.meta.url), { type: "module" })
  },
}

export function MonacoScreen(props: ComponentProps<typeof Editor>) {
  return <Editor {...props} />
}
