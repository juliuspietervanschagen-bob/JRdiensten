"use client"

import { cn } from "cn"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const prompts = [
  {
    channel: "ARCH",
    title: "catalogus",
    text: "Modelleer Atelier als Product, Variant en SKU. Prijs in centen, btw 21% pas bij weergave, voorraad daalt atomair nadat de betaling slaagt. De homepage leest alleen de live feed.",
  },
  {
    channel: "TX",
    title: "checkout",
    text: "Checkout is één transactie: drie regels, subtotaal € 457, verzending na postcodecheck. Zet een idempotency-key op de betaalcall, zodat een dubbele klik geen tweede order schrijft.",
  },
  {
    channel: "RUNTIME",
    title: "publish",
    text: "Publiceer atelier.nl met een client-store. Hero roteert uit de feed, de ticker filtert op voorraad > 0, en de winkelwagen hydrateert uit session state zonder reload.",
  },
]

type Kind = "muted" | "key" | "name" | "str" | "plain"

const kindClass: Record<Kind, string> = {
  muted: "text-[#8a8a8a]",
  key: "text-brand",
  name: "font-semibold text-ink",
  str: "text-[#128a3e]",
  plain: "text-[#2a2a2a]",
}

function token(text: string, kind: Kind) {
  return { text, kind }
}

const code = [
  token("// Webshop voor Atelier\n", "muted"),
  token("export function ", "key"),
  token("Shop", "name"),
  token("() {\n", "plain"),
  token("  const ", "key"),
  token("products", "plain"),
  token(" = [\n", "plain"),
  token("    { name: ", "plain"),
  token('"Koptelefoon"', "str"),
  token(", price: ", "plain"),
  token('"€ 79"', "str"),
  token(" },\n", "plain"),
  token("    { name: ", "plain"),
  token('"Telefoon"', "str"),
  token(", price: ", "plain"),
  token('"€ 249"', "str"),
  token(" },\n", "plain"),
  token("    { name: ", "plain"),
  token('"Horloge"', "str"),
  token(", price: ", "plain"),
  token('"€ 129"', "str"),
  token(" },\n", "plain"),
  token("    { name: ", "plain"),
  token('"Speaker"', "str"),
  token(", price: ", "plain"),
  token('"€ 49"', "str"),
  token(" },\n", "plain"),
  token("    { name: ", "plain"),
  token('"Oortjes"', "str"),
  token(", price: ", "plain"),
  token('"€ 39"', "str"),
  token(" },\n", "plain"),
  token("    { name: ", "plain"),
  token('"Toetsenbord"', "str"),
  token(", price: ", "plain"),
  token('"€ 59"', "str"),
  token(" },\n", "plain"),
  token("  ]\n\n", "plain"),
  token("  return ", "key"),
  token("(\n", "plain"),
  token("    <", "plain"),
  token("Store", "name"),
  token(" name=", "plain"),
  token('"Atelier"', "str"),
  token(">\n", "plain"),
  token("      {products.map((item) => (\n", "plain"),
  token("        <", "plain"),
  token("Product", "name"),
  token(" name={item.name} price={item.price} />\n", "plain"),
  token("      ))}\n", "plain"),
  token("      <", "plain"),
  token("Cart", "name"),
  token(" count={3} total=", "plain"),
  token('"€ 457"', "str"),
  token(" />\n", "plain"),
  token("    </", "plain"),
  token("Store", "name"),
  token(">\n", "plain"),
  token("  )\n", "plain"),
  token("}\n", "plain"),
]

const codeLength = code.reduce((total, item) => total + item.text.length, 0)
const promptLength = prompts.reduce((total, item) => total + item.text.length, 0)

const products = [
  { name: "Koptelefoon", price: "€ 79", src: "/webshop/tech-headphones.jpg" },
  { name: "Telefoon", price: "€ 249", src: "/webshop/tech-phone.jpg" },
  { name: "Horloge", price: "€ 129", src: "/webshop/tech-watch.jpg" },
  { name: "Speaker", price: "€ 49", src: "/webshop/tech-speaker.jpg" },
  { name: "Oortjes", price: "€ 39", src: "/webshop/tech-earbuds.jpg" },
  { name: "Toetsenbord", price: "€ 59", src: "/webshop/tech-keyboard.jpg" },
]

