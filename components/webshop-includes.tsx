import { Container } from "@/components/container"
import type { ServicePoint } from "@/lib/services"
import type { ReactNode } from "react"

const marks: Record<string, () => ReactNode> = {
  "Assortiment dat klopt": AssortmentMark,
  "Korte checkout": CheckoutMark,
  "Betaalprovider": PaymentMark,
  "Bestellingen op één plek": OrdersMark,
  "Gebouwd voor de telefoon": ScreensMark,
  "Automatische bevestiging": ConfirmMark,
}

export function WebshopIncludes({ includes }: { includes: ServicePoint[] }) {
  return (
    <section className="section-wash py-10 sm:py-12">
      <Container>
        <div className="rounded-[1.75rem] bg-white ring-1 ring-[#e8e8e3]">
          <div className="h-1 rounded-t-[1.75rem] bg-brand" />
          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
                  <span className="h-px w-8 bg-brand" />
                  PAKKET
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Wat je krijgt</h2>
                <p className="mt-2 text-mist">
                  Een afgebakend pakket. De vaste prijs volgt uit dit startpunt, voordat we beginnen.
                </p>
              </div>
              <p className="text-sm font-semibold text-brand tabular-nums">
                {String(includes.length).padStart(2, "0")}
              </p>
            </div>

            <ul className="mt-6">
              {includes.map((item, index) => {
                const Mark = marks[item.title] ?? AssortmentMark
                const number = String(index + 1).padStart(2, "0")
                return (
                  <li key={item.title} className="pakket-lift relative border-t border-[#ecece8]">
                    <span
                      className={
                        index === 0
                          ? "pakket-row pakket-row-first absolute inset-y-0 left-0 w-[3px] bg-brand"
                          : "pakket-row absolute inset-y-0 left-0 w-[3px] bg-brand"
                      }
                      style={{ animationDelay: `${index * -3}s` }}
                    />
                    <div className="grid items-center gap-4 py-5 pl-4 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:py-6 sm:pl-6">
                      <div className="flex h-20 items-center justify-center rounded-xl bg-[#f6f6f4] ring-1 ring-[#ecece8]">
                        <Mark />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-[0.16em] text-brand">{number}</p>
                        <h3 className="mt-1 text-base font-semibold text-ink">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-mist">{item.text}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function AssortmentMark() {
  return (
    <div className="flex items-end gap-1.5" aria-hidden>
      <span className="h-8 w-7 rounded-md bg-white ring-1 ring-[#e4e4df]" />
      <span className="relative h-12 w-8 rounded-md bg-white ring-1 ring-brand">
        <span className="pakket-pin absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-brand" />
      </span>
      <span className="h-8 w-7 rounded-md bg-white ring-1 ring-[#e4e4df]" />
    </div>
  )
}

function CheckoutMark() {
  const steps = ["Knop", "Wagen", "Betalen"]
  return (
    <div className="w-[7.2rem]" aria-hidden>
      <div className="relative h-2">
        <span className="absolute top-1/2 right-1 left-1 h-px -translate-y-1/2 bg-[#d9d9d4]" />
        <span className="pakket-dot absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-brand" />
      </div>
      <div className="mt-1.5 grid grid-cols-3 text-center text-[9px] font-semibold tracking-wide text-mist uppercase">
        {steps.map((step, index) => (
          <span key={step} className={index === 2 ? "text-brand" : undefined}>
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

function PaymentMark() {
  return (
    <div className="flex w-[6.5rem] flex-col gap-1.5" aria-hidden>
      <span className="h-2 rounded-full bg-white ring-1 ring-[#e4e4df]" />
      <span className="h-2 rounded-full bg-brand" />
      <span className="h-2 rounded-full bg-white ring-1 ring-[#e4e4df]" />
    </div>
  )
}

function OrdersMark() {
  const rows = [
    { label: "Nieuw", on: false },
    { label: "Status", on: true },
    { label: "Klant", on: false },
  ]
  return (
    <div className="w-[6.8rem] space-y-1" aria-hidden>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-1.5 rounded-md bg-white px-1.5 py-1 ring-1 ring-[#e4e4df]"
        >
          <span className={row.on ? "size-1.5 rounded-full bg-brand" : "size-1.5 rounded-full bg-[#d9d9d4]"} />
          <span className={row.on ? "text-[9px] font-semibold text-ink" : "text-[9px] font-medium text-mist"}>
            {row.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function ScreensMark() {
  return (
    <div className="flex items-end gap-2" aria-hidden>
      <span className="flex h-12 w-7 flex-col rounded-md bg-white p-1 ring-1 ring-[#e4e4df]">
        <span className="h-1 w-full rounded-sm bg-brand" />
        <span className="mt-1 h-1 w-full rounded-sm bg-[#ecece8]" />
        <span className="mt-1 h-1 w-3 rounded-sm bg-[#ecece8]" />
      </span>
      <span className="flex h-9 w-14 flex-col rounded-md bg-white p-1 ring-1 ring-[#e4e4df]">
        <span className="h-1 w-6 rounded-sm bg-brand" />
        <span className="mt-1 h-1 w-full rounded-sm bg-[#ecece8]" />
        <span className="mt-1 h-1 w-8 rounded-sm bg-[#ecece8]" />
      </span>
    </div>
  )
}

function ConfirmMark() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <Slip label="Bon" late={false} />
      <span className="h-px w-3 bg-brand" />
      <Slip label="Mail" late />
    </div>
  )
}

function Slip({ label, late }: { label: string; late: boolean }) {
  return (
    <span className="flex w-11 flex-col rounded-md bg-white px-1.5 py-1 ring-1 ring-[#e4e4df]">
      <span className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-ink">{label}</span>
        <span
          className={
            late
              ? "pakket-check pakket-check-late size-1.5 rounded-full bg-brand"
              : "pakket-check size-1.5 rounded-full bg-brand"
          }
        />
      </span>
      <span className="mt-1 h-px w-full bg-[#ecece8]" />
      <span className="mt-1 h-px w-5 bg-[#ecece8]" />
    </span>
  )
}
