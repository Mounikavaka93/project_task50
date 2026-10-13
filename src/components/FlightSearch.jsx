import { useEffect, useRef, useState } from "react"
import { smoothScrollToId } from "../smoothScroll"
import {
  airports,
  buildFlights,
  cabins,
  carriers,
  cityOf,
  formatDate,
  formatInr,
  popularRoutes,
  promos,
  todayISO,
} from "../data"
import Field from "./Field"
import { PlaneIcon, SwapIcon } from "./Icons"

const tripTypes = [
  { id: "round", label: "Round trip" },
  { id: "oneway", label: "One way" },
  { id: "multi", label: "Multi-city" },
]

const tripCopy = {
  round: "round trip",
  oneway: "one way",
  multi: "multi-city",
}

function createForm(to = "Dubai (DXB)") {
  return {
    from: "Delhi (DEL)",
    to,
    depart: todayISO(21),
    returnDate: todayISO(28),
    via: "Singapore (SIN)",
    adults: "1",
    children: "0",
    infants: "0",
    promo: "",
    cabin: "Economy",
    tripType: "round",
  }
}

function partyLabel(query) {
  const parts = [`${query.adults} adult${query.adults === "1" ? "" : "s"}`]
  if (Number(query.children)) parts.push(`${query.children} ${query.children === "1" ? "child" : "children"}`)
  if (Number(query.infants)) parts.push(`${query.infants} infant${query.infants === "1" ? "" : "s"}`)
  return parts.join(", ")
}

function Stepper({ id, label, hint, value, min, max, onChange }) {
  return (
    <div>
      <p className="label" id={id}>
        {label}
      </p>
      <div className="field flex items-center justify-between" role="group" aria-labelledby={id}>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-lg leading-none text-ink disabled:opacity-30"
          aria-label={`Fewer ${label}`}
          disabled={value <= min}
          onClick={() => onChange(String(value - 1))}
        >
          −
        </button>
        <span className="text-sm font-semibold">{value}</span>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-lg leading-none text-ink disabled:opacity-30"
          aria-label={`More ${label}`}
          disabled={value >= max}
          onClick={() => onChange(String(value + 1))}
        >
          +
        </button>
      </div>
      <p className="mt-1 text-[11px] text-navy/50">{hint}</p>
    </div>
  )
}

function searchError(next) {
  if (next.from === next.to) return "Choose two different airports."
  if (!next.depart) return "Choose a departure date."
  if (next.tripType !== "oneway" && !next.returnDate) return "Choose a return date."
  if (next.tripType !== "oneway" && next.returnDate < next.depart) {
    return "The return date needs to be on or after departure."
  }
  if (next.tripType === "multi" && (next.via === next.from || next.via === next.to)) {
    return "The stopover should be a different airport."
  }
  const adults = Number(next.adults) || 0
  const children = Number(next.children) || 0
  const infants = Number(next.infants) || 0
  if (adults < 1) return "Add at least one adult."
  if (infants > adults) return "Each infant needs to travel with one adult."
  if (adults + children + infants > 9) return "One booking can hold up to 9 travellers."
  const code = next.promo.trim().toUpperCase()
  if (code && !promos[code]) return "That promo code is not valid. Try AERO500, MONSOON, or EARLYBIRD."
  return ""
}

