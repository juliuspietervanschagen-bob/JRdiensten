import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { services } from "@/lib/services"
import { site } from "@/lib/site"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-[#2a2e2c] text-white">
      <Container className="grid gap-10 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{site.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Diensten</p>
          <ul className="mt-3 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/diensten/${service.slug}`}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/over-ons" className="transition hover:text-white">
                Over ons
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Start een gesprek
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-5">
        <p className="text-xs text-white/55">© {new Date().getFullYear()} JR Intelligence</p>
      </Container>
    </footer>
  )
}
