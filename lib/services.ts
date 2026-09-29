export type ServiceSlug = "webshop" | "website" | "automatisering"

export type ServiceStep = {
  title: string
  text: string
}

export type JourneyStep = {
  word: string
  title: string
  text: string
}

export const webshopJourney: JourneyStep[] = [
  {
    word: "Contact",
    title: "Jullie nemen contact op",
    text: "Een korte mail is genoeg om te starten.",
  },
  {
    word: "Gesprek",
    title: "Details van jullie webshop",
    text: "We bespreken producten, verzending en wat klanten moeten kunnen.",
  },
  {
    word: "Prijs",
    title: "Een vaste prijs",
    text: "We spreken de prijs af, voordat er gebouwd wordt.",
  },
  {
    word: "Bouwen",
    title: "Bouwen en testen",
    text: "We bouwen de webshop en testen hem, inclusief een echte bestelling.",
  },
  {
    word: "Oplevering",
    title: "De shop wordt opgeleverd",
    text: "We leveren de webshop op, klaar voor jullie klanten.",
  },
  {
    word: "Review",
    title: "Samen nalopen",
    text: "We lopen de shop samen door, zodat jullie zien hoe alles werkt.",
  },
  {
    word: "Nazorg",
    title: "Altijd bereikbaar",
    text: "Daarna kunnen jullie ons altijd bereiken voor fixes of problemen.",
  },
]

export type ServicePoint = {
  title: string
  text: string
}

export type Service = {
  slug: ServiceSlug
  title: string
  menuDescription: string
  summary: string
  audience: string
  fromPrice: number
  includes: ServicePoint[]
  steps: ServiceStep[]
  outcomes: string[]
}

