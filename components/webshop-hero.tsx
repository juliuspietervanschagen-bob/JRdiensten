import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import Link from "next/link"

const scenes = [
  { src: "/webshop/tech-headphones.jpg", name: "Koptelefoon" },
  { src: "/webshop/tech-watch.jpg", name: "Horloge" },
  { src: "/webshop/tech-speaker.jpg", name: "Speaker" },
  { src: "/webshop/tech-phone.jpg", name: "Telefoon" },
  { src: "/webshop/tech-earbuds.jpg", name: "Oortjes" },
  { src: "/webshop/tech-keyboard.jpg", name: "Toetsenbord" },
]

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
          className="relative mt-10 h-[460px] overflow-hidden rounded-[1.75rem] bg-[#eceae6] ring-1 ring-black/5 sm:h-[560px]"
          aria-label="Voorbeeld van een webshop"
        >
          {scenes.map((scene, index) => (
            <img
              key={scene.src}
              src={scene.src}
              alt=""
              className="shop-scene absolute inset-0 h-full w-full object-cover"
              style={{ animationDelay: `${index * -4.67}s, ${index * -3.2}s` }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/80" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
            <p className="text-sm font-semibold tracking-tight text-ink">Atelier</p>
            <p className="hidden gap-6 text-xs text-ink/70 sm:flex">
              <span>Nieuw</span>
              <span>Shop</span>
              <span>Over</span>
            </p>
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">
              Tas 2
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-center sm:pb-10">
            <p className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Het product, helder in beeld.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/70 sm:text-base">
              Een shop die laat zien wat je verkoopt, en daarna laat afrekenen.
            </p>
            <span className="mt-5 inline-flex rounded-full border border-ink/15 bg-white/80 px-4 py-2 text-sm font-medium text-ink backdrop-blur-sm">
              Atelier collectie
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
