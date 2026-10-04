import type { WidgetNode } from "@/lib/builder/codec"

export function WidgetPreview({ node }: { node: WidgetNode }) {
  if (node.kind === "MetricsDash") {
    return (
      <div>
        <p className="text-[10px] tracking-[0.16em] text-[#a1a1aa] uppercase">{node.props.label}</p>
        <p className="mt-1 text-2xl text-white">{node.props.value}</p>
        <Spark seed={`${node.props.label}:${node.props.value}`} />
        <p className="mt-2 text-[10px] tracking-[0.14em] text-[#10b981] uppercase">
          {node.props.trend === "down" ? "Down" : node.props.trend === "flat" ? "Flat" : "Up"} · live
        </p>
      </div>
    )
  }

  if (node.kind === "DataGridPro") {
    const count = Math.max(1, Math.min(4, node.props.rows))
    return (
      <div>
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] tracking-[0.16em] text-[#a1a1aa] uppercase">{node.props.title}</p>
          <p className="text-[10px] text-[#10b981]">{node.props.rows}</p>
        </div>
        <div className="mt-2 border border-[#27272a]">
          {Array.from({ length: count }, (_, index) => (
            <div key={index} className="grid grid-cols-[1.2rem_1fr_auto] gap-2 border-b border-[#27272a] px-1.5 py-1 text-[10px] last:border-b-0">
              <span className="text-[#a1a1aa]">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-white">Row {index + 1}</span>
              <span className="text-[#10b981]">ok</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (node.kind === "AuthGate") {
    return (
      <div>
        <p className="text-[10px] tracking-[0.16em] text-[#10b981] uppercase">{node.props.locked ? "Locked" : "Open"}</p>
        <p className="mt-2 text-sm text-white">{node.props.label}</p>
        <div className="mt-3 h-1 bg-[#27272a]">
          <div className={node.props.locked ? "h-full w-1/3 bg-[#10b981]" : "h-full w-full bg-[#00ff66]"} />
        </div>
      </div>
    )
  }

  if (node.kind === "DynamicForm") {
    const steps = Math.max(1, Math.min(5, node.props.steps))
    return (
      <div>
        <p className="text-[10px] tracking-[0.16em] text-[#a1a1aa] uppercase">{node.props.title}</p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: steps }, (_, index) => (
            <span key={index} className={index === 0 ? "h-1 flex-1 bg-[#10b981]" : "h-1 flex-1 bg-[#27272a]"} />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="block h-6 border border-[#27272a] bg-black" />
          <span className="block h-6 border border-[#27272a] bg-black" />
        </div>
      </div>
    )
  }

  const solid = node.props.variant !== "outline"
  return (
    <div>
      <span
        className={
          solid
            ? "inline-flex h-8 items-center bg-[#10b981] px-3 text-xs font-semibold text-black"
            : "inline-flex h-8 items-center border border-[#10b981] px-3 text-xs font-semibold text-[#10b981]"
        }
      >
        {node.props.label}
      </span>
    </div>
  )
}

function Spark({ seed }: { seed: string }) {
  const bars = sparkBars(seed)
  return (
    <div className="mt-3 flex h-8 items-end gap-0.5">
      {bars.map((height, index) => (
        <span key={index} className="w-1.5 bg-[#10b981]" style={{ height: `${height}%` }} />
      ))}
    </div>
  )
}

function sparkBars(seed: string): number[] {
  let hash = 0
  for (const char of seed) hash = (hash * 33 + char.charCodeAt(0)) >>> 0
  return Array.from({ length: 12 }, (_, index) => {
    hash = (hash * 1664525 + 1013904223 + index) >>> 0
    return 28 + (hash % 72)
  })
}
