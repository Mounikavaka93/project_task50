import { useState } from "react"
import { faqs } from "../data"

const rules = [
  { title: "Cabin bag", detail: "7 kg, about 55 × 35 × 25 cm, one piece in the cabin." },
  { title: "Web check-in", detail: "Opens 48 hours before departure and stays on the desk sample until the counter closes." },
  { title: "Counter close", detail: "60 minutes before a domestic departure, 75 minutes before an international one." },
  { title: "Children", detail: "Ages 2 to 11 pay 75% of the adult fare on these sample tickets." },
  { title: "Infants", detail: "Under 2, on a lap, at 10% of the adult fare. One infant per adult." },
  { title: "Saver and Flexi", detail: "Flexi waives the change fee on the sample. Saver can still be changed, with a fee plus any fare difference." },
]

export default function Guide() {
  const [open, setOpen] = useState(0)

  return (
    <section id="guide" className="shell py-16 md:py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Travel rules</p>
      <h2 className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
        What the desk briefs before you pay.
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <li key={rule.title} className="rounded-2xl bg-white p-5 ring-1 ring-ink/5">
            <h3 className="font-display text-xl text-ink">{rule.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">{rule.detail}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h3 className="font-display text-2xl text-ink">Questions the desk hears</h3>
        <div className="mt-4 divide-y divide-navy/10 rounded-[1.5rem] bg-white ring-1 ring-ink/5">
          {faqs.map((item, index) => {
            const expanded = open === index
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span className="font-medium text-ink">{item.q}</span>
                  <span className="text-gold" aria-hidden="true">
                    {expanded ? "–" : "+"}
                  </span>
                </button>
                {expanded ? <p className="px-5 pb-4 text-sm leading-relaxed text-navy/70">{item.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
