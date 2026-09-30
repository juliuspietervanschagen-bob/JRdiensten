"use client"

import { Container } from "@/components/container"
import { cn } from "cn"
import { useEffect, useRef, useState } from "react"

const prompts = [
  "Bouw een webshop voor Atelier.",
  "Zet er zes producten in, elk met een prijs.",
  "Voeg een winkelwagen toe en zet de shop live.",
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
const promptLength = prompts.reduce((total, item) => total + item.length, 0)

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

export function ShopBuildComputer() {
  return (
    <section className="py-16 sm:py-20" aria-label="De bouw van de webshop">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              DE BOUW
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Eerst de prompt, dan de code
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-mist sm:text-base sm:leading-7">
              Je zegt wat de shop moet kunnen. Op het scherm verschijnen die prompts, daarna de
              code, en dan de winkel zelf.
            </p>
          </div>
          <Builder />
        </div>
      </Container>
    </section>
  )
}

function Builder() {
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
      const current = prompts[promptStep] ?? ""
      if (charIndex < current.length) {
        const timer = window.setTimeout(() => setCharIndex((value) => value + 1), 32)
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
    }, 4600)
    return () => window.clearTimeout(timer)
  }, [phase, promptStep, charIndex, codeIndex, paused, reduce])

  useEffect(() => {
    const node = codeRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [codeIndex, phase])

  const view = reduce ? "shop" : phase
  const written = prompts.slice(0, promptStep).join("").length + (phase === "prompt" ? charIndex : 0)
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
      setCharIndex(prompts[prompts.length - 1].length)
      setCodeIndex(0)
    }
    setPhase(next)
  }

  return (
    <div
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-[0.5rem] bg-paper sm:aspect-[16/10]">
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
  return (
    <div className="flex h-full flex-col px-4 pt-6 pb-4 sm:px-6 sm:pt-7">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">PROMPTS</p>
      <div className="mt-3 space-y-2">
        {prompts.map((prompt, index) => {
          if (index > step) return null
          const shown = index < step ? prompt : prompt.slice(0, charIndex)
          return (
            <div key={prompt} className="rounded-xl bg-white px-3 py-2 ring-1 ring-[#ecece8]">
              <p className="text-[9px] font-semibold tracking-[0.14em] text-mist">PROMPT</p>
              <p className="mt-1 text-[12px] leading-5 text-ink sm:text-[13px]">
                {shown}
                {index === step ? <Caret /> : null}
              </p>
            </div>
          )
        })}
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
    <div className="flex h-full flex-col bg-[#fbfbfa] pt-3">
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

function ShopScreen() {
  return (
    <div className="flex h-full flex-col bg-paper pt-3">
      <div className="flex items-center gap-1.5 border-b border-[#ecece8] px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-brand" />
        <span className="ml-1 h-4 flex-1 rounded-full bg-white px-2 text-[9px] leading-4 text-mist ring-1 ring-[#ecece8]">
          atelier.nl
        </span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2">
        <p className="text-[13px] font-semibold text-ink">Atelier</p>
        <p className="text-[10px] text-mist">Shop</p>
        <span className="ml-auto rounded-full bg-[#eef8f1] px-1.5 py-0.5 text-[9px] font-semibold text-brand">
          Live
        </span>
      </div>
      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-3 content-start gap-1.5 px-3">
        {products.map((product) => (
          <div key={product.name} className="min-w-0 rounded-md bg-white p-1 ring-1 ring-[#ecece8]">
            <img
              src={product.src}
              alt=""
              className="h-8 w-full rounded-[3px] object-cover sm:h-12"
            />
            <p className="mt-1 truncate text-[9px] leading-3 font-medium text-ink">{product.name}</p>
            <p className="text-[9px] leading-3 font-semibold text-ink">{product.price}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-1 mb-2 flex items-center justify-between gap-2 rounded-lg bg-ink px-2.5 py-1.5 text-white">
        <p className="truncate text-[10px] font-semibold">3 artikelen · € 457</p>
        <span className="rounded-full bg-brand px-2 py-1 text-[9px] font-semibold">Afrekenen</span>
      </div>
    </div>
  )
}
