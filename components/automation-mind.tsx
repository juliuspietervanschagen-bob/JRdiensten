"use client"

import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const VIEW_W = 960
const VIEW_H = 560
const BRAIN = { x: 480, y: 286 }

const sources = [
  { label: "Website", x: 118, y: 148 },
  { label: "Inbox", x: 118, y: 412 },
  { label: "Webshop", x: 842, y: 148 },
  { label: "Voorraad", x: 842, y: 412 },
]

const paths = [
  "M168 148 C 270 132, 340 168, 392 228",
  "M168 412 C 270 428, 340 392, 394 332",
  "M792 148 C 690 132, 620 168, 568 228",
  "M792 412 C 690 428, 620 392, 566 332",
]

const signals = [
  "Een bericht van de website is doorgezet.",
  "Een aanvraag uit de inbox loopt vanzelf door.",
  "Een order uit de webshop staat bij de voorraad.",
  "De status is bijgewerkt. Niemand typte het over.",
]

type FieldDot = { x: number; y: number; seed: number }
type PathDot = { path: number; t: number; speed: number }

export function AutomationMind({ service }: { service: Service }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [signal, setSignal] = useState(0)
  const signalRef = useRef(0)

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
    const pathNodes = paths.map((d) => {
      const node = document.createElementNS("http://www.w3.org/2000/svg", "path")
      node.setAttribute("d", d)
      holder.appendChild(node)
      return node
    })
    stage.appendChild(holder)
    const lengths = pathNodes.map((node) => node.getTotalLength())

    const field: FieldDot[] = Array.from({ length: 46 }, (_, index) => spawnField(index))
    const riders: PathDot[] = Array.from({ length: 16 }, (_, index) => ({
      path: index % paths.length,
      t: reduce ? (index % 4) * 0.22 + 0.12 : Math.random(),
      speed: 0.0016 + (index % 5) * 0.00035,
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
      sources.forEach((source, index) => {
        const label = labelRefs.current[index]
        if (!label) return
        label.style.left = `${ox + source.x * scale}px`
        label.style.top = `${oy + source.y * scale}px`
      })
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      return { scale, ox, oy, width, height }
    }

    let box = fit()

    function draw() {
      context.clearRect(0, 0, box.width, box.height)
      const { scale, ox, oy } = box
      const toX = (x: number) => ox + x * scale
      const toY = (y: number) => oy + y * scale

      const glow = context.createRadialGradient(
        toX(BRAIN.x),
        toY(BRAIN.y),
        8 * scale,
        toX(BRAIN.x),
        toY(BRAIN.y),
        150 * scale,
      )
      glow.addColorStop(0, "rgba(22,163,74,0.20)")
      glow.addColorStop(1, "rgba(22,163,74,0)")
      context.fillStyle = glow
      context.beginPath()
      context.arc(toX(BRAIN.x), toY(BRAIN.y), 150 * scale, 0, Math.PI * 2)
      context.fill()

      for (const dot of field) {
        const alpha = 0.28 + (dot.seed % 5) * 0.08
        context.fillStyle = `rgba(22,163,74,${alpha})`
        context.beginPath()
        context.arc(toX(dot.x), toY(dot.y), (1.1 + (dot.seed % 3) * 0.45) * scale, 0, Math.PI * 2)
        context.fill()
      }

      for (const rider of riders) {
        const node = pathNodes[rider.path]
        const length = lengths[rider.path]
        for (let step = 5; step >= 0; step -= 1) {
          const point = node.getPointAtLength(Math.max(0, rider.t - step * 0.035) * length)
          context.fillStyle = `rgba(22,163,74,${0.18 + (5 - step) * 0.14})`
          context.beginPath()
          context.arc(toX(point.x), toY(point.y), (1.3 + (5 - step) * 0.28) * scale, 0, Math.PI * 2)
          context.fill()
        }
      }
    }

    function step(now: number) {
      for (const dot of field) {
        const dx = BRAIN.x - dot.x
        const dy = BRAIN.y - dot.y
        const dist = Math.hypot(dx, dy) || 1
        const swirl = 0.16 + (dot.seed % 3) * 0.05
        dot.x += (dx / dist) * 0.62 + (-dy / dist) * swirl
        dot.y += (dy / dist) * 0.62 + (dx / dist) * swirl
        if (dist < 34) {
          const next = spawnField(dot.seed + 1)
          dot.x = next.x
          dot.y = next.y
        }
      }

      let arrived = false
      for (const rider of riders) {
        rider.t += rider.speed
        if (rider.t >= 1) {
          rider.t = 0
          arrived = true
        }
      }
      if (arrived && now - lastSignal > 1100) {
        lastSignal = now
        signalRef.current = (signalRef.current + 1) % signals.length
        setSignal(signalRef.current)
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
            className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-[#f4f7f4] ring-1 ring-[#e3eee6]"
            aria-label="Deeltjes stromen vanuit website, webshop, inbox en voorraad naar één systeem"
          >
            <div className="flex items-center justify-between px-5 pt-4 sm:px-7 sm:pt-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand">HET SYSTEEM</p>
              <p className="flex items-center gap-2 text-xs text-mist">
                <span className="mind-live size-1.5 rounded-full bg-brand" />
                Loopt
              </p>
            </div>
            <div ref={stageRef} className="relative h-[320px] sm:h-[540px]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <path d={paths[0]} fill="none" stroke="#d5e6db" strokeWidth="1.4" />
                <path d={paths[1]} fill="none" stroke="#d5e6db" strokeWidth="1.4" />
                <path d={paths[2]} fill="none" stroke="#d5e6db" strokeWidth="1.4" />
                <path d={paths[3]} fill="none" stroke="#d5e6db" strokeWidth="1.4" />
                <path
                  fill="#f3faf5"
                  stroke="#141414"
                  strokeWidth="1.6"
                  d="M470 156 C 398 142, 332 174, 312 240 C 292 306, 316 376, 380 410 C 424 434, 466 416, 478 376 C 488 328, 486 230, 470 156 Z"
                />
                <path
                  fill="#f7fbf8"
                  stroke="#141414"
                  strokeWidth="1.6"
                  d="M490 156 C 562 142, 628 174, 648 240 C 668 306, 644 376, 580 410 C 536 434, 494 416, 482 376 C 472 328, 474 230, 490 156 Z"
                />
                <path d="M360 236 C 404 248, 424 286, 392 328" fill="none" stroke="#141414" strokeOpacity="0.35" />
                <path d="M372 300 C 412 312, 424 348, 386 378" fill="none" stroke="#141414" strokeOpacity="0.28" />
                <path d="M600 236 C 556 248, 536 286, 568 328" fill="none" stroke="#141414" strokeOpacity="0.35" />
                <path d="M588 300 C 548 312, 536 348, 574 378" fill="none" stroke="#141414" strokeOpacity="0.28" />
                <path d="M480 168 C 474 230, 486 310, 480 368" fill="none" stroke="#16a34a" strokeWidth="1.2" />
                <path d="M456 392 C 448 434, 468 462, 480 472" fill="none" stroke="#141414" strokeWidth="1.4" />
                <path d="M504 392 C 512 434, 492 462, 480 472" fill="none" stroke="#141414" strokeWidth="1.4" />
                <circle cx={BRAIN.x} cy={BRAIN.y} r="5" fill="#16a34a" />
              </svg>
              <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
              {sources.map((source, index) => (
                <div
                  key={source.label}
                  ref={(node) => {
                    labelRefs.current[index] = node
                  }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_10px_24px_-16px_rgba(0,0,0,0.45)] ring-1 ring-[#e4eee6]"
                  style={{ left: `${(source.x / VIEW_W) * 100}%`, top: `${(source.y / VIEW_H) * 100}%` }}
                >
                  {source.label}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#e3eee6] px-5 py-3.5 sm:px-7">
              <p className="min-w-0 text-sm text-ink" aria-live="polite">
                {signals[signal]}
              </p>
              <p className="hidden shrink-0 text-xs tracking-wide text-mist sm:block">Vier bronnen, één systeem</p>
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

function spawnField(seed: number): FieldDot {
  const source = sources[seed % sources.length]
  const angle = ((seed * 47) % 360) * (Math.PI / 180)
  const radius = 18 + (seed % 7) * 6
  return {
    x: source.x + Math.cos(angle) * radius,
    y: source.y + Math.sin(angle) * radius,
    seed,
  }
}
