import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "JR Intelligence is een klein bureau dat websites en webshops bouwt en werk daaromheen automatiseert.",
}

const points = [
  {
    title: "We bouwen het zelf",
    text: "Geen doorgeefluik. Ontwerp, bouw en de koppeling komen uit hetzelfde team.",
  },
  {
    title: "Alleen deze drie dingen",
    text: "Een website, een webshop, of automatisering van wat je al online hebt. Daar zijn we scherp in.",
  },
  {
    title: "Eerst de prijs, dan het werk",
    text: "Je weet wat het kost voordat we beginnen. De startprijzen op de dienstenpagina's zijn het vertrekpunt.",
  },
]

export default function AboutPage() {
  return (
    <main>
      <section className="pt-12 pb-16 sm:pt-16">
        <Container className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
            <span className="h-px w-8 bg-brand" />
            OVER ONS
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.05]">
            Een klein bureau voor sites, shops en het werk eromheen
          </h1>
          <p className="mt-6 text-lg leading-8 text-mist">
            JR Intelligence bouwt websites en webshops voor andere bedrijven. Loopt er al iets
            online, dan automatiseren we het handwerk dat daar nu nog aan vastzit: orders
            overtikken, aanvragen doorzetten, statussen bijhouden.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-4 md:grid-cols-3">
          {points.map((point, index) => (
            <article key={point.title} className="rounded-2xl bg-paper p-6">
              <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h2 className="mt-4 text-lg font-semibold">{point.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mist">{point.text}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid items-center gap-8 rounded-3xl bg-ink px-7 py-10 text-white sm:px-10 lg:grid-cols-[1.4fr_auto]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Vertel wat je wilt laten maken</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
              Een korte mail is genoeg. We zeggen of het bij ons past, en wat de volgende stap is.
            </p>
          </div>
          <BrandButton href="/contact">
            Start vandaag
            <ArrowRight className="size-4" />
          </BrandButton>
        </Container>
      </section>
    </main>
  )
}
