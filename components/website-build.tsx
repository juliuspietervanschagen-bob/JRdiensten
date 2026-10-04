"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import Link from "next/link"
import { cn } from "cn"
import {
  House,
  Inbox,
  Mail,
  MonitorSmartphone,
  Palette,
  PanelsTopLeft,
  Moon,
  PenLine,
  Search,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const includeIcons: Record<string, LucideIcon> = {
  "Ontwerp in jullie merk": Palette,
  "Pagina's met een taak": PanelsTopLeft,
  "Telefoon en desktop": MonitorSmartphone,
  "Contact dat aankomt": Inbox,
  "Vindbaar van start": Search,
  "Zelf teksten aanpassen": PenLine,
}

const wideIncludes = new Set(["Ontwerp in jullie merk", "Contact dat aankomt"])

const includeCopy: Record<string, string> = {
  "Ontwerp in jullie merk":
    "Geen standaard template. Lettertype, kleur en indeling komen uit jullie merk, en die lijn blijft staan op elke pagina, van de kop tot de knop.",
  "Pagina's met een taak":
    "Home zegt wie jullie zijn. Diensten laat zien wat iemand kan aanvragen. Over en contact maken de volgende stap zichtbaar, zonder dat de bezoeker hoeft te zoeken.",
  "Telefoon en desktop":
    "De site wordt eerst op een telefoon gezet. Tekst blijft leesbaar, knoppen blijven groot genoeg voor een duim, en foto's snijden niet weg wat iemand moet zien.",
  "Contact dat aankomt":
    "Het formulier vraagt alleen wat jullie nodig hebben om terug te bellen of te mailen. Het bericht komt in de inbox, met naam, onderwerp en telefoonnummer.",
  "Vindbaar van start":
    "Elke pagina krijgt een eigen titel en een tekst die zegt waar die pagina over gaat. De structuur is helder en de pagina laadt snel, zodat een zoekmachine hem kan lezen.",
  "Zelf teksten aanpassen":
    "Na oplevering kun je een zin of een foto zelf vervangen. We laten kort zien waar dat zit, zodat een kleine wijziging niet hoeft te wachten.",
}

const stepCopy: Record<string, string> = {
  Kennismaking:
    "We schrijven op wat het bedrijf doet, wie er langskomt en wat die bezoeker daarna moet doen. Daaruit volgt welke pagina's er komen, en welke niet.",
  Ontwerp:
    "Je ziet de sfeer, de volgorde van de blokken en waar de knop staat, voordat er gebouwd wordt. Opmerkingen verwerken we in die opzet, zodat de bouw niet halverwege van richting wisselt.",
  Bouw:
    "We maken de pagina's, zetten jullie teksten en foto's erin en koppelen het formulier aan de inbox. Daarna klikken we elk scherm na, op een telefoon en op een groot scherm.",
  Live:
    "We zetten de site online en controleren of elke pagina opent en of een testbericht aankomt. Je krijgt de toegang, plus een korte uitleg om zelf een tekst te wijzigen.",
}

const view = { w: 560, h: 420 }
const hub = { x: 280, y: 210 }
const ringRadius = { x: 156, y: 118 }

const orbiters = [
  { label: "Diensten", icon: PanelsTopLeft, angle: -Math.PI / 2, labelPlace: "above" as const, phase: 0.2 },
  { label: "Over", icon: UserRound, angle: 0, labelPlace: "right" as const, phase: 1.2 },
  { label: "Contact", icon: Mail, angle: Math.PI / 2, labelPlace: "below" as const, phase: 2.3 },
  { label: "Inbox", icon: Inbox, angle: Math.PI, labelPlace: "left" as const, phase: 3.4 },
]

const marks = [{ label: "Home", icon: House, labelPlace: "corner" as const }, ...orbiters]

const links = [
  { from: 0, to: 1, amp: 10, phase: 0 },
  { from: 0, to: 2, amp: 10, phase: 0.9 },
  { from: 0, to: 3, amp: 10, phase: 1.8 },
  { from: 0, to: 4, amp: 10, phase: 2.7 },
  { from: 1, to: 2, amp: 14, phase: 0.4 },
  { from: 2, to: 3, amp: 14, phase: 1.3 },
  { from: 3, to: 4, amp: 14, phase: 2.1 },
  { from: 4, to: 1, amp: 14, phase: 3.0 },
]

const tour = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 1],
  [1, 0],
  [0, 4],
  [4, 3],
  [0, 2],
] as const

