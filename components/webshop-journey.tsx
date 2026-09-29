"use client"

import { Container } from "@/components/container"
import { webshopJourney } from "@/lib/services"
import { cn } from "cn"
import { useEffect, useRef, useState } from "react"

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function WebshopJourney() {
  const listRef = useRef<HTMLOListElement>(null)
  const stepRefs = useRef<Array<HTMLLIElement | null>>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const measure = () => {
      const list = listRef.current
      const first = stepRefs.current[0]
      const last = stepRefs.current[webshopJourney.length - 1]
      if (!list || !first || !last) return

      const listTop = list.getBoundingClientRect().top
      const firstCenter = first.getBoundingClientRect().top - listTop + first.offsetHeight / 2
      const lastCenter = last.getBoundingClientRect().top - listTop + last.offsetHeight / 2
      const span = lastCenter - firstCenter
      const anchor = window.innerHeight * 0.42
      const raw = span === 0 ? 0 : (anchor - (first.getBoundingClientRect().top + first.offsetHeight / 2)) / span
      const progress = Math.min(1, Math.max(0, raw))
      const index = Math.min(
        webshopJourney.length - 1,
        Math.max(0, Math.round(progress * (webshopJourney.length - 1))),
      )
      const placed = reducedQuery.matches ? index / (webshopJourney.length - 1) : progress
      const top = firstCenter + placed * span

      if (lineRef.current) {
        lineRef.current.style.top = `${firstCenter}px`
        lineRef.current.style.height = `${span}px`
      }
      if (markerRef.current) {
        markerRef.current.style.top = `${top}px`
      }
      setActive((current) => (current === index ? current : index))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    reducedQuery.addEventListener("change", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      reducedQuery.removeEventListener("change", onScroll)
    }
  }, [])

  const current = webshopJourney[active]

  return (
    <section id="aanpak" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Hoe het werkt</h2>
          <p className="mt-3 text-mist">
            Zeven stappen, van het eerste bericht tot hulp nadat de shop live staat.
          </p>
        </div>

        <div className="sticky top-20 z-30 mt-8 border-b border-[#e7e7e2] bg-paper/95 py-3 backdrop-blur md:hidden">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {stepNumber(active)} {current.word}
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{current.title}</p>
        </div>

        <div className="relative mt-6 md:mt-10">
          <div
            ref={lineRef}
            className="absolute left-[11px] w-px bg-[#e4e4df] md:left-[15px]"
            aria-hidden
          />
          <div
            ref={markerRef}
            className="absolute left-[11px] z-20 -translate-x-1/2 -translate-y-1/2 md:left-[15px]"
            aria-hidden
          >
            <span className="block size-3.5 rounded-full bg-brand shadow-[0_0_0_6px_rgba(22,163,74,0.16)]" />
            <span className="absolute top-1/2 left-5 hidden -translate-y-1/2 items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white md:inline-flex">
              <span className="text-white/70">{stepNumber(active)}</span>
              {current.word}
            </span>
          </div>

          <ol ref={listRef} className="relative">
            {webshopJourney.map((step, index) => {
              const state = index < active ? "past" : index === active ? "active" : "upcoming"
              return (
                <li
                  key={step.word}
                  ref={(node) => {
                    stepRefs.current[index] = node
                  }}
                  aria-current={state === "active" ? "step" : undefined}
                  className="flex min-h-[68vh] items-center py-10 pl-12 sm:min-h-[76vh] md:pl-56"
                >
                  <div
                    className={cn(
                      "max-w-xl transition-opacity duration-300 motion-reduce:transition-none",
                      state === "active" && "opacity-100",
                      state === "past" && "opacity-75",
                      state === "upcoming" && "opacity-35",
                    )}
                  >
                    <p className="text-sm font-semibold tracking-[0.18em] text-brand">
                      {stepNumber(index)}
                    </p>
                    <p className="mt-3 text-xs font-semibold tracking-[0.22em] text-ink uppercase">
                      {step.word}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-mist sm:text-lg">
                      {step.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
