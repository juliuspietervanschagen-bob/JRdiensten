"use client"

import Editor, { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import type { ComponentProps } from "react"

loader.config({ monaco })

export function MonacoScreen(props: ComponentProps<typeof Editor>) {
  return <Editor {...props} />
}
