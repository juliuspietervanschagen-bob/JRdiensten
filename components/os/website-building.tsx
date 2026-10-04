"use client"

import { serviceIcons } from "@/components/os/service-icons"
import { osFadeIn } from "@/lib/os/motion"
import { servicesData, type OsServiceSlug } from "@/lib/os/services-data"
import { formatFromPrice } from "@/lib/services"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

const marketingHref: Record<OsServiceSlug, string> = {
  "website-building": "/diensten/website",
  webshop: "/diensten/webshop",
  app: "/diensten/app",
  automatisering: "/diensten/automatisering",
}

export function WebsiteBuilding({ slug }: { slug: OsServiceSlug }) {
  const service = servicesData[slug]
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
          <p className="text-[11px] tracking-[0.22em] text-os-green">{service.kicker}</p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight text-os-white sm:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-os-mist sm:text-base sm:leading-7">{service.summary}</p>
          <p className="mt-6 text-[12px] tracking-[0.16em] text-os-signal uppercase">{formatFromPrice(service.fromPrice)}</p>
        </motion.header>

        <motion.ol
          className="mt-12 grid gap-px bg-os-line sm:grid-cols-2"
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "visible"}
          variants={
            reduce
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                }
          }
        >
          {service.features.map((feature, index) => {
            const Glyph = serviceIcons[feature.icon]
            return (
              <motion.li
                key={feature.icon}
                initial={reduce ? shown : undefined}
                animate={reduce ? shown : "visible"}
                variants={reduce ? undefined : osFadeIn}
                transition={reduce ? { duration: 0 } : undefined}
                className="os-reveal bg-os-slate px-4 py-5 sm:px-5 sm:py-6 sm:last:col-span-2"
              >
                <div className="flex items-center gap-3">
                  <Glyph className="size-6 shrink-0 text-os-green" />
                  <p className="text-[10px] tracking-[0.18em] text-os-mist">{String(index + 1).padStart(2, "0")}</p>
                </div>
                <h2 className="mt-4 text-base font-medium text-os-white">{feature.title}</h2>
                <p className="mt-2 text-[13px] leading-6 text-os-mist">{feature.text}</p>
              </motion.li>
            )
          })}
        </motion.ol>

        <p className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[12px] tracking-[0.08em] text-os-mist">
          <Link href="/services" className="text-os-green hover:text-os-signal">
            Alle diensten
          </Link>
          <Link href={marketingHref[slug]} className="text-os-green hover:text-os-signal">
            Dezelfde dienst op de site
          </Link>
        </p>
      </div>
    </div>
  )
}
