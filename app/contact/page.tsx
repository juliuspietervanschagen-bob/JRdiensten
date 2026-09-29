import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
import { site } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Vraag een website, webshop of automatisering aan bij JR Intelligence.",
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ dienst?: string }>
}) {
  const { dienst } = await searchParams

  return (
    <main className="py-12 sm:py-16">
      <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
            <span className="h-px w-8 bg-brand" />
            CONTACT
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Start vandaag
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-mist">
            Schrijf wat je wilt laten bouwen of automatiseren. We zetten je bericht klaar naar{" "}
            {site.email}. Daarna hoor je wat het kost en hoe we het aanpakken.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-mist">E-mail</dt>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${site.email}`} className="hover:text-brand">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mist">Waar we op reageren</dt>
              <dd className="mt-1 max-w-sm leading-6">
                Een website, een webshop, of automatisering van een site of shop die je al hebt.
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm key={dienst ?? "algemeen"} initialService={dienst} />
      </Container>
    </main>
  )
}
