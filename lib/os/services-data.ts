export const serviceIconNames = [
  "mark",
  "pages",
  "screens",
  "inbox",
  "search",
  "edit",
  "live",
  "bag",
  "checkout",
  "card",
  "orders",
  "phone",
  "receipt",
  "trial",
  "stores",
  "brand",
  "platforms",
  "account",
  "devices",
  "patch",
  "release",
  "handwork",
  "link",
  "forward",
  "trace",
  "sample",
  "guide",
  "handoff",
] as const

export type ServiceIconName = (typeof serviceIconNames)[number]

export type OsServiceFeature = {
  icon: ServiceIconName
  title: string
  text: string
}

export type OsServiceSlug = "website-building" | "webshop" | "app" | "automatisering"

export type OsService = {
  slug: OsServiceSlug
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
  webshop: {
    slug: "webshop",
    kicker: "WEBSHOP",
    title: "Webshop bouwen",
    summary: "Een webshop waarin klanten producten vinden, vertrouwen en afrekenen zonder gedoe.",
    fromPrice: 2490,
    features: [
      {
        icon: "bag",
        title: "Assortiment dat klopt",
        text: "Producten met de informatie die erbij hoort: een locatie, een kenmerk of een andere eigenschap. Bijzondere producten krijgen een vaste plek.",
      },
      {
        icon: "checkout",
        title: "Korte checkout",
        text: "De knop bij het product, de winkelwagen en het betalen in weinig stappen, zonder verrassing aan het eind.",
      },
      {
        icon: "card",
        title: "Betaalprovider",
        text: "De betaalmethodes die we samen hebben gekozen, via een provider die Nederlandse klanten kennen.",
      },
      {
        icon: "orders",
        title: "Bestellingen op één plek",
        text: "Nieuwe orders, status en klantgegevens in een overzicht waar je dagelijks mee werkt.",
      },
      {
        icon: "phone",
        title: "Gebouwd voor de telefoon",
        text: "Vormgeving, knoppen en jullie eigen tabbladen blijven prettig op een klein scherm, en daarna ook op een groot scherm.",
      },
      {
        icon: "receipt",
        title: "Automatische bevestiging",
        text: "Na het bestellen krijgt de klant een bon en een mail. Jij krijgt de order binnen zonder overtikken.",
      },
      {
        icon: "trial",
        title: "Getest met een bestelling",
        text: "We doen zelf een bestelling, van de winkelwagen tot de betaling, zodat een dubbele klik geen tweede order wordt.",
      },
    ],
  },
  app: {
    slug: "app",
    kicker: "APP",
    title: "App bouwen",
    summary: "Een app die klanten downloaden in de App Store en de Play Store.",
    fromPrice: 3990,
    features: [
      {
        icon: "stores",
        title: "App Store en Play Store",
        text: "We richten de app in voor publicatie in beide stores, inclusief de vermelding en de eerste versie.",
      },
      {
        icon: "brand",
        title: "Schermen in jullie merk",
        text: "De app voelt als jullie bedrijf: zelfde toon, kleur en de taken die een klant echt doet.",
      },
      {
        icon: "platforms",
        title: "iPhone en Android",
        text: "Eén app, gebouwd zodat hij prettig werkt op beide platformen.",
      },
      {
        icon: "account",
        title: "Account voor de klant",
        text: "Inloggen, een profiel en de gegevens die bij jullie dienst horen.",
      },
      {
        icon: "devices",
        title: "Getest op echte toestellen",
        text: "We lopen de belangrijkste schermen na op een iPhone en een Android-telefoon.",
      },
      {
        icon: "patch",
        title: "Eerste update inbegrepen",
        text: "Na livegang lossen we de eerste fouten op die in de stores naar boven komen.",
      },
      {
        icon: "release",
        title: "In de stores",
        text: "We dienen de app in bij de App Store en de Play Store en begeleiden de publicatie.",
      },
    ],
  },
  automatisering: {
    slug: "automatisering",
    kicker: "AUTOMATISERING",
    title: "Automatisering",
    summary: "Koppel de website of webshop die je al hebt, en haal het overtikken uit je dag.",
    fromPrice: 990,
    features: [
      {
        icon: "handwork",
        title: "Het handwerk in beeld",
        text: "We schrijven op waar iemand nu kopieert, mailt of een status bijwerkt.",
      },
      {
        icon: "link",
        title: "Koppeling met wat je hebt",
        text: "Site, shop, mail of spreadsheet geven gegevens aan elkaar door.",
      },
      {
        icon: "forward",
        title: "De volgende stap vanzelf",
        text: "Een bestelling, aanvraag of status gaat door zonder dat iemand het overtypt.",
      },
      {
        icon: "trace",
        title: "Zicht op wat er liep",
        text: "Je ziet welke stap automatisch ging, en waar een mens nog moet kijken.",
      },
      {
        icon: "sample",
        title: "Getest met jouw voorbeelden",
        text: "We proberen de koppeling met een echte aanvraag of order uit je proces.",
      },
      {
        icon: "guide",
        title: "Uitleg voor het team",
        text: "Degene die ermee werkt krijgt een korte handleiding, geen dik handboek.",
      },
      {
        icon: "handoff",
        title: "Overdracht",
        text: "Je team weet wat er gebeurt, en wanneer iemand alsnog moet ingrijpen.",
      },
    ],
  },
} as const satisfies Record<OsServiceSlug, OsService>
