import { useEffect, useState } from "react"
import { bookings, flightStatuses, formatDate, todayISO } from "../data"

const tabs = [
  { id: "check-in", label: "Web check-in" },
  { id: "status", label: "Flight status" },
  { id: "manage", label: "Manage booking" },
]

function findBooking(pnr, lastName) {
  return bookings.find(
    (booking) => booking.pnr === pnr.trim().toUpperCase() && booking.lastName === lastName.trim().toUpperCase(),
  )
}

function checkInWindow(booking) {
  const depart = new Date(`${todayISO(booking.dateOffset)}T${booking.depart}:00`)
  const now = Date.now()
  const opens = depart.getTime() - 48 * 60 * 60 * 1000
  const closeMinutes = booking.international ? 75 : 60
  const closes = depart.getTime() - closeMinutes * 60 * 1000
  if (now < opens) {
    return { open: false, label: "Check-in is not open yet. It opens 48 hours before departure." }
  }
  if (now > closes) {
    return { open: false, label: `Check-in is closed. The counter shuts ${closeMinutes} minutes before departure.` }
  }
  return { open: true, label: "Web check-in is open for this desk sample." }
}

export default function Desk({ onChange }) {
  const [tab, setTab] = useState("check-in")
  const [pnr, setPnr] = useState("")
  const [lastName, setLastName] = useState("")
  const [flightNo, setFlightNo] = useState("6E 2134")
  const [error, setError] = useState("")
  const [booking, setBooking] = useState(null)
  const [checkIn, setCheckIn] = useState(null)
  const [status, setStatus] = useState(null)
  const [checkedIn, setCheckedIn] = useState(false)

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1)
      if (hash === "check-in" || hash === "status" || hash === "manage") setTab(hash)
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  function selectTab(id) {
    setTab(id)
    setError("")
    if (window.location.hash !== `#${id}`) {
      history.pushState(null, "", `#${id}`)
    }
  }

  function lookupBooking(event) {
    event.preventDefault()
    const match = findBooking(pnr, lastName)
    setCheckedIn(false)
    if (!match) {
      setBooking(null)
      setWindowNote("")
      setError("No desk sample matches that PNR and last name. Try A7K2P9 / SHARMA or M3Q8L1 / MENON.")
      return
    }
    const travelDate = todayISO(match.dateOffset)
    setError("")
    setBooking({ ...match, travelDate, travelLabel: formatDate(travelDate) })
    setCheckIn(checkInWindow(match))
  }

  function lookupStatus(event) {
    event.preventDefault()
    const key = flightNo.replace(/\s+/g, "").toUpperCase()
    const match = flightStatuses.find((item) => item.number.replace(/\s+/g, "") === key)
    if (!match) {
      setStatus(null)
      setError(`No desk sample matches ${flightNo.trim() || "that number"}. Try 6E 2134, 6E 532, or 6E 17.`)
      return
    }
    setError("")
    setStatus(match)
  }

  return (
    <section id="desk" className="shell py-16 md:py-20">
      <div id="check-in" />
      <div id="status" />
      <div id="manage" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Before you fly</p>
      <h2 className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
        Check in, track, or change a ticket.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/70">
        These records are desk samples so the tools can be tried end to end. They are not live IndiGo reservations, and
        nothing here is sent to an airline.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Booking tools">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === item.id ? "bg-ink text-cream" : "bg-white text-navy/70 ring-1 ring-navy/10 hover:text-ink"
            }`}
            onClick={() => selectTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[2rem] bg-white p-5 ring-1 ring-ink/5 sm:p-7">
        {tab === "status" ? (
          <form onSubmit={lookupStatus} className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label htmlFor="status-flight" className="label">
                Flight number
              </label>
              <input
                id="status-flight"
                className="field uppercase"
                value={flightNo}
                onChange={(event) => setFlightNo(event.target.value.toUpperCase())}
              />
              <p className="mt-1 text-[11px] text-navy/50">Samples: 6E 2134, 6E 532, 6E 17</p>
            </div>
            <button type="submit" className="btn-ink h-[52px]">
              Check status
            </button>
          </form>
        ) : (
          <form onSubmit={lookupBooking} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <label htmlFor="desk-pnr" className="label">
                PNR
              </label>
              <input
                id="desk-pnr"
                className="field uppercase"
                value={pnr}
                maxLength={6}
                autoComplete="off"
                onChange={(event) => setPnr(event.target.value.toUpperCase())}
              />
            </div>
            <div>
              <label htmlFor="desk-name" className="label">
                Last name
              </label>
              <input
                id="desk-name"
                className="field uppercase"
                value={lastName}
                autoComplete="off"
                onChange={(event) => setLastName(event.target.value.toUpperCase())}
              />
            </div>
            <button type="submit" className="btn-ink h-[52px]">
              {tab === "check-in" ? "Find booking" : "Retrieve"}
            </button>
            <p className="text-[11px] text-navy/50 md:col-span-3">
              Desk samples: A7K2P9 / SHARMA (check-in still closed) and M3Q8L1 / MENON (inside the 48-hour window).
            </p>
          </form>
        )}

        {error ? (
          <p role="alert" className="mt-4 rounded-xl bg-coral/10 px-4 py-3 text-sm text-coral">
            {error}
          </p>
        ) : null}

        {tab === "status" && status ? (
          <div className="mt-6 rounded-2xl bg-sand p-5" role="status">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-2xl text-ink">
                {status.number} · {status.from} to {status.to}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                  status.state === "Delayed"
                    ? "bg-coral/15 text-coral"
                    : status.state === "Boarding"
                      ? "bg-gold/20 text-ink"
                      : "bg-sea/15 text-sea"
                }`}
              >
                {status.state}
              </span>
            </div>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-navy/50">Departure</dt>
                <dd className="font-medium text-ink">
                  {status.schedDepart} scheduled · {status.estDepart} estimated
                </dd>
              </div>
              <div>
                <dt className="text-navy/50">Arrival</dt>
                <dd className="font-medium text-ink">
                  {status.schedArrive} scheduled · {status.estArrive} estimated
                </dd>
              </div>
              <div>
                <dt className="text-navy/50">Gate</dt>
                <dd className="font-medium text-ink">{status.gate}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        {tab !== "status" && booking ? (
          <div className="mt-6 rounded-2xl bg-sand p-5" role="status">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/50">
              {booking.pnr} · desk sample
            </p>
            <p className="mt-1 font-display text-2xl text-ink">
              {booking.airline} {booking.number}
            </p>
            <p className="mt-1 text-sm text-navy/70">
              {booking.fromCode} {booking.depart} → {booking.toCode} {booking.arrive} · {booking.travelLabel}
            </p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-navy/50">Passengers</dt>
                <dd className="font-medium text-ink">{booking.passengers.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-navy/50">Seats</dt>
                <dd className="font-medium text-ink">{booking.seats}</dd>
              </div>
              <div>
                <dt className="text-navy/50">Baggage</dt>
                <dd className="font-medium text-ink">{booking.baggage}</dd>
              </div>
              <div>
                <dt className="text-navy/50">Gate</dt>
                <dd className="font-medium text-ink">{booking.gate}</dd>
              </div>
            </dl>

            {tab === "check-in" ? (
              <div className="mt-5">
                <p className="text-sm text-navy/75">{checkIn?.label}</p>
                {checkIn?.open && !checkedIn ? (
                  <button type="button" className="btn-ink mt-4" onClick={() => setCheckedIn(true)}>
                    Complete web check-in
                  </button>
                ) : null}
                {checkedIn ? (
                  <p className="mt-4 text-sm font-medium text-sea">
                    Checked in on this page only. Boarding passes are not issued from the sample.
                  </p>
                ) : null}
              </div>
            ) : (
              <button
                type="button"
                className="btn-ink mt-5"
                onClick={() =>
                  onChange({
                    destination: booking.to,
                    depart: booking.travelDate,
                    travelers: String(booking.passengers.length),
                    message: `Please change desk sample ${booking.pnr} for ${booking.lastName}: ${booking.airline} ${booking.number} on ${booking.travelLabel}, ${booking.from} to ${booking.to}. Seats ${booking.seats}.`,
                  })
                }
              >
                Request a change
              </button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
