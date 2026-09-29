import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { services } from "@/lib/services"
import { site } from "@/lib/site"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e7e7e2] bg-paper">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-mist">{site.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Diensten</p>
          <ul className="mt-3 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/diensten/${service.slug}`}
                  className="text-sm text-mist transition hover:text-ink"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            <li>
              <Link href="/over-ons" className="transition hover:text-ink">
                Over ons
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-ink">
                Start een gesprek
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-ink">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-[#ecece8] py-5">
        <p className="text-xs text-mist">© {new Date().getFullYear()} JR Intelligence</p>
      </Container>
    </footer>
  )
}