type Phase = "prompt" | "code" | "shop"

const phases: { id: Phase; label: string }[] = [
  { id: "prompt", label: "De prompts" },
  { id: "code", label: "De code" },
  { id: "shop", label: "De shop is live" },
]

const stages: {
  id: Phase
  mark: string
  title: string
  detail: string
  live: string
}[] = [
  {
    id: "prompt",
    mark: "01",
    title: "De opdracht",
    detail: "Catalogus, checkout en publicatie als één zin.",
    live: "Loopt",
  },
  {
    id: "code",
    mark: "02",
    title: "De code",
    detail: "shop.tsx zet die zin om in de winkel.",
    live: "Schrijft",
  },
  {
    id: "shop",
    mark: "03",
    title: "De homepage",
    detail: "atelier.nl leest de feed en toont de collectie.",
    live: "Live",
  },
]

export function ShopBuildComputer() {
  const [phase, setPhase] = useState<Phase>("prompt")

  return (
    <div className="flex h-full flex-col" aria-labelledby="bouw-title">
      <div className="lg:min-h-[14.5rem]">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
          <span className="h-px w-8 bg-brand" />
          DE BOUW
        </p>
        <h2 id="bouw-title" className="mt-3 text-3xl font-semibold tracking-tight">
          Eerst de prompt, dan de code
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-mist sm:text-base sm:leading-7">
          Je zegt wat de shop moet kunnen. Op het scherm verschijnen die prompts, daarna de code, en
          dan de homepage van de winkel.
        </p>
      </div>
      <div className="mt-6 flex min-h-[280px] min-w-0 flex-1 items-center">
        <div className="w-full min-w-0">
          <Builder onPhase={setPhase} />
        </div>
      </div>
      <BuildTrace phase={phase} />
    </div>
  )
}

