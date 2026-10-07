"use client"

import { useMemo, useState } from "react"

export type AppParts = {
  search: boolean
  orders: boolean
  status: boolean
  note: boolean
}

type OrderState = "processing" | "packed" | "shipped"

type Order = {
  id: string
  name: string
  meta: string
  state: OrderState
}

const seed: Order[] = [
  { id: "#TF24-10-26-987", name: "Linen throw", meta: "2 items · Reeuwijk", state: "packed" },
  { id: "#TF24-10-28-104", name: "Oak tray", meta: "1 item · Gouda", state: "processing" },
  { id: "#TF24-11-02-221", name: "Ceramic set", meta: "3 items · Utrecht", state: "shipped" },
]

const steps: OrderState[] = ["processing", "packed", "shipped"]

export function SampleApp({ parts, variant }: { parts: AppParts; variant: "builder" | "example" }) {
  const [orders, setOrders] = useState(seed)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(variant === "example" ? seed[0].id : seed[1].id)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return orders
    return orders.filter((order) => `${order.id} ${order.name} ${order.meta}`.toLowerCase().includes(needle))
  }, [orders, query])

  const selected = visible.find((order) => order.id === selectedId) ?? visible[0] ?? null
  const done = orders.filter((order) => order.state !== "processing").length
  const progress = Math.round((done / orders.length) * 100)

  function advance(id: string) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order
        const index = steps.indexOf(order.state)
        return { ...order, state: steps[Math.min(steps.length - 1, index + 1)] }
      }),
    )
  }

  return (
    <div className="flex h-full flex-col bg-white text-ink">
      <div className="flex items-center justify-between px-4 pt-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">ORDERS</p>
          <p className="mt-1 text-lg font-semibold tracking-tight">{variant === "example" ? "Ready to ship" : "Today"}</p>
        </div>
        <p className="text-xs font-semibold text-mist">{progress}%</p>
      </div>
      <div className="mx-4 mt-3 h-1 overflow-hidden rounded-full bg-[#ecece8]">
        <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
      </div>

      {parts.search ? (
        <label className="mx-4 mt-4 flex h-10 items-center rounded-full bg-[#f6f6f4] px-3 ring-1 ring-[#e8e8e3]">
          <span className="mr-2 text-brand" aria-hidden>
            ⌕
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search orders"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-mist"
          />
        </label>
      ) : null}

      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
        {parts.status && selected ? <StatusCard order={selected} onAdvance={() => advance(selected.id)} featured={variant === "example"} /> : null}
        {parts.orders ? (
          visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#e8e8e3] px-3 py-6 text-center text-sm text-mist">No orders for that search.</p>
          ) : (
            visible.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedId(order.id)}
                className={
                  selected?.id === order.id
                    ? "rounded-2xl bg-[#f6f6f4] px-3 py-2.5 text-left ring-1 ring-brand"
                    : "rounded-2xl bg-white px-3 py-2.5 text-left ring-1 ring-[#e8e8e3] hover:ring-brand"
                }
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold">{order.name}</span>
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-brand uppercase">{order.state}</span>
                </span>
                <span className="mt-1 block text-[11px] text-mist">
                  {order.id} · {order.meta}
                </span>
              </button>
            ))
          )
        ) : null}
        {parts.note ? (
          <div className="rounded-2xl border-l-2 border-brand bg-[#f6f6f4] px-3 py-2.5">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">NOTE</p>
            <p className="mt-1 text-[13px] leading-5 text-ink">Two items, ready for the same shipment.</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function StatusCard({ order, onAdvance, featured }: { order: Order; onAdvance: () => void; featured: boolean }) {
  const active = steps.indexOf(order.state)
  const next = order.state === "processing" ? "Mark packed" : order.state === "packed" ? "Mark shipped" : "Shipped"
  return (
    <div className={featured ? "rounded-2xl bg-ink px-3 py-3 text-white" : "rounded-2xl bg-white px-3 py-3 ring-1 ring-[#e8e8e3]"}>
      <p className={featured ? "text-[10px] tracking-[0.14em] text-white/70" : "text-[10px] tracking-[0.14em] text-mist"}>{order.id}</p>
      <p className="mt-1 text-sm font-semibold">{order.name}</p>
      <div className="mt-3 flex gap-1">
        {steps.map((step, index) => (
          <span key={step} className={index <= active ? "h-1 flex-1 rounded-full bg-brand" : featured ? "h-1 flex-1 rounded-full bg-white/20" : "h-1 flex-1 rounded-full bg-[#ecece8]"} />
        ))}
      </div>
      <button
        type="button"
        onClick={onAdvance}
        disabled={order.state === "shipped"}
        className={
          featured
            ? "mt-3 h-9 rounded-full bg-brand px-3 text-xs font-semibold text-white disabled:bg-white/15 disabled:text-white/70"
            : "mt-3 h-9 rounded-full bg-brand px-3 text-xs font-semibold text-white disabled:bg-[#ecece8] disabled:text-mist"
        }
      >
        {next}
      </button>
    </div>
  )
}
