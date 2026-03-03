export function GenLayerLogo({ className = "h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GenLayer"
    >
      {/* Icon mark - layered hexagon */}
      <g>
        <path
          d="M16 2L28 9v14l-12 7L4 23V9l12-7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <path
          d="M16 6L25 11v10l-9 5-9-5V11l9-5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M16 10L22 13.5v7L16 24l-6-3.5v-7L16 10z"
          fill="currentColor"
          opacity="0.9"
        />
      </g>
      {/* Text: GenLayer */}
      <text
        x="36"
        y="22"
        fontFamily="monospace"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="0.5"
      >
        Gen
        <tspan fill="oklch(0.65 0.25 290)">Layer</tspan>
      </text>
    </svg>
  )
}

export function GenLayerMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GenLayer mark"
    >
      <path
        d="M16 2L28 9v14l-12 7L4 23V9l12-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.25"
      />
      <path
        d="M16 6L25 11v10l-9 5-9-5V11l9-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M16 10L22 13.5v7L16 24l-6-3.5v-7L16 10z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  )
}
