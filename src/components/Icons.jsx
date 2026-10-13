function StrokeIcon({ className = "h-5 w-5", children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function PlaneIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2L17.8 19.2z" />
    </svg>
  )
}

export function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </StrokeIcon>
  )
}

export function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </StrokeIcon>
  )
}

export function SwapIcon({ className = "h-4 w-4" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
    </StrokeIcon>
  )
}

export function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M5 12.5 9.2 17 19 7" />
    </StrokeIcon>
  )
}

export function BedIcon({ className = "h-6 w-6" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </StrokeIcon>
  )
}

export function VisaIcon({ className = "h-6 w-6" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h5M9 13h6M9 17h4" />
    </StrokeIcon>
  )
}

export function CarIcon({ className = "h-6 w-6" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </StrokeIcon>
  )
}

export function ShieldIcon({ className = "h-6 w-6" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M12 3 20 6v6c0 4.4-3.1 7.4-8 9-4.9-1.6-8-4.6-8-9V6z" />
    </StrokeIcon>
  )
}

export function CompassIcon({ className = "h-6 w-6" }) {
  return (
    <StrokeIcon className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.3 4.3-4.3 1.3 1.3-4.3z" />
    </StrokeIcon>
  )
}

export function PhoneIcon({ className = "h-5 w-5" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M8 3h2.5l1.2 3.5-1.8 1.1a12 12 0 0 0 5.5 5.5l1.1-1.8 3.5 1.2V16a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 6 8.2 2 2 0 0 1 8 3z" />
    </StrokeIcon>
  )
}

export function MailIcon({ className = "h-5 w-5" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </StrokeIcon>
  )
}

export function PinIcon({ className = "h-5 w-5" }) {
  return (
    <StrokeIcon className={className}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.1" />
    </StrokeIcon>
  )
}

export function ClockIcon({ className = "h-5 w-5" }) {
  return (
    <StrokeIcon className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </StrokeIcon>
  )
}
