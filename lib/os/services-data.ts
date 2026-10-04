export const serviceIconNames = ["mark", "pages", "screens", "inbox", "search", "edit", "live"] as const

export type ServiceIconName = (typeof serviceIconNames)[number]

export type OsServiceFeature = {
  icon: ServiceIconName
  title: string
  text: string
}

export type OsService = {
  slug: "website-building"
  title: string
  kicker: string
  summary: string
  fromPrice: number
  features: readonly OsServiceFeature[]
}

/** Showcase copy for Agency OS service pages. The marketing pages keep their own text. */
export const servicesData = {
  "website-building": {
    slug: "website-building",
    kicker: "WEBSITE",
    title: "Website bouwen",
    summary:
      "Een website die uitlegt wie je bent, wat je doet en wat de bezoeker daarna kan doen.",
    fromPrice: 1490,
    features: [
      {
        icon: "mark",
        title: "Ontwerp in jullie merk",
        text: "Geen standaard template. Lettertype, kleur en indeling komen uit jullie bedrijf en blijven gelijk op elke pagina.",
      },
      {
        icon: "pages",
        title: "Pagina's met een taak",
        text: "Home, diensten, over jullie en contact. Elke pagina heeft één volgende stap, zodat niemand hoeft te zoeken.",
      },
      {
        icon: "screens",
        title: "Telefoon en desktop",
        text: "Tekst blijft leesbaar, knoppen blijven groot genoeg voor een duim, en foto's snijden niet weg wat iemand moet zien.",
      },
      {
        icon: "inbox",
        title: "Contact dat aankomt",
        text: "Het formulier vraagt naam, onderwerp en telefoonnummer. Het bericht komt in de inbox, klaar om terug te bellen.",
      },
      {
        icon: "search",
        title: "Vindbaar van start",
        text: "Elke pagina krijgt een eigen titel en een zin die zegt waar die over gaat. De structuur is helder en de eerste load is snel.",
      },
      {
        icon: "edit",
        title: "Zelf teksten aanpassen",
        text: "Na oplevering vervang je zelf een zin of een foto. We laten kort zien waar dat zit.",
      },
      {
        icon: "live",
        title: "Live met toegang",
        text: "We zetten de site online, controleren of elke pagina opent en of een testbericht aankomt, en geven je de toegang.",
      },
    ],
  },
} as const satisfies Record<string, OsService>
