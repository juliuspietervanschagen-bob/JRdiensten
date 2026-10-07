"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { cn } from "cn"
import { Bell } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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

const patternField = {
  ink: {
    bg: "#141414",
    image: "radial-gradient(circle, rgba(22,163,74,0.95) 1.15px, transparent 1.25px)",
    size: "14px 14px",
  },
  green: {
    bg: "#16a34a",
    image:
      "repeating-linear-gradient(-45deg, transparent, transparent 9px, rgba(255,255,255,0.18) 9px, rgba(255,255,255,0.18) 10px)",
    size: "auto",
  },
  wash: {
    bg: "#e7f6ec",
    image:
      "linear-gradient(rgba(22,163,74,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.28) 1px, transparent 1px)",
    size: "16px 16px",
  },
  deep: {
    bg: "#128a3e",
    image:
      "radial-gradient(circle at 18% 30%, rgba(255,255,255,0.22) 0 20px, transparent 21px), radial-gradient(circle at 86% 72%, rgba(255,255,255,0.16) 0 34px, transparent 35px)",
    size: "auto",
  },
  paper: {
    bg: "#f6f6f4",
    image: "radial-gradient(circle, #16a34a 1px, transparent 1.1px)",
    size: "13px 13px",
  },
  stripe: {
    bg: "#0c100e",
    image:
      "repeating-linear-gradient(90deg, transparent, transparent 13px, rgba(22,163,74,0.45) 13px, rgba(22,163,74,0.45) 14px)",
    size: "auto",
  },
} as const

const includeDetail: Record<
  string,
  { code: string; tone: keyof typeof patternField; sections: { label: string; text: string }[] }
