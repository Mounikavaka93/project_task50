export const airports = [
  "Delhi (DEL)",
  "Mumbai (BOM)",
  "Bengaluru (BLR)",
  "Chennai (MAA)",
  "Hyderabad (HYD)",
  "Kochi (COK)",
  "Dubai (DXB)",
  "Singapore (SIN)",
  "London (LHR)",
  "Paris (CDG)",
  "Tokyo (HND)",
  "Bali (DPS)",
  "Malé (MLE)",
  "Santorini (JTR)",
  "Zurich (ZRH)",
  "New York (JFK)",
]

export const cabins = ["Economy", "Premium Economy", "Business"]

export const carriers = [
  "IndiGo",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Air France",
  "Lufthansa",
  "Turkish Airlines",
]

export const popularRoutes = [
  { from: "Delhi (DEL)", to: "Mumbai (BOM)", label: "DEL → BOM" },
  { from: "Delhi (DEL)", to: "Bengaluru (BLR)", label: "DEL → BLR" },
  { from: "Mumbai (BOM)", to: "Dubai (DXB)", label: "BOM → DXB" },
  { from: "Delhi (DEL)", to: "Singapore (SIN)", label: "DEL → SIN" },
]

export const promos = {
  AERO500: { label: "₹500 off each adult", type: "flat", amount: 500 },
  MONSOON: { label: "8% off the total", type: "percent", amount: 8 },
  EARLYBIRD: { label: "12% off the total", type: "percent", amount: 12 },
}

export const offers = [
  {
    code: "AERO500",
    title: "₹500 off adult fares",
    detail: "Taken off each adult before the ticket is issued. Children and infants stay on their own fare.",
    save: "₹500",
  },
  {
    code: "MONSOON",
    title: "8% on the whole booking",
    detail: "Works on one-way, return, and multi-city searches from any city in the widget.",
    save: "8% off",
  },
  {
    code: "EARLYBIRD",
    title: "12% when the date is already ahead",
    detail: "Meant for trips planned a few weeks out. The search opens on a date that qualifies.",
    save: "12% off",
  },
]

export const bookings = [
  {
    pnr: "A7K2P9",
    lastName: "SHARMA",
    airline: "IndiGo",
    number: "6E 2134",
    from: "Delhi (DEL)",
    to: "Dubai (DXB)",
    fromCode: "DEL",
    toCode: "DXB",
    depart: "08:15",
    arrive: "10:40",
    dateOffset: 10,
    passengers: ["Asha Sharma", "Rohit Sharma"],
    baggage: "7 kg cabin and 20 kg check-in each",
    seats: "12A, 12B",
    gate: "Delhi T3 · 42",
    international: true,
  },
  {
    pnr: "M3Q8L1",
    lastName: "MENON",
    airline: "IndiGo",
    number: "6E 532",
    from: "Mumbai (BOM)",
    to: "Bengaluru (BLR)",
    fromCode: "BOM",
    toCode: "BLR",
    depart: "19:40",
    arrive: "21:15",
    dateOffset: 1,
    passengers: ["Leela Menon"],
    baggage: "7 kg cabin and 15 kg check-in",
    seats: "18C",
    gate: "Mumbai T2 · 11",
    international: false,
  },
]

export const flightStatuses = [
  {
    number: "6E 2134",
    from: "DEL",
    to: "DXB",
    schedDepart: "08:15",
    estDepart: "08:22",
    schedArrive: "10:40",
    estArrive: "10:48",
    state: "On time",
    gate: "Delhi T3 · 42",
  },
  {
    number: "6E 532",
    from: "BOM",
    to: "BLR",
    schedDepart: "19:40",
    estDepart: "20:05",
    schedArrive: "21:15",
    estArrive: "21:40",
    state: "Delayed",
    gate: "Mumbai T2 · 11",
  },
  {
    number: "6E 17",
    from: "DEL",
    to: "BOM",
    schedDepart: "06:00",
    estDepart: "06:00",
    schedArrive: "08:10",
    estArrive: "08:05",
    state: "Boarding",
    gate: "Delhi T3 · 6",
  },
]

