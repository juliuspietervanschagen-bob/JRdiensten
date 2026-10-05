import type { Metadata } from "next"
import { TabBuilder } from "@/components/builder/tab-builder"

export const metadata: Metadata = {
  title: "App bouwer",
  description: "Zet een scherm in elkaar in de webshop en houd het bestand gelijk.",
}

export default function BuilderPage() {
  return <TabBuilder />
}
