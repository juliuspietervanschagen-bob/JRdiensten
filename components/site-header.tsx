"use client"

import { Logo } from "@/components/logo"
import { BrandButton } from "@/components/brand-button"
import { services, type ServiceSlug } from "@/lib/services"
import { cn } from "cn"
import { ArrowRight, ArrowUpRight, Menu, Monitor, ShoppingBag, Workflow, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

const icons: Record<ServiceSlug, typeof ShoppingBag> = {
  webshop: ShoppingBag,
  website: Monitor,
  automatisering: Workflow,
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [path, setPath] = useState(pathname)
  const closeTimer = useRef<number | null>(null)
  const menuId = useId()
  const dienstenActive = pathname.startsWith("/diensten")

  if (path !== pathname) {
    setPath(pathname)
    setOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function showMenu() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function hideMenu() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }

  return (
    <header className="sticky top-0 z-50 bg-paper" onMouseLeave={hideMenu}>
      <div className="relative mx-auto flex h-20 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
          aria-label="Hoofdmenu"
        >
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>

          <div onMouseEnter={showMenu}>
            <button
              type="button"
              className="relative text-[15px] font-medium text-ink"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={(event) => {
                const coarse = window.matchMedia("(hover: none)").matches
                if (coarse || event.detail === 0) setOpen((value) => !value)
              }}
            >
              Diensten
              <span
                className={cn(
                  "absolute -bottom-2.5 left-0 h-[2.5px] rounded-full bg-brand transition-all",
                  dienstenActive || open ? "w-full" : "w-0",
                )}
              />
            </button>
          </div>

          <NavLink href="/over-ons" active={pathname === "/over-ons"}>
            Over ons
          </NavLink>
          <NavLink href="/contact" active={pathname === "/contact"}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden lg:block">
          <BrandButton href="/contact">
            Start vandaag
            <ArrowRight className="size-4" />
          </BrandButton>
        </div>

        <div
          id={menuId}
          className={cn(
            "absolute top-[calc(100%-0.75rem)] right-0 left-0 z-50 hidden px-5 pt-3 transition duration-200 ease-out sm:px-8 lg:block",
            open
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0",
          )}
          inert={!open}
          onMouseEnter={showMenu}
          onMouseLeave={hideMenu}
        >
          <div className="mx-auto grid w-full max-w-[920px] grid-cols-3 divide-x divide-[#e7e7e2] rounded-2xl bg-[#f3f3f1] p-2 shadow-[0_28px_70px_-32px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
            {services.map((service) => {
              const Icon = icons[service.slug]
              return (
                <Link
                  key={service.slug}
                  href={`/diensten/${service.slug}`}
                  className="group flex items-start gap-3 rounded-xl px-4 py-4 transition hover:bg-white"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand text-white">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-ink">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-mist">
                      {service.menuDescription}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-brand transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-[#e1e1dc] bg-white text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-menu" className="border-t border-[#ecece8] bg-paper px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <MobileLink href="/" active={pathname === "/"}>
              Home
            </MobileLink>
            <p className="px-3 pt-3 pb-1 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              Diensten
            </p>
            {services.map((service) => {
              const Icon = icons[service.slug]
              const href = `/diensten/${service.slug}`
              return (
                <Link
                  key={service.slug}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3",
                    pathname === href ? "bg-white" : "hover:bg-white",
                  )}
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-white">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{service.title}</span>
                    <span className="block text-xs text-mist">{service.menuDescription}</span>
                  </span>
                </Link>
              )
            })}
            <MobileLink href="/over-ons" active={pathname === "/over-ons"}>
              Over ons
            </MobileLink>
            <MobileLink href="/contact" active={pathname === "/contact"}>
              Contact
            </MobileLink>
            <div className="pt-3">
              <BrandButton href="/contact" className="w-full">
                Start vandaag
                <ArrowRight className="size-4" />
              </BrandButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="relative text-[15px] font-medium text-ink">
      {children}
      <span
        className={cn(
          "absolute -bottom-2.5 left-0 h-[2.5px] rounded-full bg-brand transition-all",
          active ? "w-full" : "w-0",
        )}
      />
    </Link>
  )
}

function MobileLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-xl px-3 py-3 text-base font-medium",
        active ? "bg-white text-ink" : "text-ink",
      )}
    >
      {children}
    </Link>
  )
}
