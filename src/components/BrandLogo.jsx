export default function BrandLogo({ className = "w-9 h-9", light = false }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8588A" />
          <stop offset="100%" stopColor="#9B72CF" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5CC6B0" />
          <stop offset="100%" stopColor="#3DA892" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="40" height="40" rx="12" fill="url(#logoGrad)" />
      {/* Flower petals */}
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
      />
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
        transform="rotate(60 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
        transform="rotate(120 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
        transform="rotate(180 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
        transform="rotate(240 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"}
        transform="rotate(300 20 20)"
      />
      {/* Center circle */}
      <circle cx="20" cy="20" r="4" fill="url(#logoGrad)" />
      {/* Small leaf accent */}
      <path
        d="M28 28 C30 25, 33 27, 31 30 C29 33, 26 31, 28 28Z"
        fill="url(#leafGrad)"
        opacity="0.9"
      />
    </svg>
  );
}
