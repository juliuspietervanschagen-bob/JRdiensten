"use client"

import * as Y from "yjs"
import { useCallback, useEffect, useRef, useState } from "react"
import { createNode, type WidgetKind, type WidgetNode } from "@/lib/builder/codec"

const STORAGE_KEY = "tab-builder-state"
const DOC_CHANNEL = "tab-builder-doc"
const PRESENCE_CHANNEL = "tab-builder-presence"

export type RemoteCursor = { id: string; x: number; y: number }

type BuilderApi = {
  nodes: WidgetNode[]
  peers: number
  collab: "live" | "local"
  cursors: RemoteCursor[]
  addNode: (kind: WidgetKind, x: number, y: number) => string
  moveNode: (id: string, x: number, y: number) => void
  patchProps: (id: string, props: Record<string, string | number | boolean>) => void
  removeNode: (id: string) => void
  replaceNodes: (nodes: readonly WidgetNode[]) => void
  publishCursor: (x: number, y: number) => void
}

export function useBuilderDoc(): BuilderApi {
  const [doc] = useState(() => new Y.Doc())
  const [clientId] = useState(() => `p_${Math.random().toString(36).slice(2, 7)}`)
  const [nodes, setNodes] = useState<WidgetNode[]>([])
  const [peers, setPeers] = useState(1)
  const [collab, setCollab] = useState<"live" | "local">("local")
  const [cursors, setCursors] = useState<RemoteCursor[]>([])
  const providerRef = useRef<{ setAwarenessField: (key: string, value: unknown) => void } | null>(null)
  const awarenessCursors = useRef<RemoteCursor[]>([])
  const awarenessPeers = useRef(1)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        Y.applyUpdate(doc, b64ToBytes(saved), "hydrate")
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }

    const publish = () => setNodes(readNodes(doc))
    publish()
    const array = nodesArray(doc)
    array.observeDeep(publish)

    const channel = new BroadcastChannel(DOC_CHANNEL)
    const onUpdate = (update: Uint8Array, origin: unknown) => {
      window.localStorage.setItem(STORAGE_KEY, bytesToB64(Y.encodeStateAsUpdate(doc)))
      if (origin === "remote" || origin === "hydrate" || (origin && typeof origin === "object")) return
      channel.postMessage(update.buffer.slice(update.byteOffset, update.byteOffset + update.byteLength))
    }
    doc.on("update", onUpdate)
    channel.onmessage = (event: MessageEvent<ArrayBuffer>) => {
      Y.applyUpdate(doc, new Uint8Array(event.data), "remote")
    }

    const presence = new BroadcastChannel(PRESENCE_CHANNEL)
    const seen = new Map<string, { t: number; x: number; y: number }>()
    const beat = window.setInterval(() => {
      presence.postMessage({ id: clientId, kind: "beat", t: Date.now() })
    }, 2000)
    presence.postMessage({ id: clientId, kind: "beat", t: Date.now() })
    presence.onmessage = (event: MessageEvent<{ id: string; kind: string; t: number; x?: number; y?: number }>) => {
      const data = event.data
      if (!data || data.id === clientId) return
      const previous = seen.get(data.id)
      seen.set(data.id, {
        t: Date.now(),
        x: data.kind === "cursor" && typeof data.x === "number" ? data.x : (previous?.x ?? -1),
        y: data.kind === "cursor" && typeof data.y === "number" ? data.y : (previous?.y ?? -1),
      })
    }
    const prune = window.setInterval(() => {
      const now = Date.now()
      const live = new Map<string, RemoteCursor>()
      for (const [id, entry] of seen) {
        if (now - entry.t > 5000) {
          seen.delete(id)
          continue
        }
        if (entry.x >= 0) live.set(id, { id, x: entry.x, y: entry.y })
      }
      for (const cursor of awarenessCursors.current) live.set(cursor.id, cursor)
      setPeers(Math.max(1 + seen.size, awarenessPeers.current))
      setCursors([...live.values()])
    }, 400)

    let closed = false
    let provider: { destroy: () => void; setAwarenessField: (key: string, value: unknown) => void } | null = null
    void import("@hocuspocus/provider").then(({ HocuspocusProvider }) => {
      if (closed) return
      const next = new HocuspocusProvider({
        url: collabUrl(),
        name: "tab-builder",
        document: doc,
        onStatus: ({ status }) => setCollab(status === "connected" ? "live" : "local"),
        onAwarenessChange: ({ states }) => {
          awarenessPeers.current = Math.max(1, states.length)
          awarenessCursors.current = states.flatMap((state) => {
            const user = state.user as { id?: string; x?: number; y?: number } | undefined
            if (!user || user.id === clientId || typeof user.x !== "number" || typeof user.y !== "number") return []
            return [{ id: user.id ?? "peer", x: user.x, y: user.y }]
          })
        },
      })
      provider = next
      providerRef.current = next
      next.setAwarenessField("user", { id: clientId, x: -1, y: -1 })
    })

    return () => {
      closed = true
      array.unobserveDeep(publish)
      doc.off("update", onUpdate)
      channel.close()
      presence.close()
      window.clearInterval(beat)
      window.clearInterval(prune)
      provider?.destroy()
      providerRef.current = null
      setCollab("local")
    }
  }, [doc, clientId])

  const addNode = useCallback(
    (kind: WidgetKind, x: number, y: number) => {
      const node = createNode(kind, x, y)
      doc.transact(() => {
        nodesArray(doc).push([toMap(node)])
      })
      return node.id
    },
    [doc],
  )

  const moveNode = useCallback(
    (id: string, x: number, y: number) => {
      const map = findMap(doc, id)
      if (!map) return
      doc.transact(() => {
        map.set("x", Math.round(x))
        map.set("y", Math.round(y))
      })
    },
    [doc],
  )

  const patchProps = useCallback(
    (id: string, props: Record<string, string | number | boolean>) => {
      const map = findMap(doc, id)
      if (!map) return
      doc.transact(() => {
        const bag = ensureProps(map)
        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined) bag.set(key, value)
        }
      })
    },
    [doc],
  )

  const removeNode = useCallback(
    (id: string) => {
      const array = nodesArray(doc)
      const index = array.toArray().findIndex((map) => map.get("id") === id)
      if (index >= 0) array.delete(index, 1)
    },
    [doc],
  )

  const replaceNodes = useCallback(
    (next: readonly WidgetNode[]) => {
      doc.transact(() => {
        const array = nodesArray(doc)
        if (array.length > 0) array.delete(0, array.length)
        if (next.length > 0) array.push(next.map((node) => toMap(node)))
      })
    },
    [doc],
  )

  const publishCursor = useCallback((x: number, y: number) => {
    const channel = cursorChannel()
    channel.postMessage({ id: clientId, kind: "cursor", t: Date.now(), x, y })
    providerRef.current?.setAwarenessField("user", { id: clientId, x, y })
  }, [clientId])

  return { nodes, peers, collab, cursors, addNode, moveNode, patchProps, removeNode, replaceNodes, publishCursor }
}

