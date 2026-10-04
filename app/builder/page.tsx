import type { Metadata } from "next"
import { TabBuilder } from "@/components/builder/tab-builder"

export const metadata: Metadata = {
  title: "Tab App Builder",
  description: "Compose a screen on the grid and keep the generated file in step.",
}

export default function BuilderPage() {
  return <TabBuilder />
}
