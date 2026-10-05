"use client"

import Editor, { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import type { ComponentProps } from "react"

loader.config({ monaco })

type MonacoEnvironmentHost = typeof globalThis & {
  MonacoEnvironment?: {
    getWorker: (workerId: string, label: string) => Worker
  }
}

if (typeof window !== "undefined") {
  const host = globalThis as MonacoEnvironmentHost
  host.MonacoEnvironment = {
    getWorker(_workerId, label) {
      const kind = label === "typescript" || label === "javascript" ? "typescript" : "editor"
      const source = `self.importScripts(${JSON.stringify(`${location.origin}/builder/monaco-worker?kind=${kind}`)});`
      return new Worker(URL.createObjectURL(new Blob([source], { type: "text/javascript" })), { name: label })
    },
  }
}

export function MonacoScreen(props: ComponentProps<typeof Editor>) {
  return <Editor {...props} />
}
