function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function smoothScrollToId(id) {
  const node = document.getElementById(id)
  if (!node) return

  const top = node.getBoundingClientRect().top + window.scrollY - 120
  if (prefersReducedMotion()) {
    window.scrollTo({ top, behavior: "auto" })
    return
  }

  const start = window.scrollY
  const distance = top - start
  const duration = Math.min(1200, Math.max(560, Math.abs(distance) * 0.48))
  let startTime = 0

  const ease = (progress) =>
    progress < 0.5 ? 4 * progress * progress * progress : 1 - (-2 * progress + 2) ** 3 / 2

  const step = (now) => {
    if (!startTime) startTime = now
    const progress = Math.min(1, (now - startTime) / duration)
    window.scrollTo({ top: start + distance * ease(progress), behavior: "auto" })
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function bindSmoothAnchors() {
  const onClick = (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute("href")?.slice(1)
    if (!id || !document.getElementById(id)) return
    event.preventDefault()
    smoothScrollToId(id)
    history.pushState(null, "", `#${id}`)
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }

  document.addEventListener("click", onClick)
  return () => document.removeEventListener("click", onClick)
}
