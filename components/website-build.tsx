"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { cn } from "cn"
import { Inbox, MonitorSmartphone, Palette, PanelsTopLeft, PenLine, Search, type LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
  { label: "Home", x: 72, y: 168, side: "right" as const },
  { label: "Diensten", x: 248, y: 64, side: "right" as const },
  { label: "Over", x: 332, y: 168, side: "left" as const },
  { label: "Contact", x: 214, y: 276, side: "right" as const },
  { label: "Inbox", x: 468, y: 276, side: "left" as const },
]

const links = [
  [0, 1],
  [0, 2],
  [0, 3],
  [3, 4],
] as const

const view = { w: 560, h: 340 }

const tour = [
  [0, 1],
  [1, 0],
  [0, 2],
  [2, 0],
  [0, 3],
  [3, 4],
  [4, 3],
  [3, 0],
] as const

function curve(from: number, to: number) {
  const start = nodes[from]
  const end = nodes[to]
  const bend = Math.abs(start.y - end.y) < 24 ? 0 : -36
  return {
    start,
    end,
    cx: (start.x + end.x) / 2,
    cy: (start.y + end.y) / 2 + bend,
  }
}

function pathD(from: number, to: number) {
  const { start, end, cx, cy } = curve(from, to)
  return `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`
}