export const faqs = [
  {
    q: "What baggage is included?",
    a: "Economy fares in this search include 7 kg of cabin baggage. Domestic check-in is 15 kg, international economy is 20 kg. Premium Economy and Business raise the check-in allowance. Extra kilos can be added before you pay.",
  },
  {
    q: "When does check-in close?",
    a: "For the IndiGo tickets we issue, airport check-in usually closes 60 minutes before a domestic departure and 75 minutes before an international one. Web check-in opens 48 hours before departure. The time on your ticket is the one that counts.",
  },
  {
    q: "Can an infant travel on a lap?",
    a: "One infant under 2 can travel on an adult’s lap at about 10% of the adult fare. The infant needs their own adult — two infants cannot share one adult. A seat for the infant is a separate request.",
  },
  {
    q: "How do changes and cancellations work?",
    a: "Saver fares can be changed with a fee plus any fare difference. Flexi fares waive the change fee. Cancellations are confirmed by the desk before any refund is promised, because the airline rule depends on the fare bucket.",
  },
  {
    q: "Which promo codes work?",
    a: "AERO500 takes ₹500 off each adult. MONSOON takes 8% off the booking total. EARLYBIRD takes 12% off. Codes are checked in the search and shown on the fare before you request a hold.",
  },
]

const coords = {
  DEL: [28.6, 77.2],
  BOM: [19.1, 72.9],
  BLR: [13.2, 77.7],
  MAA: [13.1, 80.3],
  HYD: [17.4, 78.5],
  COK: [10.2, 76.4],
  DXB: [25.3, 55.4],
  SIN: [1.4, 104],
  LHR: [51.5, -0.5],
  CDG: [49, 2.5],
  HND: [35.5, 139.8],
  DPS: [-8.7, 115.2],
  MLE: [4.2, 73.5],
  JTR: [36.4, 25.5],
  ZRH: [47.5, 8.5],
  JFK: [40.6, -73.8],
}

export const destinations = [
  {
    city: "Santorini",
    country: "Greece",
    airport: "Santorini (JTR)",
    blurb: "Cliff paths, caldera light, and dinners that run long.",
    price: "42,900",
    nights: "5 nights",
    image: "/images/santorini.jpg",
    alt: "Whitewashed buildings and blue domes on the Santorini cliffs",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    airport: "Dubai (DXB)",
    blurb: "Desert air, creek-side history, and a skyline that stays up late.",
    price: "28,400",
    nights: "4 nights",
    image: "/images/dubai.jpg",
    alt: "Dubai skyline with the Burj Khalifa at dusk",
  },
  {
    city: "Bali",
    country: "Indonesia",
    airport: "Bali (DPS)",
    blurb: "Rice terraces, temple mornings, and the sea when you want it quiet.",
    price: "36,800",
    nights: "7 nights",
    image: "/images/bali.jpg",
    alt: "A sea temple on the Bali coast at sunset",
  },
  {
    city: "Paris",
    country: "France",
    airport: "Paris (CDG)",
    blurb: "River walks, neighbourhood bistros, and museums without the rush.",
    price: "54,200",
    nights: "5 nights",
    image: "/images/paris.jpg",
    alt: "The Eiffel Tower seen from across the Seine",
  },
  {
    city: "Tokyo",
    country: "Japan",
    airport: "Tokyo (HND)",
    blurb: "Neon nights, calm gardens, and rail hops that just work.",
    price: "61,500",
    nights: "6 nights",
    image: "/images/tokyo.jpg",
    alt: "A busy Tokyo street at night with illuminated signs",
  },
  {
    city: "Maldives",
    country: "Indian Ocean",
    airport: "Malé (MLE)",
    blurb: "Overwater quiet, reef colour, and time that slows on purpose.",
    price: "72,000",
    nights: "5 nights",
    image: "/images/maldives.jpg",
    alt: "Overwater villas in a turquoise Maldives lagoon",
  },
]

