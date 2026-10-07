"use client"

import { Container } from "@/components/container"
import type { ServicePoint } from "@/lib/services"
import { useState, type ReactNode } from "react"

const marks: Record<string, () => ReactNode> = {
  "Assortiment dat klopt": AssortmentMark,
  "Betaalprovider": PaymentMark,
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
  if (title === "Bestellingen op één plek") return <OrdersPicture />
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
  const steps = [
    { id: "1", title: "Product", text: "Naam, prijs en beeld horen bij elkaar." },
    { id: "2", title: "Kenmerk", text: "Een locatie, een eigenschap of een ander detail." },
    { id: "3", title: "Vaste plek", text: "Bijzondere producten blijven op hun plaats." },
  ]
  return (
    <div className="w-full max-w-[22rem]" aria-hidden>
      <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#e4e4df]">
        <div className="h-1 bg-brand" />
        <div className="relative h-[5.25rem] border-b border-[#ecece8] bg-[#f6f6f4]">
          <AssortPreview mode="product" className="assort-card assort-card-1" />
          <AssortPreview mode="trait" className="assort-card assort-card-2" />
          <AssortPreview mode="place" className="assort-card assort-card-3" />
        </div>
        <ol className="space-y-0.5 px-2 py-2">
          {steps.map((step) => (
            <li key={step.id} className={`assort-step assort-step-${step.id} flex items-start gap-2.5 rounded-xl px-2 py-2`}>
              <span className="assort-num grid size-6 shrink-0 place-items-center rounded-full bg-[#f6f6f4] text-[10px] font-semibold text-mist">
                {step.id}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-ink">{step.title}</span>
                <span className="block text-[12px] leading-4 text-mist">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </article>
    </div>
  )
}

function AssortPreview({ mode, className }: { mode: "product" | "trait" | "place"; className: string }) {
  return (
    <div className={`absolute inset-0 flex items-center gap-3 px-3 ${className}`}>
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-brand ring-1 ring-[#e4e4df]">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path d="M4 14h16v3H4v-3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 14V9h8l2 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M7 17v2M17 17v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-ink">Linnen bank</span>
        <span className="block text-[11px] text-mist">€ 890</span>
        {mode !== "product" ? (
          <span className="mt-1 flex flex-wrap gap-1">
            <span className="inline-flex h-5 items-center rounded-full bg-[#e7f5ec] px-2 text-[10px] font-semibold text-brand">
              Woonkamer
            </span>
            {mode === "place" ? (
              <span className="inline-flex h-5 items-center rounded-full bg-ink px-2 text-[10px] font-semibold text-white">
                Voorpagina
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
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

function OrdersPicture() {
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-[#f3f3f0] ring-1 ring-[#e4e4df]" aria-hidden>
      <div className="flex items-center gap-3 border-b border-[#e4e4df] bg-white px-3 py-2.5 sm:px-4">
        <span className="text-[15px] leading-none font-extrabold tracking-[-0.06em] text-ink">JR</span>
        <div className="hidden items-center gap-3.5 text-[10px] font-semibold tracking-[0.16em] sm:flex">
          <span className="text-ink">SHOP</span>
          <span className="text-mist">BUNDLES</span>
          <span className="text-mist">TRUST</span>
        </div>
        <div className="ml-auto flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f6f6f4] px-3 text-[11px] text-mist ring-1 ring-[#e4e4df] sm:max-w-56 sm:flex-none">
          <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden>
            <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.2 10.2 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="truncate">Search...</span>
        </div>
        <span className="relative grid size-8 shrink-0 place-items-center text-ink">
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
            <path d="M6 7h15l-1.6 8.2a1 1 0 0 1-1 .8H9.2a1 1 0 0 1-1-.8L6 7Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M6 7 5 4H2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="9" cy="19.5" r="1.2" fill="currentColor" />
            <circle cx="17" cy="19.5" r="1.2" fill="currentColor" />
          </svg>
          <span className="orders-badge absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-brand text-[9px] font-semibold text-white">
            2
          </span>
        </span>
      </div>

      <div className="grid items-center gap-5 px-3 py-5 sm:px-5 sm:py-6 md:grid-cols-[4.25rem_minmax(0,1fr)_minmax(15rem,19rem)] md:gap-4 md:py-7">
        <div className="flex items-center justify-center gap-4 md:flex-col md:gap-3">
          <GuaranteeSeal className="orders-stamp size-14 sm:size-16" />
          <BestSellerSeal className="orders-stamp orders-stamp-2 size-14 sm:size-16" />
          <Seal id="orders-seal-jr" className="orders-stamp orders-stamp-3 size-14 sm:size-16" />
        </div>

        <div className="overflow-hidden rounded-xl bg-[#e7e7e3]">
          <svg viewBox="40 18 360 328" className="block h-auto w-full">
            <defs>
              <linearGradient id="orders-front" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1cba55" />
                <stop offset="0.55" stopColor="#16a34a" />
                <stop offset="1" stopColor="#118a3c" />
              </linearGradient>
              <linearGradient id="orders-side" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#128a3e" />
                <stop offset="1" stopColor="#0c5e2c" />
              </linearGradient>
              <filter id="orders-card" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#141414" floodOpacity="0.16" />
              </filter>
              <clipPath id="orders-front-clip">
                <path d="M82 134 L298 126 L304 294 L76 302 Z" />
              </clipPath>
            </defs>

            <g className="orders-bag">
              <ellipse cx="196" cy="314" rx="112" ry="8" fill="#141414" opacity="0.12" />
              <path d="M298 126 L340 116 L348 280 L304 294 Z" fill="url(#orders-side)" />
              <path d="M140 124 C126 42 188 28 206 122" fill="none" stroke="#0e7034" strokeWidth="11" strokeLinecap="round" />
              <path d="M140 124 C126 42 188 28 206 122" fill="none" stroke="#1aaa4e" strokeWidth="3" strokeLinecap="round" />
              <path d="M236 118 C258 36 322 34 344 100" fill="none" stroke="#0c6230" strokeWidth="11" strokeLinecap="round" />
              <path d="M236 118 C258 36 322 34 344 100" fill="none" stroke="#178f42" strokeWidth="3" strokeLinecap="round" />

              <path d="M82 134 L298 126 L304 294 L76 302 Z" fill="url(#orders-front)" />
              <path d="M82 134 L298 126 L290 158 L90 166 Z" fill="#fff" opacity="0.13" />
              <ellipse cx="188" cy="128" rx="124" ry="26" fill="#19a34a" />
              <ellipse cx="188" cy="124" rx="108" ry="16" fill="#084822" />

              <g className="orders-drop" filter="url(#orders-card)">
                <g transform="translate(96 86) rotate(-4)">
                  <rect width="118" height="70" rx="3" fill="#fff" />
                  <text x="8" y="13" fill="#141414" fontSize="7" fontWeight="650">
                    Apex Pro Wireless
                  </text>
                  <clipPath id="orders-apex-photo">
                    <rect x="7" y="18" width="104" height="44" rx="2" />
                  </clipPath>
                  <rect x="7" y="18" width="104" height="44" rx="2" fill="#141414" />
                  <image
                    href="/webshop/apex-pro-wireless.png"
                    x="7"
                    y="18"
                    width="104"
                    height="44"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#orders-apex-photo)"
                  />
                </g>
              </g>
              <g className="orders-drop orders-drop-2" filter="url(#orders-card)">
                <g transform="translate(198 80) rotate(3)">
                  <rect width="96" height="78" rx="3" fill="#fff" />
                  <text x="7" y="13" fill="#141414" fontSize="6.5" fontWeight="650">
                    Nimbus Laptop Stand
                  </text>
                  <text x="7" y="22" fill="#5e5e5e" fontSize="5.5">
                    (Space Gray)
                  </text>
                  <clipPath id="orders-nimbus-photo">
                    <rect x="17" y="26" width="62" height="46" rx="2" />
                  </clipPath>
                  <rect x="17" y="26" width="62" height="46" rx="2" fill="#f3f3f1" />
                  <image
                    href="/webshop/nimbus-laptop-stand.png"
                    x="17"
                    y="26"
                    width="62"
                    height="46"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#orders-nimbus-photo)"
                  />
                </g>
              </g>
              <g className="orders-drop orders-drop-3" filter="url(#orders-card)">
                <g transform="translate(108 66) rotate(-3)">
                  <rect width="132" height="16" rx="2" fill="#128a3e" />
                  <text x="7" y="11.5" fill="#fff" fontSize="7" fontWeight="650">
                    Order #TF24-10-26-987
                  </text>
                </g>
              </g>

              <path d="M176 150 L168 286" stroke="#0e7a36" strokeWidth="1" opacity="0.28" />
              <g clipPath="url(#orders-front-clip)">
                <rect className="orders-sheen" x="70" y="120" width="18" height="180" fill="#fff" />
              </g>
              <g transform="translate(176 230)" opacity="0.42">
                <circle r="24" fill="none" stroke="#0c5c2c" strokeWidth="1.2" />
                <circle r="18" fill="none" stroke="#0c5c2c" strokeWidth="0.6" />
                <text y="4" textAnchor="middle" fill="#0c5c2c" fontSize="10" fontWeight="650">
                  JR
                </text>
              </g>
            </g>
          </svg>
        </div>

        <div className="min-w-0">
          <h4 className="orders-line text-sm font-semibold tracking-[0.05em] text-ink sm:text-[15px]">
            PREMIUM WORKSPACE BUNDLE
          </h4>
          <ul className="mt-3">
            <li className="orders-line orders-ld1 flex items-center gap-2.5 border-b border-[#e4e4df] py-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white text-brand ring-1 ring-[#e4e4df]">
                <KeysIcon />
              </span>
              <span className="min-w-0 flex-1 text-[12px] leading-4 font-medium text-ink">1× Apex Pro Wireless Keyboard</span>
              <span className="text-[12px] font-medium text-ink tabular-nums">$199.99</span>
            </li>
            <li className="orders-line orders-ld2 flex items-center gap-2.5 border-b border-[#e4e4df] py-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white text-brand ring-1 ring-[#e4e4df]">
                <StandIcon />
              </span>
              <span className="min-w-0 flex-1 text-[12px] leading-4 font-medium text-ink">1× Nimbus Laptop Stand (Space Gray)</span>
              <span className="text-[12px] font-medium text-ink tabular-nums">$79.99</span>
            </li>
          </ul>
          <div className="orders-line orders-ld2 mt-3 flex items-end justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Total Bundle</p>
            <p className="text-right">
              <span className="block text-xl font-semibold tracking-tight text-ink tabular-nums">$259.99</span>
              <span className="block text-[11px] font-medium text-brand">You save $259.99</span>
            </p>
          </div>
          <p className="orders-line orders-ld3 mt-4 text-[12px] font-semibold text-ink">Order Details</p>
          <p className="orders-ref orders-line orders-ld3 mt-2 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[11px] text-ink ring-1 ring-[#e4e4df]">
            <span className="confirm-dot size-1.5 shrink-0 rounded-full bg-brand" />
            <span className="min-w-0">Current Order Ref: #TF24-10-26-987</span>
          </p>
          <div className="orders-line orders-ld4 mt-3 grid gap-2">
            <span className="inline-flex h-9 items-center justify-center rounded-md bg-ink text-[12px] font-semibold text-white">
              Add to Cart
            </span>
            <span className="inline-flex h-9 items-center justify-center rounded-md bg-white text-[12px] font-semibold text-ink ring-1 ring-[#d7d7d2]">
              View Item Details
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuaranteeSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className}>
      <circle cx="48" cy="48" r="44" fill="#f6f6f4" stroke="#141414" strokeWidth="1.6" />
      <circle cx="48" cy="48" r="37" fill="none" stroke="#141414" strokeWidth="0.7" />
      <path id="orders-guarantee" d="M48 14a34 34 0 1 1 0 68 34 34 0 0 1 0-68" fill="none" />
      <text fill="#141414" fontSize="6.2" letterSpacing="1.3">
        <textPath href="#orders-guarantee" startOffset="8%">
          CONSISTENCY · GUARANTEE · CONSISTENCY ·
        </textPath>
      </text>
      <path d="M48 30 62 36v12c0 10-14 16-14 16S34 58 34 48V36l14-6Z" fill="none" stroke="#141414" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m42 47 4 4 8-9" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BestSellerSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className}>
      <circle cx="48" cy="48" r="44" fill="#f6f6f4" stroke="#141414" strokeWidth="1.6" />
      <circle cx="48" cy="48" r="37" fill="none" stroke="#141414" strokeWidth="0.7" />
      <path fill="#141414" d="m48 18 1.6 3.6 3.9.4-2.9 2.6.8 3.8L48 26.4 44.6 28.4l.8-3.8-2.9-2.6 3.9-.4L48 18Z" />
      <path fill="#141414" d="m48 68 1.6 3.6 3.9.4-2.9 2.6.8 3.8L48 76.4 44.6 78.4l.8-3.8-2.9-2.6 3.9-.4L48 68Z" />
      <path d="M14 46h68l-8 10H22L14 46Z" fill="#141414" />
      <path d="M22 56v8l8-8M74 56v8l-8-8" fill="#5e5e5e" />
      <text x="48" y="50" textAnchor="middle" fill="#f6f6f4" fontSize="7.4" fontWeight="700" letterSpacing="0.8">
        BEST SELLER
      </text>
    </svg>
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
