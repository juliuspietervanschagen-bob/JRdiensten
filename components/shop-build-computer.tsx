"use client"

import { cn } from "cn"
import { useEffect, useState } from "react"

const stages = [
  { label: "Leeg scherm" },
  { label: "De bovenbalk" },
  { label: "De producten" },
  { label: "De winkelwagen" },
  { label: "De shop is live" },
] as const

const STAGE_MS = [1300, 1500, 2800, 1700, 2300]

const products = [
  { name: "Koptelefoon", price: "€ 79", src: "/webshop/tech-headphones.jpg" },
  { name: "Telefoon", price: "€ 249", src: "/webshop/tech-phone.jpg" },
  { name: "Horloge", price: "€ 129", src: "/webshop/tech-watch.jpg" },
  { name: "Speaker", price: "€ 49", src: "/webshop/tech-speaker.jpg" },
  { name: "Oortjes", price: "€ 39", src: "/webshop/tech-earbuds.jpg" },
  { name: "Toetsenbord", price: "€ 59", src: "/webshop/tech-keyboard.jpg" },
]

export function ShopBuildComputer() {
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

  const stage = reduce ? stages.length - 1 : index

  useEffect(() => {
    if (reduce || paused) return
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % stages.length)
    }, STAGE_MS[index])
    return () => window.clearTimeout(timer)
  }, [index, paused, reduce])

  const showHeader = stage >= 1
  const showProducts = stage >= 2
  const showCart = stage >= 3
  const showLive = stage >= 4

  return (
    <div
      className="mt-10 min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-brand">
        ZO WORDT EEN WEBSHOP GEBOUWD
      </p>
      <div
        className="mt-3"
        role="region"
        aria-roledescription="animatie"
        aria-label="Een webshop die op het scherm wordt opgebouwd"
      >
        <div className="rounded-[1.15rem] bg-gradient-to-b from-[#e6e7eb] to-[#b7b9be] p-[8px] pb-5 shadow-[0_28px_50px_-28px_rgba(0,0,0,0.65)]">
          <div className="overflow-hidden rounded-[0.8rem] bg-[#1a1a1a] p-[6px]">
            <div className="relative aspect-square overflow-hidden rounded-[0.5rem] bg-paper">
              <div className="absolute top-1.5 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2a2a2a]" />
              <ShopScreen
                showHeader={showHeader}
                showProducts={showProducts}
                showCart={showCart}
                showLive={showLive}
                reduce={reduce}
              />
            </div>
          </div>
          <div className="relative mt-1.5 flex justify-center">
            <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_#16a34a]" aria-hidden />
          </div>
        </div>
        <div className="-mt-1 flex flex-col items-center" aria-hidden>
          <div
            className="h-5 w-16 bg-gradient-to-b from-[#c5c6ca] to-[#a4a6ab]"
            style={{ clipPath: "polygon(22% 0, 78% 0, 100% 100%, 0 100%)" }}
          />
          <div className="h-2 w-[52%] rounded-full bg-gradient-to-b from-[#b5b6bb] to-[#8d8f95] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.8)]" />
        </div>

        <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/15">
          <div
            className={cn(
              "h-full bg-brand",
              !reduce && stage !== 0 && "transition-[width] duration-700 ease-out",
            )}
            style={{ width: `${(stage / (stages.length - 1)) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-white/70" aria-live="polite">
            {stages[stage].label}
          </p>
          <div className="flex gap-1.5">
            {stages.map((item, stageIndex) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                aria-current={stageIndex === stage ? "true" : undefined}
                onClick={() => setIndex(stageIndex)}
                className={cn(
                  "size-1.5 rounded-full",
                  stageIndex === stage ? "bg-brand" : "bg-white/30",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ShopScreen({
  showHeader,
  showProducts,
  showCart,
  showLive,
  reduce,
}: {
  showHeader: boolean
  showProducts: boolean
  showCart: boolean
  showLive: boolean
  reduce: boolean
}) {
  const motion = reduce ? "" : "transition duration-500 ease-out"

  return (
    <div className="flex h-full flex-col pt-3">
      <div className="flex items-center gap-1.5 border-b border-[#ecece8] px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-[#ecece8]" />
        <span className="size-1.5 rounded-full bg-brand" />
        <span className="ml-1 h-3 flex-1 rounded-full bg-white ring-1 ring-[#ecece8] px-2 text-[8px] leading-3 text-mist">
          atelier.nl
        </span>
      </div>

      <div className="relative mx-2 mt-2 h-6">
        <div
          className={cn(
            "absolute inset-0 flex items-center gap-2",
            motion,
            showHeader ? "opacity-0" : "opacity-100",
          )}
          aria-hidden
        >
          <span className="shop-shimmer h-2 w-14 rounded-full bg-[#e4e4df]" />
          <span className="shop-shimmer h-2 w-10 rounded-full bg-[#ecece8]" />
          <span className="shop-shimmer ml-auto size-3.5 rounded-full bg-[#e4e4df]" />
        </div>
        <div
          className={cn(
            "absolute inset-0 flex items-center gap-2",
            motion,
            showHeader ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <p className="text-[11px] font-semibold tracking-tight text-ink">Atelier</p>
          <p className="text-[8px] text-mist">Shop</p>
          <p className="text-[8px] text-mist">Contact</p>
          <span
            className={cn(
              "ml-auto rounded-full bg-[#eef8f1] px-1.5 py-0.5 text-[8px] font-semibold text-brand",
              motion,
              showLive ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
          >
            Live
          </span>
          <span className="relative grid size-4 place-items-center rounded-full bg-[#f3f3f1] text-ink">
            <BagIcon />
            <span
              className={cn(
                "absolute -top-1 -right-1 grid min-w-3 place-items-center rounded-full bg-brand px-0.5 text-[7px] font-semibold text-white",
                motion,
                showCart ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
            >
              3
            </span>
          </span>
        </div>
      </div>

      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-3 content-start gap-1.5 px-2 pt-1 pb-11">
        {products.map((product, productIndex) => (
          <ProductTile
            key={product.name}
            product={product}
            show={showProducts}
            delay={productIndex * 140}
            reduce={reduce}
          />
        ))}
      </div>

      <div
        className={cn(
          "absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-lg bg-ink px-2 py-1 text-white shadow-lg",
          motion,
          showCart ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <div className="min-w-0">
          <p className="text-[8px] leading-3 text-white/55">Winkelwagen</p>
          <p className="truncate text-[10px] leading-3 font-semibold">3 artikelen · € 457</p>
        </div>
        <span className="rounded-full bg-brand px-2 py-1 text-[8px] font-semibold">Afrekenen</span>
      </div>
    </div>
  )
}

function ProductTile({
  product,
  show,
  delay,
  reduce,
}: {
  product: (typeof products)[number]
  show: boolean
  delay: number
  reduce: boolean
}) {
  const motion = reduce ? "" : "transition duration-500 ease-out"

  return (
    <div className="min-w-0 rounded-md bg-white p-1 ring-1 ring-[#ecece8]">
      <div className="relative h-12 overflow-hidden rounded-[4px] bg-[#ecece8] sm:h-16">
        <span className={cn("shop-shimmer absolute inset-0", show && "opacity-0")} aria-hidden />
        <img
          src={product.src}
          alt=""
          className={cn(
            "size-full object-cover",
            motion,
            show ? "scale-100 opacity-100" : "scale-105 opacity-0",
          )}
          style={{ transitionDelay: reduce || !show ? "0ms" : `${delay}ms` }}
        />
      </div>
      <div className="relative mt-1 h-3">
        <span
          className={cn(
            "shop-shimmer absolute inset-x-0 top-0.5 h-1.5 rounded-full bg-[#e4e4df]",
            motion,
            show ? "opacity-0" : "opacity-100",
          )}
          aria-hidden
        />
        <p
          className={cn(
            "truncate text-[8px] leading-3 font-medium text-ink",
            motion,
            show ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: reduce || !show ? "0ms" : `${delay + 80}ms` }}
        >
          {product.name}
        </p>
      </div>
      <p
        className={cn(
          "text-[8px] leading-3 font-semibold text-ink",
          motion,
          show ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDelay: reduce || !show ? "0ms" : `${delay + 120}ms` }}
      >
        {product.price}
      </p>
    </div>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-2.5" fill="none" aria-hidden>
      <path
        d="M4.5 6.5h7l-.6 6.2a1 1 0 0 1-1 .8H6.1a1 1 0 0 1-1-.8L4.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M6 6.5V5a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
