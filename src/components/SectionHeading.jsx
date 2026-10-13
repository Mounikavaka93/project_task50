export default function SectionHeading({ eyebrow, title, text, light = false, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${light ? "text-gold-light" : "text-gold"}`}>
        {eyebrow}
      </p>
      <span className={`draw-x mt-3 block h-px w-14 ${light ? "bg-gold-light" : "bg-gold"}`} />
      <h2
        className={`mt-3 font-display text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-cream/75" : "text-navy/75"}`}>
          {text}
        </p>
      ) : null}
    </div>
  )
}
