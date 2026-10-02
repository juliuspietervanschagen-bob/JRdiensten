"use client"

import { BrandButton } from "@/components/brand-button"
import { cn } from "cn"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const cards = [
  {
    mark: "SEO",
    title: "SEO voor structurele groei",
    text: "De shop wordt gevonden op de woorden waarmee mensen echt zoeken.",
    more: "Producten, categorieën en teksten zijn zo opgebouwd dat Google ze kan lezen. Vindbaarheid zit in de bouw, niet als een laag die je er later op plakt.",
    bars: [38, 58, 78, 96],
  },
  {
    mark: "VIND",
    title: "Jouw kopers met Google Ads",
    text: "Mensen die al zoeken, komen op een pagina waar je kunt bestellen.",
    more: "Een advertentie hoort op een productpagina die klaar is om af te rekenen. Geen losse pagina die niet bij de shop past, en geen klik die doodloopt.",
    bars: [72, 44, 86, 60],
  },
  {
    mark: "ALT",
    title: "Eerst een sterk bedrijfsverhaal",
    text: "Voor het betalen is duidelijk waarom iemand bij jullie bestelt.",
    more: "De shop legt uit wie jullie zijn en waarom dit aanbod klopt. Dat verhaal staat tussen de producten, zodat een bezoeker niet alleen kijkt, maar ook durft te kopen.",
    bars: [50, 66, 48, 84],
  },
]

export function WebshopGrowth() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const current = cards[active]

  function show(index: number) {
    setOpen(false)
    setActive((index + cards.length) % cards.length)
  }

  return (
    <div aria-labelledby="groei-title">
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
        <span className="h-px w-8 bg-brand" />
        GROEI
      </p>
      <h2 id="groei-title" className="mt-3 text-3xl font-semibold tracking-tight">
        Maak van je webshop een compleet groeikanaal
      </h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-mist sm:text-base sm:leading-7">
        Verbind techniek, vindbaarheid en acquisitie zodat bezoekers je niet alleen vinden, maar
        ook makkelijker bestellen.
      </p>

      <div className="mt-6">
            <div className="relative mx-auto h-[236px] max-w-[520px] overflow-hidden sm:h-[250px]">
              {cards.map((card, index) => {
                const slot = (index - active + cards.length) % cards.length
                const center = slot === 0
                return (
                  <article
                    key={card.mark}
                    className={cn(
                      "absolute top-4 left-1/2 w-[min(78%,230px)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      center && "z-10 -translate-x-1/2 opacity-100",
                      slot === 1 &&
                        "z-0 translate-x-[calc(-50%+4.25rem)] scale-[0.86] opacity-50 sm:translate-x-[calc(-50%+6.75rem)]",
                      slot === 2 &&
                        "z-0 -translate-x-[calc(50%+4.25rem)] scale-[0.86] opacity-50 sm:-translate-x-[calc(50%+6.75rem)]",
                    )}
                  >
                    {center ? (
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                        className="w-full rounded-3xl bg-white p-5 text-left shadow-[0_24px_50px_-32px_rgba(20,20,20,0.45)] ring-1 ring-brand/50"
                      >
                        <CardFace card={card} hint open={open} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => show(index)}
                        className="w-full rounded-3xl bg-white p-5 text-left ring-1 ring-[#e8e8e3]"
                        aria-label={`Toon ${card.title}`}
                      >
                        <CardFace card={card} />
                      </button>
                    )}
                  </article>
                )
              })}
            </div>
            <div className="mt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => show(active - 1)}
                aria-label="Vorige"
                className="grid size-9 place-items-center rounded-full bg-white text-ink ring-1 ring-[#e8e8e3] transition hover:ring-brand/40"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <div className="flex gap-1.5" aria-hidden>
                {cards.map((card, index) => (
                  <span
                    key={card.mark}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      index === active ? "w-6 bg-brand" : "w-1.5 bg-[#d5ddd8]",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => show(active + 1)}
                aria-label="Volgende"
                className="grid size-9 place-items-center rounded-full bg-white text-ink ring-1 ring-[#e8e8e3] transition hover:ring-brand/40"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
            {open ? (
              <div className="mx-auto mt-4 max-w-[520px] rounded-3xl bg-white px-5 py-5 ring-1 ring-[#e8e8e3] sm:px-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-brand">{current.mark}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{current.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{current.more}</p>
                <div className="mt-5">
                  <BrandButton href="/contact?dienst=webshop">Bespreek dit mee</BrandButton>
                </div>
              </div>
            ) : null}
      </div>
    </div>
  )
}

function CardFace({
  card,
  hint = false,
  open = false,
}: {
  card: (typeof cards)[number]
  hint?: boolean
  open?: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#eef8f1] px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-brand">
          {card.mark}
        </span>
        <span className="flex h-6 items-end gap-1" aria-hidden>
          {card.bars.map((height, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-brand/80"
              style={{ height: `${Math.round(height * 0.22)}px` }}
            />
          ))}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-mist">{card.text}</p>
      {hint ? (
        <p className="mt-4 text-sm font-medium text-brand">{open ? "Sluiten" : "Lees verder"}</p>
      ) : (
        <p className="mt-4 text-sm text-transparent" aria-hidden>
          Lees verder
        </p>
      )}
    </>
  )
}
