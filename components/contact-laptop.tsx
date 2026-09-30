"use client"

import { site } from "@/lib/site"
import { cn } from "cn"
import { useEffect, useState } from "react"

const SLIDE_MS = 5600

const slides = [
  {
    label: "Het formulier",
    title: "Schrijven",
  },
  {
    label: "De mail",
    title: "Versturen",
  },
  {
    label: "Het antwoord",
    title: "Reactie",
  },
] as const

export function ContactLaptop() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduce(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-brand">ZO ZIET CONTACT ERUIT</p>
      <div
        className="mt-3"
        role="region"
        aria-roledescription="diashow"
        aria-label="Voorbeeld van contact opnemen"
      >
        <div className="rounded-[1.15rem] bg-gradient-to-b from-[#d7d8dc] to-[#aeb0b6] p-[7px] shadow-[0_28px_50px_-28px_rgba(0,0,0,0.65)]">
          <div className="overflow-hidden rounded-[0.85rem] bg-[#1a1a1a] p-[6px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.55rem] bg-[#f6f6f4]">
              <div className="absolute top-2 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2a2a2a]" />
              <div
                className={cn(
                  "flex h-full",
                  reduce ? "" : "transition-transform duration-700 ease-out",
                )}
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                <FormSlide />
                <MailSlide />
                <ReplySlide />
              </div>
            </div>
          </div>
          <div className="mx-auto h-2.5 w-[46%] rounded-b-xl bg-gradient-to-b from-[#c5c6ca] to-[#9ea0a6]" />
        </div>

        <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/15">
          <div
            key={`${index}-${paused}-${reduce}`}
            className={cn("h-full bg-brand", !paused && "slide-progress")}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-white/70" aria-live="polite">
            {slides[index].label}
          </p>
          <div className="flex gap-1.5">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.title}
                type="button"
                aria-label={slide.label}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
                className={cn(
                  "size-1.5 rounded-full",
                  slideIndex === index ? "bg-brand" : "bg-white/30",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return <div className="h-full min-w-full px-3 pt-5 pb-3 sm:px-4">{children}</div>
}

function FormSlide() {
  return (
    <Screen>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">CONTACT</p>
      <p className="mt-1 text-sm font-semibold text-ink">Start vandaag</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <MiniField label="Naam" value="Sanne" />
        <MiniField label="Bedrijf" value="Atelier Noord" />
        <MiniField label="E-mail" value="sanne@atelier.nl" />
        <MiniField label="Dienst" value="Webshop bouwen" />
      </div>
      <div className="mt-1.5 rounded-lg bg-white px-2 py-1.5 ring-1 ring-[#e6e6e1]">
        <p className="text-[8px] text-mist">Bericht</p>
        <p className="text-[10px] leading-4 text-ink">We willen een webshop voor onze producten.</p>
      </div>
      <div className="mt-2 inline-flex rounded-full bg-brand px-2.5 py-1 text-[9px] font-semibold text-white">
        Bericht klaarzetten
      </div>
    </Screen>
  )
}

function MailSlide() {
  return (
    <Screen>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">BERICHT KLAAR</p>
      <p className="mt-1 text-sm font-semibold text-ink">Je e-mailprogramma gaat open</p>
      <p className="mt-1 text-[10px] leading-4 text-mist">
        Het bericht staat klaar voor {site.email}.
      </p>
      <dl className="mt-2 space-y-1 rounded-lg bg-white px-2.5 py-2 ring-1 ring-[#e6e6e1]">
        <Row label="Aan" value={site.email} />
        <Row label="Onderwerp" value="Aanvraag Webshop bouwen" />
        <Row label="Van" value="sanne@atelier.nl" />
      </dl>
    </Screen>
  )
}

function ReplySlide() {
  return (
    <Screen>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">ANTWOORD</p>
      <div className="mt-2 rounded-lg bg-white px-2.5 py-2 ring-1 ring-[#e6e6e1]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold text-ink">JR Intelligence</p>
          <p className="text-[9px] text-mist">vandaag</p>
        </div>
        <p className="mt-1.5 text-[10px] leading-4 text-ink">
          Hoi Sanne, dank voor je mail. Een webshop als deze start vanaf €2.490. Zullen we de
          details kort doornemen?
        </p>
      </div>
      <p className="mt-2 text-[10px] leading-4 text-mist">Daarna spreken we een vaste prijs af.</p>
    </Screen>
  )
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white px-1.5 py-1 ring-1 ring-[#e6e6e1]">
      <p className="text-[8px] text-mist">{label}</p>
      <p className="truncate text-[10px] font-medium text-ink">{value}</p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-[10px]">
      <dt className="text-mist">{label}</dt>
      <dd className="truncate font-medium text-ink">{value}</dd>
    </div>
  )
}
