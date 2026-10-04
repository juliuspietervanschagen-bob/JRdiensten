import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { Check, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"

const serenity = [
  { name: "Linen Pillows", price: "€89.00", src: "/webshop/aura-pillows.jpg" },
  { name: "Oak Floor Lamp", price: "€249.00", src: "/webshop/aura-lamp.jpg" },
  { name: "Stoneware Vase", price: "€175.80", src: "/webshop/aura-vase.jpg" },
  { name: "Linen Throw", price: "€179.90", src: "/webshop/aura-linen.jpg" },
]

const evening = [
  { name: "Modern Armchair", price: "€499.90", src: "/webshop/aura-armchair.jpg" },
  { name: "Wire Frame Chair", price: "€179.90", src: "/webshop/aura-wire-chair.jpg" },
  { name: "Ceramic Vase", price: "€175.80", src: "/webshop/aura-vase.jpg" },
  { name: "100% Linen", price: "€179.90", src: "/webshop/aura-linen.jpg" },
]

const nav = ["Home", "Furniture", "Decor", "Kitchen", "Gift guide"]

export function WebshopHero({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden pt-8 pb-8 sm:pt-12 sm:pb-12">
      <Container>
        <p className="text-sm text-mist">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{service.title}</span>
        </p>
        <p className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
          <span className="h-px w-8 bg-brand" />
          WEBSHOP
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
          {service.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
          We bouwen een shop waarin klanten het product zien, vertrouwen en afrekenen.
        </p>

        <div
          className="shop-stage relative mt-10 overflow-hidden rounded-[1.75rem] bg-[#c8c8c4] ring-1 ring-black/5"
          aria-label="Laptop met een lopende webshop"
        >
          <div className="absolute inset-x-0 top-0 h-[42%] bg-[#b7b7b3]" />
          <div className="absolute inset-x-0 top-[42%] h-px bg-white/50" />
          <div className="relative mx-auto w-full max-w-[940px] px-3 pt-8 pb-6 sm:px-6 sm:pt-11 sm:pb-8">
            <div className="rounded-[1.2rem] bg-gradient-to-b from-[#f2f2f4] via-[#c5c6cb] to-[#8f9197] p-[8px] pb-3.5 shadow-[0_36px_60px_-32px_rgba(0,0,0,0.62)] sm:p-[10px] sm:pb-4">
              <div className="relative overflow-hidden rounded-[0.72rem] bg-[#121212] p-[5px] sm:p-[6px]">
                <span className="absolute top-[7px] left-1/2 z-10 size-1.5 -translate-x-1/2 rounded-full bg-[#2c2c2c] ring-1 ring-white/10" />
                <div className="@container relative aspect-[5/4] w-full min-w-0 overflow-hidden rounded-[0.42rem] bg-white sm:aspect-[16/10]">
                  <ShopScreen />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center" aria-hidden>
              <div className="h-1.5 w-[16%] bg-gradient-to-b from-[#8d8f95] to-[#6f7176]" />
              <div className="-mt-px w-[104%] rounded-b-[1.15rem] bg-gradient-to-b from-[#e7e8ec] via-[#c9cacf] to-[#a6a8ae] px-[8%] pt-2 pb-2.5 shadow-[0_20px_28px_-16px_rgba(0,0,0,0.7)] sm:pt-2.5 sm:pb-3">
                <div className="h-6 rounded-[0.4rem] bg-[#b9babf] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_2px_rgba(0,0,0,0.12)] sm:h-7" />
                <div className="mx-auto mt-1.5 h-4 w-[24%] rounded-[0.35rem] bg-[#c3c4c9] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:h-5" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ShopScreen() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#f6f3ec] text-[#2c2a26]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 8% 0%, rgba(255,255,255,0.85), transparent 36%), radial-gradient(ellipse at 100% 100%, rgba(214,204,184,0.45), transparent 42%)",
        }}
      />
      <svg
        className="pointer-events-none absolute right-[-6%] bottom-[-18%] h-[46%] w-[54%] text-[#e4dcc8]"
        viewBox="0 0 240 120"
        aria-hidden
      >
        <path d="M10 90 C 70 20, 150 110, 230 30" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <path d="M30 110 C 90 40, 160 120, 230 55" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <header className="relative z-10 shrink-0 px-[2.2cqw] pt-[1.35cqw] pb-[0.7cqw]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div />
          <div className="relative px-[2cqw] text-center">
            <svg
              viewBox="0 0 140 78"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[9cqw] w-[16cqw] -translate-x-1/2 -translate-y-1/2 text-[#ddd4c2]"
              aria-hidden
            >
              <circle cx="70" cy="39" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <circle cx="70" cy="39" r="22" fill="none" stroke="currentColor" strokeWidth="0.45" />
              <path d="M70 8 V70 M28 39 H112" fill="none" stroke="currentColor" strokeWidth="0.4" />
              <path d="M42 16 A 36 36 0 0 1 98 16" fill="none" stroke="currentColor" strokeWidth="0.4" />
            </svg>
            <p className="font-serif text-[clamp(13px,2.7cqw,26px)] leading-none tracking-[0.22em]">AURA</p>
            <p className="mt-[0.35cqw] text-[clamp(6px,0.95cqw,10px)] tracking-[0.48em] text-[#8d877c]">LIVING</p>
          </div>
          <div className="flex items-center justify-end gap-[1.1cqw]">
            <div className="flex h-[3.1cqw] min-h-4 w-[15cqw] min-w-14 items-center gap-[0.6cqw] rounded-full bg-white/80 px-[1cqw] text-[#8d877c] ring-1 ring-[#e6e0d4]">
              <Search className="size-[clamp(8px,1.35cqw,12px)] shrink-0" aria-hidden />
              <span className="truncate text-[clamp(6px,1.1cqw,10px)]">Search</span>
            </div>
            <span className="relative text-[#3a3834]">
              <ShoppingCart className="size-[clamp(10px,1.7cqw,15px)]" aria-hidden />
              <span className="absolute -top-[0.85cqw] -right-[1cqw] grid min-h-[1.7cqw] min-w-[1.7cqw] place-items-center rounded-full bg-brand px-[0.25cqw] text-[clamp(6px,0.85cqw,9px)] leading-none font-semibold text-white">
                1
              </span>
            </span>
          </div>
        </div>
        <p className="mt-[0.9cqw] flex items-center justify-center gap-[1.7cqw] text-[clamp(6px,1.05cqw,11px)] tracking-[0.14em] text-[#8d877c] uppercase">
          {nav.map((item, index) => (
            <span
              key={item}
              className="aura-nav-item whitespace-nowrap"
              style={{ animationDelay: `${index * -3.2}s` }}
            >
              {item}
            </span>
          ))}
        </p>
      </header>

      <div className="relative z-10 min-h-0 flex-1 overflow-hidden">
        <ShopPage
          title="Discover Curated Serenity"
          heroes={["/webshop/aura-hero-sofa.jpg", "/webshop/aura-living-close.jpg"]}
          toast={{ name: "Linen Pillows", src: "/webshop/aura-pillows.jpg" }}
          products={serenity}
        />
        <ShopPage
          late
          title="Evening light, considered"
          heroes={["/webshop/aura-living-room.jpg"]}
          toast={{ name: "Modern Armchair", src: "/webshop/aura-armchair.jpg", delay: "-4.5s" }}
          products={evening}
          photoOffset={2}
        />
      </div>

      <p className="relative z-10 shrink-0 px-[2cqw] pb-[0.55cqw] text-[clamp(8px,1.25cqw,12px)] leading-none font-semibold tracking-wide">
        JR
      </p>
    </div>
  )
}

function ShopPage({
  late,
  title,
  heroes,
  toast,
  products,
  photoOffset = 0,
}: {
  late?: boolean
  title: string
  heroes: string[]
  toast: { name: string; src: string; delay?: string }
  products: { name: string; price: string; src: string }[]
  photoOffset?: number
}) {
  return (
    <div className={`shop-page absolute inset-0 ${late ? "shop-page-late" : ""}`}>
      <div className="flex h-full flex-col px-[1.8cqw] pt-[0.4cqw] pb-[0.7cqw]">
        <div className="relative min-h-0 flex-[1.12] overflow-hidden rounded-[1cqw] bg-[#ece7df]">
          {heroes.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`${heroes.length > 1 ? "aura-scene" : "aura-drift"} absolute inset-0 h-full w-full object-cover`}
              style={heroes.length > 1 ? { animationDelay: `${index * -9}s, ${index * -6}s` } : undefined}
            />
          ))}
          <p className="absolute bottom-[1.15cqw] left-[1.4cqw] font-serif text-[clamp(11px,2.15cqw,22px)] leading-none text-white drop-shadow-[0_1px_8px_rgba(40,30,20,0.35)]">
            {title}
          </p>
          <div
            className="aura-toast absolute top-[0.9cqw] right-[0.9cqw] flex max-w-[46%] items-center gap-[0.7cqw] rounded-[0.8cqw] bg-white py-[0.45cqw] pr-[0.7cqw] pl-[0.5cqw] shadow-[0_10px_24px_-16px_rgba(30,24,16,0.7)] ring-1 ring-black/5"
            style={toast.delay ? { animationDelay: toast.delay } : undefined}
          >
            <img src={toast.src} alt="" className="size-[3.3cqw] shrink-0 rounded-[0.4cqw] object-cover" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[clamp(7px,1.15cqw,11px)] font-semibold">{toast.name}</span>
              <span className="block truncate text-[clamp(6px,0.95cqw,10px)] text-[#8d877c]">added to bag</span>
            </span>
            <span className="grid size-[2.1cqw] shrink-0 place-items-center rounded-full bg-brand text-white">
              <Check className="size-[1.15cqw]" aria-hidden />
            </span>
          </div>
        </div>
        <div className="mt-[1cqw] grid min-h-0 flex-1 grid-cols-4 gap-[0.9cqw]">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index + photoOffset} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  index,
}: {
  product: { name: string; price: string; src: string }
  index: number
}) {
  return (
    <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-[0.9cqw] bg-white shadow-[0_10px_22px_-18px_rgba(40,32,18,0.55)] ring-1 ring-[#e7e1d6]">
      <div className="m-[0.55cqw] flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[0.6cqw] bg-[#f3f0ea]">
        <img
          src={product.src}
          alt=""
          className="aura-photo h-[92%] w-[92%] object-contain"
          style={{ animationDelay: `${index * -1.4}s` }}
        />
      </div>
      <p className="truncate px-[0.7cqw] text-[clamp(7px,1.15cqw,12px)] leading-tight">{product.name}</p>
      <p className="px-[0.7cqw] text-[clamp(7px,1.05cqw,11px)] leading-tight font-semibold">{product.price}</p>
      <span className="mx-[0.55cqw] mt-[0.35cqw] mb-[0.55cqw] block shrink-0 rounded-[0.4cqw] bg-[linear-gradient(90deg,#3e5c38,#8c9a5e)] py-[0.38cqw] text-center text-[clamp(5px,0.95cqw,10px)] font-semibold tracking-wide whitespace-nowrap text-white">
        + ADD TO CART
      </span>
    </article>
  )
}
