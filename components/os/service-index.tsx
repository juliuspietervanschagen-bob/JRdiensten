"use client"

import { serviceIcons } from "@/components/os/service-icons"
import { osFadeIn } from "@/lib/os/motion"
import { servicesData, type OsServiceSlug } from "@/lib/os/services-data"
import { formatFromPrice } from "@/lib/services"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

const order: OsServiceSlug[] = ["website-building", "webshop", "app", "automatisering"]

export function ServiceIndex() {
  const reduce = useReducedMotion() === true
  const shown = { opacity: 1, y: 0 }

  return (
    <div className="bg-os-black font-os text-os-white">
      <div className="mx-auto w-full max-w-[960px] px-5 py-14 sm:px-8 sm:py-20">
        <motion.header
          className="os-reveal"
          initial={reduce ? shown : "hidden"}
          animate={reduce ? shown : "visible"}
          variants={osFadeIn}
          transition={reduce ? { duration: 0 } : undefined}
        >
          <p className="text-[11px] tracking-[0.22em] text-os-green">AGENCY OS</p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">Diensten</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-os-mist sm:text-base sm:leading-7">
            Website, webshop, app en automatisering. Dezelfde afspraken als op de site, in het zwarte overzicht.
          </p>
        </motion.header>
        <ul className="mt-12 grid gap-px bg-os-line sm:grid-cols-2">
          {order.map((slug) => {
            const service = servicesData[slug]
            const Glyph = serviceIcons[service.features[0].icon]
            return (
              <li key={slug} className="bg-os-slate">
                <Link href={`/services/${slug}`} className="block px-5 py-6 hover:bg-black">
                  <Glyph className="size-6 text-os-green" />
                  <p className="mt-4 text-[10px] tracking-[0.18em] text-os-mist">{service.kicker}</p>
                  <h2 className="mt-2 text-xl text-os-white">{service.title}</h2>
                  <p className="mt-2 text-[13px] leading-6 text-os-mist">{service.summary}</p>
                  <p className="mt-4 text-[11px] tracking-[0.14em] text-os-signal uppercase">{formatFromPrice(service.fromPrice)}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