function pointOn(from: number, to: number, t: number) {
  const { start, end, cx, cy } = curve(from, to)
  const u = 1 - t
  return {
    x: u * u * start.x + 2 * u * t * cx + t * t * end.x,
    y: u * u * start.y + 2 * u * t * cy + t * t * end.y,
  }
}

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

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:[grid-template-areas:'translate_graph'_'bento_bento'_'steps_steps']">
          <div className="hero-in h-full lg:[grid-area:translate]">
            <DataTranslation />
          </div>
          <div className="h-full lg:[grid-area:graph]">
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
      className="h-full rounded-3xl bg-white p-5 shadow-[0_24px_50px_-36px_rgba(20,20,20,0.4)] ring-1 ring-[#e8e8e3] sm:p-6"
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
  const [arrived, setArrived] = useState<number | null>(null)
  const [destination, setDestination] = useState(1)
  const [pinned, setPinned] = useState<number | null>(null)
  const elapsedRef = useRef(0)
  const drawRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const haloRef = useRef<SVGCircleElement>(null)
  const trailRefs = useRef<(SVGCircleElement | null)[]>([])
  const history = useRef<{ x: number; y: number }[]>([])
  const arrivedRef = useRef<number | null>(null)
  const destinationRef = useRef(1)
  const hopRef = useRef(-1)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const home = nodes[0]
    const place = (x: number, y: number, visible: boolean) => {
      dotRef.current?.setAttribute("cx", String(x))
      dotRef.current?.setAttribute("cy", String(y))
      haloRef.current?.setAttribute("cx", String(x))
      haloRef.current?.setAttribute("cy", String(y))
      dotRef.current?.setAttribute("opacity", visible ? "1" : "0")
      haloRef.current?.setAttribute("opacity", visible ? "0.45" : "0")
    }
    if (reduce) {
      place(home.x, home.y, true)
      arrivedRef.current = 0
      setArrived(0)
      setDestination(0)
      return
    }
    if (pinned !== null) {
      const node = nodes[pinned]
      place(node.x, node.y, true)
      trailRefs.current.forEach((circle) => circle?.setAttribute("opacity", "0"))
      if (drawRef.current) drawRef.current.setAttribute("opacity", "0")
      if (glowRef.current) glowRef.current.setAttribute("opacity", "0")
      return
    }

    const hop = 2200
    const hold = 860
    const slot = hop + hold
    const loop = tour.length * slot
    const started = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = (elapsedRef.current + now - started) % loop
      const index = Math.floor(elapsed / slot) % tour.length
      const local = elapsed % slot
      const [from, to] = tour[index]
      const raw = Math.min(1, local / hop)
      const t = raw < 0.5 ? 2 * raw * raw : 1 - (-2 * raw + 2) ** 2 / 2
      const point = pointOn(from, to, t)
      place(point.x, point.y, true)
      if (hopRef.current !== index) {
        hopRef.current = index
        history.current = []
      }

      history.current.unshift(point)
      if (history.current.length > 7) history.current.length = 7
      history.current.forEach((pt, i) => {
        const circle = trailRefs.current[i]
        if (!circle) return
        circle.setAttribute("cx", String(pt.x))
        circle.setAttribute("cy", String(pt.y))
        circle.setAttribute("opacity", String(Math.max(0, 0.5 - i * 0.07)))
        circle.setAttribute("r", String(Math.max(0.6, 2.6 - i * 0.28)))
      })

      const d = pathD(from, to)
      for (const path of [drawRef.current, glowRef.current]) {
        if (!path) continue
        if (path.getAttribute("d") !== d) path.setAttribute("d", d)
        const len = path.getTotalLength() || 1
        path.setAttribute("opacity", "1")
        path.style.strokeDasharray = `${len}`
        path.style.strokeDashoffset = `${len * (1 - t)}`
      }

      const lit = t > 0.9 ? to : null
      if (lit !== arrivedRef.current) {
        arrivedRef.current = lit
        setArrived(lit)
      }
      if (to !== destinationRef.current) {
        destinationRef.current = to
        setDestination(to)
      }
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => {
      elapsedRef.current = (elapsedRef.current + performance.now() - started) % loop
      window.cancelAnimationFrame(frame)
    }
  }, [pinned])

  const lit = pinned ?? arrived
  const readout =
    pinned !== null
      ? nodes[pinned].label
      : arrived !== null
        ? nodes[arrived].label
        : nodes[destination].label
  const readoutState = pinned !== null || arrived !== null ? "Verlicht" : "Onderweg"

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-3xl bg-[#101412] text-white ring-1 ring-white/10"
      onMouseLeave={() => setPinned(null)}
    >
      <div className="px-5 pt-5 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand">VERBINDINGEN</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Pagina's die naar elkaar wijzen
        </h3>
      </div>
      <div className="relative mx-3 mt-4 mb-2 aspect-[560/340] sm:mx-4">
        <div
          className="signal-veil pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 28% 38%, rgba(22,163,74,0.2), transparent 58%), radial-gradient(ellipse at 78% 78%, rgba(22,163,74,0.1), transparent 46%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 0.6px, transparent 0.7px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0">
          <svg
            viewBox={`0 0 ${view.w} ${view.h}`}
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden
          >
            <defs>
              <filter id="site-signal-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            {links.map(([from, to]) => {
              const hot = pinned !== null && (pinned === from || pinned === to)
              return (
                <path
                  key={`${from}-${to}`}
                  d={pathD(from, to)}
                  fill="none"
                  stroke={hot ? "rgba(22,163,74,0.85)" : "rgba(255,255,255,0.16)"}
                  strokeWidth={hot ? 1.6 : 1.15}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
            <path
              ref={glowRef}
              fill="none"
              stroke="#16a34a"
              strokeWidth="8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              filter="url(#site-signal-glow)"
              opacity="0"
            />
            <path
              ref={drawRef}
              fill="none"
              stroke="#e9fff2"
              strokeWidth="1.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity="0"
            />
            {Array.from({ length: 7 }, (_, i) => (
              <circle
                key={i}
                ref={(el) => {
                  trailRefs.current[i] = el
                }}
                r="2"
                fill="#7dffb0"
                opacity="0"
              />
            ))}
            <circle ref={haloRef} r="11" fill="#16a34a" opacity="0" filter="url(#site-signal-glow)" />
            <circle ref={dotRef} r="2.6" fill="#f4fff8" opacity="0" />
          </svg>
          {nodes.map((node, index) => {
            const on = lit === index
            return (
              <button
                key={node.label}
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setPinned(index)}
                onFocus={() => setPinned(index)}
                onBlur={() => setPinned(null)}
                style={{
                  left: `${(node.x / view.w) * 100}%`,
                  top: `${(node.y / view.h) * 100}%`,
                }}
                className={cn(
                  "signal-node absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  on ? "text-white" : "text-white/55 hover:text-white/80",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                    on ? "bg-white shadow-[0_0_16px_5px_rgba(22,163,74,0.9)]" : "bg-white/30",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#101412]/85 px-2 py-0.5 text-xs font-medium",
                    node.side === "left" ? "right-5" : "left-5",
                  )}
                >
                  {node.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] tracking-[0.14em] text-white/55 sm:px-6">
        <span>ROUTE</span>
        <span className="text-white/80">
          {readoutState}
          <span className="px-1.5 text-white/30">·</span>
          {readout}
        </span>
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
