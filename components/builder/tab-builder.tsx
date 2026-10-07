"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"
import { SampleApp, type AppParts } from "@/components/builder/sample-app"

const partList = [
  { id: "search", label: "Zoeken" },
  { id: "orders", label: "Bestellingen" },
  { id: "status", label: "Status" },
  { id: "note", label: "Notitie" },
] as const

export function TabBuilder() {
  const [parts, setParts] = useState<AppParts>({ search: true, orders: true, status: true, note: true })
  const [preview, setPreview] = useState(false)

  function toggle(id: keyof AppParts) {
    setParts((current) => ({ ...current, [id]: !current[id] }))
  }

  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-mist">
              <Link href="/diensten/webshop" className="hover:text-ink">
                Webshop
              </Link>
              <span className="px-2">/</span>
              <span className="text-ink">App bouwer</span>
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Zet het scherm in elkaar</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-mist">
              Zet een paar onderdelen aan. Voorbeeld opent dezelfde bestel-app, net iets anders opgemaakt.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/diensten/webshop"
              className="inline-flex h-10 items-center rounded-full bg-white px-4 text-xs font-semibold text-ink ring-1 ring-[#e8e8e3] hover:ring-brand"
            >
              Terug naar de webshop
            </Link>
            <button
              type="button"
              onClick={() => setPreview(true)}
              className="inline-flex h-10 items-center rounded-full bg-brand px-4 text-xs font-semibold text-white hover:bg-brand-dark"
            >
              Voorbeeld
            </button>
          </div>
        </div>

        <div className="grid items-start gap-4 rounded-[1.75rem] bg-white p-4 ring-1 ring-[#e8e8e3] lg:grid-cols-[220px_minmax(0,1fr)] lg:p-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand">ONDERDELEN</p>
            <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
              {partList.map((part) => {
                const on = parts[part.id]
                return (
                  <button
                    key={part.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(part.id)}
                    className={
                      on
                        ? "h-10 rounded-full bg-brand px-4 text-left text-xs font-semibold text-white lg:w-full"
                        : "h-10 rounded-full bg-white px-4 text-left text-xs font-semibold text-ink ring-1 ring-[#e8e8e3] hover:ring-brand lg:w-full"
                    }
                  >
                    {part.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[22rem]">
            <Phone>
              <SampleApp parts={parts} variant="builder" />
            </Phone>
          </div>
        </div>
      </div>

      {preview ? (
        <div className="fixed inset-x-0 bottom-0 top-20 z-40 flex items-center justify-center bg-paper px-4 py-6">
          <div className="flex w-full max-w-[26rem] flex-col items-center gap-4">
            <div className="flex w-full items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">VOORBEELD</p>
              <button type="button" onClick={() => setPreview(false)} className="text-xs font-semibold text-mist hover:text-ink">
                Sluiten
              </button>
            </div>
            <Phone tall>
              <SampleApp parts={parts} variant="example" />
            </Phone>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Phone({ children, tall }: { children: ReactNode; tall?: boolean }) {
  return (
    <div className="rounded-[1.8rem] bg-ink p-2 shadow-[0_24px_40px_-28px_rgba(20,20,20,0.45)]">
      <div className={tall ? "h-[36rem] overflow-hidden rounded-[1.35rem] bg-white" : "h-[32rem] overflow-hidden rounded-[1.35rem] bg-white"}>{children}</div>
    </div>
  )
}
