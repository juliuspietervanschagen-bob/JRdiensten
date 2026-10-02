"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { cn } from "cn"
import { Bell, Smartphone, TabletSmartphone } from "lucide-react"
import { useEffect, useState } from "react"

const screens = [
  {
    id: "vandaag",
    label: "Vandaag",
    file: "home.tsx",
    spec: "Home toont de monteur, de status en hoe laat hij voor de deur staat.",
  },
  {
    id: "afspraak",
    label: "Afspraak",
    file: "agenda.tsx",
    spec: "De afspraak staat vast. Het adres komt uit het account, niet uit een losse mail.",
  },
  {
    id: "account",
    label: "Account",
    file: "account.tsx",
    spec: "Profiel, adres en een melding zodra de status van de rit wijzigt.",
  },
] as const

type ScreenId = (typeof screens)[number]["id"]

const previews: Record<string, "stores" | "brand" | "devices" | "account" | "test" | "update"> = {
  "App Store en Play Store": "stores",
  "Schermen in jullie merk": "brand",
  "iPhone en Android": "devices",
  "Account voor de klant": "account",
  "Getest op echte toestellen": "test",
  "Eerste update inbegrepen": "update",
}

export function AppForge({ service }: { service: Service }) {
  const [index, setIndex] = useState(0)
  const [chars, setChars] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)
  const screen = screens[index]
  const spec = reduce ? screen.spec : screen.spec.slice(0, chars)
  const ready = reduce || chars >= screen.spec.length

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduce(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduce || paused) return
    if (chars < screen.spec.length) {
      const timer = window.setTimeout(() => setChars((value) => value + 1), 18)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1) % screens.length)
      setChars(0)
    }, 1600)
    return () => window.clearTimeout(timer)
  }, [chars, index, paused, reduce, screen.spec.length])

  function show(next: number) {
    setIndex(next)
    setChars(screens[next].spec.length)
  }

  return (
    <section className="pt-12 pb-6 sm:pt-16" aria-label="De bouw van de app">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              DE GENERATOR
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Eerst de zin, dan de app
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-mist sm:text-base sm:leading-7">
              Je zegt wat de klant in de app moet kunnen. Daaruit komen de schermen, voor iPhone
              en Android, klaar voor de twee stores.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl bg-[#0c100e] px-4 py-4 text-white ring-1 ring-brand/20 sm:px-5">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-brand">
                <span>JR / APP</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_#16a34a]" />
                  {ready ? "SCHERM" : "GENEREERT"}
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-wide text-white/40">
                {screen.file} · {index + 1} / {screens.length}
              </p>
              <p className="mt-3 min-h-[4.5rem] font-mono text-[13px] leading-6 text-white">
                <span className="text-brand">› </span>
                {spec}
                {ready ? null : <span className="caret-blink ml-px inline-block h-[1em] w-px bg-brand" />}
              </p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-brand transition-[width] duration-300"
                  style={{ width: `${((index + (reduce ? 1 : chars / screen.spec.length)) / screens.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {(["App Store", "Play Store"] as const).map((store) => (
                <div key={store} className="rounded-2xl bg-white px-3 py-3 ring-1 ring-[#e8e8e3] sm:px-4">
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-mist">{store}</p>
                  <p className="mt-2 text-sm font-semibold">1.0.0</p>
                  <p className={cn("mt-1 font-mono text-[10px] tracking-[0.14em]", ready && index === screens.length - 1 ? "text-brand" : "text-mist")}>
                    {index === screens.length - 1 && ready ? "REVIEW" : "BOUWT"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Phone screen={screen.id} />
            <div className="mx-auto mt-4 flex max-w-[300px] justify-center gap-2">
              {screens.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => show(itemIndex)}
                  aria-current={item.id === screen.id ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition",
                    item.id === screen.id
                      ? "bg-ink text-white ring-ink"
                      : "bg-white text-mist ring-[#e8e8e3] hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">In de app</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <li key={item.title} className="rounded-3xl bg-white p-4 ring-1 ring-[#e8e8e3]">
                <Preview kind={previews[item.title] ?? "brand"} />
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-mist">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="aanpak" className="scroll-mt-24 pt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Van zin tot store</h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-4">
            {service.steps.map((step, stepIndex) => (
              <li key={step.title} className="rounded-3xl bg-white px-4 py-5 ring-1 ring-[#e8e8e3]">
                <p className="font-mono text-[11px] tracking-[0.16em] text-brand">
                  0{stepIndex + 1}
                </p>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

function Phone({ screen }: { screen: ScreenId }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2.2rem] bg-[#1a1a1a] p-2.5 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.55)]">
      <div className="relative h-[520px] overflow-hidden rounded-[1.7rem] bg-[#f6f6f4]">
        <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
        <div key={screen} className="app-rise flex h-full flex-col pt-9">
          <div className="flex items-center justify-between px-4 text-[10px] font-semibold text-ink">
            <span>09:41</span>
            <span className="text-brand">Lijn</span>
          </div>
          {screen === "vandaag" ? <Today /> : null}
          {screen === "afspraak" ? <Visit /> : null}
          {screen === "account" ? <Account /> : null}
          <div className="mt-auto grid grid-cols-3 border-t border-[#ecece8] bg-white px-2 py-3 text-center text-[10px] font-semibold">
            <span className={screen === "vandaag" ? "text-brand" : "text-mist"}>Vandaag</span>
            <span className={screen === "afspraak" ? "text-brand" : "text-mist"}>Afspraak</span>
            <span className={screen === "account" ? "text-brand" : "text-mist"}>Account</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Today() {
  return (
    <div className="px-4 pt-4">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">VANDAAG</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">Monteur onderweg</p>
      <div className="app-toast mt-4 rounded-2xl bg-ink px-3 py-3 text-white">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <Bell className="size-3.5 text-brand" aria-hidden />
          Hij is vertrokken
        </p>
        <p className="mt-1 text-[11px] text-white/70">Verwacht om 14:20 in Reeuwijk.</p>
      </div>
      <div className="relative mt-3 h-36 overflow-hidden rounded-2xl bg-[#e7f6ec]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(22,163,74,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.18) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_0_6px_rgba(22,163,74,0.25)]" />
      </div>
    </div>
  )
}

function Visit() {
  return (
    <div className="px-4 pt-4">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">AFSPRAAK</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">Donderdag</p>
      <p className="mt-1 text-sm text-mist">10:00 · Zoutmanstraat, Reeuwijk</p>
      <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-[#e8e8e3]">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">BEVESTIGD</p>
        <p className="mt-2 text-sm leading-6">Onderhoud van de installatie. De monteur neemt contact op als hij rijdt.</p>
      </div>
      <div className="mt-3 rounded-2xl bg-white px-3 py-3 ring-1 ring-[#e8e8e3]">
        <p className="text-xs text-mist">Adres uit het account</p>
        <p className="mt-1 text-sm font-semibold">Niet uit een losse mail</p>
      </div>
    </div>
  )
}

function Account() {
  const rows = ["J. van Dijk", "Meldingen aan", "Reeuwijk"]
  return (
    <div className="px-4 pt-4">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">ACCOUNT</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-ink text-sm font-semibold text-white">
          JD
        </span>
        <div>
          <p className="text-lg font-semibold tracking-tight">J. van Dijk</p>
          <p className="text-xs text-mist">Klant sinds maart</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li key={row} className="rounded-xl bg-white px-3 py-2.5 text-sm font-medium ring-1 ring-[#e8e8e3]">
            {row}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Preview({ kind }: { kind: (typeof previews)[string] }) {
  if (kind === "stores") {
    return (
      <div className="flex gap-2">
        <span className="rounded-lg bg-ink px-2 py-1 text-[10px] font-semibold text-white">App Store</span>
        <span className="rounded-lg bg-brand px-2 py-1 text-[10px] font-semibold text-white">Play Store</span>
      </div>
    )
  }
  if (kind === "brand") {
    return (
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-8 w-8 rounded-lg bg-ink" />
        <span className="h-8 w-8 rounded-lg bg-brand" />
        <span className="h-8 flex-1 rounded-lg bg-[#f3f6f3] ring-1 ring-[#e8e8e3]" />
      </div>
    )
  }
  if (kind === "devices") {
    return (
      <div className="flex items-end gap-3 text-ink" aria-hidden>
        <Smartphone className="size-6" />
        <TabletSmartphone className="size-7 text-brand" />
      </div>
    )
  }
  if (kind === "account") {
    return (
      <div className="flex items-center gap-2" aria-hidden>
        <span className="grid size-8 place-items-center rounded-full bg-[#eef8f1] text-[10px] font-semibold text-brand">
          JD
        </span>
        <span className="h-2 flex-1 rounded-full bg-[#ecece8]" />
      </div>
    )
  }
  if (kind === "test") {
    return (
      <p className="font-mono text-[11px] tracking-wide text-brand">iPhone · Android · ok</p>
    )
  }
  return <p className="font-mono text-[11px] tracking-wide text-ink">1.0.0 → 1.0.1</p>
}