function positions(sec: number) {
  const points = [{ x: hub.x, y: hub.y }]
  for (const node of orbiters) {
    const breathe = Math.sin(sec * 0.42 + node.phase) * 7
    const angle = node.angle + Math.sin(sec * 0.3 + node.phase) * 0.07
    points.push({
      x: hub.x + Math.cos(angle) * (ringRadius.x + breathe),
      y: hub.y + Math.sin(angle) * (ringRadius.y + breathe * 0.72),
    })
  }
  return points
}

function wrap(value: number, span: number) {
  if (!Number.isFinite(value) || span <= 0) return 0
  return ((value % span) + span) % span
}

function labelShift(place: (typeof marks)[number]["labelPlace"]) {
  if (place === "above") return "translate(-50%, calc(-100% - 20px))"
  if (place === "below") return "translate(-50%, 22px)"
  if (place === "left") return "translate(calc(-100% - 18px), -50%)"
  if (place === "right") return "translate(20px, -50%)"
  return "translate(26px, 24px)"
}

const sparkles = [
  [36, 28, 1.1], [92, 54, 0.7], [150, 22, 1.4], [214, 48, 0.8], [268, 18, 1],
  [330, 40, 0.7], [392, 24, 1.3], [458, 46, 0.8], [516, 30, 1], [48, 96, 0.8],
  [124, 118, 1.2], [196, 88, 0.7], [360, 102, 1], [430, 86, 0.7], [508, 112, 1.3],
  [28, 168, 1], [70, 214, 0.7], [492, 176, 1.1], [534, 230, 0.8], [40, 286, 1.2],
  [108, 332, 0.7], [168, 390, 1], [236, 368, 0.8], [312, 396, 1.3], [388, 372, 0.7],
  [452, 340, 1], [520, 386, 0.8], [64, 378, 1.1], [186, 46, 0.7], [474, 292, 1.2],
  [300, 124, 0.7], [248, 348, 0.8],
].map(([x, y, r], index) => ({
  x,
  y,
  r,
  delay: -((index * 0.41) % 4.6),
  dur: 2.6 + (index % 6) * 0.38,
}))

