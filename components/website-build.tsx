"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import Link from "next/link"
import { cn } from "cn"
import {
  Inbox,
  MonitorSmartphone,
  Palette,
  PanelsTopLeft,
  Moon,
  PenLine,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react"
import { useState, type ReactNode } from "react"

const includeIcons: Record<string, LucideIcon> = {
  "Ontwerp in jullie merk": Palette,
  "Pagina's met een taak": PanelsTopLeft,
  "Telefoon en desktop": MonitorSmartphone,
  "Contact dat aankomt": Inbox,
  "Vindbaar van start": Search,
  "Zelf teksten aanpassen": PenLine,
}

const wideIncludes = new Set(["Ontwerp in jullie merk", "Contact dat aankomt"])

const includeCopy: Record<string, string> = {
  "Ontwerp in jullie merk":
    "Geen standaard template. Lettertype, kleur en indeling komen uit jullie merk, en die lijn blijft staan op elke pagina, van de kop tot de knop.",
  "Pagina's met een taak":
    "Home zegt wie jullie zijn. Diensten laat zien wat iemand kan aanvragen. Over en contact maken de volgende stap zichtbaar, zonder dat de bezoeker hoeft te zoeken.",
  "Telefoon en desktop":
    "De site wordt eerst op een telefoon gezet. Tekst blijft leesbaar, knoppen blijven groot genoeg voor een duim, en foto's snijden niet weg wat iemand moet zien.",
  "Contact dat aankomt":
    "Het formulier vraagt alleen wat jullie nodig hebben om terug te bellen of te mailen. Het bericht komt in de inbox, met naam, onderwerp en telefoonnummer.",
  "Vindbaar van start":
    "Elke pagina krijgt een eigen titel en een tekst die zegt waar die pagina over gaat. De structuur is helder en de pagina laadt snel, zodat een zoekmachine hem kan lezen.",
  "Zelf teksten aanpassen":
    "Na oplevering kun je een zin of een foto zelf vervangen. We laten kort zien waar dat zit, zodat een kleine wijziging niet hoeft te wachten.",
}

const stepCopy: Record<string, string> = {
  Kennismaking:
    "We schrijven op wat het bedrijf doet, wie er langskomt en wat die bezoeker daarna moet doen. Daaruit volgt welke pagina's er komen, en welke niet.",
  Ontwerp:
    "Je ziet de sfeer, de volgorde van de blokken en waar de knop staat, voordat er gebouwd wordt. Opmerkingen verwerken we in die opzet, zodat de bouw niet halverwege van richting wisselt.",
  Bouw:
    "We maken de pagina's, zetten jullie teksten en foto's erin en koppelen het formulier aan de inbox. Daarna klikken we elk scherm na, op een telefoon en op een groot scherm.",
  Live:
    "We zetten de site online en controleren of elke pagina opent en of een testbericht aankomt. Je krijgt de toegang, plus een korte uitleg om zelf een tekst te wijzigen.",
}


const surfaceMoves = [
  { title: "Menu", text: "Home, diensten en contact wisselen van taal mee." },
  { title: "Knop", text: "De actie blijft dezelfde zin, in het Nederlands of in het Engels." },
  { title: "Stand", text: "Licht of donker kleurt de pagina, de tekst blijft leesbaar." },
]

const pages = [
  {
    name: "Home",
    lead: "Home heeft één taak: meteen zeggen wat het bedrijf doet, en waar het werkt. De rest van de pagina wijst naar dat werk. Een bezoeker hoeft hier niet te zoeken naar de volgende stap.",
    blocks: [
      {
        label: "De eerste zin",
        text: "Wat het bedrijf doet, en het gebied waarin het werkt. Die zin staat bovenaan, in gewone taal, zodat een bezoeker meteen weet of hij hier goed is.",
      },
      {
        label: "Eén knop",
        text: "Daaronder één knop: naar diensten, of meteen naar contact. De bezoeker ziet welke stap de site van hem vraagt, en tikt die meteen aan.",
      },
      {
        label: "Het werk",
        text: "Daarna ruimte voor het werk zelf. Een paar beelden, of een korte rij van wat het bedrijf maakt of doet. De volledige lijst van diensten blijft op de volgende pagina.",
      },
      {
        label: "Op een telefoon",
        text: "De zin en de knop blijven in het eerste scherm. De bezoeker hoeft niet te scrollen voordat hij weet waar hij moet tikken. Het beeld van het werk volgt daarna.",
      },
    ],
  },
  {
    name: "Diensten",
    lead: "Diensten laat zien wat een bezoeker kan aanvragen. Elke dienst is een taak met een begin en een einde, geen losse alinea. Aan het eind van die taak staat hoe hij start.",
    blocks: [
      {
        label: "Wat er gebeurt",
        text: "Per dienst een korte uitleg van het werk, in de woorden van het bedrijf. Wat de bezoeker krijgt als hij deze taak aanvraagt, en wat hij daarvoor moet aanleveren.",
      },
      {
        label: "Voor wie het is",
        text: "Voor wie die dienst bedoeld is. Iemand die er niet bij hoort, ziet dat vroeg en leest niet door tot een knop die niet voor hem is.",
      },
      {
        label: "De knop om te starten",
        text: "Elke dienst eindigt met de knop om te starten. Die gaat naar contact, en het onderwerp hoort bij die dienst, zodat het bericht niet blanco in de inbox valt.",
      },
      {
        label: "De volgorde",
        text: "De diensten staan in de volgorde waarin een bezoeker ze tegenkomt: eerst het werk dat het vaakst wordt gevraagd. Een dienst zonder aanvraag krijgt geen eigen blok.",
      },
    ],
  },
  {
    name: "Over",
    lead: "Over maakt het bedrijf herkenbaar voordat iemand een bericht stuurt. De bezoeker ziet wie er langskomt, en dat het werk in het gebied rond Reeuwijk gebeurt.",
    blocks: [
      {
        label: "Wie er langskomt",
        text: "Een korte tekst over de mensen die het werk doen, en waarom iemand hen inschakelt. Genoeg om te weten bij wie het bericht aankomt.",
      },
      {
        label: "Het gebied",
        text: "Waar het bedrijf werkt, met Reeuwijk als het punt dat bezoekers herkennen. Iemand van verderop leest of hij hier terecht kan, of dat het werk ook bij hem langskomt.",
      },
      {
        label: "Het beeld",
        text: "Een foto van de mensen of van het werk, naast de tekst. Het beeld hoort bij die zin, zodat een bezoeker de mensen herkent die langskomen.",
      },
      {
        label: "Door naar contact",
        text: "Onderaan staat de knop naar contact. De pagina eindigt bij de volgende stap, niet bij een laatste alinea waarna de bezoeker moet terugzoeken in het menu.",
      },
    ],
  },
  {
    name: "Contact",
    lead: "Contact vraagt alleen wat nodig is om terug te bellen of te mailen. Het bericht komt aan in de inbox die jullie al lezen, met de velden die op het scherm stonden.",
    blocks: [
      {
        label: "Drie velden",
        text: "Naam, onderwerp en telefoonnummer. Daarmee kan iemand dezelfde dag terugbellen of mailen. Extra vragen maken het versturen langer en horen er alleen bij als jullie ze echt nodig hebben.",
      },
      {
        label: "In de inbox",
        text: "Het bericht landt in de inbox die jullie al lezen, met die drie velden erbij. Jullie zien wie het stuurde, waar het over gaat, en welk nummer je belt.",
      },
      {
        label: "Vanaf een dienst",
        text: "Komt de bezoeker vanaf een dienst, dan hoort het onderwerp bij die dienst. Hij hoeft op contact niet opnieuw te typen wat hij wil aanvragen.",
      },
      {
        label: "Meteen in beeld",
        text: "Het formulier staat bovenaan, op een telefoon en op een groot scherm. Een adres of het telefoonnummer van het bedrijf kan ernaast, als jullie dat ook op de pagina willen.",
      },
    ],
  },
]

const agreements = [
  { title: "Welke pagina's", text: "Home, diensten, over en contact. Extra pagina's alleen als een bezoeker ze echt nodig heeft." },
  { title: "Taal en stand", text: "Nederlands, Engels, of allebei. Licht, donker, of de twee naast elkaar." },
  { title: "De inbox", text: "Welk adres de formulieren ontvangt, en wie er dezelfde dag op antwoordt." },
  { title: "Zelf wijzigen", text: "Welke zin en welke foto jullie na live zelf vervangen, en waar dat in de site zit." },
]

function Depth({
  index,
  label,
  title,
  text,
  id,
  children,
}: {
  index: string
  label: string
  title: string
  text: string
  id?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[#e4eee8] py-12 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand">
        {index} · {label}
      </p>
      <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mist sm:text-base sm:leading-7">{text}</p>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export function WebsiteBuild({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden pt-8 pb-8 sm:pt-12 sm:pb-10">
      <Container>
        <p className="text-sm text-mist">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{service.title}</span>
        </p>
        <p className="mt-6 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand">
          <span className="h-px w-8 bg-brand" />
          WEBSITE
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.05]">
          {service.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-mist">{service.summary}</p>

        <div className="mt-14 flex flex-col">
          <Depth
            index="01"
            label="Oppervlak"
            title="Wat de bezoeker meteen ziet"
            text="Taal, en een lichte of donkere stand. De kop, de knop en het formulier volgen die keuze. De bezoeker wisselt zelf."
          >
            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
              <DetailPreferences />
              <ul className="grid gap-3">
                {surfaceMoves.map((item) => (
                  <li key={item.title} className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[#e8e8e3]">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-mist">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Depth>

          <Depth
            index="02"
            label="Pagina's"
            title="Wat er op elke pagina staat"
            text="Vier pagina's, elk met één taak. Per pagina staat wat de bezoeker daar komt doen, en welke onderdelen daarvoor op het scherm staan."
          >
            <ol className="grid gap-4">
              {pages.map((page, index) => (
                <li key={page.name} className="rounded-3xl bg-white p-5 ring-1 ring-[#e8e8e3] sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight">{page.name}</h3>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">{String(index + 1).padStart(2, "0")}</p>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-mist sm:text-base sm:leading-7">{page.lead}</p>
                  <div className="mt-4 rounded-2xl bg-[#f6f6f4] px-4 py-4 sm:px-5">
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">OP HET SCHERM</p>
                    <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                      {page.blocks.map((block) => (
                        <li key={block.label}>
                          <p className="text-sm font-semibold text-ink">{block.label}</p>
                          <p className="mt-1 text-sm leading-6 text-mist">{block.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Depth>

          <Depth
            index="03"
            label="Onderdelen"
            title="Wat we onder die pagina's bouwen"
            text="Merk, schermen, het formulier, vindbaarheid en de plek waar je later zelf een zin wijzigt."
          >
            <WebsiteBento includes={service.includes} />
          </Depth>

          <Depth
            id="aanpak"
            index="04"
            label="Werk"
            title="Hoe het werk loopt"
            text="Eerst het gesprek, dan de opzet, dan de pagina's, en daarna live. Per stap staat wat we daarbij doen."
          >
            <ol className="grid gap-4">
              {service.steps.map((step, index) => (
                <li key={step.title} className="grid gap-3 rounded-3xl bg-white p-5 ring-1 ring-[#e8e8e3] sm:grid-cols-[auto_1fr] sm:p-6">
                  <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-mist">{step.text}</p>
                    <p className="mt-3 max-w-2xl border-l-2 border-brand pl-3 text-sm leading-6 text-ink">
                      {stepCopy[step.title] ?? step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Depth>

          <Depth
            index="05"
            label="Afspraken"
            title="Wat we opschrijven voordat de bouw start"
            text="Dit is de laag die de site vastzet. Zonder deze afspraken blijft de rest een schets."
          >
            <ol className="grid gap-3 sm:grid-cols-2">
              {agreements.map((item, index) => (
                <li key={item.title} className="rounded-2xl bg-[#101412] px-5 py-4 text-white">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-brand">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{item.text}</p>
                </li>
              ))}
            </ol>
          </Depth>
        </div>
      </Container>
    </section>
  )
}

const preferenceCopy = {
  nl: {
    nav: ["Home", "Diensten", "Contact"],
    kicker: "Installatie",
    title: "We komen langs in Reeuwijk",
    body: "Storing, onderhoud of een nieuwe plek. Eén bericht is genoeg.",
    action: "Plan een bezoek",
  },
  en: {
    nav: ["Home", "Services", "Contact"],
    kicker: "Installation",
    title: "We come by in Reeuwijk",
    body: "A fault, maintenance, or a new site. One message is enough.",
    action: "Book a visit",
  },
} as const

function DetailPreferences() {
  const [lang, setLang] = useState<"nl" | "en">("nl")
  const [dark, setDark] = useState(false)
  const copy = preferenceCopy[lang]

  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-[0_24px_50px_-36px_rgba(20,20,20,0.4)] ring-1 ring-[#e8e8e3] sm:p-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-brand">VOORKEUREN</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">Talen, licht en donker</h3>
      <p className="mt-3 text-sm leading-6 text-mist">
        We spreken af welke talen de site voert, en of er een lichte en een donkere stand komt.
        Pagina's, knoppen en het formulier volgen die keuze. De bezoeker wisselt zelf. Het verhaal
        blijft hetzelfde.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="flex rounded-full bg-[#f3f3f1] p-1 ring-1 ring-[#e7e7e2]" role="group" aria-label="Taal">
          {(["nl", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors",
                lang === code ? "bg-white text-ink shadow-[0_4px_12px_-8px_rgba(20,20,20,0.45)]" : "text-mist",
              )}
            >
              {code}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={dark}
          onClick={() => setDark((value) => !value)}
          className="ml-auto flex items-center gap-2 rounded-full bg-[#f3f3f1] py-1 pr-1 pl-3 text-xs font-semibold text-ink ring-1 ring-[#e7e7e2]"
        >
          {dark ? "Donker" : "Licht"}
          <span
            className={cn(
              "grid size-7 place-items-center rounded-full bg-white text-ink shadow-[0_4px_12px_-8px_rgba(20,20,20,0.5)] transition-colors",
              dark && "bg-ink text-white",
            )}
          >
            {dark ? <Moon className="size-3.5" aria-hidden /> : <Sun className="size-3.5" aria-hidden />}
          </span>
        </button>
      </div>

      <div
        className={cn(
          "pref-stage mt-4 flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-2xl p-4 ring-1 transition-colors duration-300 motion-reduce:transition-none sm:p-5",
          dark ? "bg-[#141414] text-[#f6f6f4] ring-white/10" : "bg-[#f6f6f4] text-ink ring-[#e7e7e2]",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-xs font-semibold tracking-[0.16em]", dark ? "text-[#f6f6f4]" : "text-ink")}>JR</p>
          <p className={cn("flex gap-3 text-[11px]", dark ? "text-white/55" : "text-mist")}>
            {copy.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </div>
        <div key={`${lang}-${dark}`} className="pref-in mt-6">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-brand uppercase">{copy.kicker}</p>
          <p className="mt-2 max-w-[16rem] text-lg leading-6 font-semibold tracking-tight">{copy.title}</p>
          <p className={cn("mt-2 max-w-[18rem] text-sm leading-6", dark ? "text-white/60" : "text-mist")}>
            {copy.body}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white">
            {copy.action}
          </span>
        </div>
        <p className={cn("mt-auto pt-4 text-[10px] font-semibold tracking-[0.14em] uppercase", dark ? "text-white/40" : "text-mist")}>
          {lang === "nl" ? "Nederlands" : "English"} · {dark ? "Donker" : "Licht"}
        </p>
      </div>
    </article>
  )
}


function WebsiteBento({ includes }: { includes: Service["includes"] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {includes.map((item) => {
        const Icon = includeIcons[item.title] ?? PanelsTopLeft
        const wide = wideIncludes.has(item.title)
        return (
          <li
            key={item.title}
            className={cn(
              "rounded-2xl bg-white p-4 ring-1 ring-[#e8e8e3] transition duration-200 hover:shadow-[0_16px_40px_-28px_rgba(20,20,20,0.4)] hover:ring-brand/40",
              wide && "sm:col-span-2",
            )}
          >
            <span className="grid size-8 place-items-center rounded-lg bg-[#eef8f1] text-brand">
              <Icon className="size-4" aria-hidden />
            </span>
            <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-mist">{includeCopy[item.title] ?? item.text}</p>
          </li>
        )
      })}
    </ul>
  )
}
