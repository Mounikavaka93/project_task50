import { useState } from "react"
import { todayISO } from "../data"
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons"
import Field from "./Field"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  depart: "",
  travelers: "2",
  message: "",
}

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 2 || /\d/.test(form.name)) {
    errors.name = "Enter your name using letters."
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address."
  }
  const digits = form.phone.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Enter a phone number with 10 to 15 digits."
  }
  if (form.destination.trim().length < 2) {
    errors.destination = "Tell us where you want to go."
  }
  if (!form.depart) {
    errors.depart = "Choose a departure date."
  }
  return errors
}

export default function Contact({ draft }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [reference, setReference] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [noted, setNoted] = useState(false)
  const [appliedDraftId, setAppliedDraftId] = useState(null)

  if (draft && draft.id !== appliedDraftId) {
    setAppliedDraftId(draft.id)
    setForm({
      ...form,
      destination: draft.destination || form.destination,
      depart: draft.depart || form.depart,
      travelers: draft.travelers || form.travelers,
      message: draft.message || form.message,
    })
    setSubmitted(false)
    setErrors({})
    setNoted(true)
  }

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }
    setReference(`ATT-${Date.now().toString().slice(-6)}`)
    setSubmitted(true)
    setNoted(false)
  }

  function reset() {
    setForm(emptyForm)
    setErrors({})
    setSubmitted(false)
    setNoted(false)
    setReference("")
  }

  return (
    <section id="contact" className="bg-sand py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="05 — Contact"
            title="Tell us the dates. We’ll hold the rest."
            text="Share a route or a package. This form prepares a booking request — no payment is taken here."
          />
        </Reveal>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Reveal>
          <div className="rounded-[1.75rem] bg-white p-5 shadow-xl shadow-ink/5 sm:p-8">
            {submitted ? (
              <div role="status" className="py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Request ready</p>
                <h3 className="mt-3 font-display text-4xl font-medium text-ink">{reference}</h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-navy/75">
                  Nothing has been charged. A specialist would confirm seats, stays, and the live fare before
                  ticketing. In this preview, the request stays in your browser.
                </p>
                <button type="button" className="btn-line mt-6" onClick={reset}>
                  Start another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {noted ? (
                  <p className="mb-5 rounded-2xl bg-gold-light/50 px-4 py-3 text-sm leading-relaxed text-ink">
                    Your flight or package is noted below. Add your details and send it as a booking request.
                  </p>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="contact-name" label="Full name" error={errors.name}>
                    <input
                      id="contact-name"
                      className="field"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={form.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      onChange={(event) => update("name", event.target.value)}
                    />
                  </Field>
                  <Field id="contact-email" label="Email" error={errors.email}>
                    <input
                      id="contact-email"
                      className="field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={form.email}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      onChange={(event) => update("email", event.target.value)}
                    />
                  </Field>
                  <Field id="contact-phone" label="Phone" error={errors.phone}>
                    <input
                      id="contact-phone"
                      className="field"
                      type="tel"
                      name="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      onChange={(event) => update("phone", event.target.value)}
                    />
                  </Field>
                  <Field id="contact-destination" label="Destination" error={errors.destination}>
                    <input
                      id="contact-destination"
                      className="field"
                      placeholder="Where would you like to go?"
                      value={form.destination}
                      aria-invalid={Boolean(errors.destination)}
                      aria-describedby={errors.destination ? "contact-destination-error" : undefined}
                      onChange={(event) => update("destination", event.target.value)}
                    />
                  </Field>
                  <Field id="contact-depart" label="Departure" error={errors.depart}>
                    <input
                      id="contact-depart"
                      className="field"
                      type="date"
                      min={todayISO(0)}
                      value={form.depart}
                      aria-invalid={Boolean(errors.depart)}
                      aria-describedby={errors.depart ? "contact-depart-error" : undefined}
                      onChange={(event) => update("depart", event.target.value)}
                    />
                  </Field>
                  <Field id="contact-travelers" label="Travellers">
                    <select
                      id="contact-travelers"
                      className="field"
                      value={form.travelers}
                      onChange={(event) => update("travelers", event.target.value)}
                    >
                      {Array.from({ length: 9 }, (_, index) => String(index + 1)).map((count) => (
                        <option key={count} value={count}>
                          {count} {count === "1" ? "traveller" : "travellers"}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="contact-message" label="Notes" className="sm:col-span-2">
                    <textarea
                      id="contact-message"
                      className="field min-h-32 resize-y"
                      rows={4}
                      placeholder="Cabin, must-see stops, or anything the fare should include."
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                    />
                  </Field>
                </div>
                <button type="submit" className="btn-ink mt-6 w-full sm:w-auto">
                  Send booking request
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal from="right" delay={100}>
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-[1.75rem] bg-ink p-6 text-cream sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">Visit the desk</p>
              <h3 className="mt-3 font-display text-4xl font-medium">New Delhi</h3>
              <p className="mt-3 flex gap-3 text-sm leading-relaxed text-cream/75">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
                14 Horizon Arcade, Connaught Place, New Delhi 110001
              </p>
              <a className="mt-4 flex items-center gap-3 text-sm text-gold-light transition hover:text-cream" href="tel:+911145678900">
                <PhoneIcon />
                +91 11 4567 8900
              </a>
              <a
                className="mt-3 flex items-center gap-3 text-sm text-gold-light transition hover:text-cream"
                href="mailto:hello@aeroplanetours.com"
              >
                <MailIcon />
                hello@aeroplanetours.com
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="overflow-hidden rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/5">
                <ClockIcon className="h-6 w-6 text-gold" />
                <p className="mt-3 font-display text-2xl text-ink">Desk hours</p>
                <p className="mt-1 text-sm text-navy/70">Monday to Saturday, 9:00–19:00 IST. The night line stays open for travellers already in the air.</p>
              </div>
              <div className="overflow-hidden rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/5">
                <MailIcon className="h-6 w-6 text-gold" />
                <p className="mt-3 font-display text-2xl text-ink">Reply time</p>
                <p className="mt-1 text-sm text-navy/70">Booking requests are answered within one working day, with the live fare written out before you decide.</p>
              </div>
            </div>
          </aside>
        </Reveal>
        </div>
      </div>
    </section>
  )
}
