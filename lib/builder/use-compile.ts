"use client"

import { useEffect, useState } from "react"

export type CompileState = { label: string; js: string | null }

type CompileResult = { id: number; ok: true; code: string } | { id: number; ok: false; error: string }

let worker: Worker | null = null
let workerBroken = false
let seq = 0
const pending = new Map<number, (result: CompileResult) => void>()

function failPending(error: string) {
  workerBroken = true
  worker?.terminate()
  worker = null
  for (const [id, resolve] of pending) {
    resolve({ id, ok: false, error })
    pending.delete(id)
  }
}

function getWorker(): Worker {
  if (worker) return worker
  const code = `self.importScripts(${JSON.stringify(`${window.location.origin}/builder/babel`)});
self.onmessage = (event) => {
  const data = event.data || {};
  try {
    const result = Babel.transform(data.source, {
      filename: "screen.tsx",
      presets: ["typescript", "react"],
      sourceType: "module",
    });
    self.postMessage({ id: data.id, ok: true, code: result.code || "" });
  } catch (error) {
    const message = error && error.message ? error.message : "Compile failed";
    self.postMessage({ id: data.id, ok: false, error: String(message).split("\\n")[0].slice(0, 96) });
  }
};`
  const next = new Worker(URL.createObjectURL(new Blob([code], { type: "text/javascript" })))
  next.onmessage = (event: MessageEvent<CompileResult>) => {
    const resolve = pending.get(event.data.id)
    if (!resolve) return
    pending.delete(event.data.id)
    resolve(event.data)
  }
  next.onerror = () => {
    failPending("Compile failed")
  }
  worker = next
  return next
}

async function compileOnMain(source: string): Promise<CompileResult> {
  const { transform } = await import("@babel/standalone")
  try {
    const result = transform(source, {
      filename: "screen.tsx",
      presets: ["typescript", "react"],
      sourceType: "module",
    })
    return { id: 0, ok: true, code: result.code ?? "" }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Compile failed"
    return { id: 0, ok: false, error: message.split("\n")[0]?.slice(0, 96) ?? "Compile failed" }
  }
}

function compile(source: string): Promise<CompileResult> {
  if (workerBroken) return compileOnMain(source)
  try {
    const current = getWorker()
    const id = ++seq
    return new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        if (!pending.has(id)) return
        pending.delete(id)
        workerBroken = true
        void compileOnMain(source).then(resolve)
      }, 8000)
      pending.set(id, (result) => {
        window.clearTimeout(timer)
        if (!result.ok && result.error === "Compile failed") {
          void compileOnMain(source).then(resolve)
          return
        }
        resolve(result)
      })
      current.postMessage({ id, source })
    })
  } catch {
    workerBroken = true
    return compileOnMain(source)
  }
}

export function useCompile(source: string): CompileState {
  const [state, setState] = useState<CompileState>({ label: "COMPILING", js: null })

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      void compile(source).then((result) => {
        if (cancelled) return
        if (result.ok) setState({ label: "COMPILED", js: result.code })
        else setState({ label: result.error, js: null })
      })
    }, 240)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [source])

  return state
}
