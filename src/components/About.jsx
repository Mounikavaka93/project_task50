import CountUp from "./CountUp"
import Photo from "./Photo"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const facts = [
  { value: "28", label: "Years on the desk" },
  { value: "86", label: "Countries booked" },
  { value: "40+", label: "Airline partners" },
]

export default function About() {
  return (
    <section id="about" className="bg-cream py-20 md:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2">
        <Reveal from="left">
          <SectionHeading
            eyebrow="04 — About us"
            title="We plan the journey, then stay with it."
            text="Aeroplane Tours & Travels started as a ticketing counter and grew into a full journey desk. The habit that stayed: we ask how you like to travel before we talk about the fare."
          />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-navy/75">
            You get a written outline of what is included, what can still change, and who picks up if a flight moves.
            Prices on this site are samples for planning — the live fare is confirmed before anyone pays.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex min-h-28 flex-col justify-center rounded-2xl bg-sand px-3 py-4 text-center sm:px-4">
                <dd className="font-display text-3xl font-medium text-ink sm:text-4xl">
                  <CountUp value={fact.value} />
                </dd>
                <dt className="mt-1 text-xs leading-snug text-navy/65 sm:text-sm">{fact.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal from="right" delay={120}>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy shadow-xl">
            <Photo
              src="/images/about.jpg"
              alt="View from an aeroplane window, with the wing above the clouds"
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-ink/92 p-5 text-cream shadow-lg backdrop-blur sm:right-auto sm:max-w-xs">
              <p className="font-display text-4xl text-gold-light">24/7</p>
              <p className="mt-1 text-sm leading-relaxed text-cream/80">
                A desk that stays awake when a connection does not. Night landings included.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
