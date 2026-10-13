import { offers } from "../data"

export default function Offers({ onApply }) {
  return (
    <section id="offers" className="shell py-16 md:py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Fare codes</p>
      <h2 className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
        Codes that change the sample total.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/70">
        Apply a code and the flight search runs again. The discount shows on each fare before you request a hold.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {offers.map((offer) => (
          <li key={offer.code} className="flex flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/5">
            <p className="font-display text-3xl text-gold">{offer.save}</p>
            <h3 className="mt-3 font-display text-2xl text-ink">{offer.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">{offer.detail}</p>
            <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-navy/50">{offer.code}</p>
            <button type="button" className="btn-ink mt-4 w-full" onClick={() => onApply(offer.code)}>
              Apply {offer.code}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
