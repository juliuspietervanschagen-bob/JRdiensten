import { Container } from "@/components/container"
import { ShopBuildComputer } from "@/components/shop-build-computer"
import { WebshopGrowth } from "@/components/webshop-growth"

export function WebshopStudio() {
  return (
    <section className="pt-8 pb-10 sm:pt-12 sm:pb-14" aria-label="Groei en de bouw">
      <Container>
        <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="flex min-w-0 flex-col rounded-[1.75rem] bg-white p-5 ring-1 ring-[#e8e8e3] sm:p-7">
            <WebshopGrowth />
          </div>
          <div className="flex min-w-0 flex-col rounded-[1.75rem] bg-[#f3f6f3] p-5 ring-1 ring-[#dce8df] sm:p-7">
            <ShopBuildComputer />
          </div>
        </div>
      </Container>
    </section>
  )
}
