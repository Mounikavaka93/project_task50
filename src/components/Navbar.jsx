import { useEffect, useRef, useState } from "react"
import { CloseIcon, MenuIcon, PlaneIcon } from "./Icons"

const links = [
  { id: "home", href: "#home", label: "Home" },
  { id: "search", href: "#search", label: "Flights" },
  { id: "destinations", href: "#destinations", label: "Destinations" },
  { id: "packages", href: "#packages", label: "Packages" },
  { id: "services", href: "#services", label: "Services" },
  { id: "about", href: "#about", label: "About" },
  { id: "contact", href: "#contact", label: "Contact" },
]

const tools = [
  { href: "#check-in", label: "Check-in" },
  { href: "#status", label: "Flight status" },
  { href: "#manage", label: "Manage booking" },
  { href: "#offers", label: "Offers" },
]

export default function Navbar() {
  const headerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)
    if (!nodes.length || typeof IntersectionObserver === "undefined") return undefined

    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        let bestId = ""
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })
        if (bestId) setActive(bestId)
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1180) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-ink/40 min-[1180px]:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={`relative z-50 border-b border-ink/8 bg-cream/95 backdrop-blur-md ${
          scrolled || open ? "shadow-lg shadow-ink/5" : ""
        }`}
      >
        <div className="hidden border-b border-ink/10 bg-ink text-cream md:block">
          <div className="shell flex h-9 items-center justify-end gap-5">
            {tools.map((tool) => (
              <a key={tool.href} href={tool.href} className="text-xs font-medium text-cream/80 transition hover:text-gold-light">
                {tool.label}
              </a>
            ))}
          </div>
        </div>
        <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
          <a href="#home" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-gold-light">
              <PlaneIcon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-medium tracking-[-0.02em] text-ink">Aeroplane</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/65">
                Tours & Travels
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 min-[1180px]:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={active === link.id ? "page" : undefined}
                className={`group relative py-1 text-sm font-medium transition ${
                  active === link.id ? "text-ink" : "text-navy/70 hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    active === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#search" className="btn-gold hidden sm:inline-flex">
              Book now
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink transition hover:border-gold min-[1180px]:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="menu-in absolute inset-x-0 top-full z-50 max-h-[75vh] overflow-auto border-t border-ink/10 bg-cream px-5 py-3 shadow-xl sm:px-6 lg:px-8 min-[1180px]:hidden"
          >
            <div className="grid grid-cols-2 gap-1 pb-2">
              {tools.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-2 py-2 text-sm font-medium text-navy transition hover:bg-sand"
                >
                  {tool.label}
                </a>
              ))}
            </div>
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-2 py-3 font-display text-2xl text-ink transition hover:bg-sand"
              >
                {link.label}
              </a>
            ))}
            <a href="#search" onClick={() => setOpen(false)} className="btn-gold mt-2 mb-2 w-full sm:hidden">
              Book now
            </a>
          </nav>
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-ink/5" aria-hidden="true">
          <div className="h-full origin-left bg-gold" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </header>
  )
}
