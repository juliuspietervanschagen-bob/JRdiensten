"use client"

import { Container } from "@/components/container"
import type { ServicePoint } from "@/lib/services"
import { useState, type ReactNode } from "react"

const marks: Record<string, () => ReactNode> = {
  "Assortiment dat klopt": AssortmentMark,
  "Betaalprovider": PaymentMark,
  "Bestellingen op één plek": OrdersMark,
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
                const number = String(index + 1).padStart(2, "0")
                return (
                  <li key={item.title} className="pakket-lift relative border-t border-[#ecece8]">
                    <div className="py-5 sm:py-6">
                      <p className="text-xs font-semibold tracking-[0.16em] text-brand">{number}</p>
                      <h3 className="mt-1 text-base font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1.5 max-w-2xl text-sm leading-6 text-mist">{item.text}</p>
                      <div className="mt-4">{pictureFor(item.title)}</div>
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

function pictureFor(title: string) {
  if (title === "Assortiment dat klopt") return <AssortmentMark />
  if (title === "Korte checkout") return <CheckoutJourney />
  if (title === "Gebouwd voor de telefoon") return <PhonePicture />
  if (title === "Automatische bevestiging") return <ConfirmationPicture />
  const Mark = marks[title]
  if (!Mark) return null
  return (
    <div className="flex h-20 w-fit items-center justify-center rounded-xl bg-[#f6f6f4] px-4 ring-1 ring-[#ecece8]">
      <Mark />
    </div>
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

function PhonePicture() {
  const [view, setView] = useState<"logo" | "phone">("phone")
  const options = [
    { id: "logo", label: "Logo" },
    { id: "phone", label: "Telefoon" },
  ] as const

  return (
    <div className="mx-auto w-full max-w-[40rem]">
      <div className="mb-3 flex justify-center">
        <div className="inline-flex rounded-full bg-[#f6f6f4] p-1 ring-1 ring-[#e8e8e3]" role="group" aria-label="Kies een weergave">
          {options.map((option) => {
            const active = view === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setView(option.id)}
                className={
                  active
                    ? "min-h-9 rounded-full bg-brand px-4 text-xs font-semibold text-white"
                    : "min-h-9 rounded-full px-4 text-xs font-semibold text-mist hover:text-ink"
                }
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-[#e3eee6]">
        <img
          src="/webshop/aura-phone.png"
          alt=""
          className={`phone-shot block h-auto w-full transition-opacity duration-500 motion-reduce:transition-none ${view === "phone" ? "opacity-100" : "opacity-0"}`}
        />
        <img
          src="/webshop/aura-logo.png"
          alt=""
          className={`phone-shot absolute inset-0 h-full w-full transition-opacity duration-500 motion-reduce:transition-none ${view === "logo" ? "opacity-100" : "pointer-events-none opacity-0"}`}
        />
      </div>
    </div>
  )
}

function ConfirmationPicture() {
  return (
    <div className="relative mx-auto w-full max-w-[44rem] overflow-hidden rounded-2xl bg-[#ecece8] px-3 py-8 ring-1 ring-[#e4e4df] sm:px-8 sm:py-10" aria-hidden>
      <div className="relative">
        <article className="confirm-card relative z-10 mx-auto w-full max-w-[26rem] bg-white">
          <div className="h-1 bg-brand" />
          <header className="bg-[#e7f5ec] px-4 py-4 text-center sm:px-6 sm:py-5">
            <h4 className="text-[15px] font-semibold tracking-[0.16em] text-ink sm:text-lg">ORDER CONFIRMATION</h4>
            <p className="mt-1 text-xs text-mist sm:text-sm">Thank you for your trust, Sarah J.!</p>
          </header>
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-5">
            <div className="confirm-line">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-ink">ORDER DETAILS</p>
              <p className="mt-2 text-[11px] text-mist">Order ID: <span className="text-ink">#TF24-10-26-987</span></p>
              <p className="text-[11px] text-mist">Order Date: <span className="text-ink">October 26, 2024</span></p>
            </div>
            <div className="confirm-line confirm-d1">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-ink">SHIPPING INFORMATION</p>
              <p className="mt-2 text-[11px] text-mist">Method: <span className="text-ink">FedEx Express</span></p>
              <p className="text-[11px] text-mist">Est. Delivery: <span className="text-ink">Oct 29 – 31, 2024</span></p>
              <p className="text-[11px] text-mist">
                Status: <span className="text-ink">Processing</span>
                <span className="confirm-dot ml-1.5 inline-block size-1.5 rounded-full bg-brand align-middle" />
              </p>
            </div>
          </div>
          <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 sm:px-5">
            <div className="confirm-line confirm-d2 rounded-lg border border-[#e4e4df] p-3">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-ink">ORDER SUMMARY</p>
              <SummaryRow name="Apex Pro Wireless Keyboard" meta="qty: 1" price="$179.99" mark="keys" />
              <SummaryRow name="Nimbus Laptop Stand" meta="(Space Gray) qty: 1" price="$49.50" mark="stand" />
              <p className="mt-2 border-t border-[#ecece8] pt-2 text-[11px] text-mist">Total items: 2</p>
              <Total label="Subtotal" value="$229.49" />
              <Total label="Shipping (Standard)" value="FREE" />
              <Total label="Tax" value="$18.36" />
              <p className="mt-2 flex justify-between text-[11px] font-semibold text-ink">
                <span>ORDER TOTAL:</span>
                <span>$247.85</span>
              </p>
            </div>
            <div className="confirm-line confirm-d3 rounded-lg border border-[#e4e4df] p-3">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-ink">SHIPPING DETAILS</p>
              <p className="mt-2 text-[11px] text-mist">Method: <span className="text-ink">FedEx Express</span></p>
              <p className="text-[11px] text-mist">Est. Delivery: <span className="text-ink">Oct 29 – 31, 2024</span></p>
              <p className="text-[11px] text-mist">Status: <span className="text-ink">Processing</span></p>
              <p className="mt-3 text-[10px] font-semibold tracking-[0.14em] text-ink">Address:</p>
              <p className="mt-1 text-[11px] leading-4 text-mist">
                Sarah Johnson
                <br />
                123 Innovation Drive, Apt 4B,
                <br />
                Seattle, WA 98101
              </p>
            </div>
          </div>
          <div className="confirm-line confirm-d4 flex flex-wrap gap-2 px-4 pb-5 sm:px-5">
            <span className="inline-flex h-8 items-center rounded-md bg-brand px-3 text-[11px] font-semibold text-white">View Order Details</span>
            <span className="inline-flex h-8 items-center rounded-md bg-brand px-3 text-[11px] font-semibold text-white">Contact Support</span>
          </div>
          <Seal id="jr-seal-card" className="confirm-stamp absolute right-2 bottom-2 size-16 sm:size-[4.5rem]" />
        </article>
        <Seal id="jr-seal-side" className="confirm-stamp confirm-stamp-side pointer-events-none absolute top-16 left-[calc(50%+11.5rem)] hidden size-24 sm:block" />
      </div>
    </div>
  )
}

function SummaryRow({ name, meta, price, mark }: { name: string; meta: string; price: string; mark: "keys" | "stand" }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#f6f6f4] text-brand">
        {mark === "keys" ? <KeysIcon /> : <StandIcon />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] leading-4 font-medium text-ink">{name}</span>
        <span className="block text-[10px] text-mist">{meta}</span>
      </span>
      <span className="text-[11px] font-medium text-ink">{price}</span>
    </div>
  )
}

function Total({ label, value }: { label: string; value: string }) {
  return (
    <p className="mt-1 flex justify-between text-[11px] text-mist">
      <span>{label}</span>
      <span className="text-ink">{value}</span>
    </p>
  )
}

function KeysIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 11h.01M10 11h.01M14 11h.01M18 11h.01M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function StandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path d="M4 15h16l-2 4H6l-2-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 15 9 7h6l2 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function Seal({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="56" fill="#f6f6f4" stroke="#141414" strokeWidth="2" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#141414" strokeWidth="1" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 3" />
      <path id={id} d="M60 18a42 42 0 1 1 0 84 42 42 0 0 1 0-84" fill="none" />
      <text fill="#141414" fontSize="7.5" fontFamily="Geist, ui-sans-serif, sans-serif" letterSpacing="1.6">
        <textPath href={`#${id}`} startOffset="4%">
          JR INTELLIGENCE · CONFIRMED · JR INTELLIGENCE · CONFIRMED ·
        </textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fill="#141414" fontSize="28" fontFamily="Georgia, serif" fontWeight="600">
        JR
      </text>
    </svg>
  )
}
