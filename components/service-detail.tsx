import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import { ServiceArt } from "@/components/service-art"
import { WebshopJourney } from "@/components/webshop-journey"
import { formatFromPrice, services, type Service } from "@/lib/services"
import {
  ArrowRight,
  BookOpen,
  Cable,
  Check,
  ClipboardList,
  CreditCard,
  Eye,
  Inbox,
  LayoutGrid,
  Mail,
  MonitorSmartphone,
  Palette,
  PanelsTopLeft,
  PenLine,
  Search,
  ShoppingCart,
  Smartphone,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

const includeIcons: Record<string, LucideIcon> = {
  "Assortiment dat klopt": LayoutGrid,
  "Korte checkout": ShoppingCart,
  "Betaalprovider": CreditCard,
  "Bestellingen op één plek": ClipboardList,
  "Gebouwd voor de telefoon": Smartphone,
  "Automatische bevestiging": Mail,
  "Ontwerp in jullie merk": Palette,
  "Pagina's met een taak": PanelsTopLeft,
  "Telefoon en desktop": MonitorSmartphone,
  "Contact dat aankomt": Inbox,
  "Vindbaar van start": Search,
  "Zelf teksten aanpassen": PenLine,
  "Het handwerk in beeld": Eye,
  "Koppeling met wat je hebt": Cable,
  "De volgende stap vanzelf": Workflow,
  "Zicht op wat er liep": ClipboardList,
  "Getest met jouw voorbeelden": TestTube2,
  "Uitleg voor het team": BookOpen,
}

export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((item) => item.slug !== service.slug)

  return (
    <main>
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
            <p className="mt-5 max-w-lg text-lg leading-8 text-mist">{service.summary}</p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-mist">{service.audience}</p>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-ink">
              {formatFromPrice(service.fromPrice)}
            </p>
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
            <ServiceArt slug={service.slug} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Wat je krijgt</h2>
            <p className="mt-3 text-mist">
              Een afgebakend pakket. De vaste prijs volgt uit dit startpunt, voordat we beginnen.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => {
              const Icon = includeIcons[item.title] ?? LayoutGrid
              return (
                <li
                  key={item.title}
                  className="relative rounded-2xl border border-brand bg-ink px-5 pt-8 pb-5 text-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(22,163,74,0.55)]"
                >
                  <span className="absolute top-0 left-4 grid size-8 -translate-y-1/2 place-items-center rounded-md bg-ink text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {service.slug === "webshop" ? (
        <WebshopJourney />
      ) : (
        <section id="aanpak" className="scroll-mt-24 py-16 sm:py-20">
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

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight">Prijs</h2>
          <p className="mt-3 max-w-2xl text-mist">
            Dit zijn startprijzen. Na een kort gesprek krijg je een vaste prijs voor jouw situatie,
            voordat er gebouwd wordt.
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl bg-ink p-7 text-white shadow-[0_24px_50px_-32px_rgba(0,0,0,0.7)] transition duration-200 hover:-translate-y-1">
              <p className="text-sm text-white/60">Start</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                {formatFromPrice(service.fromPrice)}
              </p>
              <ul className="mt-6 space-y-3">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm leading-6 text-white/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    {outcome}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <BrandButton href={`/contact?dienst=${service.slug}`}>
                  Vraag deze start aan
                  <ArrowRight className="size-4" />
                </BrandButton>
              </div>
            </article>
            <article className="rounded-3xl bg-paper p-7 ring-1 ring-[#e6e6e1] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]">
              <p className="text-sm text-mist">Groter traject</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">Op aanvraag</p>
              <p className="mt-6 text-sm leading-7 text-mist">
                Meerdere talen, een groter assortiment, extra koppelingen of een systeem dat al
                draait en mee moet. We schrijven eerst op wat erin zit, en daarna pas de prijs.
              </p>
              <div className="mt-8">
                <BrandButton href={`/contact?dienst=${service.slug}`} variant="outline">
                  Bespreek je situatie
                </BrandButton>
              </div>
            </article>
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
