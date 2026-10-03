import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { Search } from "lucide-react"
import Link from "next/link"

const rooms = ["/webshop/aura-living-room.jpg", "/webshop/aura-living-close.jpg"]

const products = [
  { name: "Modern armchair", price: "€499.90", src: "/webshop/aura-armchair.jpg" },
  { name: "Ceramic vase", price: "€175.80", src: "/webshop/aura-vase.jpg" },
  { name: "100% linen", price: "€179.90", src: "/webshop/aura-linen.jpg" },
  { name: "Wire frame chair", price: "€179.90", src: "/webshop/aura-wire-chair.jpg" },
]

const decor = [
  { name: "Linen pillows", price: "€89.00", src: "/webshop/aura-pillows.jpg" },
  { name: "Oak floor lamp", price: "€249.00", src: "/webshop/aura-lamp.jpg" },
  { name: "Stoneware vase", price: "€175.80", src: "/webshop/aura-vase.jpg" },
  { name: "Linen throw", price: "€179.90", src: "/webshop/aura-linen.jpg" },
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
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white text-ink">
      <div className="relative shrink-0 border-b border-[#eeeae4] px-[2.2cqw] pt-[1.5cqw] pb-[1cqw]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div />
          <div className="px-[1cqw] text-center">
            <p className="text-[clamp(13px,2.8cqw,24px)] leading-none font-semibold tracking-[0.28em]">
              AURA
            </p>
            <p className="mt-[0.4cqw] text-[clamp(7px,1.15cqw,11px)] tracking-[0.42em] text-mist">
              LIVING
            </p>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex h-[3.2cqw] min-h-4 w-[16cqw] min-w-14 items-center gap-[0.7cqw] rounded-full bg-[#f4f4f1] px-[1.1cqw] text-mist ring-1 ring-[#ecece8]">
              <Search className="size-[clamp(9px,1.5cqw,13px)] shrink-0" aria-hidden />
              <span className="truncate text-[clamp(7px,1.3cqw,11px)]">Search</span>
            </div>
          </div>
        </div>
        <p className="mt-[1.1cqw] flex items-center justify-center gap-[1.6cqw] text-[clamp(6px,1.15cqw,11px)] font-semibold tracking-[0.12em] text-mist uppercase">
          {nav.map((item, index) => (
            <span
              key={item}
              className="aura-nav-item whitespace-nowrap"
              style={{ animationDelay: `${index * -3}s` }}
            >
              {item}
            </span>
          ))}
        </p>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="shop-page absolute inset-0">
          <div className="flex h-full flex-col px-[2cqw] pt-[1.3cqw] pb-[1cqw]">
            <div className="relative min-h-0 flex-[1.15] overflow-hidden rounded-[1cqw] bg-[#f3f1ec]">
              {rooms.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="aura-scene absolute inset-0 h-full w-full object-cover"
                  style={{ animationDelay: `${index * -9}s, ${index * -6}s` }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-brand px-[2.2cqw] py-[0.85cqw] text-[clamp(8px,1.5cqw,13px)] font-semibold tracking-wide text-white shadow-[0_10px_24px_-12px_rgba(22,163,74,0.9)]">
                  SHOP PILLOWS
                </span>
              </div>
              <p className="aura-toast absolute bottom-[1.1cqw] left-[1.2cqw] rounded-full bg-ink/90 px-[1.4cqw] py-[0.45cqw] text-[clamp(7px,1.15cqw,11px)] font-medium text-white">
                Modern armchair added
              </p>
            </div>
            <div className="mt-[1.1cqw] grid min-h-0 flex-1 grid-cols-4 gap-[1.1cqw]">
              {products.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="shop-page shop-page-late absolute inset-0">
          <div className="flex h-full flex-col px-[2cqw] pt-[1.3cqw] pb-[1cqw]">
            <div className="relative min-h-0 flex-[1.15] overflow-hidden rounded-[1cqw] bg-[#f3f1ec]">
              <img
                src="/webshop/aura-living-close.jpg"
                alt=""
                className="aura-drift absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-brand px-[2.2cqw] py-[0.85cqw] text-[clamp(8px,1.5cqw,13px)] font-semibold tracking-wide text-white shadow-[0_10px_24px_-12px_rgba(22,163,74,0.9)]">
                  SHOP THROWS
                </span>
              </div>
              <p className="aura-toast absolute bottom-[1.1cqw] left-[1.2cqw] rounded-full bg-ink/90 px-[1.4cqw] py-[0.45cqw] text-[clamp(7px,1.15cqw,11px)] font-medium text-white [animation-delay:-4.5s]">
                Linen pillows added
              </p>
            </div>
            <div className="mt-[1.1cqw] grid min-h-0 flex-1 grid-cols-4 gap-[1.1cqw]">
              {decor.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index + 2} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="shrink-0 px-[2cqw] pb-[0.65cqw] text-[clamp(8px,1.35cqw,12px)] leading-none font-semibold tracking-wide text-brand">
        JR
      </p>
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
    <article className="flex h-full min-h-0 flex-col rounded-[0.8cqw] bg-white p-[0.7cqw] ring-1 ring-[#e7e7e2]">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="flex aspect-square max-h-full w-full items-center justify-center overflow-hidden rounded-[0.5cqw] bg-[#f4f3f0]">
          <img
            src={product.src}
            alt=""
            className="aura-photo h-[88%] w-[88%] object-contain"
            style={{ animationDelay: `${index * -1.4}s` }}
          />
        </div>
      </div>
      <p className="mt-[0.4cqw] truncate text-[clamp(7px,1.25cqw,12px)] leading-tight font-medium">
        {product.name}
      </p>
      <p className="text-[clamp(7px,1.15cqw,11px)] leading-tight font-semibold">{product.price}</p>
      <span className="mt-[0.4cqw] block shrink-0 rounded-full bg-brand py-[0.4cqw] text-center text-[clamp(6px,1.05cqw,10px)] font-semibold tracking-wide whitespace-nowrap text-white">
        ADD TO CART
      </span>
    </article>
  )
}
