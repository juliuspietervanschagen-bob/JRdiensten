/// <reference lib="webworker" />

import { transform } from "@babel/standalone"

const scope = self as DedicatedWorkerGlobalScope

scope.onmessage = (event: MessageEvent<{ id: number; source: string }>) => {
  const { id, source } = event.data
  try {
    const result = transform(source, {
      filename: "screen.tsx",
      presets: ["typescript", "react"],
      sourceType: "module",
    })
    scope.postMessage({ id, ok: true, code: result.code ?? "" })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Compile failed"
    scope.postMessage({ id, ok: false, error: message.split("\n")[0]?.slice(0, 96) ?? "Compile failed" })
  }
}
