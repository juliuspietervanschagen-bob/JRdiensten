import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import { services, type ServiceSlug } from "@/lib/services"
import { site } from "@/lib/site"
import { cn } from "cn"
import { ArrowRight, ArrowUpRight, Mail, Monitor, ShoppingBag, Workflow } from "lucide-react"
import Link from "next/link"

const icons: Record<ServiceSlug, typeof ShoppingBag> = {
  webshop: ShoppingBag,
  website: Monitor,
  automatisering: Workflow,
}

export function ServiceDirectory() {
  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-label="Onze diensten">
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
              Een korte mail is genoeg. We reageren met wat het kost en hoe we het aanpakken.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-white hover:text-brand"
            >
              <Mail className="size-4 text-brand" aria-hidden />
              {site.email}
            </a>
            <div className="mt-6">
              <BrandButton href="/contact">
                Start vandaag
                <ArrowRight className="size-4" />
              </BrandButton>
            </div>
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
