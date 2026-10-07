import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import { ShopAppBuilder } from "@/components/shop-app-builder"
import { AppForge } from "@/components/app-forge"
import { AutomationMind } from "@/components/automation-mind"
import { WebsiteBuild } from "@/components/website-build"
import { WebshopHero } from "@/components/webshop-hero"
import { WebshopIncludes } from "@/components/webshop-includes"
import { WebshopJourney } from "@/components/webshop-journey"
import { WebshopStudio } from "@/components/webshop-studio"
import { formatFromPrice, services, type Service } from "@/lib/services"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((item) => item.slug !== service.slug)

  return (
    <main>
      {service.slug === "webshop" ? (
        <WebshopHero service={service} />
      ) : service.slug === "automatisering" ? (
        <AutomationMind service={service} />
      ) : service.slug === "website" ? null : (
      <section className="overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-in">
            <p className="text-sm text-mist">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="text-ink">{service.title}</span>
            </p>
            <p className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              JR INTELLIGENCE
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
              {service.title}
            </h1>
            <div className="mt-5 max-w-xl space-y-4 text-lg leading-8 text-mist">
              <p>{service.summary}</p>
              <p>
                We bouwen de schermen, het account en de taken die een klant in de app doet. De app
                komt op iPhone en Android, in jullie merk, en niet als een website die je in de
                browser opent. We testen op een echte iPhone en een Android-telefoon, en dienen de
                eerste versie in bij beide stores.
              </p>
              <p>
                Voor bedrijven die hun klanten iets op het toestel willen geven: een account, een
                afspraak of de status van een order.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <BrandButton href={`/contact?dienst=${service.slug}`}>
                Start vandaag
                <ArrowRight className="size-4" />
              </BrandButton>
              <BrandButton href="#aanpak" variant="outline">
                Bekijk de aanpak
              </BrandButton>
            </div>
          </div>
          <div className="hero-in" style={{ animationDelay: "120ms" }}>
            <ShopAppBuilder />
          </div>
        </Container>
      </section>
      )}

      {service.slug === "webshop" ? <WebshopIncludes includes={service.includes} /> : null}

      {service.slug === "website" ? (
        <WebsiteBuild service={service} />
      ) : service.slug === "webshop" ? (
        <WebshopJourney />
      ) : service.slug === "app" ? (
        <AppForge service={service} />
      ) : service.slug === "automatisering" ? null : (
        <section id="aanpak" className="scroll-mt-24 pt-16 pb-8 sm:pt-20 sm:pb-10">
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight">Hoe het werkt</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {service.steps.map((step, index) => (
                <li key={step.title} className="relative">
                  {index < service.steps.length - 1 ? (
                    <span className="absolute top-4 left-10 hidden h-px w-[calc(100%-1.5rem)] bg-[#dfe8e2] md:block" />
                  ) : null}
                  <span className="relative grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {service.slug === "webshop" ? <WebshopStudio /> : null}

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="rounded-3xl bg-white px-6 py-8 ring-1 ring-[#e8e8e3] sm:px-10 sm:py-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-brand">PRIJS</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Eerst de prijs, dan het werk
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-mist">
                Dit zijn startprijzen. Na een kort gesprek krijg je een vaste prijs voor jouw
                situatie, voordat er gebouwd wordt.
              </p>
            </div>
            <div className="mt-8 grid gap-8 border-t border-[#eee] pt-8 lg:grid-cols-2 lg:gap-0">
              <div className="flex h-full flex-col lg:pr-12">
                <p className="text-sm text-mist">Start</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">
                  {formatFromPrice(service.fromPrice)}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-6 text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <BrandButton href={`/contact?dienst=${service.slug}`}>
                    Vraag deze start aan
                    <ArrowRight className="size-4" />
                  </BrandButton>
                </div>
              </div>
              <div className="flex h-full flex-col border-t border-[#eee] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <p className="text-sm text-mist">Groter traject</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">Op aanvraag</p>
                <p className="mt-6 text-sm leading-7 text-mist">
                  Meerdere talen, een groter assortiment, extra koppelingen of een systeem dat al
                  draait en mee moet. We schrijven eerst op wat erin zit, en daarna pas de prijs.
                </p>
                <div className="mt-auto pt-7">
                  <BrandButton href={`/contact?dienst=${service.slug}`} variant="outline">
                    Bespreek je situatie
                  </BrandButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight">Andere diensten</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/diensten/${item.slug}`}
                className="group flex items-center justify-between rounded-2xl bg-white px-5 py-4 ring-1 ring-[#ecece8] transition hover:-translate-y-0.5 hover:ring-brand/40"
              >
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-1 block text-sm text-mist">{item.menuDescription}</span>
                </span>
                <ArrowRight className="size-4 text-brand transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
