'use client'

export default function KiteCursor() {
  return (
    <div className="kite-cursor" aria-hidden="true">
      {/*
        Pen-nib cursor — shaped like the default arrow cursor but drawn as a fountain-pen nib.
        Hot spot: tip at (3, 3) — top-left, same position as the OS default pointer.
        Nib slit runs from tip to inner-left notch. Accent ink dot at the writing point.
      */}
      <svg viewBox="0 0 24 36" width="32" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nib body — arrow/cursor outline with pen-nib proportions */}
        <path className="nib-body" d="M3,3 L3,27 L9,21 L14,34 L17,33 L12,20 L21,20 Z" />
        {/* Nib slit — the defining split of a fountain-pen nib, from tip to inner notch */}
        <line className="nib-slit" x1="3" y1="3" x2="9" y2="21" />
        {/* Ink dot at the writing point — the precise hot spot */}
        <circle className="nib-dot" cx="3" cy="3" r="2.2" />
      </svg>
    </div>
  )
}
