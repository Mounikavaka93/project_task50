import { useState } from "react"

const year = new Date().getFullYear()

const explore = [
  { href: "#search", label: "Search flights" },
  { href: "#check-in", label: "Web check-in" },
  { href: "#status", label: "Flight status" },
  { href: "#manage", label: "Manage booking" },
  { href: "#offers", label: "Offers" },
  { href: "#guide", label: "Travel rules" },
]

const company = [
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Contact" },
  { href: "tel:+911145678900", label: "Call the desk" },
  { href: "mailto:hello@aeroplanetours.com", label: "Email" },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.")
      setDone(false)
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <footer className="bg-[#0b1726] text-cream">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-medium">Aeroplane</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">Tours & Travels</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Flights, stays, and full holidays from a Delhi desk that still picks up the phone.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">Explore</p>
          <ul className="mt-4 space-y-2">
            {explore.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-cream/75 transition hover:text-gold-light">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">Company</p>
          <ul className="mt-4 space-y-2">
            {company.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-cream/75 transition hover:text-gold-light">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">Route notes</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Seasonal fare notes for people who like a plan more than a surprise.
          </p>
          {done ? (
            <p role="status" className="mt-4 text-sm text-gold-light">
              Saved in this preview. A live desk would send route notes to {email.trim()}.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-4" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold-light"
                />
                <button type="submit" className="btn-gold shrink-0">
                  Join
                </button>
              </div>
              {error ? (
                <p role="alert" className="mt-2 text-sm text-coral">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Aeroplane Tours & Travels. All rights reserved.</p>
          <p>Fares on this page are samples for planning and can change before ticketing.</p>
        </div>
      </div>
    </footer>
  )
}
