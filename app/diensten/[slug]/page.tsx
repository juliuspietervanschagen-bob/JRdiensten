import { ServiceDetail } from "@/components/service-detail"
import { getService, services } from "@/lib/services"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "Dienst" }
  return {
    title: service.title,
    description: service.summary,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
