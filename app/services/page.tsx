import type { Metadata } from "next"
import { ServiceIndex } from "@/components/os/service-index"

export const metadata: Metadata = {
  title: "Diensten",
  description: "Website, webshop, app en automatisering, in de Agency OS weergave.",
}

export default function ServicesPage() {
  return <ServiceIndex />
}
