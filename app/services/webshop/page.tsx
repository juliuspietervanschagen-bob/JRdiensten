import type { Metadata } from "next"
import { WebsiteBuilding } from "@/components/os/website-building"
import { servicesData } from "@/lib/os/services-data"

const service = servicesData.webshop

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
}

export default function WebshopServicePage() {
  return <WebsiteBuilding slug="webshop" />
}
