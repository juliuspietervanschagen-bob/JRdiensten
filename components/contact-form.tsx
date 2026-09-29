"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { services, type ServiceSlug } from "@/lib/services"
import { site } from "@/lib/site"
import { useState } from "react"

const fieldClass = "h-11 rounded-xl bg-white px-3"

type Fields = {
  name: string
  company: string
  email: string
  service: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

export function ContactForm({ initialService }: { initialService?: string }) {
  const preset = services.some((service) => service.slug === initialService)
    ? initialService
    : ""
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<Fields | null>(null)
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle")

  function validate(values: Fields) {
    const next: Errors = {}
    if (!values.name.trim()) next.name = "Vul je naam in."
    if (!values.email.trim()) next.email = "Vul je e-mailadres in."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Dit e-mailadres klopt niet."
    }
    if (!values.service) next.service = "Kies een dienst."
    if (!values.message.trim()) next.message = "Schrijf kort wat je nodig hebt."
    return next
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: Fields = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    }
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const serviceTitle =
      services.find((service) => service.slug === (values.service as ServiceSlug))?.title ??
      values.service
    const subject = `Aanvraag ${serviceTitle} — ${values.name}`
    const body = [
      `Naam: ${values.name}`,
      values.company ? `Bedrijf: ${values.company}` : null,
      `E-mail: ${values.email}`,
      `Dienst: ${serviceTitle}`,
      "",
      values.message.trim(),
    ]
      .filter(Boolean)
      .join("\n")

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setCopyState("idle")
    setSent(values)
  }

  async function copyMessage() {
    if (!sent) return
    const serviceTitle =
      services.find((service) => service.slug === (sent.service as ServiceSlug))?.title ??
      sent.service
    const text = `Aan: ${site.email}\nDienst: ${serviceTitle}\n\n${sent.message.trim()}`
    try {
      await navigator.clipboard.writeText(text)
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  if (sent) {
    const serviceTitle =
      services.find((service) => service.slug === (sent.service as ServiceSlug))?.title ??
      sent.service
    return (
      <div className="rounded-3xl bg-white p-6 ring-1 ring-[#e6e6e1] sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand">BERICHT KLAAR</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Je e-mailprogramma gaat open</h2>
        <p className="mt-3 text-sm leading-6 text-mist">
          Verstuur het bericht naar {site.email}. Opent er niets, kopieer dan de tekst en mail ons
          zelf.
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-mist">Dienst</dt>
            <dd className="font-medium">{serviceTitle}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-mist">Naam</dt>
            <dd className="font-medium">{sent.name}</dd>
          </div>
        </dl>
        <pre className="mt-5 rounded-2xl bg-paper p-4 text-sm leading-6 whitespace-pre-wrap text-ink">
          {sent.message.trim()}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            className="h-11 rounded-full bg-brand px-5 text-white hover:bg-brand-dark"
            onClick={copyMessage}
          >
            {copyState === "copied" ? "Gekopieerd" : "Kopieer bericht"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full bg-white px-5"
            onClick={() => setSent(null)}
          >
            Nieuw bericht
          </Button>
        </div>
        {copyState === "failed" ? (
          <p className="mt-3 text-sm text-destructive" role="alert">
            Kopiëren lukt niet in deze browser. Selecteer de tekst hierboven.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 ring-1 ring-[#e6e6e1] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Naam" htmlFor="name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Bedrijf" htmlFor="company" optional>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            className={fieldClass}
          />
        </Field>
        <Field label="E-mail" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field label="Dienst" htmlFor="service" error={errors.service}>
          <select
            id="service"
            name="service"
            defaultValue={preset}
            aria-invalid={Boolean(errors.service)}
            className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Kies een dienst</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Bericht" htmlFor="message" error={errors.message}>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Wat wil je laten bouwen of automatiseren?"
            className="min-h-32 rounded-xl bg-white px-3 py-3"
            aria-invalid={Boolean(errors.message)}
          />
        </Field>
      </div>
      {Object.keys(errors).length > 0 ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          Controleer de gemarkeerde velden en verstuur opnieuw.
        </p>
      ) : null}
      <Button
        type="submit"
        className="mt-6 h-11 rounded-full bg-brand px-5 text-white hover:bg-brand-dark"
      >
        Bericht klaarzetten
      </Button>
      <p className="mt-3 text-xs leading-5 text-mist">
        We openen je e-mailprogramma. Er wordt niets op een server opgeslagen. Het adres is{" "}
        {site.email}.
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>
        {label}
        {optional ? <span className="font-normal text-mist">optioneel</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