export const packages = [
  {
    name: "Aegean Escape",
    destination: "Santorini & Athens",
    duration: "7 days / 6 nights",
    price: "89,999",
    was: "1,04,500",
    save: "Save 14%",
    image: "/images/santorini.jpg",
    alt: "Santorini cliffs above the caldera",
    includes: ["Return flights", "Cliffside hotel", "Caldera cruise", "Private transfers"],
  },
  {
    name: "Desert Luxe",
    destination: "Dubai, UAE",
    duration: "5 days / 4 nights",
    price: "54,500",
    was: "63,200",
    save: "Save 14%",
    image: "/images/dubai.jpg",
    alt: "Dubai marina and downtown towers",
    includes: ["Return flights", "Marina or creek hotel", "Desert evening", "Airport pickup"],
  },
  {
    name: "Island Slowdown",
    destination: "Bali, Indonesia",
    duration: "8 days / 7 nights",
    price: "67,200",
    was: "76,800",
    save: "Save 12%",
    image: "/images/bali.jpg",
    alt: "Bali coastline at golden hour",
    includes: ["Return flights", "Ubud and coast stays", "Temple morning", "Daily breakfast"],
  },
]

export const featurePackage = {
  name: "Alpine Winter",
  destination: "Zurich & the Alps",
  duration: "6 days / 5 nights",
  price: "1,24,000",
  was: "1,41,000",
  save: "Save 12%",
  image: "/images/alps.jpg",
  alt: "Snowy alpine peaks above a mountain lake",
  text: "Snow light, slow trains, and a chalet base — winter without the scramble.",
  includes: ["Return flights", "Rail between towns", "Chalet stay", "Cover briefing"],
}

export const services = [
  {
    key: "flights",
    title: "Flight booking",
    text: "Scheduled seats, student fares, and group departures, with the rules of the ticket explained before you choose.",
  },
  {
    key: "packages",
    title: "Holiday packages",
    text: "City breaks and longer holidays with stays, transfers, and a day-by-day outline you can actually read.",
  },
  {
    key: "visa",
    title: "Visa guidance",
    text: "Document checklists and appointment prep for the countries we send travellers to.",
  },
  {
    key: "stays",
    title: "Stays",
    text: "Hotels and homestays picked for the neighbourhood and the landing time, not only the star count.",
  },
  {
    key: "transfers",
    title: "Airport transfers",
    text: "Private cars timed to arrival, including the ones that land after midnight.",
  },
  {
    key: "cover",
    title: "Travel cover",
    text: "Insurance options talked through before you fly, not after something has already gone wrong.",
  },
]

export function codeOf(label) {
  const match = String(label).match(/\(([^)]+)\)/)
  return match ? match[1] : label
}

export function cityOf(label) {
  return String(label).replace(/\s*\([^)]*\)\s*/, "").trim()
}

