"use client"

import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"

const VIEW_W = 640
const VIEW_H = 540
const CX = 320
const CY = 268

const sources = [
  {
    source: "Website",
    color: "#facc15",
    signal: "Aanvraag",
    capability: "Doorzenden naar de inbox",
    routeTo: "Inbox",
    carries: "Aanvraag",
  },
  {
    source: "Inbox",
    color: "#22d3ee",
    signal: "Bericht",
    capability: "Vanzelf laten doorlopen",
    routeTo: "Status",
    carries: "Bericht",
  },
  {
    source: "Webshop",
    color: "#4ade80",
    signal: "Order",
    capability: "Neerzetten bij de voorraad",
    routeTo: "Voorraad",
    carries: "Order",
  },
  {
    source: "Voorraad",
    color: "#e879f9",
    signal: "Mutatie",
    capability: "Status bijwerken",
    routeTo: "Shop",
    carries: "Stand",
  },
] as const

const featureCapabilities = [
  { key: "Het handwerk in beeld", name: "Handwerk", value: 3, unit: "plekken", detail: "Kopieert, mailt, status", color: "#38bdf8" },
  { key: "Koppeling met wat je hebt", name: "Koppeling", value: 4, unit: "systemen", detail: "Site, shop, mail, sheet", color: "#60a5fa" },
  { key: "De volgende stap vanzelf", name: "Doorloop", value: 3, unit: "soorten", detail: "Order, aanvraag, status", color: "#818cf8" },
  { key: "Zicht op wat er liep", name: "Spoor", value: 2, unit: "uitkomsten", detail: "Automatisch of een mens", color: "#7dd3fc" },
  { key: "Getest met jouw voorbeelden", name: "Test", value: 1, unit: "voorbeeld", detail: "Echte aanvraag of order", color: "#93c5fd" },
  { key: "Uitleg voor het team", name: "Uitleg", value: 1, unit: "handleiding", detail: "Kort, voor het team", color: "#bfdbfe" },
] as const

const feedbackCapabilities = [
  { name: "Status", mode: "Automatisch", detail: "Bijgewerkt, niemand typt" },
  { name: "Spoor", mode: "Automatisch", detail: "Elke stap blijft zichtbaar" },
  { name: "Uitzondering", mode: "Een mens", detail: "Alleen als het moet" },
  { name: "Team", mode: "Weet het", detail: "Wanneer ingrijpen" },
] as const

const palette = ["#22d3ee", "#4ade80", "#facc15", "#fb7185", "#c084fc", "#60a5fa", "#f9a8d4"]

const flows = [
  { label: "Website", deg: 206, color: "#facc15" },
  { label: "Inbox", deg: 150, color: "#22d3ee" },
  { label: "Webshop", deg: -34, color: "#4ade80" },
  { label: "Voorraad", deg: 30, color: "#e879f9" },
].map((source) => {
  const node = polar(source.deg, 168)
  const start = polar(source.deg, 232)
  const end = polar(source.deg, 92)
  const midX = (node.x + end.x) / 2
  const midY = (node.y + end.y) / 2
  const rad = (source.deg * Math.PI) / 180
  const bendX = midX - Math.sin(rad) * 14
  const bendY = midY + Math.cos(rad) * 14
  return {
    ...source,
    node,
    at: polar(source.deg, 226),
    d: `M ${r1(start.x)} ${r1(start.y)} L ${r1(node.x)} ${r1(node.y)} Q ${r1(bendX)} ${r1(bendY)} ${r1(end.x)} ${r1(end.y)}`,
  }
})

const ring = [
  { from: -90, to: -30, color: "#4ade80" },
  { from: -30, to: 30, color: "#22d3ee" },
  { from: 30, to: 90, color: "#60a5fa" },
  { from: 90, to: 150, color: "#c084fc" },
  { from: 150, to: 210, color: "#fb7185" },
  { from: 210, to: 270, color: "#facc15" },
].map((part) => ({ ...part, d: arc(CX, CY, 168, part.from, part.to) }))

