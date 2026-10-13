import { services } from "../data"
import { BedIcon, CarIcon, CompassIcon, PlaneIcon, ShieldIcon, VisaIcon } from "./Icons"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const icons = {
  flights: PlaneIcon,
  packages: CompassIcon,
  visa: VisaIcon,
  stays: BedIcon,
  transfers: CarIcon,
  cover: ShieldIcon,
}

export default function Services() {
  return (
    <section id="services" className="bg-ink py-20 text-cream md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            light
            eyebrow="03 — Services"
            title="Everything around the ticket."
            text="The flight is the start. These are the pieces we line up so the rest of the journey feels looked after."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.key]
            return (
              <Reveal key={service.key} delay={index * 60}>
                <article className="group h-full rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold-light transition duration-500 group-hover:rotate-6 group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-6 w-6 transition duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-medium">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">{service.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
