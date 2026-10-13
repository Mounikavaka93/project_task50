import { useState } from "react"

export default function Photo({ src, alt, className = "", priority = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
