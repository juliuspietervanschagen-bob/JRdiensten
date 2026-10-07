import type { Metadata } from "next"
import { TabBuilder } from "@/components/builder/tab-builder"

export const metadata: Metadata = {
  title: "App bouwer",
  description: "Zet een paar onderdelen aan en open dezelfde bestel-app als voorbeeld.",
}

export default function BuilderPage() {
  return <TabBuilder />
}
