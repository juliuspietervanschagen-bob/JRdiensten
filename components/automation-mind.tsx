"use client"

import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"

const VIEW_W = 640
const VIEW_H = 540
const CX = 320
const CY = 268

const signals = [
  "Een bericht van de website is doorgezet.",
  "Een aanvraag uit de inbox loopt vanzelf door.",
  "Een order uit de webshop staat bij de voorraad.",
  "De status is bijgewerkt. Niemand typte het over.",
]

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

export function AutomationMind({ service }: { service: Service }) {
  const [signal, setSignal] = useState(0)

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
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
                <span className="h-px w-8 bg-brand" />
                AUTOMATISERING
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-mist">{service.summary}</p>
            </div>
            <p className="max-w-md text-sm leading-6 text-mist lg:justify-self-end lg:pb-1">
              {service.audience} Wat hier stroomt, is het werk dat daarna niet meer overgetypt wordt.
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

            <div className="mt-3 grid grid-cols-2 gap-2.5 px-3 pb-4 sm:grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)_minmax(0,11.5rem)] sm:gap-3 sm:px-5 sm:pb-5">
              <div className="relative col-span-2 h-[420px] sm:col-span-1 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:h-auto sm:min-h-[540px]">
                <MatrixBrain onPulse={() => setSignal((current) => (current + 1) % signals.length)} />
              </div>
              <Panel className="sm:col-start-1 sm:row-start-1" title="Signalen" accent="#22d3ee">
                <SignalGraphic />
              </Panel>
              <Panel className="sm:col-start-3 sm:row-start-1" title="Routes" accent="#4ade80">
                <RouteGraphic />
              </Panel>
              <Panel className="sm:col-start-1 sm:row-start-2" title="Volume" accent="#60a5fa">
                <VolumeGraphic />
              </Panel>
              <Panel className="sm:col-start-3 sm:row-start-2" title="Terugkoppeling" accent="#e879f9">
                <FeedbackGraphic />
              </Panel>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3.5 sm:px-7">
              <p className="min-w-0 text-sm text-white/85" aria-live="polite">
                {signals[signal]}
              </p>
              <p className="hidden shrink-0 text-xs tracking-wide text-white/45 sm:block">Vier bronnen, één systeem</p>
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
              <ol className="mt-8 space-y-0">
                {service.steps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid size-8 place-items-center rounded-full bg-white text-xs font-semibold text-brand ring-1 ring-[#d7e8dc]">
                        0{index + 1}
                      </span>
                      {index < service.steps.length - 1 ? <span className="my-1 w-px flex-1 bg-[#d7e8dc]" /> : null}
                    </div>
                    <div className={index < service.steps.length - 1 ? "pb-6" : ""}>
                      <h3 className="pt-1 text-base font-semibold">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-mist">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand">WAT JE KRIJGT</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Het handwerk eruit</h2>
              <ul className="mt-8 divide-y divide-[#e7eee9] border-y border-[#e7eee9]">
                {service.includes.map((item) => (
                  <li key={item.title} className="grid gap-1 py-4 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6 sm:py-5">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm leading-6 text-mist">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function MatrixBrain({ onPulse }: { onPulse: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const onPulseRef = useRef(onPulse)
  onPulseRef.current = onPulse

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
    let lastSignal = 0
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

    function step(now: number) {
      let arrived = false
      for (const mote of streams) {
        mote.t += mote.speed
        if (mote.t >= 1) {
          mote.t = 0
          arrived = true
        }
      }
      for (const mote of field) {
        mote.radius -= mote.speed
        mote.angle += mote.drift
        if (mote.radius < 158) {
          mote.radius = 240 + Math.random() * 40
          mote.angle += 0.35
        }
      }
      if (arrived && now - lastSignal > 1100) {
        lastSignal = now
        onPulseRef.current()
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
      <div className="mt-2 flex min-h-0 flex-1 items-center">{children}</div>
    </article>
  )
}

function SignalGraphic() {
  return (
    <svg viewBox="0 0 160 96" className="h-full w-full" aria-hidden>
      <path d="M8 78 H152 M8 78 V14" stroke="#1e293b" strokeWidth="1" />
      <path className="matrix-draw" d="M12 62 L30 56 L46 66 L64 44 L82 50 L102 32 L122 28 L148 16" fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" />
      <path className="matrix-draw" d="M12 70 L32 64 L50 58 L70 60 L90 42 L112 46 L130 30 L148 26" fill="none" stroke="#facc15" strokeWidth="1.6" strokeLinecap="round" style={{ animationDelay: "0.25s" }} />
      <path className="matrix-draw" d="M12 74 L34 68 L52 72 L74 54 L96 58 L116 40 L134 44 L148 34" fill="none" stroke="#fb7185" strokeWidth="1.6" strokeLinecap="round" style={{ animationDelay: "0.45s" }} />
      <g className="fill-current text-[8px]" fill="#94a3b8">
        <circle cx="14" cy="90" r="2" fill="#22d3ee" />
        <text x="20" y="93">Instroom</text>
        <circle cx="68" cy="90" r="2" fill="#facc15" />
        <text x="74" y="93">Kosten</text>
        <circle cx="112" cy="90" r="2" fill="#fb7185" />
        <text x="118" y="93">Tijd</text>
      </g>
    </svg>
  )
}

function RouteGraphic() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden>
      <ellipse cx="34" cy="36" rx="9" ry="16" fill="#12324e" />
      <ellipse cx="62" cy="40" rx="7" ry="15" fill="#12324e" />
      <ellipse cx="96" cy="34" rx="16" ry="11" fill="#12324e" />
      <path className="matrix-draw" d="M40 32 C 58 18, 78 20, 96 30" fill="none" stroke="#22d3ee" strokeWidth="1.4" />
      <path className="matrix-draw" d="M36 46 C 58 58, 80 50, 108 38" fill="none" stroke="#fb923c" strokeWidth="1.4" style={{ animationDelay: "0.3s" }} />
      <circle cx="40" cy="32" r="2" fill="#22d3ee" />
      <circle cx="96" cy="30" r="2" fill="#facc15" />
      <circle cx="108" cy="38" r="2" fill="#fb923c" />
      <path d="M18 102 A 22 22 0 1 1 62 102" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 102 A 22 22 0 0 1 52 84" fill="none" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 102 L40 88" stroke="#e8eef8" strokeWidth="1.4" strokeLinecap="round" />
      {[0, 1, 2, 3].map((bar) => (
        <rect key={bar} className="matrix-bar" x={78 + bar * 16} y={96 - bar * 8} width="8" height={14 + bar * 8} rx="1.5" fill={palette[bar + 2]} style={{ animationDelay: `${bar * 0.08}s` }} />
      ))}
    </svg>
  )
}

function VolumeGraphic() {
  const heights = [28, 36, 32, 48, 44, 62, 70, 84]
  return (
    <svg viewBox="0 0 160 96" className="h-full w-full" aria-hidden>
      {heights.map((height, index) => (
        <rect
          key={height}
          className="matrix-bar"
          x={10 + index * 18}
          y={88 - height}
          width="12"
          height={height}
          rx="1.5"
          fill={index > 5 ? "#7dd3fc" : "#3b82f6"}
          style={{ animationDelay: `${index * 0.06}s` }}
        />
      ))}
    </svg>
  )
}

function FeedbackGraphic() {
  return (
    <svg viewBox="0 0 160 96" className="h-full w-full" aria-hidden>
      <path d="M8 80 H150" stroke="#1e293b" strokeWidth="1" />
      <path className="matrix-draw" d="M10 68 L28 64 L44 70 L62 52 L80 58 L98 36 L116 42 L134 22 L148 14" fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" />
      <path className="matrix-draw" d="M10 76 L30 72 L48 66 L66 68 L84 50 L104 54 L122 34 L148 26" fill="none" stroke="#f9a8d4" strokeWidth="1.6" strokeLinecap="round" style={{ animationDelay: "0.2s" }} />
      <path d="M140 14 L150 12 L146 22" fill="none" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
