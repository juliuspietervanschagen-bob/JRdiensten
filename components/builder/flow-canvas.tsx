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
          ? "w-[240px] border border-[#10b981] bg-[#09090b] p-3"
          : "w-[240px] border border-[#27272a] bg-[#09090b] p-3"
      }
    >
      <p className="mb-2 text-[10px] tracking-[0.16em] text-[#10b981]">{data.widget.kind}</p>
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
    <div ref={canvasRef} className="absolute inset-0 bg-black">
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
          <span className="block size-2 bg-[#00ff66]" />
          <span className="mt-1 block text-[9px] tracking-[0.12em] text-[#00ff66]">{cursor.id}</span>
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
        proOptions={{ hideAttribution: true }}
        minZoom={0.4}
        maxZoom={1.6}
        defaultViewport={{ x: 16, y: 16, zoom: 1 }}
        colorMode="dark"
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#27272a" />
      </ReactFlow>
      {nodes.length === 0 ? (
        <div className="pointer-events-none absolute inset-8 flex items-center justify-center border border-dashed border-[#27272a]">
          <p className="max-w-xs text-center text-[11px] leading-5 tracking-[0.08em] text-[#a1a1aa]">
            Drop a widget on the grid. The file below updates with the same tree.
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
