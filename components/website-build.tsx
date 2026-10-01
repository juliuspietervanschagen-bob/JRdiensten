"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { cn } from "cn"
import { Inbox, MonitorSmartphone, Palette, PanelsTopLeft, PenLine, Search, type LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"

const includeIcons: Record<string, LucideIcon> = {
  "Ontwerp in jullie merk": Palette,
  "Pagina's met een taak": PanelsTopLeft,
  "Telefoon en desktop": MonitorSmartphone,
  "Contact dat aankomt": Inbox,
  "Vindbaar van start": Search,
  "Zelf teksten aanpassen": PenLine,
}

const wideIncludes = new Set(["Ontwerp in jullie merk", "Contact dat aankomt"])

const rows = [
  { label: "Home", text: "Wie we zijn" },
  { label: "Diensten", text: "Wat we doen" },
  { label: "Contact", text: "Hoe je ons bereikt" },
]

const nodes = [
  { label: "Home", x: 86, y: 170 },
  { label: "Diensten", x: 268, y: 62 },
  { label: "Over", x: 310, y: 170 },
  { label: "Contact", x: 250, y: 278 },
  { label: "Inbox", x: 470, y: 278 },
]

const links = [
  [0, 1],
  [0, 2],
  [0, 3],
  [3, 4],
] as const

const view = { w: 560, h: 340 }

export function WebsiteBuild({ service }: { service: Service }) {
  return (
    <section className="pt-16 pb-8 sm:pt-20 sm:pb-10">
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
            <span className="h-px w-8 bg-brand" />
            DE OPBOUW
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Van losse informatie naar een site
          </h2>
          <p className="mt-3 text-mist">
            We ordenen wat jullie vertellen tot pagina's die naar elkaar verwijzen, en naar contact.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:[grid-template-areas:'translate_graph'_'bento_graph'_'steps_steps']">
          <div className="hero-in lg:[grid-area:translate]">
            <DataTranslation />
          </div>
          <div className="lg:z-10 lg:-mt-6 lg:-ml-6 lg:[grid-area:graph]">
            <ConnectivityMap />
          </div>
          <div className="lg:[grid-area:bento]">
            <WebsiteBento includes={service.includes} />
          </div>
          <div id="aanpak" className="scroll-mt-24 pt-6 lg:[grid-area:steps]">
            <h2 className="text-3xl font-semibold tracking-tight">Hoe het werkt</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-4">
              {service.steps.map((step, index) => (
                <li key={step.title} className="relative">
                  {index < service.steps.length - 1 ? (
                    <span className="absolute top-4 left-10 hidden h-px w-[calc(100%-1.5rem)] bg-[#dfe8e2] md:block" />
                  ) : null}
                  <span className="relative grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}

function DataTranslation() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = document.getElementById("website-translation")
    if (!node) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      id="website-translation"
      className="rounded-3xl bg-white p-5 shadow-[0_24px_50px_-36px_rgba(20,20,20,0.4)] ring-1 ring-[#e8e8e3] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-brand">VERTALING</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">Ruwe tekst wordt een pagina</h3>
        </div>
        <div className="shrink-0 text-right">
          <svg viewBox="0 0 84 28" className="ml-auto h-7 w-20 text-brand" aria-hidden>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              points="2,22 14,18 26,20 38,11 50,14 62,6 74,8 82,3"
            />
          </svg>
          <p className="mt-1 text-sm font-semibold">4 pagina's</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-mist">RUW</p>
          <p className="mt-2 text-sm leading-6 text-mist">
            Wie we zijn, wat we doen, hoe je ons bereikt.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-[#eee]">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">STRUCTUUR</p>
          <ul className="mt-3 space-y-3">
            {rows.map((row) => (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold">{row.label}</span>
                  <span className="text-mist">{row.text}</span>
                </div>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[#eef3ef]">
                  <span
                    className={cn(
                      "site-reveal block h-full rounded-full bg-brand",
                      shown && "is-shown",
                    )}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function ConnectivityMap() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (hovering || reduce) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % nodes.length)
    }, 2400)
    return () => window.clearInterval(timer)
  }, [hovering])

  return (
    <article
      className="rounded-3xl bg-white p-5 shadow-[0_28px_60px_-32px_rgba(20,20,20,0.45)] ring-1 ring-[#e8e8e3] backdrop-blur-sm sm:p-6"
      onMouseLeave={() => setHovering(false)}
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-brand">VERBINDINGEN</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">Pagina's die naar elkaar wijzen</h3>
      <div className="relative mt-4 aspect-[560/340]">
        <svg viewBox={`0 0 ${view.w} ${view.h}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {links.map(([from, to]) => {
            const start = nodes[from]
            const end = nodes[to]
            const lit = from === active || to === active
            const bend = Math.abs(start.y - end.y) < 24 ? 0 : -28
            const midX = (start.x + end.x) / 2
            const midY = (start.y + end.y) / 2 + bend
            return (
              <path
                key={`${from}-${to}`}
                d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                fill="none"
                stroke={lit ? "#16a34a" : "#d5e4da"}
                strokeWidth={lit ? 2 : 1.4}
                className="flow-dash"
              />
            )
          })}
        </svg>
        {nodes.map((node, index) => (
          <button
            key={node.label}
            type="button"
            aria-pressed={index === active}
            onMouseEnter={() => {
              setHovering(true)
              setActive(index)
            }}
            onFocus={() => {
              setHovering(true)
              setActive(index)
            }}
            onBlur={() => setHovering(false)}
            style={{
              left: `${(node.x / view.w) * 100}%`,
              top: `${(node.y / view.h) * 100}%`,
            }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-semibold shadow-[0_10px_24px_-16px_rgba(20,20,20,0.45)] transition duration-200",
              index === active
                ? "bg-brand text-white"
                : "bg-white text-ink ring-1 ring-[#e8e8e3] hover:ring-brand/40",
            )}
          >
            {node.label}
          </button>
        ))}
      </div>
    </article>
  )
}

function WebsiteBento({ includes }: { includes: Service["includes"] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {includes.map((item) => {
        const Icon = includeIcons[item.title] ?? PanelsTopLeft
        const wide = wideIncludes.has(item.title)
        return (
          <li
            key={item.title}
            className={cn(
              "rounded-2xl bg-white p-4 ring-1 ring-[#e8e8e3] transition duration-200 hover:shadow-[0_16px_40px_-28px_rgba(20,20,20,0.4)] hover:ring-brand/40",
              wide && "sm:col-span-2",
            )}
          >
            <span className="grid size-8 place-items-center rounded-lg bg-[#eef8f1] text-brand">
              <Icon className="size-4" aria-hidden />
            </span>
            <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-mist">{item.text}</p>
          </li>
        )
      })}
    </ul>
  )
}
