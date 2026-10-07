"use client"

import { Container } from "@/components/container"
import type { Service } from "@/lib/services"
import Link from "next/link"
import { cn } from "cn"
import {
  ArrowUpRight,
  House,
  Image,
  Inbox,
  ListOrdered,
  Mail,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  PanelsTopLeft,
  Moon,
  PenLine,
  Search,
  Smartphone,
  Sun,
  Type,
  UserRound,
  Users,
  Workflow,
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

const pageField = {
  ink: {
    bg: "#141414",
    image: "radial-gradient(circle, rgba(22,163,74,0.95) 1.15px, transparent 1.25px)",
    size: "14px 14px",
  },
  green: {
    bg: "#16a34a",
    image:
      "repeating-linear-gradient(-45deg, transparent, transparent 9px, rgba(255,255,255,0.18) 9px, rgba(255,255,255,0.18) 10px)",
    size: "auto",
  },
  deep: {
    bg: "#128a3e",
    image:
      "radial-gradient(circle at 16% 30%, rgba(255,255,255,0.2) 0 18px, transparent 19px), radial-gradient(circle at 84% 75%, rgba(255,255,255,0.14) 0 32px, transparent 33px)",
    size: "auto",
  },
  stripe: {
    bg: "#0c100e",
    image:
      "repeating-linear-gradient(90deg, transparent, transparent 13px, rgba(22,163,74,0.45) 13px, rgba(22,163,74,0.45) 14px)",
    size: "auto",
  },
} as const

const pages: {
  name: string
  code: string
  icon: LucideIcon
  tone: keyof typeof pageField
  lead: string
  blocks: { label: string; text: string; icon: LucideIcon }[]
}[] = [
  {
    name: "Home",
    code: "HOME",
    icon: House,
    tone: "ink",
    lead: "Home heeft één taak: meteen zeggen wat het bedrijf doet, en waar het werkt. De rest van de pagina wijst naar dat werk. Een bezoeker hoeft hier niet te zoeken naar de volgende stap.",
    blocks: [
      {
        label: "De eerste zin",
        icon: Type,
        text: "Wat het bedrijf doet, en het gebied waarin het werkt. Die zin staat bovenaan, in gewone taal, zodat een bezoeker meteen weet of hij hier goed is.",
      },
      {
        label: "Eén knop",
        icon: MousePointerClick,
        text: "Daaronder één knop: naar diensten, of meteen naar contact. De bezoeker ziet welke stap de site van hem vraagt, en tikt die meteen aan.",
      },
      {
        label: "Het werk",
        icon: Image,
        text: "Daarna ruimte voor het werk zelf. Een paar beelden, of een korte rij van wat het bedrijf maakt of doet. De volledige lijst van diensten blijft op de volgende pagina.",
      },
      {
        label: "Op een telefoon",
        icon: Smartphone,
        text: "De zin en de knop blijven in het eerste scherm. De bezoeker hoeft niet te scrollen voordat hij weet waar hij moet tikken. Het beeld van het werk volgt daarna.",
      },
    ],
  },
  {
    name: "Diensten",
    code: "WERK",
    icon: PanelsTopLeft,
    tone: "green",
    lead: "Diensten laat zien wat een bezoeker kan aanvragen. Elke dienst is een taak met een begin en een einde, geen losse alinea. Aan het eind van die taak staat hoe hij start.",
    blocks: [
      {
        label: "Wat er gebeurt",
        icon: Workflow,
        text: "Per dienst een korte uitleg van het werk, in de woorden van het bedrijf. Wat de bezoeker krijgt als hij deze taak aanvraagt, en wat hij daarvoor moet aanleveren.",
      },
      {
        label: "Voor wie het is",
        icon: Users,
        text: "Voor wie die dienst bedoeld is. Iemand die er niet bij hoort, ziet dat vroeg en leest niet door tot een knop die niet voor hem is.",
      },
      {
        label: "De knop om te starten",
        icon: ArrowUpRight,
        text: "Elke dienst eindigt met de knop om te starten. Die gaat naar contact, en het onderwerp hoort bij die dienst, zodat het bericht niet blanco in de inbox valt.",
      },
      {
        label: "De volgorde",
        icon: ListOrdered,
        text: "De diensten staan in de volgorde waarin een bezoeker ze tegenkomt: eerst het werk dat het vaakst wordt gevraagd. Een dienst zonder aanvraag krijgt geen eigen blok.",
      },
    ],
  },
  {
    name: "Over",
    code: "MENSEN",
    icon: UserRound,
    tone: "deep",
    lead: "Over maakt het bedrijf herkenbaar voordat iemand een bericht stuurt. De bezoeker ziet wie er langskomt, en dat het werk in het gebied rond Reeuwijk gebeurt.",
    blocks: [
      {
        label: "Wie er langskomt",
        icon: UserRound,
        text: "Een korte tekst over de mensen die het werk doen, en waarom iemand hen inschakelt. Genoeg om te weten bij wie het bericht aankomt.",
      },
      {
        label: "Het gebied",
        icon: MapPin,
        text: "Waar het bedrijf werkt, met Reeuwijk als het punt dat bezoekers herkennen. Iemand van verderop leest of hij hier terecht kan, of dat het werk ook bij hem langskomt.",
      },
      {
        label: "Het beeld",
        icon: Image,
        text: "Een foto van de mensen of van het werk, naast de tekst. Het beeld hoort bij die zin, zodat een bezoeker de mensen herkent die langskomen.",
      },
      {
        label: "Door naar contact",
        icon: ArrowUpRight,
        text: "Onderaan staat de knop naar contact. De pagina eindigt bij de volgende stap, niet bij een laatste alinea waarna de bezoeker moet terugzoeken in het menu.",
      },
    ],
  },
  {
    name: "Contact",
    code: "BERICHT",
    icon: Mail,
    tone: "stripe",
    lead: "Contact vraagt alleen wat nodig is om terug te bellen of te mailen. Het bericht komt aan in de inbox die jullie al lezen, met de velden die op het scherm stonden.",
    blocks: [
      {
        label: "Drie velden",
        icon: PenLine,
        text: "Naam, onderwerp en telefoonnummer. Daarmee kan iemand dezelfde dag terugbellen of mailen. Extra vragen maken het versturen langer en horen er alleen bij als jullie ze echt nodig hebben.",
      },
      {
        label: "In de inbox",
        icon: Inbox,
        text: "Het bericht landt in de inbox die jullie al lezen, met die drie velden erbij. Jullie zien wie het stuurde, waar het over gaat, en welk nummer je belt.",
      },
      {
        label: "Vanaf een dienst",
        icon: PanelsTopLeft,
        text: "Komt de bezoeker vanaf een dienst, dan hoort het onderwerp bij die dienst. Hij hoeft op contact niet opnieuw te typen wat hij wil aanvragen.",
      },
      {
        label: "Meteen in beeld",
        icon: MonitorSmartphone,
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
    <section className="pt-8 pb-8 sm:pt-12 sm:pb-10">
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
        <div className="mt-5 max-w-2xl space-y-4 text-lg leading-8 text-mist">
          <p>
            Een website die uitlegt wie je bent, wat je doet, en wat de bezoeker daarna kan doen.
            JR Intelligence bouwt die site voor je: home, diensten, over en contact, in jullie merk.
          </p>
          <p>
            Home opent met wat het bedrijf doet en waar het werkt, en wijst met één knop door. Op
            diensten staat per taak wat er gebeurt, voor wie het is, en hoe iemand start. Over laat
            zien wie er langskomt. Contact vraagt naam, onderwerp en telefoon, en zet dat bericht in
            de inbox die jullie al lezen.
          </p>
          <p>
            De pagina's blijven leesbaar op een telefoon en op een groot scherm. De bezoeker wisselt
            zelf van taal, en van een lichte of donkere stand. De kop, de knop en het formulier volgen
            die keuze.
          </p>
        </div>

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
            <ol className="grid gap-5">
              {pages.map((page, index) => {
                const field = pageField[page.tone]
                const PageIcon = page.icon
                const number = String(index + 1).padStart(2, "0")
                return (
                  <li key={page.name} className="pakket-lift rounded-3xl bg-white ring-1 ring-[#e8e8e3]">
                    <div className="overflow-hidden rounded-3xl">
                      <div
                        className="relative flex items-center gap-4 px-5 py-6 sm:px-7"
                        style={{
                          backgroundColor: field.bg,
                          backgroundImage: field.image,
                          backgroundSize: field.size,
                        }}
                      >
                        <span
                          className="pointer-events-none absolute right-6 top-4 font-mono text-4xl font-semibold tabular-nums text-white/20"
                          aria-hidden
                        >
                          {number}
                        </span>
                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand ring-1 ring-white/50">
                          <PageIcon className="size-6" aria-hidden />
                        </span>
                        <div className="relative min-w-0">
                          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.16em] text-white/80">
                            <span className="size-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" aria-hidden />
                            {number} · {page.code}
                          </p>
                          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{page.name}</h3>
                        </div>
                      </div>
                      <div className="px-5 py-5 sm:px-7 sm:py-6">
                        <p className="max-w-3xl text-sm leading-6 text-mist sm:text-base sm:leading-7">{page.lead}</p>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                          {page.blocks.map((block) => {
                            const BlockIcon = block.icon
                            return (
                              <li key={block.label} className="rounded-2xl bg-[#f6f6f4] p-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-brand ring-1 ring-[#e4eee8]">
                                    <BlockIcon className="size-4" aria-hidden />
                                  </span>
                                  <p className="text-sm font-semibold text-ink">{block.label}</p>
                                </div>
                                <p className="mt-2 text-sm leading-6 text-mist">{block.text}</p>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              })}
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


const buildMeta: Record<string, { code: string; Scene: () => ReactNode }> = {
  "Ontwerp in jullie merk": { code: "MERK", Scene: MerkScene },
  "Pagina's met een taak": { code: "PAGINA", Scene: PagesScene },
  "Telefoon en desktop": { code: "SCHERM", Scene: ScreensScene },
  "Contact dat aankomt": { code: "INBOX", Scene: InboxScene },
  "Vindbaar van start": { code: "ZOEK", Scene: SearchScene },
  "Zelf teksten aanpassen": { code: "TEKST", Scene: EditScene },
}

function WebsiteBento({ includes }: { includes: Service["includes"] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {includes.map((item, index) => {
        const Icon = includeIcons[item.title] ?? PanelsTopLeft
        const meta = buildMeta[item.title]
        const Scene = meta?.Scene
        const number = String(index + 1).padStart(2, "0")
        return (
          <li key={item.title} className="pakket-lift rounded-3xl bg-white ring-1 ring-[#e8e8e3]">
            <div className="overflow-hidden rounded-3xl">
              <div className="relative h-40 sm:h-44">
                {Scene ? <Scene /> : null}
                <span className="absolute top-3 right-4 font-mono text-[10px] font-semibold tracking-[0.16em] text-white/75">
                  {number} · {meta?.code ?? "SITE"}
                </span>
                <span className="absolute bottom-3 left-4 grid size-11 place-items-center rounded-2xl bg-white text-brand shadow-[0_8px_20px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/70">
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
              <div className="px-4 py-4 sm:px-5">
                <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-mist">{includeCopy[item.title] ?? item.text}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function MerkScene() {
  return (
    <svg viewBox="0 0 500 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="500" height="170" fill="#141414" />
      <g fill="#16a34a">
        {Array.from({ length: 65 }, (_, i) => (
          <circle key={i} cx={(i % 13) * 40 + 8} cy={Math.floor(i / 13) * 34 + 8} r="1.2" opacity="0.85" />
        ))}
      </g>
      <ellipse cx="250" cy="156" rx="160" ry="22" fill="#16a34a" opacity="0.16" />
      <text x="78" y="74" fill="#f6f6f4" fontSize="42" fontWeight="650" fontFamily="ui-sans-serif, system-ui, sans-serif">
        JR
      </text>
      <path d="M78 88h64" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
      <path d="M78 104h40M78 116h52" stroke="#f6f6f4" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <rect x="188" y="36" width="20" height="98" rx="6" fill="#16a34a" />
      <rect x="216" y="36" width="20" height="98" rx="6" fill="#f6f6f4" />
      <rect x="244" y="36" width="20" height="98" rx="6" fill="#0c100e" stroke="#16a34a" strokeWidth="1.5" />
      <circle cx="348" cy="84" r="44" fill="#16a34a" />
      <circle cx="398" cy="58" r="26" fill="#f6f6f4" />
      <circle cx="308" cy="112" r="20" fill="#0c100e" stroke="#16a34a" strokeWidth="3" />
      <circle cx="360" cy="76" r="6" fill="#f6f6f4" />
    </svg>
  )
}

function PagesScene() {
  const sheets = [
    { x: 78, label: "HOME" },
    { x: 172, label: "WERK" },
    { x: 266, label: "OVER" },
    { x: 360, label: "MAIL" },
  ]
  return (
    <svg viewBox="0 0 500 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="500" height="170" fill="#16a34a" />
      <g opacity="0.18" stroke="#fff" strokeWidth="8">
        <path d="M-40 20 L540 120 M-40 78 L540 178 M-40 -30 L540 70" />
      </g>
      <circle cx="430" cy="24" r="40" fill="#fff" opacity="0.12" />
      {sheets.map((sheet) => (
        <g key={sheet.label}>
          <rect x={sheet.x} y="26" width="78" height="118" rx="8" fill="#0c100e" />
          <rect x={sheet.x} y="26" width="78" height="18" rx="8" fill="#141414" />
          <rect x={sheet.x} y="36" width="78" height="8" fill="#141414" />
          <text
            x={sheet.x + 8}
            y="39"
            fill="#f6f6f4"
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.12em"
            fontFamily="ui-monospace, monospace"
          >
            {sheet.label}
          </text>
          <path
            d={`M${sheet.x + 10} 60h42M${sheet.x + 10} 74h28M${sheet.x + 10} 88h36`}
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x={sheet.x + 10} y="108" width="30" height="12" rx="6" fill="#16a34a" />
        </g>
      ))}
    </svg>
  )
}

function ScreensScene() {
  return (
    <svg viewBox="0 0 500 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="500" height="170" fill="#0c100e" />
      <g stroke="#16a34a" strokeWidth="1" opacity="0.35">
        <path d="M0 128 H500 M0 148 H500 M70 128 L150 170 M250 128 V170 M430 128 L350 170" />
      </g>
      <path d="M0 0 H500" stroke="#16a34a" strokeWidth="3" opacity="0.65" />
      <ellipse cx="210" cy="158" rx="110" ry="16" fill="#16a34a" opacity="0.18" />
      <rect x="78" y="22" width="210" height="112" rx="8" fill="#141414" />
      <rect x="88" y="32" width="190" height="84" rx="3" fill="#07140c" />
      <path d="M100 46h36M148 46h22M182 46h18" stroke="#f6f6f4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M100 66h92" stroke="#f6f6f4" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 80h64" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <rect x="100" y="94" width="40" height="10" rx="5" fill="#16a34a" />
      <rect x="148" y="134" width="70" height="6" rx="2" fill="#141414" />
      <rect x="328" y="16" width="86" height="136" rx="12" fill="#f6f6f4" />
      <rect x="336" y="30" width="70" height="104" rx="4" fill="#141414" />
      <path d="M346 46h30M346 58h44M346 72h22" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <rect x="346" y="86" width="46" height="26" rx="3" fill="#16a34a" />
      <circle cx="371" cy="144" r="3.5" fill="#16a34a" />
      <circle cx="96" cy="12" r="2.4" fill="#16a34a" className="lab-led" />
      <circle cx="420" cy="12" r="2.4" fill="#16a34a" className="lab-led lab-led-late" />
    </svg>
  )
}

function InboxScene() {
  return (
    <svg viewBox="0 0 500 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="500" height="170" fill="#0c100e" />
      <g opacity="0.32" stroke="#16a34a" strokeWidth="1">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${i * 30} 0 V170`} />
        ))}
      </g>
      <rect x="86" y="24" width="340" height="122" rx="12" fill="#141414" stroke="#16a34a" strokeWidth="1.5" />
      <path d="M86 50 H426" stroke="#16a34a" strokeWidth="1" opacity="0.45" />
      <circle cx="106" cy="37" r="3.5" fill="#16a34a" className="lab-led" />
      <circle cx="120" cy="37" r="3.5" fill="#128a3e" opacity="0.75" />
      <text x="136" y="41" fill="#f6f6f4" fontSize="9" fontWeight="650" letterSpacing="0.16em" fontFamily="ui-monospace, monospace">
        INBOX
      </text>
      <rect x="100" y="62" width="96" height="22" rx="4" fill="#16a34a" />
      <rect x="100" y="90" width="96" height="16" rx="4" fill="#0c100e" />
      <rect x="100" y="112" width="96" height="16" rx="4" fill="#0c100e" />
      <path d="M108 73h52M108 99h40M108 121h44" stroke="#f6f6f4" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <text x="214" y="76" fill="#16a34a" fontSize="8" fontWeight="700" letterSpacing="0.14em" fontFamily="ui-monospace, monospace">
        NAAM
      </text>
      <text x="214" y="98" fill="#16a34a" fontSize="8" fontWeight="700" letterSpacing="0.14em" fontFamily="ui-monospace, monospace">
        ONDERWERP
      </text>
      <text x="214" y="120" fill="#16a34a" fontSize="8" fontWeight="700" letterSpacing="0.14em" fontFamily="ui-monospace, monospace">
        TEL
      </text>
      <path d="M292 72h110M292 94h84M292 116h62" stroke="#f6f6f4" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

function SearchScene() {
  return (
    <svg viewBox="0 0 500 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="500" height="170" fill="#141414" />
      <g fill="#16a34a">
        {Array.from({ length: 52 }, (_, i) => (
          <circle key={i} cx={(i % 13) * 40 + 10} cy={Math.floor(i / 13) * 42 + 12} r="1.15" opacity="0.75" />
        ))}
      </g>
      <circle cx="168" cy="84" r="24" fill="none" stroke="#16a34a" strokeWidth="1.5" opacity="0.4" />
      <circle cx="168" cy="84" r="46" fill="none" stroke="#16a34a" strokeWidth="1.25" opacity="0.35" />
      <circle
        cx="168"
        cy="84"
        r="62"
        fill="none"
        stroke="#16a34a"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="36 360"
        opacity="0.35"
        className="build-sweep"
      />
      <circle cx="168" cy="84" r="5" fill="#16a34a" className="lab-led" />
      <path d="M200 114 232 146" stroke="#f6f6f4" strokeWidth="8" strokeLinecap="round" />
      <rect x="286" y="42" width="150" height="86" rx="10" fill="#0c100e" stroke="#16a34a" strokeWidth="1.5" />
      <text x="300" y="64" fill="#16a34a" fontSize="9" fontWeight="700" letterSpacing="0.16em" fontFamily="ui-monospace, monospace">
        PAGINA
      </text>
      <path d="M300 80h100M300 96h72" stroke="#f6f6f4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="310" cy="112" r="3.5" fill="#16a34a" className="lab-led" />
      <path d="M320 112h70" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}

function EditScene() {
  return (
    <svg viewBox="0 0 500 170" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="500" height="170" fill="#0c100e" />
      <g opacity="0.4" stroke="#16a34a" strokeWidth="1">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${i * 30} 0 V170`} />
        ))}
      </g>
      <rect x="72" y="26" width="230" height="118" rx="10" fill="#141414" />
      <path d="M88 50h130" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <rect x="86" y="62" width="168" height="16" rx="3" fill="#f6f6f4" />
      <path d="M94 70h86" stroke="#141414" strokeWidth="2" strokeLinecap="round" />
      <rect x="184" y="65" width="2" height="10" fill="#16a34a" className="caret-blink" />
      <path d="M88 96h160M88 112h104M88 128h132" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <rect x="328" y="40" width="78" height="56" rx="6" fill="#141414" stroke="#f6f6f4" strokeWidth="1.5" />
      <rect x="346" y="54" width="86" height="62" rx="6" fill="#16a34a" />
      <path d="M360 82h42M360 96h26" stroke="#f6f6f4" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <path d="M360 22 418 80 398 86 340 28Z" fill="#f6f6f4" />
      <path d="M398 86 418 80 412 100Z" fill="#128a3e" />
    </svg>
  )
}
