import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import { DeviceShowcase } from "@/components/device-showcase"
import { formatFromPrice, services, type ServiceSlug } from "@/lib/services"
import { ArrowRight, ArrowUpRight, Monitor, ShoppingBag, Smartphone, Workflow } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: { absolute: "JR Intelligence — Website, webshop, app en automatisering" },
  description:
    "JR Intelligence bouwt websites, webshops en apps voor de App Store en de Play Store, en automatiseert werk dat nu nog handmatig loopt.",
}

const icons: Record<ServiceSlug, typeof ShoppingBag> = {
  webshop: ShoppingBag,
  website: Monitor,
  app: Smartphone,
  automatisering: Workflow,
}

const approach = [
  {
    title: "Gesprek",
    text: "We kijken naar je bedrijf, je bezoekers en waar nu tijd of omzet blijft liggen.",
  },
  {
    title: "Voorstel",
    text: "Je krijgt een vaste prijs en een duidelijke lijst van wat er wel en niet in zit.",
  },
  {
    title: "Bouw",
    text: "We maken de website, de webshop, de app of de koppeling, en leveren hem werkend op.",
  },
]

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="hero-in max-w-xl">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              JR INTELLIGENCE
            </p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
              Website, webshop, app of automatisering voor jouw bedrijf
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#4d4d4d] sm:text-lg sm:leading-8">
              Wij bouwen digitale oplossingen die werken. Van een professionele website tot een
              webshop die verkoopt, een app in de App Store en de Play Store, of automatisering van
              processen die je al hebt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrandButton href="/contact">
                Start vandaag
                <ArrowRight className="size-4" />
              </BrandButton>
              <BrandButton href="/#diensten" variant="outline">
                Bekijk onze diensten
              </BrandButton>
            </div>
          </div>
          <div className="hero-in" style={{ animationDelay: "140ms" }}>
            <DeviceShowcase />
          </div>
        </Container>
      </section>

      <section id="diensten" className="section-wash scroll-mt-24 py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Vier diensten, verder niets</h2>
            <p className="mt-3 text-mist">
              We bouwen je website, je webshop of je app, of we automatiseren wat je al online hebt.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = icons[service.slug]
              return (
                <Link
                  key={service.slug}
                  href={`/diensten/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-paper p-5 ring-1 ring-transparent transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_44px_-30px_rgba(0,0,0,0.45)] hover:ring-[#e6e6e1]"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-brand text-white">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-mist">{service.summary}</p>
                  <span className="mt-6 flex items-center justify-between text-sm font-semibold text-brand">
                    {formatFromPrice(service.fromPrice)}
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight">Zo werken we</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {approach.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-[#ecece8]">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink px-7 py-8 text-white sm:flex-row sm:items-center sm:px-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Klaar om te beginnen?</h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
                Vertel kort wat je wilt laten bouwen of automatiseren. We reageren met een voorstel
                en een prijs.
              </p>
            </div>
            <BrandButton href="/contact">
              Start vandaag
              <ArrowRight className="size-4" />
            </BrandButton>
          </div>
        </Container>
      </section>
    </main>
  )
}