const stars = Array.from({ length: 56 }, (_, index) => {
  const x = 18 + ((index * 137) % 604)
  const y = 16 + ((index * 89) % 508)
  const dx = x - CX
  const dy = y - CY
  if (dx * dx + dy * dy < 176 * 176) return null
  return {
    x,
    y,
    r: index % 6 === 0 ? 1.7 : 1,
    color: palette[index % palette.length],
    delay: `${(index % 9) * -0.42}s`,
  }
}).filter((star) => star !== null)

type StreamMote = { path: number; t: number; speed: number; offset: number; size: number }
type FieldMote = { angle: number; radius: number; speed: number; drift: number; size: number; color: number }

const fieldColors = ["#22d3ee", "#4ade80", "#facc15", "#fb7185", "#c084fc", "#60a5fa", "#f9a8d4", "#e879f9"].map(hexRgb)

const stepDetail: Record<string, string> = {
  Proces: "We brengen in kaart waar gegevens worden gekopieerd, gemaild of waar een status wordt bijgewerkt.",
  Voorstel: "Je ziet welke koppelingen automatisch lopen en welke prijs daarvoor vaststaat.",
  Bouw: "We testen de koppeling met een echte aanvraag of order uit je proces.",
  Overdracht: "Je team weet welke stappen automatisch lopen, en wanneer iemand moet ingrijpen.",
}

const replacements = [
  {
    title: "Aanvraag",
    manual: "Handmatig wordt het formulier overgenomen in de mail.",
    auto: "Automatisch wordt de aanvraag doorgezet naar de inbox.",
  },
  {
    title: "Order",
    manual: "Handmatig wordt de bestelling overgenomen in de voorraad.",
    auto: "Automatisch komt de order bij de voorraad binnen.",
  },
  {
    title: "Voorraad",
    manual: "Handmatig wordt de stand bijgewerkt.",
    auto: "Automatisch schrijft een mutatie de stand terug naar de shop.",
  },
  {
    title: "Status",
    manual: "Handmatig wordt de status overgenomen.",
    auto: "Automatisch wordt de status bijgewerkt, zonder opnieuw typen.",
  },
]

const outline = "pakket-lift rounded-2xl border-2 border-brand bg-white"

