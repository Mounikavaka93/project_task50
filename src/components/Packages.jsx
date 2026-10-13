import { featurePackage, packages } from "../data"
import { CheckIcon } from "./Icons"
import Photo from "./Photo"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function PackageCard({ trip, onBook, delay }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-56 overflow-hidden bg-navy">
          <Photo
            src={trip.image}
            alt={trip.alt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white">
            {trip.save}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{trip.duration}</p>
          <h3 className="mt-2 font-display text-2xl font-medium text-ink">{trip.name}</h3>
          <p className="text-sm text-navy/70">{trip.destination}</p>
          <ul className="mt-4 space-y-2">
            {trip.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy/80">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <div>
              <p className="text-xs text-navy/70 line-through">₹{trip.was}</p>
              <p className="font-display text-3xl leading-none text-ink">₹{trip.price}</p>
              <p className="mt-1 text-xs text-navy/55">per person</p>
            </div>
            <button type="button" className="btn-ink" onClick={() => onBook(trip)}>
              Book trip
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Packages({ onBook }) {
  return (
    <section id="packages" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="02 — Packages"
            title="Trips with the fare already unpacked."
            text="Flights, stays, and the extras that usually get forgotten — priced per person so you can compare them plainly."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((trip, index) => (
            <PackageCard key={trip.name} trip={trip} onBook={onBook} delay={index * 80} />
          ))}
        </div>

        <Reveal delay={120}>
          <article className="mt-5 grid overflow-hidden rounded-[1.75rem] bg-ink text-cream shadow-xl md:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-64 bg-navy">
              <Photo src={featurePackage.image} alt={featurePackage.alt} className="h-full min-h-64 w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                {featurePackage.save} · {featurePackage.duration}
              </p>
              <h3 className="mt-3 font-display text-4xl font-medium tracking-[-0.03em]">{featurePackage.name}</h3>
              <p className="mt-2 text-cream/70">{featurePackage.destination}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">{featurePackage.text}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {featurePackage.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-cream/85">
                    <CheckIcon className="h-4 w-4 text-gold-light" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-cream/75 line-through">₹{featurePackage.was}</p>
                  <p className="font-display text-4xl text-gold-light">₹{featurePackage.price}</p>
                  <p className="text-xs text-cream/60">per person</p>
                </div>
                <button type="button" className="btn-gold" onClick={() => onBook(featurePackage)}>
                  Book this winter
                </button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
