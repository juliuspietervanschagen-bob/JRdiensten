import { Container } from "@/components/container"
import type { ServicePoint } from "@/lib/services"
import type { ReactNode } from "react"

const marks: Record<string, () => ReactNode> = {
  "Assortiment dat klopt": AssortmentMark,
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
                const assortment = item.title === "Assortiment dat klopt"
                const checkout = item.title === "Korte checkout"
                if (assortment) {
                  return (
                    <li key={item.title} className="pakket-lift relative border-t border-[#ecece8]">
                      <div className="py-5 sm:py-6">
                        <AssortmentMark />
                        <div className="mt-4 min-w-0">
                          <p className="text-xs font-semibold tracking-[0.16em] text-brand">{number}</p>
                          <h3 className="mt-1 text-base font-semibold text-ink">{item.title}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-mist">{item.text}</p>
                        </div>
                      </div>
                    </li>
                  )
                }
                if (checkout) {
                  return (
                    <li key={item.title} className="pakket-lift relative border-t border-[#ecece8]">
                      <div className="py-5 sm:py-6">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold tracking-[0.16em] text-brand">{number}</p>
                          <h3 className="mt-1 text-base font-semibold text-ink">{item.title}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-mist">{item.text}</p>
                        </div>
                        <div className="mt-4">
                          <CheckoutJourney />
                        </div>
                      </div>
                    </li>
                  )
                }
                return (
                  <li key={item.title} className="pakket-lift relative border-t border-[#ecece8]">
                    <div className="grid items-center gap-4 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:py-6">
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
    <div
      className="assort-stage relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#e8e7e3] px-3 py-6 ring-1 ring-[#e4e0d8] sm:px-8 sm:py-8"
      aria-hidden
    >
      <span className="assort-glow pointer-events-none absolute top-1/2 left-1/2 h-[78%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="assort-logo relative w-full max-w-[36rem]">
        <img src="/webshop/aura-assortiment.png" alt="" className="block h-auto w-full" />
        <span className="assort-sheen pointer-events-none absolute inset-y-[6%] left-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]" />
      </div>
    </div>
  )
}

function CheckoutJourney() {
  return (
    <div className="checkout-stage mx-auto w-full max-w-[40rem] overflow-hidden rounded-2xl bg-[#f4f7f4] ring-1 ring-[#e3eee6]" aria-hidden>
      <div className="checkout-reel relative">
        <img src="/webshop/aura-checkout.png" alt="" className="block h-auto w-full" />
        <span className="checkout-walker" />
      </div>
    </div>
  )
}

function PaymentMark() {
  return (
    <div className="flex items-center rounded-lg bg-white px-2.5 py-2 ring-1 ring-[#e4e4df]" aria-hidden>
      <svg viewBox="0 0 124 32" className="h-7 w-[6.4rem]" role="img">
        <text
          x="2"
          y="24"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="26"
          fontStyle="italic"
          fontWeight="700"
        >
          <tspan fill="#003087">Pay</tspan>
          <tspan fill="#009cde">Pal</tspan>
        </text>
      </svg>
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
