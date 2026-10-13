import { useEffect, useRef } from "react"
import CountUp from "./CountUp"
import Photo from "./Photo"
import { PlaneIcon } from "./Icons"

const stats = [
  { value: "28", label: "Years flying" },
  { value: "86", label: "Countries" },
  { value: "4.9", label: "Guest rating" },
]

export default function Hero() {
  const layerRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return undefined
    const onScroll = () => {
      const shift = Math.min(window.scrollY, 640) * 0.16
      if (layerRef.current) layerRef.current.style.transform = `translate3d(0, ${shift}px, 0)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section id="home" className="relative flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden bg-ink md:min-h-[calc(100svh-6.75rem)]">
      <div ref={layerRef} className="absolute -inset-y-16 inset-x-0 will-change-transform">
        <Photo
          src="/images/hero.jpg"
          alt="Aeroplane wing above a bright layer of clouds"
          priority
          className="ken absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/25" />

      <PlaneIcon className="cruise pointer-events-none absolute top-[22%] right-[18%] hidden h-14 w-14 text-gold-light lg:block" />
      <p className="pointer-events-none absolute top-16 right-10 hidden font-display text-7xl text-white/10 lg:block">
        AT 1998
      </p>

      <div className="shell relative z-10 pt-12 pb-40 sm:pb-44">
        <p className="hero-rise text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-light">
          Aeroplane Tours & Travels
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] leading-[1.05] font-medium tracking-[-0.035em] text-cream sm:text-6xl lg:text-[4.4rem]">
          <span className="block overflow-hidden">
            <span className="hero-rise inline-block" style={{ animationDelay: "90ms" }}>
              Chart a course
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-rise inline-block italic text-gold-light" style={{ animationDelay: "220ms" }}>
              worth taking.
            </span>
          </span>
        </h1>
        <p className="hero-rise mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg" style={{ animationDelay: "340ms" }}>
          We arrange the flight, the stay, and the hours in between. Fares are explained before you commit, and a
          person answers when a connection slips.
        </p>

        <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "460ms" }}>
          <a href="#search" className="btn-gold group w-full sm:w-auto">
            Search flights
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </a>
          <a href="#packages" className="btn-ghost w-full sm:w-auto">
            See packages
          </a>
        </div>

        <div className="mt-8 inline-flex max-w-full items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
          <span className="hidden h-10 w-10 place-items-center rounded-full bg-gold text-ink sm:grid">
            <PlaneIcon className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-light">
              Sample hop
            </span>
            <span className="block text-sm text-cream sm:text-base">Delhi to Dubai · about 3h 35m · nonstop</span>
          </span>
        </div>

        <dl className="mt-10 grid max-w-xl grid-cols-3 border-t border-white/15 pt-6">
          {stats.map((stat, index) => (
            <div key={stat.label} className={index === 0 ? "pr-4" : "border-l border-white/15 px-4"}>
              <dd className="font-display text-3xl font-medium text-cream sm:text-4xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="mt-1 text-xs tracking-wide text-cream/65 sm:text-sm">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
