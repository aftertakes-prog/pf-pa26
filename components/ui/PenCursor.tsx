'use client'

export default function PenCursor() {
  return (
    <div className="pen-cursor" aria-hidden="true">
      <svg viewBox="0 0 20 60" width="20" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Barrel */}
        <rect x="4" y="0" width="12" height="33" rx="6" fill="#f0ede8" opacity="0.92"/>
        {/* Clip detail */}
        <rect x="3.5" y="4" width="2" height="22" rx="1" fill="#c8c0b4" opacity="0.6"/>
        {/* Metal band */}
        <rect x="4" y="31" width="12" height="7" rx="1" fill="#c8c0b4"/>
        {/* Nib */}
        <polygon points="4,38 16,38 10,60" fill="#b7ab98"/>
        {/* Nib centre line */}
        <line x1="10" y1="39" x2="10" y2="59" stroke="#0d0d0d" strokeWidth="0.6" opacity="0.35"/>
        {/* Ink tip */}
        <circle cx="10" cy="58.5" r="1.8" fill="#eb5939"/>
      </svg>
    </div>
  )
}
