"use client"

import Link from "next/link"
import { useState } from "react"

const parts = [
  { id: "search", label: "Zoeken", code: "SearchField" },
  { id: "status", label: "Status", code: "OrderStatus" },
  { id: "note", label: "Notitie", code: "Note" },
] as const

type PartId = (typeof parts)[number]["id"]

export function ShopAppBuilder() {
  const [active, setActive] = useState<PartId[]>(["search"])

  function toggle(id: PartId) {
    setActive((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const shown = parts.filter((part) => active.includes(part.id))

  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute -top-6 -right-4 h-36 w-36 text-brand"
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden
      >
        <path d="M10 40C50 10 90 70 150 30" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 130C70 100 90 150 150 120" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <div className="relative rounded-[1.75rem] bg-[#f6f6f4] p-4 ring-1 ring-[#e3eee6] sm:p-5">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">ONDERDELEN</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {parts.map((part) => {
            const on = active.includes(part.id)
            return (
              <button
                key={part.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(part.id)}
                className={
                  on
                    ? "min-h-10 rounded-full bg-brand px-4 text-xs font-semibold text-white"
                    : "min-h-10 rounded-full bg-white px-4 text-xs font-semibold text-ink ring-1 ring-[#e8e8e3] hover:ring-brand"
                }
              >
                {part.label}
              </button>
            )
          })}
        </div>

        <div className="mx-auto mt-4 w-full max-w-[17rem] rounded-[1.7rem] bg-ink p-2 shadow-[0_24px_40px_-28px_rgba(20,20,20,0.45)]">
          <div className="flex min-h-[19rem] flex-col rounded-[1.25rem] bg-white p-3">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-mist">screen.tsx</p>
            <div className="mt-3 flex flex-1 flex-col gap-2">
              {shown.length === 0 ? (
                <p className="grid flex-1 place-items-center rounded-xl border border-dashed border-[#e8e8e3] px-3 text-center text-xs leading-5 text-mist">
                  Kies een onderdeel. Het scherm vult zich.
                </p>
              ) : (
                shown.map((part) => (
                  <div key={part.id} className="shop-part-in">
                    <PartPreview id={part.id} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <p className="mt-3 truncate text-center font-mono text-[11px] leading-5 text-mist">
          {shown.length === 0 ? "screen.tsx" : shown.map((part) => `<${part.code} />`).join(" ")}
        </p>
        <p className="mt-2 text-center">
          <Link href="/builder" className="text-xs font-semibold text-brand hover:text-ink">
            Open de bouwer
          </Link>
        </p>
      </div>
    </div>
  )
}

function PartPreview({ id }: { id: PartId }) {
  if (id === "search") {
    return (
      <div className="flex h-9 items-center rounded-lg bg-[#f6f6f4] px-2.5 text-[12px] text-mist ring-1 ring-[#e8e8e3]">
        <span className="mr-2 text-brand">⌕</span>
        Search orders
      </div>
    )
  }
  if (id === "status") {
    return (
      <div className="rounded-lg px-2.5 py-2 ring-1 ring-[#e8e8e3]">
        <p className="text-[10px] tracking-[0.12em] text-mist">#TF24-10-26-987</p>
        <p className="mt-1 text-sm font-semibold text-ink">Packed</p>
        <div className="mt-2 flex gap-1">
          <span className="h-1 flex-1 rounded-full bg-brand" />
          <span className="h-1 flex-1 rounded-full bg-brand" />
          <span className="h-1 flex-1 rounded-full bg-[#e8e8e3]" />
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-lg border-l-2 border-brand bg-[#f6f6f4] px-2.5 py-2">
      <p className="text-[10px] font-semibold tracking-[0.12em] text-brand">NOTE</p>
      <p className="mt-1 text-[12px] leading-5 text-ink">Two items, ready for the same shipment.</p>
    </div>
  )
}
