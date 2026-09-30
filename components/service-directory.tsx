import { BrandButton } from "@/components/brand-button"
import { ContactLaptop } from "@/components/contact-laptop"
import { Container } from "@/components/container"
import { services, type ServiceSlug } from "@/lib/services"
import { site } from "@/lib/site"
import { cn } from "cn"
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Monitor, Phone, ShoppingBag, Workflow } from "lucide-react"
import Link from "next/link"

const icons: Record<ServiceSlug, typeof ShoppingBag> = {
  webshop: ShoppingBag,
  website: Monitor,
  automatisering: Workflow,
}

export function ServiceDirectory() {
  return (
    <section className="relative overflow-hidden bg-[#2a2e2c] text-white" aria-label="Onze diensten">
      <div
        className="drift-glow pointer-events-none absolute -top-24 -left-16 size-[28rem] rounded-full bg-brand/30 blur-3xl"
        aria-hidden
      />
      <div
        className="drift-glow-late pointer-events-none absolute right-[-6rem] bottom-[-8rem] size-[24rem] rounded-full bg-brand/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-14 sm:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
              <span className="h-px w-8 bg-brand" />
              CONTACT
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Neem contact op</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
              Een korte mail of een belletje is genoeg. We reageren met wat het kost en hoe we het
              aanpakken.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <Detail icon={MapPin} label="Plaats" value={site.location} />
              <Detail
                icon={Phone}
                label="Telefoon"
                value={site.phone}
                href={site.phoneHref}
              />
              <Detail icon={Mail} label="E-mail" value={site.email} href={`mailto:${site.email}`} />
              <Detail icon={Clock} label="Reactie" value={site.responseTime} />
            </dl>
            <div className="mt-6">
              <BrandButton href="/contact">
                Start vandaag
                <ArrowRight className="size-4" />
              </BrandButton>
            </div>
            <ContactLaptop />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {services.map((service, index) => {
              const Icon = icons[service.slug]
              return (
                <div
                  key={service.slug}
                  className={cn(index > 0 && "sm:border-l sm:border-white/10 sm:pl-6")}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-brand text-white">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight">{service.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {service.includes.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={`/diensten/${service.slug}`}
                          className="group grid grid-cols-[1fr_auto] items-start gap-2"
                        >
                          <span>
                            <span className="block text-sm font-medium text-white group-hover:text-brand">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-white/55">{item.text}</span>
                          </span>
                          <ArrowUpRight
                            className="mt-0.5 size-3.5 shrink-0 text-brand transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
}) {
  const body = (
    <>
      <Icon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
      <span>
        <span className="block text-[11px] tracking-[0.12em] text-white/45 uppercase">{label}</span>
        <span className="mt-0.5 block font-medium text-white">{value}</span>
      </span>
    </>
  )

  if (!href) {
    return <div className="flex items-start gap-3">{body}</div>
  }

  return (
    <a href={href} className="flex items-start gap-3 hover:text-brand">
      {body}
    </a>
  )
}
