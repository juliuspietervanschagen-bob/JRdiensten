import type { ServiceSlug } from "@/lib/services"

export function ServiceArt({ slug }: { slug: ServiceSlug }) {
  if (slug === "website") return <WebsiteArt />
  if (slug === "webshop") return <WebshopArt />
  if (slug === "app") return <AppArt />
  return <AutomationArt />
}

function Frame({ children, lines = true }: { children: React.ReactNode; lines?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute inset-8 -z-10 rounded-full bg-brand/15 blur-3xl" />
      {lines ? (
        <svg
          className="pointer-events-none absolute -top-8 -right-6 h-40 w-40 text-brand"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden
        >
          <path d="M10 40C50 10 90 70 150 30" stroke="currentColor" strokeWidth="1.4" />
          <path d="M20 130C70 100 90 150 150 120" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      ) : null}
      {children}
    </div>
  )
}

function WebsiteArt() {
  return (
    <Frame>
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-36px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
        <div className="flex items-center gap-2 border-b border-[#f0f0ee] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ecece8]" />
          <span className="size-2.5 rounded-full bg-[#ecece8]" />
          <span className="size-2.5 rounded-full bg-brand" />
          <span className="ml-2 h-5 flex-1 rounded-full bg-[#f6f6f4]" />
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">JOUW BEDRIJF</p>
            <div className="mt-3 h-3 w-4/5 rounded-full bg-ink" />
            <div className="mt-2 h-3 w-3/5 rounded-full bg-ink/80" />
            <div className="mt-4 h-2 w-full rounded-full bg-[#ecece8]" />
            <div className="mt-2 h-2 w-11/12 rounded-full bg-[#ecece8]" />
            <div className="mt-5 flex gap-2">
              <span className="h-8 w-24 rounded-full bg-brand" />
              <span className="h-8 w-24 rounded-full border border-[#e4e4df]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 h-16 rounded-xl bg-[#f4f4f2]" />
            <div className="h-14 rounded-xl bg-[#eef8f1]" />
            <div className="h-14 rounded-xl bg-[#f4f4f2]" />
          </div>
        </div>
      </div>
    </Frame>
  )
}

function WebshopArt() {
  return (
    <Frame lines={false}>
      <div className="grid items-end gap-3 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="lung-breathe rounded-2xl bg-white p-4 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Producten</p>
            <span className="rounded-full bg-[#eef8f1] px-2 py-1 text-[10px] font-semibold text-brand">
              24 live
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { name: "Koptelefoon", price: "€ 79", src: "/webshop/tech-headphones.jpg" },
              { name: "Telefoon", price: "€ 249", src: "/webshop/tech-phone.jpg" },
              { name: "Horloge", price: "€ 129", src: "/webshop/tech-watch.jpg" },
              { name: "Speaker", price: "€ 49", src: "/webshop/tech-speaker.jpg" },
              { name: "Oortjes", price: "€ 39", src: "/webshop/tech-earbuds.jpg" },
              { name: "Toetsenbord", price: "€ 59", src: "/webshop/tech-keyboard.jpg" },
            ].map((product) => (
              <div key={product.name} className="rounded-lg p-1.5 ring-1 ring-[#f0f0ee]">
                <img
                  src={product.src}
                  alt={product.name}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <p className="mt-1.5 truncate text-[10px] leading-tight font-medium text-ink">
                  {product.name}
                </p>
                <p className="text-[10px] leading-tight font-semibold text-ink">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lung-breathe-late rounded-2xl bg-ink p-4 text-white shadow-[0_24px_40px_-28px_rgba(0,0,0,0.7)]">
          <p className="text-xs text-white/60">Checkout</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">€ 86,90</p>
          <p className="mt-2 text-xs leading-5 text-white/70">
            Twee artikelen. Verzending zit erbij.
          </p>
          <div className="mt-5 rounded-full bg-brand py-2 text-center text-xs font-semibold">
            Betaal
          </div>
        </div>
      </div>
    </Frame>
  )
}

function AppArt() {
  return (
    <Frame>
      <div className="mx-auto w-full max-w-[280px] rounded-[2rem] bg-ink p-3 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[1.5rem] bg-white">
          <div className="flex items-center justify-between px-4 pt-3">
            <p className="text-[10px] font-extrabold tracking-[-0.04em]">JR</p>
            <span className="size-1.5 rounded-full bg-brand" />
          </div>
          <div className="px-4 pt-4 pb-5">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-brand">JOUW APP</p>
            <div className="mt-2 h-2.5 w-4/5 rounded-full bg-ink" />
            <div className="mt-2 h-2 w-3/5 rounded-full bg-[#ecece8]" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-16 rounded-xl bg-[#f4f4f2]" />
              <div className="h-16 rounded-xl bg-[#eef8f1]" />
            </div>
            <div className="mt-4 flex gap-2">
              <span className="rounded-lg bg-ink px-2 py-1.5 text-[9px] font-semibold text-white">
                App Store
              </span>
              <span className="rounded-lg bg-brand px-2 py-1.5 text-[9px] font-semibold text-white">
                Play Store
              </span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function AutomationArt() {
  const nodes = [
    { label: "Website", x: "8%", y: "18%" },
    { label: "Webshop", x: "62%", y: "8%" },
    { label: "Inbox", x: "18%", y: "68%" },
    { label: "Voorraad", x: "64%", y: "66%" },
  ]
  return (
    <Frame>
      <div className="relative h-[320px] overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-36px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320" fill="none" aria-hidden>
          <path className="flow-dash" d="M90 80 C 160 70, 200 90, 230 150" stroke="#16a34a" strokeWidth="1.6" />
          <path className="flow-dash" d="M300 70 C 250 110, 230 130, 210 160" stroke="#16a34a" strokeWidth="1.6" />
          <path className="flow-dash" d="M110 230 C 150 210, 170 190, 190 175" stroke="#16a34a" strokeWidth="1.6" />
          <path className="flow-dash" d="M300 230 C 250 210, 220 190, 205 172" stroke="#16a34a" strokeWidth="1.6" />
        </svg>
        <div className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-brand text-white shadow-[0_16px_30px_-16px_rgba(22,163,74,0.9)]">
          <span className="text-xs font-bold tracking-wide">JR</span>
        </div>
        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute rounded-xl bg-paper px-3 py-2 text-xs font-semibold text-ink ring-1 ring-[#e7e7e2]"
            style={{ left: node.x, top: node.y }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </Frame>
  )
}
