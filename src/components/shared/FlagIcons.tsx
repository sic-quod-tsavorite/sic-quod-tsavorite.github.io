interface FlagProps {
  size?: number
  className?: string
}

export function DanishFlag({ size = 20, className }: FlagProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" rx="3" fill="#C8102E" />
      <rect x="6" y="0" width="3" height="20" fill="#FFFFFF" />
      <rect x="0" y="8.5" width="20" height="3" fill="#FFFFFF" />
    </svg>
  )
}

export function UKFlag({ size = 20, className }: FlagProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" rx="3" fill="#012169" />
      {/* White diagonals */}
      <path d="M0 0L20 20M20 0L0 20" stroke="#FFFFFF" strokeWidth="3" />
      {/* Red diagonals */}
      <path d="M0 0L20 20M20 0L0 20" stroke="#C8102E" strokeWidth="1.5" />
      {/* White cross */}
      <rect x="8" y="0" width="4" height="20" fill="#FFFFFF" />
      <rect x="0" y="8" width="20" height="4" fill="#FFFFFF" />
      {/* Red cross */}
      <rect x="9" y="0" width="2" height="20" fill="#C8102E" />
      <rect x="0" y="9" width="20" height="2" fill="#C8102E" />
    </svg>
  )
}
