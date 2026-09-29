import { BrandButton } from "@/components/brand-button"
import { Container } from "@/components/container"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="py-24">
      <Container className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-brand">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Deze pagina bestaat niet</h1>
        <p className="mt-4 text-mist">
          De link klopt niet, of de pagina is verplaatst. Ga terug naar home of bekijk de diensten.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandButton href="/">
            Naar home
            <ArrowRight className="size-4" />
          </BrandButton>
          <BrandButton href="/#diensten" variant="outline">
            Bekijk diensten
          </BrandButton>
        </div>
      </Container>
    </main>
  )
}
