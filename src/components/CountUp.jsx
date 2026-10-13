import { useEffect, useRef, useState } from "react"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function CountUp({ value, className = "", duration = 1300 }) {
  const raw = String(value)
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : raw
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0
  const reduced = prefersReducedMotion()
  const [display, setDisplay] = useState(reduced ? target : 0)
  const ref = useRef(null)
  const started = useRef(reduced)

  useEffect(() => {
    if (started.current) return undefined
    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - (1 - progress) ** 3
          setDisplay(target * eased)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.5 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [duration, target])

  const text = decimals ? display.toFixed(decimals) : String(Math.round(display))

  return (
    <span ref={ref} className={className}>
      {match ? text : ""}
      {suffix}
    </span>
  )
}