function collabUrl(): string {
  const host = window.location.hostname || "127.0.0.1"
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  return `${protocol}//${host}:43124`
}

let sharedCursorChannel: BroadcastChannel | null = null

function cursorChannel(): BroadcastChannel {
  if (!sharedCursorChannel) sharedCursorChannel = new BroadcastChannel(PRESENCE_CHANNEL)
  return sharedCursorChannel
}

function nodesArray(doc: Y.Doc): Y.Array<Y.Map<unknown>> {
  return doc.getArray<Y.Map<unknown>>("nodes")
}

function findMap(doc: Y.Doc, id: string): Y.Map<unknown> | undefined {
  return nodesArray(doc)
    .toArray()
    .find((map) => map.get("id") === id)
}

function ensureProps(map: Y.Map<unknown>): Y.Map<unknown> {
  const existing = map.get("props")
  if (existing instanceof Y.Map) return existing
  const created = new Y.Map<unknown>()
  map.set("props", created)
  return created
}

function toMap(node: WidgetNode): Y.Map<unknown> {
  const map = new Y.Map<unknown>()
  const props = new Y.Map<unknown>()
  for (const [key, value] of Object.entries(node.props)) props.set(key, value)
  map.set("id", node.id)
  map.set("kind", node.kind)
  map.set("x", node.x)
  map.set("y", node.y)
  map.set("props", props)
  return map
}

function readNodes(doc: Y.Doc): WidgetNode[] {
  return nodesArray(doc)
    .toArray()
    .map((map) => {
      const kind = map.get("kind")
      if (typeof kind !== "string") return null
      const propsMap = map.get("props")
      const props: Record<string, string | number | boolean> = {}
      if (propsMap instanceof Y.Map) {
        propsMap.forEach((value, key) => {
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") props[key] = value
        })
      }
      return {
        id: String(map.get("id") ?? ""),
        kind,
        x: Number(map.get("x") ?? 8),
        y: Number(map.get("y") ?? 8),
        props,
      } as WidgetNode
    })
    .filter((node): node is WidgetNode => node !== null && node.id.length > 0)
}

function bytesToB64(bytes: Uint8Array): string {
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function b64ToBytes(value: string): Uint8Array {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return bytes
}