export function AutomationMind({ service }: { service: Service }) {
  return (
    <>
      <section className="overflow-hidden pt-8 pb-4 sm:pt-12">
        <Container>
          <p className="text-sm text-mist">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink">{service.title}</span>
          </p>
          <div className="mt-8 max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              AUTOMATISERING
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
              {service.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-mist">
              {service.summary} {service.audience} Wat hier stroomt, is het werk dat daarna niet meer overgetypt wordt.
            </p>
          </div>

          <div
            className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-[#070b16] ring-1 ring-white/10"
            aria-label="Gekleurde deeltjes stromen vanuit website, webshop, inbox en voorraad naar één systeem"
          >
            <div className="h-px bg-[linear-gradient(90deg,#22d3ee,#4ade80,#facc15,#fb7185,#c084fc,#60a5fa)]" />
            <div className="flex items-center justify-between px-5 pt-4 sm:px-7 sm:pt-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/80">HET SYSTEEM</p>
              <p className="flex items-center gap-2 text-xs text-white/60">
                <span className="mind-live size-1.5 rounded-full bg-[#22d3ee]" />
                Loopt
              </p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5 px-3 pb-4 sm:grid-cols-[minmax(0,16.5rem)_minmax(0,1fr)_minmax(0,16.5rem)] sm:gap-3 sm:px-5 sm:pb-5">
              <div className="relative h-[420px] sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:h-auto sm:min-h-[540px]">
                <MatrixBrain />
              </div>
              <Panel className="sm:col-start-1 sm:row-start-1" title="Signalen" accent="#22d3ee">
                <SignalGraphic />
              </Panel>
              <Panel className="sm:col-start-3 sm:row-start-1" title="Routes" accent="#4ade80">
                <RouteGraphic />
              </Panel>
              <Panel className="sm:col-start-1 sm:row-start-2" title="Volume" accent="#60a5fa">
                <VolumeGraphic includes={service.includes} />
              </Panel>
              <Panel className="sm:col-start-3 sm:row-start-2" title="Terugkoppeling" accent="#e879f9">
                <FeedbackGraphic />
              </Panel>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <BrandButton href={`/contact?dienst=${service.slug}`}>
              Start vandaag
              <ArrowRight className="size-4" />
            </BrandButton>
            <BrandButton href="#aanpak" variant="outline">
              Bekijk de aanpak
            </BrandButton>
          </div>
        </Container>
      </section>

      <section id="aanpak" className="scroll-mt-24 pt-12 pb-8 sm:pt-16 sm:pb-10">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand">AANPAK</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Van proces tot overdracht</h2>
              <ol className="mt-8 space-y-3">
                {service.steps.map((step, index) => (
                  <li key={step.title} className={`${outline} px-4 py-4`}>
                    <div className="flex items-start gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-brand text-xs font-semibold text-brand">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="pt-1 text-base font-semibold">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-mist">{step.text}</p>
                        {stepDetail[step.title] ? (
                          <p className="mt-2 text-sm leading-6 text-ink">{stepDetail[step.title]}</p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand">WAT JE KRIJGT</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Het handwerk eruit</h2>
              <ul className="mt-8 space-y-3">
                {service.includes.map((item) => (
                  <li key={item.title} className={`${outline} grid gap-1 px-4 py-4 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6`}>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm leading-6 text-mist">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand">HET WERK</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Van handmatig naar automatisch</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {replacements.map((item) => (
                <li key={item.title} className={`${outline} p-5`}>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mist">{item.manual}</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{item.auto}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  )
}

function MatrixBrain() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const holder = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    holder.setAttribute("viewBox", `0 0 ${VIEW_W} ${VIEW_H}`)
    holder.style.position = "absolute"
    holder.style.width = "0"
    holder.style.height = "0"
    const pathNodes = flows.map((flow) => {
      const node = document.createElementNS("http://www.w3.org/2000/svg", "path")
      node.setAttribute("d", flow.d)
      holder.appendChild(node)
      return node
    })
    stage.appendChild(holder)
    const lengths = pathNodes.map((node) => node.getTotalLength())
    const rgb = flows.map((flow) => hexRgb(flow.color))

    const streamCount = 16
    const streams: StreamMote[] = flows.flatMap((_, path) =>
      Array.from({ length: streamCount }, (_, index) => {
        const lane = index - (streamCount - 1) / 2
        return {
          path,
          t: reduce ? (index + 0.45) / streamCount : Math.random(),
          speed: 0.00145 + ((path * 3 + index) % 7) * 0.0002,
          offset: lane * 6.4,
          size: 1.05 + (index % 4) * 0.42,
        }
      }),
    )
    const field: FieldMote[] = Array.from({ length: 48 }, (_, index) => ({
      angle: reduce ? (index / 48) * Math.PI * 2 : Math.random() * Math.PI * 2,
      radius: 176 + (index % 8) * 14 + (reduce ? 0 : Math.random() * 22),
      speed: 0.22 + (index % 5) * 0.07,
      drift: ((index % 2 === 0 ? 1 : -1) * (0.0016 + (index % 4) * 0.0005)),
      size: 0.7 + (index % 3) * 0.38,
      color: index % fieldColors.length,
    }))

    let frame = 0
    const context = canvas.getContext("2d")
    if (!context) return

    function fit() {
      const width = stage.clientWidth
      const height = stage.clientHeight
      const scale = Math.min(width / VIEW_W, height / VIEW_H)
      const ox = (width - VIEW_W * scale) / 2
      const oy = (height - VIEW_H * scale) / 2
      flows.forEach((flow, index) => {
        const label = labelRefs.current[index]
        if (!label) return
        label.style.left = `${ox + flow.at.x * scale}px`
        label.style.top = `${oy + flow.at.y * scale}px`
      })
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      return { scale, ox, oy, width, height }
    }

    let box = fit()

    function glow(x: number, y: number, radius: number, r: number, g: number, b: number, alpha: number) {
      const paint = context.createRadialGradient(x, y, 0, x, y, radius)
      paint.addColorStop(0, `rgba(255,255,255,${alpha})`)
      paint.addColorStop(0.18, `rgba(${r},${g},${b},${alpha * 0.85})`)
      paint.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.22})`)
      paint.addColorStop(1, `rgba(${r},${g},${b},0)`)
      context.fillStyle = paint
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    function streamPoint(path: number, t: number, offset: number) {
      const node = pathNodes[path]
      const length = lengths[path]
      const clamped = Math.min(0.992, Math.max(0, t))
      const point = node.getPointAtLength(clamped * length)
      const ahead = node.getPointAtLength(Math.min(0.992, clamped + 0.025) * length)
      const dx = ahead.x - point.x
      const dy = ahead.y - point.y
      const mag = Math.hypot(dx, dy) || 1
      const gather = t > 0.84 ? (1 - t) / 0.16 : 1
      return {
        x: point.x + (-dy / mag) * offset * gather,
        y: point.y + (dx / mag) * offset * gather,
      }
    }

    function draw() {
      context.clearRect(0, 0, box.width, box.height)
      const { scale, ox, oy } = box
      const toX = (x: number) => ox + x * scale
      const toY = (y: number) => oy + y * scale
      context.globalCompositeOperation = "lighter"

      for (const mote of field) {
        const { r, g, b } = fieldColors[mote.color]
        const x = toX(CX + Math.cos(mote.angle) * mote.radius)
        const y = toY(CY + Math.sin(mote.angle) * mote.radius)
        glow(x, y, mote.size * 7.5 * scale, r, g, b, 0.72)
      }

      for (const mote of streams) {
        const { r, g, b } = rgb[mote.path]
        const point = streamPoint(mote.path, mote.t, mote.offset)
        glow(toX(point.x), toY(point.y), mote.size * 8.5 * scale, r, g, b, 0.9)
        if (mote.t > 0.05) {
          const tail = streamPoint(mote.path, mote.t - 0.045, mote.offset * 0.92)
          glow(toX(tail.x), toY(tail.y), mote.size * 5.2 * scale, r, g, b, 0.35)
        }
      }

      context.globalCompositeOperation = "source-over"
    }

    function step() {
      for (const mote of streams) {
        mote.t += mote.speed
        if (mote.t >= 1) mote.t = 0
      }
      for (const mote of field) {
        mote.radius -= mote.speed
        mote.angle += mote.drift
        if (mote.radius < 158) {
          mote.radius = 240 + Math.random() * 40
          mote.angle += 0.35
        }
      }
      draw()
      frame = window.requestAnimationFrame(step)
    }

    draw()
    if (!reduce) frame = window.requestAnimationFrame(step)

    const observer = new ResizeObserver(() => {
      box = fit()
      draw()
    })
    observer.observe(stage)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      holder.remove()
    }
  }, [])

  return (
    <div ref={stageRef} className="absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {stars.map((star) => (
          <circle
            key={`${star.x}-${star.y}`}
            className="matrix-star"
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={star.color}
            style={{ animationDelay: star.delay }}
          />
        ))}
        <ellipse cx={CX} cy={CY} rx="168" ry="148" fill="url(#mindGlow)" />
        <image
          href="/automation/brain.webp"
          x={CX - 168}
          y={CY - 126}
          width="336"
          height="252"
          preserveAspectRatio="xMidYMid meet"
        />
        <g fill="none" strokeLinecap="round">
          {ring.map((part) => (
            <path key={part.color} d={part.d} stroke={part.color} strokeWidth="2.4" />
          ))}
        </g>
        {flows.map((flow) => (
          <g key={flow.label}>
            <circle cx={flow.node.x} cy={flow.node.y} r="11" fill={flow.color} opacity="0.22" />
            <circle cx={flow.node.x} cy={flow.node.y} r="5.5" fill={flow.color} />
          </g>
        ))}
        <defs>
          <radialGradient id="mindGlow" cx="50%" cy="46%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" />
            <stop offset="42%" stopColor="#e879f9" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#070b16" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      {flows.map((flow, index) => (
        <div
          key={flow.label}
          ref={(node) => {
            labelRefs.current[index] = node
          }}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-[#0c1424]/90 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-white"
          style={{
            left: `${(flow.at.x / VIEW_W) * 100}%`,
            top: `${(flow.at.y / VIEW_H) * 100}%`,
            boxShadow: `0 0 0 1px ${flow.color}88`,
          }}
        >
          <span className="size-1.5 rounded-full" style={{ background: flow.color }} />
          {flow.label}
        </div>
      ))}
    </div>
  )
}

function Panel({
  title,
  accent,
  className,
  children,
}: {
  title: string
  accent: string
  className?: string
  children: ReactNode
}) {
  return (
    <article className={`flex min-h-[148px] flex-col rounded-2xl bg-[#0d1526] p-3 ring-1 ring-white/10 ${className ?? ""}`}>
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: accent }}>
        {title}
      </p>
      <div className="mt-2 flex min-h-0 w-full flex-1 flex-col">{children}</div>
    </article>
  )
}

function StatHead({ value, unit }: { value: number; unit: string }) {
  return (
    <p className="text-white">
      <span className="text-xl font-semibold tracking-tight tabular-nums">{value}</span>
      <span className="ml-1.5 text-[10px] font-medium tracking-[0.14em] text-white/50 uppercase">{unit}</span>
    </p>
  )
}

function SignalGraphic() {
  return (
    <div className="flex w-full flex-col">
      <StatHead value={sources.length} unit="bronnen" />
      <ul className="mt-2.5 space-y-2">
        {sources.map((source) => (
          <li key={source.source} className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
            <span className="mt-1 size-1.5 rounded-full" style={{ background: source.color }} />
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-medium text-white">{source.source}</span>
              <span className="text-[10px] text-white/45">{source.signal}</span>
            </span>
            <span className="col-start-2 text-[10px] leading-4 text-white/60">{source.capability}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RouteGraphic() {
  return (
    <div className="flex w-full flex-col">
      <StatHead value={sources.length} unit="routes" />
      <p className="mt-1 text-[10px] leading-4 text-white/55">Elke bron heeft één route, zonder overtypen.</p>
      <ul className="mt-2.5 space-y-2">
        {sources.map((source) => (
          <li key={source.source}>
            <span className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className="font-medium text-white">
                {source.source}
                <span className="px-1 text-white/35">→</span>
                {source.routeTo}
              </span>
              <span className="text-[10px] text-white/45">{source.carries}</span>
            </span>
            <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-full rounded-full" style={{ background: source.color }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function VolumeGraphic({ includes }: { includes: { title: string }[] }) {
  const items = featureCapabilities.filter((item) => includes.some((include) => include.title === item.key))
  const max = Math.max(1, ...items.map((item) => item.value))
  return (
    <div className="flex w-full flex-col">
      <StatHead value={items.length} unit="onderdelen" />
      <ul className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-medium text-white">{item.name}</span>
              <span className="text-[10px] tabular-nums text-white/55">
                {item.value} {item.unit}
              </span>
            </span>
            <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/10">
              <span
                className="matrix-bar block h-full rounded-full"
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: item.color,
                  transformOrigin: "left center",
                }}
              />
            </span>
            <span className="mt-0.5 block text-[10px] leading-4 text-white/45">{item.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeedbackGraphic() {
  const automatic = feedbackCapabilities.filter((item) => item.mode === "Automatisch").length
  return (
    <div className="flex w-full flex-col">
      <StatHead value={feedbackCapabilities.length} unit="antwoorden" />
      <p className="mt-1 text-[10px] leading-4 text-white/55">
        {automatic} automatisch, {feedbackCapabilities.length - automatic} met een mens.
      </p>
      <ul className="mt-2.5 space-y-2">
        {feedbackCapabilities.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-[11px] font-medium text-white">{item.name}</span>
              <span className="block text-[10px] leading-4 text-white/45">{item.detail}</span>
            </span>
            <span className="shrink-0 text-[10px] text-[#f0abfc]">{item.mode}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function polar(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

function r1(value: number) {
  return Math.round(value * 10) / 10
}

function arc(cx: number, cy: number, radius: number, start: number, end: number) {
  const a0 = (start * Math.PI) / 180
  const a1 = (end * Math.PI) / 180
  const x0 = cx + radius * Math.cos(a0)
  const y0 = cy + radius * Math.sin(a0)
  const x1 = cx + radius * Math.cos(a1)
  const y1 = cy + radius * Math.sin(a1)
  const large = end - start > 180 ? 1 : 0
  return `M ${r1(x0)} ${r1(y0)} A ${radius} ${radius} 0 ${large} 1 ${r1(x1)} ${r1(y1)}`
}

function hexRgb(hex: string) {
  const value = parseInt(hex.slice(1), 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}