> = {
  "App Store en Play Store": {
    code: "STORES",
    tone: "ink",
    sections: [
      {
        label: "Vermelding",
        text: "Naam, icoon en de korte tekst die een klant leest voordat hij downloadt. Daar komen schermafbeeldingen bij van de schermen in de app, zodat duidelijk is wat hij krijgt.",
      },
      {
        label: "Versie 1.0",
        text: "De versie die we indienen is de app zoals afgesproken: de schermen, het account en de taken. Geen losse proef, maar de eerste versie die in de store kan.",
      },
      {
        label: "Tot hij live staat",
        text: "We dienen in bij beide stores en blijven bij de publicatie tot de app live staat. Jullie lezen de vermelding voordat die de deur uit gaat.",
      },
    ],
  },
  "Schermen in jullie merk": {
    code: "MERK",
    tone: "green",
    sections: [
      {
        label: "Herkenbaar",
        text: "Kleur, toon en de woorden komen uit jullie bedrijf. Een klant legt de app naast de site of de winkel en ziet hetzelfde merk, niet een standaard scherm.",
      },
      {
        label: "Drie schermen",
        text: "Home, de taak en het account. De taak is wat de klant komt doen: een afspraak zetten, een order volgen, of de status van een rit zien.",
      },
      {
        label: "Voor de bouw",
        text: "Je ziet die schermen voordat JR Intelligence bouwt. Elke tik heeft een vervolg: een melding, een status of het volgende scherm.",
      },
    ],
  },
  "iPhone en Android": {
    code: "TOESTEL",
    tone: "wash",
    sections: [
      {
        label: "Dezelfde app",
        text: "Hetzelfde account en dezelfde taken op beide platformen. Wat een klant op de iPhone kan, kan hij ook op de Android-telefoon.",
      },
      {
        label: "In de hand",
        text: "Tekst blijft leesbaar. Knoppen zitten waar een duim ze haalt, niet tegen de rand of onder de balk van het toestel.",
      },
      {
        label: "Geïnstalleerd",
        text: "De klant installeert de app uit de store. Het is geen website die hij in de browser opent, en een melding kan op het toestel binnenkomen.",
      },
    ],
  },
  "Account voor de klant": {
    code: "ACCOUNT",
    tone: "deep",
    sections: [
      {
        label: "Eigen account",
        text: "De klant logt in en ziet zijn eigen gegevens. Hij ziet niet het account van een andere klant, en hij kan weer uitloggen.",
      },
      {
        label: "Wat hij bijhoudt",
        text: "Naam en de gegevens die bij de dienst horen, zoals het adres. De status van een order of een rit werkt het bedrijf bij, niet de klant.",
      },
      {
        label: "Melding",
        text: "Zodra die status wijzigt, krijgt de klant een melding op het toestel. Hij hoeft niet te bellen om te vragen waar het blijft.",
      },
    ],
  },
  "Getest op echte toestellen": {
    code: "TEST",
    tone: "paper",
    sections: [
      {
        label: "Op een iPhone",
        text: "We lopen de route na op een echte iPhone: inloggen, de taak openen, het account bekijken en een status die wijzigt.",
      },
      {
        label: "Op Android",
        text: "Dezelfde route op een Android-telefoon. We kijken of de tekst blijft staan en of een knop doet wat het scherm belooft.",
      },
      {
        label: "Pas daarna indienen",
        text: "Klopt die route op beide toestellen, dan dienen we versie 1.0 in. Een scherm dat alleen op een computer is bekeken, gaat niet de store in.",
      },
    ],
  },
  "Eerste update inbegrepen": {
    code: "UPDATE",
    tone: "stripe",
    sections: [
      {
        label: "De eerste fouten",
        text: "Na livegang lossen we op wat in de stores naar boven komt: een scherm dat vastloopt, een knop die niets doet, een zin die niet op het scherm past.",
      },
      {
        label: "Wel in deze opdracht",
        text: "Die reparatie gaat mee als versie 1.0.1. Een nieuwe taak of een extra scherm hoort daar niet bij. Dat is een volgende opdracht.",
      },
      {
        label: "Eerst laten zien",
        text: "Je leest wat er wijzigt voordat de update live gaat. Daarna dienen we 1.0.1 in bij dezelfde stores.",
      },
    ],
  },
}

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
              Je zegt wat de klant in de app moet kunnen. JR Intelligence bouwt die app voor je:
              de schermen, voor iPhone en Android, klaar voor de twee stores.
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

        <div className="mt-16">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
            <span className="h-px w-8 bg-brand" />
            IN DE APP
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Wat de eerste versie bevat
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-mist">
            Zes onderdelen zitten in de eerste versie. Per onderdeel staat wat JR Intelligence
            bouwt, wat jullie zien voordat het live gaat, en waar deze opdracht ophoudt.
          </p>
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {service.includes.map((item, itemIndex) => {
              const detail = includeDetail[item.title]
              const field = detail ? patternField[detail.tone] : patternField.paper
              const tone = detail?.tone
              const light = tone === "paper"
              return (
                <li key={item.title} className="pakket-lift rounded-3xl bg-white ring-1 ring-[#e8e8e3]">
                  <div className="overflow-hidden rounded-3xl">
                    <div
                      className="relative flex h-32 items-center overflow-hidden px-5"
                      style={
                        tone === "green"
                          ? {
                              backgroundColor: "#173b22",
                              backgroundImage: "url(/app/aura-banner.png)",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : tone === "wash"
                            ? { backgroundColor: "#141414" }
                            : {
                                backgroundColor: field.bg,
                                backgroundImage: field.image,
                                backgroundSize: field.size,
                              }
                      }
                    >
                      {tone === "wash" ? <DuelScene /> : null}
                      <span
                        className={cn(
                          "pointer-events-none absolute right-5 top-3 z-10 font-mono text-4xl font-semibold tabular-nums",
                          light ? "text-ink/15" : "text-white/25",
                        )}
                        aria-hidden
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="relative z-10 rounded-2xl bg-white px-3 py-2 ring-1 ring-[#e8e8e3]">
                        <Preview kind={previews[item.title] ?? "brand"} />
                      </div>
                    </div>
                    <div className="px-5 py-5">
                      <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-brand">
                        {String(itemIndex + 1).padStart(2, "0")}: {detail?.code ?? "APP"}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-mist">{item.text}</p>
                      {detail ? (
                        <ul className="mt-4 divide-y divide-[#ecece8] border-t border-[#ecece8]">
                          {detail.sections.map((section) => (
                            <li key={section.label} className="py-3">
                              <p className="text-sm font-semibold text-ink">{section.label}</p>
                              <p className="mt-1 text-sm leading-6 text-mist">{section.text}</p>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <StorePath steps={service.steps} />
      </Container>
    </section>
  )
}

const storeDetail: Record<string, { code: string; points: string[] }> = {
  "Wat de app moet doen": {
    code: "BRIEF",
    points: [
      "Welke klant de app opent, en wat die als eerste moet kunnen.",
      "De taken op het toestel: een account, een afspraak of de status van een order.",
      "Of de app in de App Store en de Play Store komt, en onder welke naam.",
    ],
  },
  "De schermen": {
    code: "SCHERM",
    points: [
      "Je ziet home, de taak en het account voordat JR Intelligence bouwt.",
      "Kleur, toon en de woorden zijn van jullie merk.",
      "Elke tik heeft een vervolg: een melding, een status of het volgende scherm.",
    ],
  },
  "Bouwen en testen": {
    code: "BUILD",
    points: [
      "Eén app, gebouwd zodat hij prettig werkt op iPhone en Android.",
      "Inloggen, een profiel en de gegevens die bij jullie dienst horen.",
      "We lopen de schermen na op een echte iPhone en een Android-telefoon.",
    ],
  },
  "In de stores": {
    code: "LIVE",
    points: [
      "We dienen de app in bij de App Store en de Play Store.",
      "De vermelding en de eerste versie gaan mee, zodat de klant kan downloaden.",
      "Na livegang lossen we de eerste fouten op die in de stores naar boven komen.",
    ],
  },
}

function StorePath({ steps }: { steps: Service["steps"] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const dot = dotRef.current
    if (!track || !dot) return

    let frame = 0
    function place() {
      const rect = track.getBoundingClientRect()
      const mark = window.innerHeight * 0.42
      const travel = Math.max(rect.height - 16, 1)
      const passed = Math.min(Math.max(mark - rect.top, 0), travel)
      dot.style.top = `${(passed / travel) * 100}%`
    }
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(place)
    }
    place()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div id="aanpak" className="scroll-mt-24 pt-16 sm:pt-20">
      <p className="font-mono text-[11px] tracking-[0.18em] text-brand">VAN ZIN TOT STORE</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Vier stappen. JR Intelligence bouwt de app.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-mist">
        Jij zegt wat de klant moet kunnen. Wij maken de schermen, testen op een echte telefoon en
        zetten de app in de App Store en de Play Store.
      </p>
      <div ref={trackRef} className="relative mt-10 pl-8">
        <div className="absolute top-4 bottom-4 left-[7px] w-px bg-[#d7e8dc]" />
        <span
          ref={dotRef}
          className="absolute top-0 left-0 size-3.5 rounded-full bg-brand shadow-[0_0_0_6px_rgba(22,163,74,0.28)]"
          aria-hidden
        />
        <ol className="space-y-6">
          {steps.map((step, index) => {
            const detail = storeDetail[step.title]
            return (
              <li key={step.title} className="pakket-lift rounded-3xl bg-white ring-1 ring-[#e8e8e3]">
                <div className="flex items-center justify-between rounded-t-3xl bg-[#0c100e] px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-brand sm:px-8">
                  <span>
                    0{index + 1} / {detail?.code ?? "STORE"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_#16a34a]" />
                    STORE
                  </span>
                </div>
                <div className="px-5 py-6 sm:px-8 sm:py-8">
                  <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-mist">{step.text}</p>
                  {detail ? (
                    <ul className="mt-6 grid gap-3 lg:grid-cols-3">
                      {detail.points.map((point) => (
                        <li key={point} className="rounded-2xl bg-[#f6f6f4] px-4 py-4 text-sm leading-6 text-ink ring-1 ring-[#e8e8e3]">
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
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

function AppStoreLogo({ className }: { className?: string }) {
  return <img src="/app/app-store.png" alt="" className={className} />
}

function PlayStoreLogo({ className }: { className?: string }) {
  return <img src="/app/play-store.png" alt="" className={className} />
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.8-2.3c.9-1.3 1.2-2.5 1.3-2.6 0 0-2.4-.9-2.5-3.5zM14.7 6.2c.6-.8 1.1-1.8.9-2.9-1 .1-2.1.6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1.1.1 2.1-.5 2.7-1.3z"
      />
    </svg>
  )
}

function AndroidLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M6.4 9.5 5 6.7a.4.4 0 0 1 .7-.4l1.4 2.5a7 7 0 0 1 9.8 0l1.4-2.5a.4.4 0 0 1 .7.4l-1.4 2.8A6.5 6.5 0 0 1 19 13.5V18a1 1 0 0 1-1 1h-1v3.2a1.3 1.3 0 0 1-2.6 0V19H9.6v3.2a1.3 1.3 0 0 1-2.6 0V19H6a1 1 0 0 1-1-1v-4.5a6.5 6.5 0 0 1 1.4-4zM9 14.2a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8zm6 0a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z"
      />
    </svg>
  )
}

function DuelScene() {
  return (
    <svg
      viewBox="0 0 640 160"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <rect width="640" height="160" fill="#141414" />
      <polygon points="392,0 640,0 640,160 318,160" fill="#16a34a" />
      <g opacity="0.45" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
        <path d="M24 36h120M8 72h96M40 112h110" />
      </g>
      <g opacity="0.35" stroke="#141414" strokeWidth="2" strokeLinecap="round">
        <path d="M500 34h120M520 74h110M486 116h130" />
      </g>
      <g transform="translate(214 22)">
        <g className="duel-apple">
          <path d="M30 86 16 128" stroke="#f6f6f4" strokeWidth="8" strokeLinecap="round" />
          <path d="M52 88 70 128" stroke="#f6f6f4" strokeWidth="8" strokeLinecap="round" />
          <path d="M22 62 4 84" stroke="#f6f6f4" strokeWidth="8" strokeLinecap="round" />
          <circle cx="36" cy="62" r="28" fill="#f6f6f4" />
          <circle cx="56" cy="58" r="22" fill="#f6f6f4" />
          <circle cx="74" cy="50" r="11" fill="#141414" />
          <path d="M44 38c2-12 16-14 18-2" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M48 36c8-14 24-8 16 4-8-2-14 0-16-4z" fill="#16a34a" />
          <path d="M64 58 112 42" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" />
          <circle cx="118" cy="40" r="10" fill="#16a34a" />
        </g>
      </g>
      <g transform="translate(392 16)">
        <g className="duel-bot">
          <path d="M28 22 14 4" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
          <circle cx="12" cy="3" r="4" fill="#141414" />
          <path d="M48 22 62 4" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
          <circle cx="64" cy="3" r="4" fill="#141414" />
          <rect x="16" y="20" width="44" height="28" rx="14" fill="#141414" />
          <circle cx="30" cy="33" r="3" fill="#16a34a" />
          <circle cx="46" cy="33" r="3" fill="#16a34a" />
          <rect x="18" y="50" width="40" height="36" rx="8" fill="#141414" />
          <path d="M18 62-16 48" stroke="#141414" strokeWidth="9" strokeLinecap="round" />
          <circle cx="-22" cy="46" r="10" fill="#141414" />
          <path d="M58 64 78 54" stroke="#141414" strokeWidth="8" strokeLinecap="round" />
          <path d="M30 86 22 124" stroke="#141414" strokeWidth="8" strokeLinecap="round" />
          <path d="M48 86 60 124" stroke="#141414" strokeWidth="8" strokeLinecap="round" />
        </g>
      </g>
      <g className="duel-spark">
        <path
          d="M332 80 344 62 340 80 358 78 342 90 348 108 332 94 316 108 322 90 306 78 324 80 320 62Z"
          fill="#f6f6f4"
        />
        <circle cx="332" cy="82" r="5" fill="#16a34a" />
      </g>
    </svg>
  )
}

function Preview({ kind }: { kind: (typeof previews)[string] }) {
  if (kind === "stores") {
    return (
      <div className="flex items-center gap-2" aria-label="App Store en Play Store">
        <AppStoreLogo className="size-10" />
        <PlayStoreLogo className="size-10" />
      </div>
    )
  }
  if (kind === "brand") {
    return <img src="/app/aura.png" alt="Aura" className="h-14 w-14 rounded-xl object-cover" />
  }
  if (kind === "devices") {
    return (
      <div className="flex items-center gap-3" aria-hidden>
        <AppleLogo className="size-6 text-ink" />
        <AndroidLogo className="size-7 text-brand" />
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
