import type { Metadata } from "next"
import { WebsiteBuilding } from "@/components/os/website-building"
import { servicesData } from "@/lib/os/services-data"

const service = servicesData.app

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
}

export default function AppServicePage() {
  return <WebsiteBuilding slug="app" />
}