function BuildTrace({ phase }: { phase: Phase }) {
  const current = stages.findIndex((stage) => stage.id === phase)

  return (
    <ol className="mt-4 grid grid-cols-3 gap-2">
      {stages.map((stage, index) => {
        const state = index < current ? "done" : index === current ? "now" : "wait"
        return (
          <li
            key={stage.id}
            className={cn(
              "rounded-2xl bg-white px-2.5 py-3 ring-1 sm:px-3",
              state === "now" ? "ring-brand/50" : "ring-[#e8e8e3]",
            )}
          >
            <span
              className={cn(
                "grid size-[22px] place-items-center rounded-full ring-1",
                state === "wait" && "bg-white text-mist ring-[#e4e4df]",
                state === "now" && "bg-brand text-white ring-brand",
                state === "done" && "bg-[#f3faf5] text-brand ring-brand/30",
              )}
            >
              {state === "done" ? (
                <Check className="size-3" aria-hidden />
              ) : (
                <span className="text-[10px] font-semibold">{stage.mark}</span>
              )}
            </span>
            <p
              className={cn(
                "mt-2 text-[13px] leading-4 font-semibold",
                state === "wait" ? "text-mist" : "text-ink",
              )}
            >
              {stage.title}
            </p>
            <p
              className={cn(
                "mt-1 font-mono text-[10px] tracking-[0.12em] uppercase",
                state === "now" ? "text-brand" : "text-[#b5b5ae]",
              )}
            >
              {state === "done" ? "Klaar" : state === "now" ? stage.live : "Wacht"}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

function Builder({ onPhase }: { onPhase: (phase: Phase) => void }) {
  const [phase, setPhase] = useState<Phase>("prompt")
  const [promptStep, setPromptStep] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [codeIndex, setCodeIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setReduce(query.matches)
      if (query.matches) setPhase("shop")
    }
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduce || paused) return

    if (phase === "prompt") {
      const current = prompts[promptStep]?.text ?? ""
      if (charIndex < current.length) {
        const timer = window.setTimeout(() => setCharIndex((value) => value + 1), 16)
        return () => window.clearTimeout(timer)
      }
      if (promptStep < prompts.length - 1) {
        const timer = window.setTimeout(() => {
          setPromptStep((value) => value + 1)
          setCharIndex(0)
        }, 520)
        return () => window.clearTimeout(timer)
      }
      const timer = window.setTimeout(() => {
        setCodeIndex(0)
        setPhase("code")
      }, 700)
      return () => window.clearTimeout(timer)
    }

    if (phase === "code") {
      if (codeIndex < codeLength) {
        const timer = window.setTimeout(() => setCodeIndex((value) => value + 1), 12)
        return () => window.clearTimeout(timer)
      }
      const timer = window.setTimeout(() => setPhase("shop"), 900)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setPromptStep(0)
      setCharIndex(0)
      setCodeIndex(0)
      setPhase("prompt")
    }, 8600)
    return () => window.clearTimeout(timer)
  }, [phase, promptStep, charIndex, codeIndex, paused, reduce])

  useEffect(() => {
    const node = codeRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [codeIndex, phase])

  const view = reduce ? "shop" : phase

  useEffect(() => {
    onPhase(view)
  }, [view, onPhase])
  const written =
    prompts.slice(0, promptStep).reduce((total, item) => total + item.text.length, 0) +
    (phase === "prompt" ? charIndex : 0)
  const progress =
    view === "prompt"
      ? (written / promptLength) * 0.34
      : view === "code"
        ? 0.34 + (Math.min(codeIndex, codeLength) / codeLength) * 0.42
        : 1

  function jump(next: Phase) {
    if (next === "prompt") {
      setPromptStep(0)
      setCharIndex(0)
      setCodeIndex(0)
    }
    if (next === "code") {
      setPromptStep(prompts.length - 1)
      setCharIndex(prompts[prompts.length - 1].text.length)
      setCodeIndex(0)
    }
    setPhase(next)
  }

  return (
    <div
      className="min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="region"
        aria-roledescription="animatie"
        aria-label="Prompts en code waarmee een webshop wordt gebouwd"
      >
        <div className="rounded-[1.15rem] bg-gradient-to-b from-[#e6e7eb] to-[#b7b9be] p-[8px] pb-5 shadow-[0_28px_50px_-28px_rgba(0,0,0,0.55)]">
          <div className="overflow-hidden rounded-[0.8rem] bg-[#1a1a1a] p-[6px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.5rem] bg-paper sm:aspect-[16/10]">
              <div className="absolute top-1.5 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2a2a2a]" />
              {view === "prompt" ? (
                <PromptScreen step={promptStep} charIndex={charIndex} />
              ) : null}
              {view === "code" ? (
                <CodeScreen codeRef={codeRef} count={codeIndex} done={codeIndex >= codeLength} />
              ) : null}
              {view === "shop" ? <ShopScreen /> : null}
            </div>
          </div>
          <div className="relative mt-1.5 flex justify-center">
            <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_#16a34a]" aria-hidden />
          </div>
        </div>
        <div className="-mt-1 flex flex-col items-center" aria-hidden>
          <div
            className="h-5 w-20 bg-gradient-to-b from-[#c5c6ca] to-[#a4a6ab]"
            style={{ clipPath: "polygon(22% 0, 78% 0, 100% 100%, 0 100%)" }}
          />
          <div className="h-2 w-[46%] rounded-full bg-gradient-to-b from-[#b5b6bb] to-[#8d8f95] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.8)]" />
        </div>

        <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-[#e4e4df]">
          <div
            className={cn(
              "h-full bg-brand",
              !reduce && !(view === "prompt" && charIndex === 0 && promptStep === 0) &&
                "transition-[width] duration-300 ease-linear",
            )}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-mist" aria-live="polite">
            {phases.find((item) => item.id === view)?.label}
          </p>
          <div className="flex gap-1.5">
            {phases.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={item.id === view ? "true" : undefined}
                onClick={() => jump(item.id)}
                className={cn(
                  "size-1.5 rounded-full",
                  item.id === view ? "bg-brand" : "bg-[#cfcfc8]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Caret() {
  return <span className="caret-blink ml-px inline-block h-[1em] w-px translate-y-[1px] bg-brand" />
}

function PromptScreen({ step, charIndex }: { step: number; charIndex: number }) {
  const listRef = useRef<HTMLDivElement>(null)
  const doneChars =
    prompts.slice(0, step).reduce((total, prompt) => total + prompt.text.length, 0) + charIndex
  const percent = Math.round((doneChars / promptLength) * 100)

  useEffect(() => {
    const list = listRef.current
    const active = list?.querySelector<HTMLElement>("[data-active='true']")
    if (!list || !active) return
    const bottom = active.offsetTop + active.offsetHeight
    if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight + 6
    }
  }, [step, charIndex])

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#0c100e] pt-3 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,163,74,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.16) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div
        className="prompt-scan pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-brand/20 to-transparent"
        aria-hidden
      />
      <div className="relative flex items-center justify-between px-3 font-mono text-[9px] tracking-[0.16em] text-brand">
        <span>JR / BUILD</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_#16a34a]" />
          LIVE
        </span>
      </div>
      <div className="relative mt-1 flex gap-3 px-3 font-mono text-[8px] tracking-wide text-white/45">
        <span>model jr-shop</span>
        <span>ctx 4.096</span>
        <span>{doneChars} tok</span>
      </div>
      <div
        ref={listRef}
        className="relative mt-2 min-h-0 flex-1 space-y-1.5 overflow-y-auto px-3 [scrollbar-width:none]"
      >
        {prompts.map((prompt, index) => {
          if (index > step) return null
          const shown = index < step ? prompt.text : prompt.text.slice(0, charIndex)
          const streaming = index === step
          return (
            <div
              key={prompt.title}
              data-active={streaming ? "true" : undefined}
              className="rounded-md border border-brand/25 bg-black/35 px-2 py-1.5"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-[8px] tracking-[0.14em] text-brand">
                <span>
                  0{index + 1} {prompt.channel}
                  <span className="text-white/35"> / {prompt.title}</span>
                </span>
                <span className="text-white/40">{streaming ? "STREAM" : "OK"}</span>
              </div>
              <p className="mt-0.5 font-mono text-[10px] leading-4 text-white sm:text-[11px]">
                <span className="text-brand">› </span>
                {shown}
                {streaming ? <Caret /> : null}
              </p>
            </div>
          )
        })}
      </div>
      <div className="relative mx-3 mt-1 mb-2.5">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-1 font-mono text-[8px] tracking-[0.14em] text-white/50">
          INTENT COMPILEREN · {percent}%
        </p>
      </div>
    </div>
  )
}

function visibleCode(count: number) {
  let left = count
  const shown: { text: string; kind: Kind }[] = []
  for (const item of code) {
    if (left <= 0) break
    const take = Math.min(left, item.text.length)
    shown.push({ text: item.text.slice(0, take), kind: item.kind })
    left -= take
  }
  return shown
}

function CodeScreen({
  codeRef,
  count,
  done,
}: {
  codeRef: React.RefObject<HTMLPreElement | null>
  count: number
  done: boolean
}) {
  const shown = visibleCode(count)
  const text = shown.map((item) => item.text).join("")
  const lineCount = Math.max(1, text.split("\n").length)

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#fbfbfa] pt-3">
      <div className="flex items-center gap-1.5 border-b border-[#ecece8] px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-brand" />
        <span className="ml-1 rounded-md bg-white px-2 py-0.5 font-mono text-[10px] text-ink ring-1 ring-[#ecece8]">
          shop.tsx
        </span>
        <span className="ml-auto font-mono text-[10px] text-brand">{done ? "klaar" : "schrijft"}</span>
      </div>
      <pre
        ref={codeRef}
        className="min-h-0 flex-1 overflow-hidden px-3 py-2 font-mono text-[10px] leading-5 sm:text-[12px] sm:leading-[1.35rem]"
      >
        <div className="flex">
          <div className="w-6 shrink-0 pr-2 text-right text-[#b5b5ae] select-none" aria-hidden>
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <code className="whitespace-pre">
            {shown.map((item, index) => (
              <span key={index} className={kindClass[item.kind]}>
                {item.text}
              </span>
            ))}
            {done ? null : <Caret />}
          </code>
        </div>
      </pre>
    </div>
  )
}

const heroes = [
  "/webshop/tech-headphones.jpg",
  "/webshop/tech-watch.jpg",
  "/webshop/tech-earbuds.jpg",
]

function ShopScreen() {
  const ticker = "NIEUWE COLLECTIE  ·  GRATIS VERZENDING  ·  ZES PRODUCTEN  ·  ATELIER  ·  "

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white pt-3">
      <div className="flex items-center gap-1.5 border-b border-[#ecece8] px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-brand" />
        <span className="ml-1 h-4 flex-1 truncate rounded-full bg-[#f6f6f4] px-2 text-[9px] leading-4 text-mist ring-1 ring-[#ecece8]">
          atelier.nl
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="max-w-full overflow-hidden bg-ink text-white">
          <div className="shop-marquee flex w-max">
            {[0, 1].map((copy) => (
              <p key={copy} className="px-3 py-1 text-[8px] font-semibold tracking-[0.16em]">
                {ticker}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-b border-[#f0f0ee] px-3 py-1.5">
          <p className="text-[12px] font-semibold tracking-tight text-ink">Atelier</p>
          <p className="text-[9px] text-mist">Nieuw</p>
          <p className="text-[9px] text-mist">Shop</p>
          <p className="text-[9px] text-mist">Over</p>
          <span className="ml-auto rounded-full bg-ink px-1.5 py-0.5 text-[8px] font-semibold text-white">
            Tas 3
          </span>
        </div>
        <div className="grid grid-cols-[1.15fr_0.85fr] items-center gap-2 bg-[#f3f6f3] px-3 py-2.5">
          <div>
            <p className="text-[8px] font-semibold tracking-[0.16em] text-brand">HOMEPAGE</p>
            <p className="mt-1 text-[15px] leading-none font-semibold tracking-tight text-ink sm:text-lg">
              Geluid, dichtbij.
            </p>
            <p className="mt-1.5 text-[9px] leading-4 text-mist">
              Nieuwe apparaten. Vandaag besteld, morgen in huis.
            </p>
            <span className="mt-2 inline-flex rounded-full bg-brand px-2 py-1 text-[8px] font-semibold text-white">
              Shop de collectie
            </span>
          </div>
          <div className="shop-float relative h-16 overflow-hidden rounded-lg shadow-[0_12px_24px_-16px_rgba(0,0,0,0.45)] sm:h-20">
            {heroes.map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className="shop-hero absolute inset-0 h-full w-full object-cover"
                style={{ animationDelay: `${index * -3}s` }}
              />
            ))}
          </div>
        </div>
        <div className="px-3 pt-2">
          <p className="text-[10px] font-semibold text-ink">De collectie</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {products.map((product) => (
              <div key={product.name} className="min-w-0 rounded-md bg-white p-1 ring-1 ring-[#ecece8]">
                <img src={product.src} alt="" className="h-9 w-full rounded-[3px] object-cover sm:h-11" />
                <p className="mt-1 truncate text-[8px] leading-3 font-medium text-ink">{product.name}</p>
                <p className="text-[8px] leading-3 font-semibold text-ink">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-3 mt-2 mb-2 flex items-center justify-between rounded-lg bg-ink px-2.5 py-1.5 text-white">
          <div>
            <p className="text-[8px] text-white/55">Winkelwagen</p>
            <p className="text-[10px] font-semibold">3 artikelen · € 457</p>
          </div>
          <span className="rounded-full bg-brand px-2 py-1 text-[8px] font-semibold">Afrekenen</span>
        </div>
      </div>
    </div>
  )
}
