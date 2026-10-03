export type ServiceSlug = "webshop" | "website" | "app" | "automatisering"

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
    text: "Een korte mail is genoeg. We plannen het gesprek waarin we de shop doornemen.",
  },
  {
    word: "Gesprek",
    title: "We bespreken jullie webshop",
    text: "Jullie kennen de producten. Wij kennen de shop. Die vaardigheden leggen we bij elkaar. We kijken naar de betaalmethodes, de vormgeving, waar de bijzondere producten staan, en welke tabbladen alleen bij deze shop horen.",
  },
  {
    word: "Prijs",
    title: "Een vaste prijs",
    text: "Je krijgt één prijs voor wat we hebben afgesproken: vormgeving, producten, de knop bij een artikel, de winkelwagen, het betalen en de mail na een bestelling. We beginnen pas als dat bedrag vaststaat.",
  },
  {
    word: "Bouwen",
    title: "Bouwen en testen",
    text: "We zetten de vormgeving neer, de knoppen bij elk product en de plek voor de bijzondere artikelen. De tabbladen die alleen bij jullie horen komen in de shop. Bij een product staan de gegevens die een klant nodig heeft: informatie, een locatie of een kenmerk. Daarna doen we zelf een bestelling, van de winkelwagen tot de betaling, zodat een dubbele klik geen tweede order wordt.",
  },
  {
    word: "Oplevering",
    title: "De shop wordt opgeleverd",
    text: "De shop komt bij jullie met die tabbladen, de winkelwagen en een checkout die de afgesproken betaalmethodes aankan. Na het bestellen gaan de bon en de mail de deur uit. Je ziet waar de order binnenkomt en hoe je de status zet.",
  },
  {
    word: "Review",
    title: "Samen nalopen",
    text: "We lopen de productknop, de plek van de bijzondere producten, de winkelwagen en jullie eigen tabbladen samen na. Ook de bon en de mail na het bestellen, op een telefoon en op een groot scherm. Wat in de afspraak zat en nog niet klopt, passen we aan voordat de shop opengaat.",
  },
  {
    word: "Nazorg",
    title: "Altijd bereikbaar",
    text: "Daarna blijven we bereikbaar als een betaalmethode vastloopt, een tabblad niet klopt, of de bon of de mail niet aankomt. Je hoeft dat niet zelf uit te zoeken. Een bericht is genoeg, en we laten weten wat we hebben rechtgezet.",
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
        text: "Producten met de informatie die erbij hoort: een locatie, een kenmerk of een andere eigenschap. Bijzondere producten krijgen een vaste plek.",
      },
      {
        title: "Korte checkout",
        text: "De knop bij het product, de winkelwagen en het betalen in weinig stappen, zonder verrassing aan het eind.",
      },
      {
        title: "Betaalprovider",
        text: "De betaalmethodes die we samen hebben gekozen, via een provider die Nederlandse klanten kennen.",
      },
      {
        title: "Bestellingen op één plek",
        text: "Nieuwe orders, status en klantgegevens in een overzicht waar je dagelijks mee werkt.",
      },
      {
        title: "Gebouwd voor de telefoon",
        text: "Vormgeving, knoppen en jullie eigen tabbladen blijven prettig op een klein scherm, en daarna ook op een groot scherm.",
      },
      {
        title: "Automatische bevestiging",
        text: "Na het bestellen krijgt de klant een bon en een mail. Jij krijgt de order binnen zonder overtikken.",
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
      "Bijzondere producten hebben een vaste plek, met een knop die in de winkelwagen legt",
      "De betaalmethodes die we samen hebben gekozen, in één checkout",
      "Na het bestellen gaan de bon en de mail vanzelf naar de klant",
      "Tabbladen die alleen bij deze shop horen, op telefoon en op desktop",
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
      "Een site die in een paar pagina's uitlegt wie je bent, wat je doet en wat de bezoeker daarna kan doen",
      "Een knop naar contact of aanvraag op de pagina's waar iemand moet beslissen",
      "Tekst en knoppen die leesbaar blijven op een telefoon, en die je met een duim haalt",
      "Een basis waar je later zelf een zin wijzigt, of een pagina aan toevoegt",
    ],
  },
  {
    slug: "app",
    title: "App bouwen",
    menuDescription: "Apps voor de App Store en de Play Store",
    summary: "Een app die klanten downloaden in de App Store en de Play Store.",
    audience:
      "Voor bedrijven die een eigen app willen, op iPhone en Android, niet alleen een site in de browser.",
    fromPrice: 3990,
    includes: [
      {
        title: "App Store en Play Store",
        text: "We richten de app in voor publicatie in beide stores, inclusief de vermelding en de eerste versie.",
      },
      {
        title: "Schermen in jullie merk",
        text: "De app voelt als jullie bedrijf: zelfde toon, kleur en de taken die een klant echt doet.",
      },
      {
        title: "iPhone en Android",
        text: "Eén app, gebouwd zodat hij prettig werkt op beide platformen.",
      },
      {
        title: "Account voor de klant",
        text: "Inloggen, een profiel en de gegevens die bij jullie dienst horen.",
      },
      {
        title: "Getest op echte toestellen",
        text: "We lopen de belangrijkste schermen na op een iPhone en een Android-telefoon.",
      },
      {
        title: "Eerste update inbegrepen",
        text: "Na livegang lossen we de eerste fouten op die in de stores naar boven komen.",
      },
    ],
    steps: [
      {
        title: "Wat de app moet doen",
        text: "We bespreken de taken, de gebruikers en of de app in beide stores moet.",
      },
      {
        title: "De schermen",
        text: "Je ziet de belangrijkste schermen voordat we de app bouwen.",
      },
      {
        title: "Bouwen en testen",
        text: "We bouwen de app en testen hem op iPhone en Android.",
      },
      {
        title: "In de stores",
        text: "We dienen de app in bij de App Store en de Play Store en begeleiden de publicatie.",
      },
    ],
    outcomes: [
      "Een app die in de App Store en de Play Store kan",
      "Schermen die passen bij jullie merk",
      "Getest op iPhone en Android",
      "Een vaste prijs voordat we beginnen",
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