export default function FlightSearch({ routeRequest, promoRequest = { code: "", id: 0 }, onHold }) {
  const [form, setForm] = useState(() => createForm(routeRequest.to))
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")
  const [flights, setFlights] = useState([])
  const [query, setQuery] = useState(null)
  const [job, setJob] = useState(null)
  const [appliedRouteId, setAppliedRouteId] = useState(routeRequest.id)
  const [appliedPromoId, setAppliedPromoId] = useState(promoRequest.id)
  const jobSeq = useRef(0)

  if (routeRequest.id !== appliedRouteId) {
    const next = { ...form, to: routeRequest.to }
    const problem = searchError(next)
    setAppliedRouteId(routeRequest.id)
    setForm(next)
    setFlights([])
    setQuery(null)
    if (problem) {
      setError(problem)
      setStatus("idle")
    } else {
      setJob({ id: routeRequest.id, form: next })
      setStatus("loading")
      setError("")
    }
  }

  if (promoRequest.id !== appliedPromoId) {
    const next = { ...form, promo: promoRequest.code }
    const problem = searchError(next)
    setAppliedPromoId(promoRequest.id)
    setForm(next)
    setFlights([])
    setQuery(null)
    if (!promoRequest.id || problem) {
      setError(problem)
      setStatus("idle")
    } else {
      setJob({ id: promoRequest.id, form: next })
      setStatus("loading")
      setError("")
    }
  }

  useEffect(() => {
    if (!job) return undefined
    const next = job.form
    const timeout = window.setTimeout(() => {
      setFlights(buildFlights(next))
      setQuery(next)
      setStatus("results")
    }, 650)
    return () => window.clearTimeout(timeout)
  }, [job])

  useEffect(() => {
    if (status !== "results") return
    smoothScrollToId("flight-results")
  }, [status, query])

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function queueSearch(next) {
    const problem = searchError(next)
    if (problem) {
      setError(problem)
      setStatus("idle")
      setFlights([])
      setQuery(null)
      return
    }
    jobSeq.current += 1
    setJob({ id: jobSeq.current, form: next })
    setStatus("loading")
    setError("")
  }

  function onSubmit(event) {
    event.preventDefault()
    queueSearch(form)
  }

  function hold(flight) {
    if (!query) return
    const when =
      query.tripType === "oneway"
        ? formatDate(query.depart)
        : `${formatDate(query.depart)} – ${formatDate(query.returnDate)}`
    const people = partyLabel(query)
    onHold({
      destination: query.to,
      depart: query.depart,
      travelers: String(Number(query.adults) + Number(query.children) + Number(query.infants)),
      message: `Please hold ${flight.airline} ${flight.number} (${flight.fareName}, ${flight.depart}–${flight.arrive.time}${
        flight.arrive.nextDay ? " +1" : ""
      }) from ${query.from} to ${query.to}${query.tripType === "multi" ? ` via ${query.via}` : ""}. ${when}. ${
        flight.stopsLabel
      }, ${query.cabin}. ${people}. Baggage: ${flight.baggage}. ${flight.checkInCloses}. Indicative total ${formatInr(
        flight.total,
      )}${flight.promoLabel ? ` after ${query.promo.trim().toUpperCase()} (${flight.promoLabel})` : ""}.`,
    })
  }

  function flyRoute(from, to) {
    const next = { ...form, from, to }
    setForm(next)
    queueSearch(next)
  }

  return (
    <section id="search" className="shell relative z-20 -mt-24 pb-16 md:-mt-28 md:pb-20">
      <div className="search-card rounded-[2rem] bg-white p-5 shadow-2xl shadow-ink/10 ring-1 ring-ink/5 sm:p-7 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Flight search</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">
              Where are you flying?
            </h2>
          </div>
          <div className="flex flex-wrap rounded-full bg-sand p-1" role="tablist" aria-label="Trip type">
            {tripTypes.map((trip) => (
              <button
                key={trip.id}
                type="button"
                role="tab"
                aria-selected={form.tripType === trip.id}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  form.tripType === trip.id ? "bg-ink text-cream" : "text-navy/70 hover:text-ink"
                }`}
                onClick={() => update("tripType", trip.id)}
              >
                {trip.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] xl:grid-cols-[1fr_auto_1fr_1fr_1fr]">
            <Field id="search-from" label="From">
              <select
                id="search-from"
                className="field"
                value={form.from}
                onChange={(event) => update("from", event.target.value)}
              >
                {airports.map((airport) => (
                  <option key={airport}>{airport}</option>
                ))}
              </select>
            </Field>

            <div className="flex items-end justify-center md:pb-1">
              <button
                type="button"
                aria-label="Swap departure and arrival"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 text-navy transition hover:rotate-180 hover:border-gold hover:text-ink"
                onClick={() => setForm((current) => ({ ...current, from: current.to, to: current.from }))}
              >
                <SwapIcon />
              </button>
            </div>

            <Field id="search-to" label="To">
              <select id="search-to" className="field" value={form.to} onChange={(event) => update("to", event.target.value)}>
                {airports.map((airport) => (
                  <option key={airport}>{airport}</option>
                ))}
              </select>
            </Field>

            <Field id="search-depart" label="Depart">
              <input
                id="search-depart"
                className="field"
                type="date"
                min={todayISO(0)}
                value={form.depart}
                onChange={(event) => update("depart", event.target.value)}
              />
            </Field>

            <Field id="search-return" label={form.tripType === "multi" ? "Final date" : "Return"}>
              <input
                id="search-return"
                className={`field ${form.tripType === "oneway" ? "cursor-not-allowed opacity-50" : ""}`}
                type="date"
                min={form.depart || todayISO(0)}
                value={form.returnDate}
                disabled={form.tripType === "oneway"}
                onChange={(event) => update("returnDate", event.target.value)}
              />
            </Field>
          </div>

          {form.tripType === "multi" ? (
            <div className="mt-4 max-w-sm">
              <Field id="search-via" label="Via">
                <select
                  id="search-via"
                  className="field"
                  value={form.via}
                  onChange={(event) => update("via", event.target.value)}
                >
                  {airports.map((airport) => (
                    <option key={airport}>{airport}</option>
                  ))}
                </select>
              </Field>
            </div>
          ) : null}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:items-end">
            <Stepper
              id="search-adults"
              label="Adults"
              hint="12 years and above"
              value={Number(form.adults)}
              min={1}
              max={9}
              onChange={(value) => update("adults", value)}
            />
            <Stepper
              id="search-children"
              label="Children"
              hint="2 to 11 years"
              value={Number(form.children)}
              min={0}
              max={8}
              onChange={(value) => update("children", value)}
            />
            <Stepper
              id="search-infants"
              label="Infants"
              hint="Under 2, on a lap"
              value={Number(form.infants)}
              min={0}
              max={Number(form.adults) || 1}
              onChange={(value) => update("infants", value)}
            />

            <Field id="search-cabin" label="Cabin">
              <select
                id="search-cabin"
                className="field"
                value={form.cabin}
                onChange={(event) => update("cabin", event.target.value)}
              >
                {cabins.map((cabin) => (
                  <option key={cabin}>{cabin}</option>
                ))}
              </select>
            </Field>

            <Field id="search-promo" label="Promo code">
              <input
                id="search-promo"
                className="field uppercase"
                value={form.promo}
                placeholder="AERO500"
                autoComplete="off"
                onChange={(event) => update("promo", event.target.value.toUpperCase())}
              />
            </Field>

            <button type="submit" className="btn-ink h-[52px] w-full" disabled={status === "loading"}>
              {status === "loading" ? "Searching…" : "Search flights"}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45">Popular</span>
            {popularRoutes.map((route) => (
              <button
                key={route.label}
                type="button"
                className="rounded-full border border-navy/10 bg-sand px-3 py-1.5 text-sm text-navy transition hover:border-gold hover:text-ink"
                onClick={() => flyRoute(route.from, route.to)}
              >
                {route.label}
              </button>
            ))}
          </div>
        </form>

        {error ? (
          <p role="alert" className="mt-4 rounded-xl bg-coral/10 px-4 py-3 text-sm text-coral">
            {error}
          </p>
        ) : null}

        <div aria-live="polite">
          {status === "loading" ? (
            <div className="mt-6 space-y-3">
              <p className="sr-only">Searching sample fares</p>
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-24 animate-pulse rounded-2xl bg-mist" />
              ))}
            </div>
          ) : null}

          {status === "results" && query ? (
            <div id="flight-results" className="mt-6 scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h3 className="font-display text-2xl font-medium text-ink">
                  {cityOf(query.from)} to {cityOf(query.to)}
                </h3>
                <p className="text-sm text-navy/65">
                  {formatDate(query.depart)}
                  {query.tripType === "oneway" ? "" : ` – ${formatDate(query.returnDate)}`} · {partyLabel(query)} ·{" "}
                  {query.cabin} · {tripCopy[query.tripType]}
                  {query.promo.trim() ? ` · ${query.promo.trim()}` : ""}
                </p>
              </div>
              <p className="mt-1 text-sm text-navy/60">
                Sample IndiGo fares from this desk. Children are 75% of the adult fare and infants are 10%. Request a
                hold and the desk confirms the live price. Nothing is charged here.
              </p>
              <ul className="mt-4 space-y-3">
                {flights.map((flight, index) => (
                  <li
                    key={flight.id}
                    className="rise grid gap-4 rounded-2xl border border-navy/10 bg-sand p-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white hover:shadow-lg md:grid-cols-[1.1fr_1.5fr_auto] md:items-center"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div>
                      <p className="font-semibold text-ink">{flight.airline}</p>
                      <p className="text-sm text-navy/60">
                        {flight.number} · {flight.fareName} · {flight.label}
                      </p>
                      <p className="mt-1 text-xs text-navy/55">
                        {flight.baggage}. {flight.checkInCloses}.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-display text-2xl text-ink">{flight.depart}</p>
                        <p className="text-xs tracking-wide text-navy/55">{flight.fromCode}</p>
                      </div>
                      <div className="min-w-0 flex-1 text-center">
                        <p className="text-[11px] tracking-[0.08em] text-navy/55">{flight.durationLabel}</p>
                        <div className="relative mt-1 h-4">
                          <div className="draw-x absolute top-2 right-0 left-0 h-px bg-gold/70" />
                          <PlaneIcon className="route-plane absolute top-0 h-4 w-4 text-gold" />
                        </div>
                        <p className="mt-1 text-[11px] font-medium text-sea">{flight.stopsLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl text-ink">
                          {flight.arrive.time}
                          {flight.arrive.nextDay ? <sup className="ml-0.5 text-xs text-coral">+1</sup> : null}
                        </p>
                        <p className="text-xs tracking-wide text-navy/55">{flight.toCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                      <div className="md:text-right">
                        <p className="font-display text-3xl leading-none text-ink">{formatInr(flight.total)}</p>
                        <p className="mt-1 text-xs text-navy/60">
                          total · adult {formatInr(flight.perPerson)}
                          {flight.children ? ` · child ${formatInr(flight.childFare)}` : ""}
                          {flight.infants ? ` · infant ${formatInr(flight.infantFare)}` : ""}
                        </p>
                        {flight.promoLabel ? <p className="mt-1 text-xs font-medium text-sea">{flight.promoLabel}</p> : null}
                      </div>
                      <button type="button" className="btn-ink px-4 py-2.5" onClick={() => hold(flight)}>
                        Request hold
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45">Carriers we book</p>
        <div className="marquee mt-3">
          <div className="marquee-track gap-3">
            {[...carriers, ...carriers].map((carrier, index) => (
              <span
                key={`${carrier}-${index}`}
                className="rounded-full border border-navy/10 bg-white px-4 py-1.5 text-sm text-navy/75"
              >
                {carrier}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