export const services: Service[] = [
  {
    slug: "webshop",
    title: "Webshop bouwen",
    menuDescription: "Snelle webshops die prettig en overtuigend verkopen",
    summary:
      "Een webshop waarin klanten producten vinden, vertrouwen en afrekenen zonder gedoe.",
    audience:
      "Voor bedrijven die producten online willen verkopen, in een shop die past bij hoe ze werken.",
    fromPrice: 2490,
    includes: [
      {
        title: "Assortiment dat klopt",
        text: "Producten, varianten en categorieën, op een manier die een klant meteen snapt.",
      },
      {
        title: "Korte checkout",
        text: "Winkelwagen, verzendkosten en betalen in weinig stappen, zonder verrassing aan het eind.",
      },
      {
        title: "Betaalprovider",
        text: "Afrekenen via een betaalprovider, inclusief methodes die Nederlandse klanten verwachten.",
      },
      {
        title: "Bestellingen op één plek",
        text: "Nieuwe orders, status en klantgegevens in een overzicht waar je dagelijks mee werkt.",
      },
      {
        title: "Gebouwd voor de telefoon",
        text: "De shop is eerst prettig op een klein scherm, en daarna ook op een groot scherm.",
      },
      {
        title: "Automatische bevestiging",
        text: "De klant krijgt na de bestelling een mail. Jij krijgt de order binnen zonder overtikken.",
      },
    ],
    steps: [
      {
        title: "Wat je verkoopt",
        text: "We nemen je assortiment, verzending en de vragen die klanten nu stellen door.",
      },
      {
        title: "De shop in beeld",
        text: "Je ziet de opbouw van product, winkelwagen en checkout voordat we alles bouwen.",
      },
      {
        title: "Bouwen en vullen",
        text: "We zetten de shop neer, laden een eerste set producten en testen een echte bestelling.",
      },
      {
        title: "Open voor klanten",
        text: "We zetten de shop live en laten zien hoe je zelf producten en orders bijhoudt.",
      },
    ],
    outcomes: [
      "Klanten kunnen een product kiezen en betalen",
      "Jij ziet nieuwe bestellingen zonder spreadsheet",
      "Verzendkosten en bevestigingsmail staan klaar",
      "De shop werkt op telefoon en desktop",
    ],
  },
  {
    slug: "website",
    title: "Website bouwen",
    menuDescription: "Professionele websites voor zichtbaarheid en groei",
    summary:
      "Een website die uitlegt wie je bent, wat je doet en wat de bezoeker daarna kan doen.",
    audience:
      "Voor bedrijven die online nog ontbreken, of een site hebben die niet meer past bij het werk.",
    fromPrice: 1490,
    includes: [
      {
        title: "Ontwerp in jullie merk",
        text: "Geen standaard template-look. Typografie, kleur en indeling volgen jullie bedrijf.",
      },
      {
        title: "Pagina's met een taak",
        text: "Home, diensten, over jullie en contact, zodat een bezoeker de volgende stap ziet.",
      },
      {
        title: "Telefoon en desktop",
        text: "Tekst, knoppen en foto's blijven leesbaar en klikbaar op elk scherm.",
      },
      {
        title: "Contact dat aankomt",
        text: "Een formulier dat een bericht in jullie inbox zet, met de gegevens die je nodig hebt.",
      },
      {
        title: "Vindbaar van start",
        text: "Paginatitels, een heldere structuur en een snelle pagina als basis voor zoekmachines.",
      },
      {
        title: "Zelf teksten aanpassen",
        text: "Na oplevering kun je kleine teksten en foto's zelf bijwerken, met een korte uitleg.",
      },
    ],
    steps: [
      {
        title: "Kennismaking",
        text: "We bespreken je bedrijf, je bezoekers en wat de site moet opleveren.",
      },
      {
        title: "Ontwerp",
        text: "Je ziet de sfeer en de opbouw van de pagina's voordat we gaan bouwen.",
      },
      {
        title: "Bouw",
        text: "We maken de site, zetten de teksten erin en koppelen het contactformulier.",
      },
      {
        title: "Live",
        text: "We publiceren de site, controleren de pagina's en geven je de toegang.",
      },
    ],
    outcomes: [
      "Een site die uitlegt wat je doet",
      "Een duidelijke knop naar contact of aanvraag",
      "Pagina's die goed werken op een telefoon",
      "Een basis waar je later pagina's aan toevoegt",
    ],
  },
  {
    slug: "automatisering",
    title: "Automatisering",
    menuDescription: "Slimme koppelingen voor werk dat je al online doet",
    summary:
      "Koppel de website of webshop die je al hebt, en haal het overtikken uit je dag.",
    audience:
      "Voor bedrijven die al online verkopen of aanvragen binnenkrijgen, en tijd verliezen aan handwerk eromheen.",
    fromPrice: 990,
    includes: [
      {
        title: "Het handwerk in beeld",
        text: "We schrijven op waar iemand nu kopieert, mailt of een status bijwerkt.",
      },
      {
        title: "Koppeling met wat je hebt",
        text: "Site, shop, mail of spreadsheet geven gegevens aan elkaar door.",
      },
      {
        title: "De volgende stap vanzelf",
        text: "Een bestelling, aanvraag of status gaat door zonder dat iemand het overtypt.",
      },
      {
        title: "Zicht op wat er liep",
        text: "Je ziet welke stap automatisch ging, en waar een mens nog moet kijken.",
      },
      {
        title: "Getest met jouw voorbeelden",
        text: "We proberen de koppeling met een echte aanvraag of order uit je proces.",
      },
      {
        title: "Uitleg voor het team",
        text: "Degene die ermee werkt krijgt een korte handleiding, geen dik handboek.",
      },
    ],
    steps: [
      {
        title: "Proces",
        text: "We kijken waar tijd weglekt tussen je site of shop en de rest van het werk.",
      },
      {
        title: "Voorstel",
        text: "Je ziet wat we koppelen, wat er automatisch gaat en wat een vaste prijs wordt.",
      },
      {
        title: "Bouw",
        text: "We zetten de automatisering neer en testen met voorbeelden uit jouw bedrijf.",
      },
      {
        title: "Overdracht",
        text: "Je team weet wat er gebeurt, en wanneer iemand alsnog moet ingrijpen.",
      },
    ],
    outcomes: [
      "Minder overtikken tussen shop, site en inbox",
      "Een aanvraag of order die vanzelf doorloopt",
      "Een spoor van wat er automatisch gebeurde",
      "Een team dat weet wat het systeem doet",
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function formatFromPrice(amount: number) {
  return `vanaf €${amount.toLocaleString("nl-NL")}`
}
