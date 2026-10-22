/* Professional, outline-style healthcare and dental category icons.
   Shared visual treatment: round caps/joins, uniform 1.8 stroke, currentColor.
   Consistent with the lucide icon family used across the app. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* Espejo de exploración dental (Dental Mirror) */
export function DentalMirrorIcon({ className, ...props }) {
  return (
    <svg {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5 L20 20" />
      <path d="M18.5 21.5 L21.5 18.5" />
    </svg>
  )
}

/* Ortodoncia / Brackets */
export function BracesIcon({ className, ...props }) {
  return (
    <svg {...base} className={className} aria-hidden="true" {...props}>
      <path d="M3 12h18" />
      <rect x="5" y="9" width="3" height="6" rx="0.5" />
      <rect x="10.5" y="9" width="3" height="6" rx="0.5" />
      <rect x="16" y="9" width="3" height="6" rx="0.5" />
      <path d="M4 8c2-3 14-3 16 0M4 16c2 3 14 3 16 0" opacity="0.6" />
    </svg>
  )
}

/* Estética / Blanqueamiento (Sparkles) */
export function WhiteningIcon({ className, ...props }) {
  return (
    <svg {...base} className={className} aria-hidden="true" {...props}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M19 16l0.8 2.2L22 19l-2.2 0.8L19 22l-0.8-2.2L16 19l2.2-0.8L19 16z" opacity="0.8" />
    </svg>
  )
}

/* Implante dental */
export function ImplantIcon({ className, ...props }) {
  return (
    <svg {...base} className={className} aria-hidden="true" {...props}>
      <path d="M7 5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3H7V5z" />
      <path d="M8 8v3a4 4 0 0 0 8 0V8" />
      <path d="M9 14h6M10 17h4M11 20h2" />
    </svg>
  )
}

/* Urgencias dentales (Cruz médica) */
export function EmergencyCrossIcon({ className, ...props }) {
  return (
    <svg {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

/* Sillón odontológico */
export function DentalChairIcon({ className, ...props }) {
  return (
    <svg {...base} className={className} aria-hidden="true" {...props}>
      <path d="M6 7a2 2 0 0 1 2-2h3l3 7h4a2 2 0 0 1 2 2v1H6V7z" />
      <path d="M12 15v5M9 20h6" />
    </svg>
  )
}

/* Backward compatibility placeholders mapped to dental equivalents */
export const RazorIcon = DentalMirrorIcon
export const ClippersIcon = BracesIcon
export const BeardIcon = WhiteningIcon
export const MustacheIcon = ImplantIcon
export const CombIcon = DentalMirrorIcon
export const ProductsIcon = WhiteningIcon
export const ChairIcon = DentalChairIcon
export const RazorEdgeIcon = DentalMirrorIcon
