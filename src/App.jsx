import { useEffect, useState } from "react"
import About from "./components/About"
import Contact from "./components/Contact"
import Desk from "./components/Desk"
import Destinations from "./components/Destinations"
import FlightSearch from "./components/FlightSearch"
import Footer from "./components/Footer"
import Guide from "./components/Guide"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Offers from "./components/Offers"
import Packages from "./components/Packages"
import Services from "./components/Services"
import { bindSmoothAnchors, smoothScrollToId } from "./smoothScroll"

function scrollToSection(id) {
  smoothScrollToId(id)
}

export default function App() {
  const [routeRequest, setRouteRequest] = useState({ to: "Dubai (DXB)", id: 0 })
  const [promoRequest, setPromoRequest] = useState({ code: "", id: 0 })
  const [draft, setDraft] = useState(null)

  useEffect(() => bindSmoothAnchors(), [])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <FlightSearch
          routeRequest={routeRequest}
          promoRequest={promoRequest}
          onHold={(summary) => {
            setDraft({ id: Date.now(), ...summary })
            scrollToSection("contact")
          }}
        />
        <Destinations
          onExplore={(airport) => {
            setRouteRequest({ to: airport, id: Date.now() })
            scrollToSection("search")
          }}
        />
        <Packages
          onBook={(trip) => {
            setDraft({
              id: Date.now(),
              destination: trip.destination,
              depart: "",
              travelers: "2",
              message: `I'd like to book the ${trip.name} package (${trip.duration}) for 2 travellers. Listed price is ₹${trip.price} per person, including: ${trip.includes.join(", ")}.`,
            })
            scrollToSection("contact")
          }}
        />
        <Offers
          onApply={(code) => {
            setPromoRequest({ code, id: Date.now() })
            scrollToSection("search")
          }}
        />
        <Desk
          onChange={(summary) => {
            setDraft({ id: Date.now(), ...summary })
            scrollToSection("contact")
          }}
        />
        <Services />
        <Guide />
        <About />
        <Contact draft={draft} />
      </main>
      <Footer />
    </div>
  )
}
