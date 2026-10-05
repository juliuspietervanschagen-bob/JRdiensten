"use client"

import { WidgetPreview } from "@/components/builder/widget-preview"
import { WIDGET_KINDS, type WidgetKind, type WidgetNode } from "@/lib/builder/codec"
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  useReactFlow,
  type Node,
  type NodeChange,
  type NodeProps,
} from "@xyflow/react"
import { useEffect, useRef, useState, type RefObject } from "react"
import "@xyflow/react/dist/style.css"

type WidgetFlowData = { widget: WidgetNode }
type WidgetFlowNode = Node<WidgetFlowData, "widget">

function WidgetCard({ data, selected }: NodeProps<WidgetFlowNode>) {
  return (
    <article
      className={
        selected
          ? "w-[240px] rounded-2xl bg-white p-3 shadow-[0_16px_30px_-24px_rgba(20,20,20,0.45)] ring-1 ring-brand"
          : "w-[240px] rounded-2xl bg-white p-3 shadow-[0_16px_30px_-24px_rgba(20,20,20,0.35)] ring-1 ring-[#e8e8e3]"
      }
    >
      <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-brand">{data.widget.kind}</p>
      <WidgetPreview node={data.widget} />
    </article>
  )
}

const nodeTypes = { widget: WidgetCard }

export function FlowCanvas({
  canvasRef,
  nodes,
  selectedId,
  cursors,
  onSelect,
  onDropKind,
  onMove,
  onCursor,
}: {
  canvasRef: RefObject<HTMLDivElement | null>
  nodes: WidgetNode[]
  selectedId: string | null
  cursors: { id: string; x: number; y: number }[]
  onSelect: (id: string | null) => void
  onDropKind: (kind: WidgetKind, x: number, y: number) => void
  onMove: (id: string, x: number, y: number) => void
  onCursor: (x: number, y: number) => void
}) {
  return (
    <div ref={canvasRef} className="absolute inset-0 bg-[#f6f6f4]">
      <ReactFlowProvider>
        <FlowSurface
          nodes={nodes}
          selectedId={selectedId}
          onSelect={onSelect}
          onDropKind={onDropKind}
          onMove={onMove}
          onCursor={onCursor}
        />
      </ReactFlowProvider>
      {cursors.map((cursor) => (
        <span key={cursor.id} className="pointer-events-none absolute z-10" style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}>
          <span className="block size-2 rounded-full bg-brand" />
          <span className="mt-1 block text-[9px] font-semibold tracking-[0.12em] text-brand">{cursor.id}</span>
        </span>
      ))}
    </div>
  )
}

function FlowSurface({
  nodes,
  selectedId,
  onSelect,
  onDropKind,
  onMove,
  onCursor,
}: {
  nodes: WidgetNode[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onDropKind: (kind: WidgetKind, x: number, y: number) => void
  onMove: (id: string, x: number, y: number) => void
  onCursor: (x: number, y: number) => void
}) {
  const dragging = useRef(false)
  const { screenToFlowPosition } = useReactFlow()
  const [flowNodes, setFlowNodes] = useState<WidgetFlowNode[]>(() => nodes.map((node) => toFlow(node, selectedId)))

  useEffect(() => {
    if (dragging.current) return
    setFlowNodes(nodes.map((node) => toFlow(node, selectedId)))
  }, [nodes, selectedId])

  function onNodesChange(changes: NodeChange<WidgetFlowNode>[]) {
    setFlowNodes((current) => applyNodeChanges(changes, current))
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        if (bounds.width === 0 || bounds.height === 0) return
        onCursor(((event.clientX - bounds.left) / bounds.width) * 100, ((event.clientY - bounds.top) / bounds.height) * 100)
      }}
    >
      <ReactFlow
        nodes={flowNodes}
        edges={[]}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeClick={(_, node) => onSelect(node.id)}
        onPaneClick={() => onSelect(null)}
        onNodeDragStart={() => {
          dragging.current = true
        }}
        onNodeDragStop={(_, node) => {
          onMove(node.id, node.position.x / 10, node.position.y / 10)
          dragging.current = false
        }}
        onDragOver={(event) => {
          event.preventDefault()
          event.dataTransfer.dropEffect = "copy"
        }}
        onDrop={(event) => {
          event.preventDefault()
          const kind = event.dataTransfer.getData("application/x-widget")
          if (!isKind(kind)) return
          const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
          onDropKind(kind, position.x / 10, position.y / 10)
        }}
        nodesConnectable={false}
        deleteKeyCode={null}
        minZoom={0.4}
        maxZoom={1.6}
        defaultViewport={{ x: 16, y: 16, zoom: 1 }}
        colorMode="light"
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#d5e6da" />
      </ReactFlow>
      {nodes.length === 0 ? (
        <div className="pointer-events-none absolute inset-8 flex items-center justify-center rounded-2xl border border-dashed border-[#d5e6da]">
          <p className="max-w-xs text-center text-[12px] leading-5 text-mist">
            Sleep een onderdeel op het vlak. Het bestand eronder volgt hetzelfde scherm.
          </p>
        </div>
      ) : null}
    </div>
  )
}

function toFlow(node: WidgetNode, selectedId: string | null): WidgetFlowNode {
  return {
    id: node.id,
    type: "widget",
    position: { x: node.x * 10, y: node.y * 10 },
    data: { widget: node },
    selected: node.id === selectedId,
    draggable: true,
  }
}

function isKind(value: string): value is WidgetKind {
  return (WIDGET_KINDS as readonly string[]).includes(value)
}
