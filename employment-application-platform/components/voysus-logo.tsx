export function VoysusLogo({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Voysus Logo"
    >
      <circle cx="60" cy="60" r="58" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      <path
        d="M35 40 L60 85 L85 40"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text x="60" y="105" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="600" letterSpacing="2">
        VOYSUS
      </text>
    </svg>
  )
}
