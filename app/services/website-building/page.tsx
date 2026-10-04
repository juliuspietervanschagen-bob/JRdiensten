import type { Metadata } from "next"
import { WebsiteBuilding } from "@/components/os/website-building"
import { servicesData } from "@/lib/os/services-data"

const service = servicesData["website-building"]

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
}

export default function WebsiteBuildingPage() {
  return <WebsiteBuilding />
}
