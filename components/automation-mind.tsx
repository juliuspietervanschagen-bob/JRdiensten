"use client"

import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const VIEW_W = 960
const VIEW_H = 560

const sources = [
  { label: "Website", x: 118, y: 148 },
  { label: "Inbox", x: 118, y: 412 },
  { label: "Webshop", x: 842, y: 148 },
  { label: "Voorraad", x: 842, y: 412 },
]

const nodes = [
  { x: 328, y: 214 },
  { x: 328, y: 358 },
  { x: 632, y: 214 },
  { x: 632, y: 358 },
]

const paths = [
  "M168 148 C 230 156, 286 186, 328 214 C 386 254, 424 272, 458 286",
  "M168 412 C 230 404, 286 380, 328 358 C 386 322, 424 304, 458 294",
  "M792 148 C 730 156, 674 186, 632 214 C 574 254, 536 272, 502 286",
  "M792 412 C 730 404, 674 380, 632 358 C 574 322, 536 304, 502 294",
]

const folds = [
  "M400 248 C 428 258, 442 282, 422 306",
  "M392 302 C 422 310, 438 334, 414 354",
  "M560 248 C 532 258, 518 282, 538 306",
  "M568 302 C 538 310, 522 334, 546 354",
]

const signals = [
  "Een bericht van de website is doorgezet.",
  "Een aanvraag uit de inbox loopt vanzelf door.",
  "Een order uit de webshop staat bij de voorraad.",
  "De status is bijgewerkt. Niemand typte het over.",
]

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

    const riders: PathDot[] = paths.flatMap((_, path) =>
      Array.from({ length: 7 }, (_, index) => ({
        path,
        t: reduce ? (index + 0.35) / 7 : (index + Math.random()) / 7,
        speed: 0.0015 + ((path + index) % 4) * 0.00032,
      })),
    )

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
                <g fill="none" strokeLinecap="round">
                  <circle cx="480" cy="286" r="176" stroke="#16a34a" strokeWidth="1.4" />
                  <path
                    stroke="#141414"
                    strokeWidth="1.6"
                    d="M473 224 C 458 206, 422 201, 397 221 C 372 240, 363 275, 371 309 C 378 343, 404 368, 440 374 C 462 377, 474 357, 471 332 C 469 303, 473 260, 473 224 Z"
                  />
                  <path
                    stroke="#141414"
                    strokeWidth="1.6"
                    d="M487 224 C 502 206, 538 201, 563 221 C 588 240, 597 275, 589 309 C 582 343, 556 368, 520 374 C 498 377, 486 357, 489 332 C 491 303, 487 260, 487 224 Z"
                  />
                  <path stroke="#16a34a" strokeWidth="1.25" d="M480 228 C 476 270, 484 322, 480 362" />
                  {folds.map((d) => (
                    <path key={d} d={d} stroke="#141414" strokeWidth="1.15" strokeOpacity="0.7" />
                  ))}
                  <path
                    stroke="#141414"
                    strokeWidth="1.45"
                    d="M452 378 C 455 414, 505 414, 508 378 C 505 366, 455 366, 452 378 Z"
                  />
                  <path stroke="#141414" strokeWidth="1.1" strokeOpacity="0.55" d="M462 390 C 480 396, 498 390" />
                  <path stroke="#141414" strokeWidth="1.1" strokeOpacity="0.55" d="M458 402 C 480 409, 502 402" />
                </g>
                {nodes.map((node) => (
                  <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r="5.5" fill="#ffffff" stroke="#16a34a" strokeWidth="1.6" />
                ))}
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