function flowPath(
  a: { x: number; y: number },
  b: { x: number; y: number },
  phase: number,
  amp: number,
) {
  const steps = 32
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  let d = ""
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const envelope = Math.sin(t * Math.PI)
    const wave = Math.sin(t * Math.PI * 2 - phase) * envelope * amp
    const x = a.x + dx * t + nx * wave
    const y = a.y + dy * t + ny * wave
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

export function WebsiteBuild({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden pt-8 pb-8 sm:pt-12 sm:pb-10">
      <Container>
        <p className="text-sm text-mist">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{service.title}</span>
        </p>
        <p className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
          <span className="h-px w-8 bg-brand" />
          WEBSITE
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
          {service.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-mist">{service.summary}</p>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:[grid-template-areas:'prefs_graph'_'bento_bento'_'steps_steps']">
          <div className="hero-in h-full lg:[grid-area:prefs]">
            <DetailPreferences />
          </div>
          <div className="h-full lg:[grid-area:graph]">
            <ConnectivityMap />
          </div>
          <div className="lg:[grid-area:bento]">
            <WebsiteBento includes={service.includes} />
          </div>
          <div id="aanpak" className="scroll-mt-24 pt-6 lg:[grid-area:steps]">
            <h2 className="text-3xl font-semibold tracking-tight">Hoe het werkt</h2>
            <p className="mt-3 max-w-2xl text-mist">
              Eerst het gesprek, dan de opzet, dan de pagina's, en pas daarna live. In deze vier
              stappen staat wat we daarbij concreet doen.
            </p>
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
                  <p className="mt-2 text-sm leading-6 text-mist">{stepCopy[step.title] ?? step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}

const preferenceCopy = {
  nl: {
    nav: ["Home", "Diensten", "Contact"],
    kicker: "Installatie",
    title: "We komen langs in Reeuwijk",
    body: "Storing, onderhoud of een nieuwe plek. Eén bericht is genoeg.",
    action: "Plan een bezoek",
  },
  en: {
    nav: ["Home", "Services", "Contact"],
    kicker: "Installation",
    title: "We come by in Reeuwijk",
    body: "A fault, maintenance, or a new site. One message is enough.",
    action: "Book a visit",
  },
} as const

function DetailPreferences() {
  const [lang, setLang] = useState<"nl" | "en">("nl")
  const [dark, setDark] = useState(false)
  const copy = preferenceCopy[lang]

  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-[0_24px_50px_-36px_rgba(20,20,20,0.4)] ring-1 ring-[#e8e8e3] sm:p-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-brand">VOORKEUREN</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">Talen, licht en donker</h3>
      <p className="mt-3 text-sm leading-6 text-mist">
        We spreken af welke talen de site voert, en of er een lichte en een donkere stand komt.
        Pagina's, knoppen en het formulier volgen die keuze. De bezoeker wisselt zelf. Het verhaal
        blijft hetzelfde.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="flex rounded-full bg-[#f3f3f1] p-1 ring-1 ring-[#e7e7e2]" role="group" aria-label="Taal">
          {(["nl", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors",
                lang === code ? "bg-white text-ink shadow-[0_4px_12px_-8px_rgba(20,20,20,0.45)]" : "text-mist",
              )}
            >
              {code}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={dark}
          onClick={() => setDark((value) => !value)}
          className="ml-auto flex items-center gap-2 rounded-full bg-[#f3f3f1] py-1 pr-1 pl-3 text-xs font-semibold text-ink ring-1 ring-[#e7e7e2]"
        >
          {dark ? "Donker" : "Licht"}
          <span
            className={cn(
              "grid size-7 place-items-center rounded-full bg-white text-ink shadow-[0_4px_12px_-8px_rgba(20,20,20,0.5)] transition-colors",
              dark && "bg-ink text-white",
            )}
          >
            {dark ? <Moon className="size-3.5" aria-hidden /> : <Sun className="size-3.5" aria-hidden />}
          </span>
        </button>
      </div>

      <div
        className={cn(
          "pref-stage mt-4 flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-2xl p-4 ring-1 transition-colors duration-300 motion-reduce:transition-none sm:p-5",
          dark ? "bg-[#141414] text-[#f6f6f4] ring-white/10" : "bg-[#f6f6f4] text-ink ring-[#e7e7e2]",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-xs font-semibold tracking-[0.16em]", dark ? "text-[#f6f6f4]" : "text-ink")}>JR</p>
          <p className={cn("flex gap-3 text-[11px]", dark ? "text-white/55" : "text-mist")}>
            {copy.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </div>
        <div key={`${lang}-${dark}`} className="pref-in mt-6">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-brand uppercase">{copy.kicker}</p>
          <p className="mt-2 max-w-[16rem] text-lg leading-6 font-semibold tracking-tight">{copy.title}</p>
          <p className={cn("mt-2 max-w-[18rem] text-sm leading-6", dark ? "text-white/60" : "text-mist")}>
            {copy.body}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white">
            {copy.action}
          </span>
        </div>
        <p className={cn("mt-auto pt-4 text-[10px] font-semibold tracking-[0.14em] uppercase", dark ? "text-white/40" : "text-mist")}>
          {lang === "nl" ? "Nederlands" : "English"} · {dark ? "Donker" : "Licht"}
        </p>
      </div>
    </article>
  )
}

function ConnectivityMap() {
  const [arrived, setArrived] = useState<number | null>(null)
  const [destination, setDestination] = useState(1)
  const [pinned, setPinned] = useState<number | null>(null)
  const elapsedRef = useRef(0)
  const clockRef = useRef(0)
  const drawRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const haloRef = useRef<SVGCircleElement>(null)
  const underRefs = useRef<(SVGPathElement | null)[]>([])
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const trailRefs = useRef<(SVGCircleElement | null)[]>([])
  const history = useRef<{ x: number; y: number }[]>([])
  const arrivedRef = useRef<number | null>(null)
  const destinationRef = useRef(1)
  const hopRef = useRef(-1)

  const paint = (sec: number, travel: { from: number; to: number; t: number } | null) => {
    const pts = positions(sec)
    pts.forEach((point, index) => {
      const button = nodeRefs.current[index]
      if (!button) return
      button.style.left = `${(point.x / view.w) * 100}%`
      button.style.top = `${(point.y / view.h) * 100}%`
      const label = labelRefs.current[index]
      if (!label) return
      label.style.transform = labelShift(marks[index].labelPlace)
    })

    links.forEach((link, index) => {
      underRefs.current[index]?.setAttribute(
        "d",
        flowPath(pts[link.from], pts[link.to], sec * 1.05 + link.phase, link.amp),
      )
    })

    const place = (x: number, y: number, visible: boolean) => {
      dotRef.current?.setAttribute("cx", String(x))
      dotRef.current?.setAttribute("cy", String(y))
      haloRef.current?.setAttribute("cx", String(x))
      haloRef.current?.setAttribute("cy", String(y))
      dotRef.current?.setAttribute("opacity", visible ? "1" : "0")
      haloRef.current?.setAttribute("opacity", visible ? "0.5" : "0")
    }

    if (!travel) {
      place(pts[0].x, pts[0].y, true)
      drawRef.current?.setAttribute("opacity", "0")
      glowRef.current?.setAttribute("opacity", "0")
      return pts
    }

    const link = links.findIndex(
      (item) =>
        (item.from === travel.from && item.to === travel.to) ||
        (item.from === travel.to && item.to === travel.from),
    )
    const path = drawRef.current
    const glow = glowRef.current
    if (path && glow && link >= 0) {
      const drawn = underRefs.current[link]?.getAttribute("d") || ""
      path.setAttribute("d", drawn)
      glow.setAttribute("d", drawn)
      const len = path.getTotalLength() || 1
      path.setAttribute("opacity", "1")
      glow.setAttribute("opacity", "1")
      path.style.strokeDasharray = `${len}`
      glow.style.strokeDasharray = `${len}`
      path.style.strokeDashoffset = `${len * (1 - travel.t)}`
      glow.style.strokeDashoffset = `${len * (1 - travel.t)}`
      const at = path.getPointAtLength(len * travel.t)
      place(at.x, at.y, true)
      const hopId = travel.from * 10 + travel.to
      if (hopRef.current !== hopId) {
        hopRef.current = hopId
        history.current = []
      }
      history.current.unshift({ x: at.x, y: at.y })
      if (history.current.length > 5) history.current.length = 5
      history.current.forEach((pt, i) => {
        const circle = trailRefs.current[i]
        if (!circle) return
        circle.setAttribute("cx", String(pt.x))
        circle.setAttribute("cy", String(pt.y))
        circle.setAttribute("opacity", String(Math.max(0, 0.55 - i * 0.07)))
        circle.setAttribute("r", String(Math.max(0.6, 2.8 - i * 0.28)))
      })
    }
    return pts
  }

  useLayoutEffect(() => {
    paint(0, null)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      paint(0, null)
      arrivedRef.current = 0
      setArrived(0)
      setDestination(0)
      return
    }
    if (pinned !== null) {
      paint(clockRef.current, null)
      const point = positions(clockRef.current)[pinned]
      dotRef.current?.setAttribute("cx", String(point.x))
      dotRef.current?.setAttribute("cy", String(point.y))
      haloRef.current?.setAttribute("cx", String(point.x))
      haloRef.current?.setAttribute("cy", String(point.y))
      trailRefs.current.forEach((circle) => circle?.setAttribute("opacity", "0"))
      return
    }

    const hop = 2200
    const hold = 860
    const slot = hop + hold
    const loop = tour.length * slot
    const started = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const sec = clockRef.current + Math.max(0, now - started) / 1000
      const elapsed = wrap(elapsedRef.current + Math.max(0, now - started), loop)
      const index = wrap(Math.floor(elapsed / slot), tour.length)
      const local = elapsed % slot
      const step = tour[index]
      if (!step) {
        frame = window.requestAnimationFrame(tick)
        return
      }
      const [from, to] = step
      const raw = Math.min(1, local / hop)
      const t = raw < 0.5 ? 2 * raw * raw : 1 - (-2 * raw + 2) ** 2 / 2
      paint(sec, { from, to, t })

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
      const delta = Math.max(0, performance.now() - started) / 1000
      clockRef.current += delta
      elapsedRef.current = wrap(elapsedRef.current + Math.max(0, performance.now() - started), loop)
      window.cancelAnimationFrame(frame)
    }
  }, [pinned])

  const lit = pinned ?? arrived
  const readout =
    pinned !== null
      ? marks[pinned].label
      : arrived !== null
        ? marks[arrived].label
        : marks[destination].label
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
        <p className="mt-2 text-sm leading-6 text-white/60">
          Home leidt naar diensten, diensten naar contact, en de inbox vangt wat de bezoeker stuurt.
          Geen pagina staat los.
        </p>
      </div>
      <div className="relative mx-2 mt-4 mb-2 aspect-[560/420] sm:mx-3">
        <div
          className="signal-veil pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(22,163,74,0.22), transparent 58%), radial-gradient(ellipse at 78% 78%, rgba(22,163,74,0.08), transparent 46%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 0.6px, transparent 0.7px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
          }}
        />
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${view.w} ${view.h}`} className="h-full w-full" aria-hidden>
            <defs>
              <filter id="site-signal-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            {sparkles.map((spark) => (
              <g
                key={`${spark.x}-${spark.y}`}
                className="map-sparkle"
                style={{ animationDelay: `${spark.delay}s`, animationDuration: `${spark.dur}s` }}
                transform={`translate(${spark.x} ${spark.y})`}
              >
                <circle r={spark.r * 6} fill="#16a34a" opacity="0.28" />
                <path
                  d="M0 -3.2 L0.7 -0.7 L3.2 0 L0.7 0.7 L0 3.2 L-0.7 0.7 L-3.2 0 L-0.7 -0.7 Z"
                  fill="#e7fff1"
                  transform={`scale(${spark.r * 2.1})`}
                />
              </g>
            ))}
            {links.map((link, index) => (
              <path
                key={`line-${link.from}-${link.to}`}
                ref={(el) => {
                  underRefs.current[index] = el
                }}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.15"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              ref={glowRef}
              fill="none"
              stroke="#16a34a"
              strokeWidth="7"
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
            {Array.from({ length: 8 }, (_, i) => (
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
            <circle ref={dotRef} r="2.5" fill="#f4fff8" opacity="0" />
          </svg>
          {marks.map((mark, index) => {
            const on = lit === index
            const Icon = mark.icon
            const core = index === 0
            return (
              <button
                key={mark.label}
                ref={(el) => {
                  nodeRefs.current[index] = el
                }}
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setPinned(index)}
                onFocus={() => setPinned(index)}
                onBlur={() => setPinned(null)}
                className={cn(
                  "signal-node absolute -translate-x-1/2 -translate-y-1/2",
                  core ? "z-10" : "z-[1]",
                  on ? "text-white" : "text-white/70 hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "node-breathe grid place-items-center rounded-full bg-[#101412] ring-1",
                    core ? "size-11" : "size-8",
                    on
                      ? "text-white ring-brand shadow-[0_0_18px_4px_rgba(22,163,74,0.75)]"
                      : "text-white/80 ring-white/20",
                  )}
                  style={{ animationDelay: `${-index * 1.4}s` }}
                >
                  <Icon className={core ? "size-4" : "size-3.5"} aria-hidden />
                </span>
                <span
                  ref={(el) => {
                    labelRefs.current[index] = el
                  }}
                  className={cn(
                    "pointer-events-none absolute whitespace-nowrap rounded-full bg-[#101412]/90 px-1.5 text-[11px] font-medium tracking-wide",
                    "top-1/2 left-1/2",
                    on ? "text-white" : "text-white/55",
                  )}
                >
                  {mark.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] tracking-[0.14em] text-white/55 sm:px-6">
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
            <p className="mt-1.5 text-sm leading-6 text-mist">{includeCopy[item.title] ?? item.text}</p>
          </li>
        )
      })}
    </ul>
  )
}
