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
      const raw =
        span === 0 ? 0 : (anchor - (first.getBoundingClientRect().top + first.offsetHeight / 2)) / span
      const progress = Math.min(1, Math.max(0, raw))
      const index = Math.min(
        webshopJourney.length - 1,
        Math.max(0, Math.round(progress * (webshopJourney.length - 1))),
      )
      const placed = reducedQuery.matches ? index / (webshopJourney.length - 1) : progress
      const top = firstCenter + placed * span

      if (lineRef.current) {
        lineRef.current.style.top = `${firstCenter}px`
        lineRef.current.style.height = `${Math.max(span, 0)}px`
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

  return (
    <section id="aanpak" className="scroll-mt-24 pt-16 pb-8 sm:pt-20 sm:pb-10">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Hoe het werkt</h2>
          <p className="mt-3 text-mist">
            Zeven stappen, van het eerste bericht tot hulp nadat de shop live staat.
          </p>
        </div>

        <div className="relative mt-8 rounded-3xl bg-white px-4 py-5 shadow-[0_28px_70px_-36px_rgba(20,20,20,0.5)] ring-1 ring-[#e6e6e1] sm:px-8 sm:py-7">
          <div className="relative">
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
              <span className="block size-3 rounded-full bg-brand shadow-[0_0_0_5px_rgba(22,163,74,0.16)]" />
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
                    className="py-1.5 pl-8 md:py-2 md:pl-12"
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 transition duration-300 motion-reduce:transition-none",
                        state === "active" &&
                          "bg-white shadow-[0_16px_40px_-22px_rgba(20,20,20,0.55)] ring-1 ring-[#e7e7e2]",
                        state === "upcoming" && "opacity-45",
                      )}
                    >
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-brand">
                        {stepNumber(index)} {step.word.toUpperCase()}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-6 text-mist">{step.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
