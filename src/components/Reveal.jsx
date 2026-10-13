import { useEffect, useRef, useState } from "react"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

const hiddenShift = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
}

export default function Reveal({ children, className = "", delay = 0, from = "up" }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => prefersReducedMotion())

  useEffect(() => {
    if (shown) return undefined
    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`h-full transition-all duration-700 ease-out ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : `${hiddenShift[from] || hiddenShift.up} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}
