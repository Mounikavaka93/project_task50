export default function Field({ id, label, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-coral">
          {error}
        </p>
      ) : null}
    </div>
  )
}
