import { destinations } from "../data"
import Photo from "./Photo"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function spanFor(index) {
  if (index === 0) return "sm:col-span-2 lg:col-span-3 lg:row-span-2"
  if (index < 3) return "lg:col-span-3"
  if (index === 5) return "sm:col-span-2 lg:col-span-2"
  return "lg:col-span-2"
}

export default function Destinations({ onExplore }) {
  return (
    <section id="destinations" className="bg-sand py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="01 — Destinations"
            title="Places people ask for twice."
            text="Six routes the desk books again and again. Choose one and it drops straight into the flight search."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {destinations.map((place, index) => (
            <Reveal key={place.city} className={spanFor(index)} delay={index * 70}>
              <button
                type="button"
                onClick={() => onExplore(place.airport)}
                className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] bg-navy text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea ${
                  index === 0 ? "min-h-[380px] lg:min-h-[560px]" : "min-h-[280px]"
                }`}
              >
                <Photo
                  src={place.image}
                  alt={place.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/10 transition duration-300 group-hover:from-ink/90" />
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-[320%]" />
                <span className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                    {place.country}
                  </span>
                  <span className="mt-1 font-display text-3xl font-medium text-cream sm:text-4xl">{place.city}</span>
                  <span className="mt-2 max-w-sm text-sm leading-relaxed text-cream/80">{place.blurb}</span>
                  <span className="mt-5 flex items-center justify-between gap-3 text-sm text-cream">
                    <span>
                      From <span className="font-semibold">₹{place.price}</span>
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1.5 transition duration-300 group-hover:bg-gold group-hover:text-ink">
                      {place.nights} · Plan
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