export function todayISO(offset = 0) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function formatDate(iso) {
  if (!iso) return ""
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatInr(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDuration(hours) {
  const total = Math.round(hours * 60)
  const wholeHours = Math.floor(total / 60)
  const minutes = total % 60
  return `${wholeHours}h ${String(minutes).padStart(2, "0")}m`
}

function distanceHours(fromCode, toCode) {
  const [lat1, lon1] = coords[fromCode] || [20, 78]
  const [lat2, lon2] = coords[toCode] || [20, 78]
  const toRad = (value) => (value * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const hav =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const km = 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(hav)))
  return Math.max(1.25, km / 780 + 0.55)
}

function addHours(hhmm, hours) {
  const [hour, minute] = hhmm.split(":").map(Number)
  const total = hour * 60 + minute + Math.round(hours * 60)
  const days = Math.floor(total / (24 * 60))
  const mins = ((total % (24 * 60)) + 24 * 60) % (24 * 60)
  return {
    time: `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`,
    nextDay: days > 0,
  }
}

const domesticAirports = new Set(["DEL", "BOM", "BLR", "MAA", "HYD", "COK"])

function isInternationalRoute(fromCode, toCode) {
  return !domesticAirports.has(fromCode) || !domesticAirports.has(toCode)
}

function baggageFor(international, cabin) {
  if (cabin === "Business") return { cabinKg: "7 kg", checkIn: international ? "40 kg" : "30 kg", fare: "Flexi" }
  if (cabin === "Premium Economy") return { cabinKg: "7 kg", checkIn: international ? "30 kg" : "20 kg", fare: "Flexi" }
  return { cabinKg: "7 kg", checkIn: international ? "20 kg" : "15 kg", fare: "Saver" }
}

export function buildFlights(form) {
  const fromCode = codeOf(form.from)
  const toCode = codeOf(form.to)
  const hours = distanceHours(fromCode, toCode)
  const cabinRate = { Economy: 1, "Premium Economy": 1.45, Business: 2.4 }[form.cabin] ?? 1
  const tripRate = form.tripType === "oneway" ? 1 : form.tripType === "multi" ? 2.2 : 1.9
  const adults = Number(form.adults) || 1
  const children = Number(form.children) || 0
  const infants = Number(form.infants) || 0
  const seed = [...`${fromCode}${toCode}`].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const viaExtra = form.tripType === "multi" ? 3.2 : 0
  const international = isInternationalRoute(fromCode, toCode)
  const bags = baggageFor(international, form.cabin)
  const promo = promos[String(form.promo || "").trim().toUpperCase()]

  const options = [
    { id: "morning", label: "Morning departure", depart: "06:40", rate: 1.08, stops: 0, airline: "IndiGo", prefix: "6E", fareName: "Saver" },
    { id: "value", label: "Best value", depart: "13:15", rate: 0.92, stops: 0, airline: "IndiGo", prefix: "6E", fareName: bags.fare },
    { id: "evening", label: "Evening departure", depart: "21:05", rate: 0.84, stops: hours > 6 ? 1 : 0, airline: "IndiGo", prefix: "6E", fareName: "Flexi" },
  ]

  return options.map((option, index) => {
    const block = hours + option.stops * 2.4 + viaExtra
    const adultFare = Math.round(((5000 + hours * 3400) * cabinRate * tripRate * option.rate) / 100) * 100
    const childFare = Math.round((adultFare * 0.75) / 100) * 100
    const infantFare = Math.max(1500, Math.round((adultFare * 0.1) / 100) * 100)
    let total = adultFare * adults + childFare * children + infantFare * infants
    if (promo?.type === "flat") total = Math.max(0, total - promo.amount * adults)
    if (promo?.type === "percent") total = Math.round((total * (1 - promo.amount / 100)) / 100) * 100
    const checkInKg =
      option.fareName === "Flexi" && form.cabin === "Economy" ? (international ? "25 kg" : "20 kg") : bags.checkIn
    return {
      ...option,
      number: `${option.prefix} ${100 + ((seed + index * 37) % 900)}`,
      fromCode,
      toCode,
      arrive: addHours(option.depart, block),
      durationLabel: formatDuration(block),
      perPerson: adultFare,
      childFare,
      infantFare,
      adults,
      children,
      infants,
      total,
      baggage: `${bags.cabinKg} cabin · ${checkInKg} check-in${option.fareName === "Flexi" ? " · change fee waived" : ""}`,
      checkInCloses: international ? "Closes 75 min before departure" : "Closes 60 min before departure",
      promoLabel: promo ? promo.label : "",
      stopsLabel:
        form.tripType === "multi"
          ? `Via ${codeOf(form.via)}`
          : option.stops === 0
            ? "Nonstop"
            : "1 stop",
    }
  })
}
