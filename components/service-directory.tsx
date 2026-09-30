import { Container } from "@/components/container"
import { services, type ServiceSlug } from "@/lib/services"
import { cn } from "cn"
import { ArrowUpRight, Monitor, ShoppingBag, Workflow } from "lucide-react"
import Link from "next/link"

const icons: Record<ServiceSlug, typeof ShoppingBag> = {
  webshop: ShoppingBag,
  website: Monitor,
  automatisering: Workflow,
}

export function ServiceDirectory() {
  return (
    <section className="border-t border-[#e7e7e2] bg-white" aria-label="Onze diensten">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-0">
          {services.map((service, index) => {
            const Icon = icons[service.slug]
            return (
              <div
                key={service.slug}
                className={cn(
                  "md:px-8",
                  index === 0 && "md:pl-0",
                  index === services.length - 1 && "md:pr-0",
                  index > 0 && "md:border-l md:border-[#ecece8]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-white">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h2 className="text-base font-semibold tracking-tight">{service.title}</h2>
                </div>
                <ul className="mt-5 space-y-4">
                  {service.includes.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={`/diensten/${service.slug}`}
                        className="group grid grid-cols-[1fr_auto] items-start gap-3 rounded-lg py-0.5"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-ink group-hover:text-brand">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block text-sm leading-5 text-mist">{item.text}</span>
                        </span>
                        <ArrowUpRight
                          className="mt-0.5 size-4 shrink-0 text-brand transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
      </Container>
    </section>
  )
}
