"use client"

import { previewServerSource, screenHtml } from "@/lib/builder/screen-html"
import type { WidgetNode } from "@/lib/builder/codec"
import type { WebContainer } from "@webcontainer/api"
import { useEffect, useRef, useState } from "react"

type Mode = "booting" | "live" | "local"

export function ScreenPreview({ nodes, onClose }: { nodes: readonly WidgetNode[]; onClose: () => void }) {
  const html = screenHtml(nodes)
  const [mode, setMode] = useState<Mode>("booting")
  const [url, setUrl] = useState<string | null>(null)
  const [note, setNote] = useState("Starting the screen server")
  const containerRef = useRef<WebContainer | null>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || mode !== "live") return
    let cancelled = false
    void container.fs.writeFile("/index.html", html).then(() => {
      if (cancelled || !frameRef.current || !url) return
      const fresh = new URL(url)
      fresh.searchParams.set("t", String(Date.now()))
      frameRef.current.src = fresh.toString()
    })
    return () => {
      cancelled = true
    }
  }, [html, mode, url])

  useEffect(() => {
    let cancelled = false
    void boot().then((started) => {
      if (cancelled) {
        started?.teardown()
        return
      }
      if (!started) return
      containerRef.current = started
    })
    return () => {
      cancelled = true
      containerRef.current?.teardown()
      containerRef.current = null
    }
    async function boot(): Promise<WebContainer | null> {
      if (typeof crossOriginIsolated === "undefined" || !crossOriginIsolated) {
        setMode("local")
        setNote("This tab is showing the screen here")
        return null
      }
      let container: WebContainer | null = null
      try {
        const { WebContainer } = await import("@webcontainer/api")
        const booted = await WebContainer.boot({ coep: "credentialless" })
        container = booted
        await booted.mount({
          "index.html": { file: { contents: html } },
          "server.mjs": { file: { contents: previewServerSource } },
        })
        await booted.spawn("node", ["server.mjs"])
        await new Promise<void>((resolve, reject) => {
          const timer = window.setTimeout(() => reject(new Error("The screen server did not open")), 20000)
          booted.on("server-ready", (_port, readyUrl) => {
            window.clearTimeout(timer)
            if (!cancelled) {
              setUrl(readyUrl)
              setMode("live")
              setNote("WebContainer")
            }
            resolve()
          })
        })
        return container
      } catch {
        container?.teardown()
        if (!cancelled) {
          setMode("local")
          setNote("The screen is shown in this tab.")
        }
        return null
      }
    }
    // html is read once at boot; later edits rewrite the file.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-black">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-[#27272a] px-3">
        <p className="truncate text-[10px] tracking-[0.16em] text-[#10b981]">{mode === "live" ? "PREVIEW · WEBCONTAINER" : mode === "booting" ? "PREVIEW · STARTING" : "PREVIEW · THIS TAB"}</p>
        <button type="button" onClick={onClose} className="text-[10px] tracking-[0.14em] text-[#a1a1aa] hover:text-white">
          CLOSE
        </button>
      </div>
      {mode === "live" && url ? (
        <iframe ref={frameRef} title="Screen preview" src={url} className="min-h-0 w-full flex-1 border-0 bg-black" />
      ) : mode === "local" ? (
        <iframe title="Screen preview" srcDoc={html} className="min-h-0 w-full flex-1 border-0 bg-black" />
      ) : (
        <p className="px-4 py-6 text-[11px] tracking-[0.08em] text-[#a1a1aa]">{note}</p>
      )}
      {mode === "local" ? <p className="border-t border-[#27272a] px-3 py-2 text-[10px] tracking-[0.08em] text-[#a1a1aa]">{note}</p> : null}
    </div>
  )
}
