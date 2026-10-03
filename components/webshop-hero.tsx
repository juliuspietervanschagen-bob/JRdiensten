import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import { Search, ShoppingBag } from "lucide-react"
import Link from "next/link"

const scenes = [
  { src: "/webshop/tech-headphones.jpg", name: "Koptelefoon" },
  { src: "/webshop/tech-watch.jpg", name: "Horloge" },
  { src: "/webshop/tech-speaker.jpg", name: "Speaker" },
  { src: "/webshop/tech-phone.jpg", name: "Telefoon" },
  { src: "/webshop/tech-earbuds.jpg", name: "Oortjes" },
  { src: "/webshop/tech-keyboard.jpg", name: "Toetsenbord" },
]

const products = [
  { name: "Koptelefoon", price: "€ 79", src: "/webshop/tech-headphones.jpg" },
  { name: "Horloge", price: "€ 129", src: "/webshop/tech-watch.jpg" },
  { name: "Speaker", price: "€ 49", src: "/webshop/tech-speaker.jpg" },
  { name: "Telefoon", price: "€ 249", src: "/webshop/tech-phone.jpg" },
  { name: "Oortjes", price: "€ 39", src: "/webshop/tech-earbuds.jpg" },
  { name: "Toetsenbord", price: "€ 59", src: "/webshop/tech-keyboard.jpg" },
]

const nav = ["Home", "Audio", "Draagbaar", "Werk", "Cadeau"]

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
          We bouwen een shop waarin klanten het product zien, vertrouwen en afrekenen. Assortiment,
          verzending en betalen komen in één geheel.
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
      <div className="relative shrink-0 border-b border-[#eeeae4] px-[2.6cqw] pt-[1.8cqw] pb-[1.2cqw]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <div className="flex h-[3.6cqw] min-h-4 w-[18cqw] min-w-16 items-center gap-[0.8cqw] rounded-full bg-[#f4f4f1] px-[1.2cqw] text-mist ring-1 ring-[#ecece8]">
              <Search className="size-[clamp(9px,1.6cqw,14px)] shrink-0" aria-hidden />
              <span className="truncate text-[clamp(8px,1.45cqw,12px)]">Zoeken</span>
            </div>
          </div>
          <div className="px-[1cqw] text-center">
            <p className="text-[clamp(12px,2.7cqw,22px)] leading-none font-semibold tracking-[0.22em]">
              ATELIER
            </p>
            <p className="mt-[0.45cqw] text-[clamp(7px,1.15cqw,10px)] tracking-[0.28em] text-mist uppercase">
              collectie
            </p>
          </div>
          <div className="flex items-center justify-end">
            <span className="relative grid size-[clamp(16px,3.2cqw,28px)] place-items-center rounded-full text-ink">
              <ShoppingBag className="size-[clamp(11px,2cqw,16px)]" aria-hidden />
              <span className="absolute -top-0.5 -right-0.5 grid min-w-3.5 place-items-center rounded-full bg-brand px-1 text-[8px] font-semibold text-white">
                2
              </span>
            </span>
          </div>
        </div>
        <p className="mt-[1.3cqw] flex items-center justify-center gap-[2.2cqw] text-[clamp(7px,1.35cqw,11px)] font-semibold tracking-[0.16em] text-mist uppercase">
          {nav.map((item) => (
            <span key={item} className={item === "Home" ? "text-ink" : undefined}>
              {item}
            </span>
          ))}
        </p>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="shop-page absolute inset-0">
          <div className="flex h-full flex-col px-[2.2cqw] pt-[1.5cqw] pb-[1.2cqw]">
            <div className="relative min-h-0 flex-[1.15] overflow-hidden rounded-[1cqw] bg-[#f3f3f1]">
              {scenes.map((scene, index) => (
                <img
                  key={scene.src}
                  src={scene.src}
                  alt=""
                  className="shop-scene absolute inset-0 h-full w-full object-cover"
                  style={{ animationDelay: `${index * -4.67}s, ${index * -3.2}s` }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-brand px-[2.4cqw] py-[0.9cqw] text-[clamp(8px,1.6cqw,13px)] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(22,163,74,0.9)]">
                  Shop audio
                </span>
              </div>
            </div>
            <div className="mt-[1.3cqw] grid min-h-0 flex-1 grid-cols-4 gap-[1.2cqw]">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="shop-page shop-page-late absolute inset-0">
          <div className="flex h-full flex-col px-[2.2cqw] pt-[1.5cqw] pb-[1.2cqw]">
            <div className="flex shrink-0 items-center justify-between gap-[1.4cqw] rounded-[0.8cqw] bg-[#f6f6f4] px-[1.6cqw] py-[1cqw] ring-1 ring-[#ecece8]">
              <div className="min-w-0">
                <p className="text-[clamp(7px,1.15cqw,10px)] font-semibold tracking-[0.16em] text-brand">
                  LIVE
                </p>
                <p className="truncate text-[clamp(8px,1.5cqw,13px)] font-semibold">
                  Order 1842 is onderweg
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-ink px-[1.5cqw] py-[0.65cqw] text-[clamp(7px,1.2cqw,11px)] font-semibold text-white">
                Afrekenen
              </span>
            </div>
            <div className="mt-[1.3cqw] grid min-h-0 flex-1 grid-cols-4 gap-[1.2cqw]">
              {products.slice(2).map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="shrink-0 px-[2.2cqw] pb-[0.7cqw] text-[clamp(8px,1.35cqw,12px)] leading-none font-semibold tracking-wide text-brand">
        JR
      </p>
    </div>
  )
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <article className="flex h-full min-h-0 flex-col rounded-[0.8cqw] bg-white p-[0.8cqw] ring-1 ring-[#e7e7e2]">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="flex aspect-square max-h-full w-full items-center justify-center overflow-hidden rounded-[0.5cqw] bg-[#f6f6f4]">
          <img src={product.src} alt="" className="h-[86%] w-[86%] object-contain" />
        </div>
      </div>
      <p className="mt-[0.45cqw] truncate text-[clamp(7px,1.35cqw,12px)] leading-tight font-medium">
        {product.name}
      </p>
      <p className="text-[clamp(7px,1.25cqw,12px)] leading-tight font-semibold">{product.price}</p>
      <span className="mt-[0.45cqw] block shrink-0 rounded-full bg-brand py-[0.45cqw] text-center text-[clamp(7px,1.15cqw,11px)] font-semibold whitespace-nowrap text-white">
        In de tas
      </span>
    </article>
  )
}
