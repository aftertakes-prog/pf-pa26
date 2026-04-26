'use client'
import { useState } from 'react'
import AutocarDemo from './demos/AutocarDemo'
import SpinnyDemo from './demos/SpinnyDemo'

type Brand = 'spinny' | 'autocar'

const BRANDS: { id: Brand; label: string; url: string }[] = [
  { id: 'spinny',  label: 'Spinny',  url: 'copy-studio.spinny.com'  },
  { id: 'autocar', label: 'Autocar', url: 'copy-studio.autocar.in'  },
]

export default function BrandDemoFrame() {
  const [brand, setBrand] = useState<Brand>('spinny')
  const active = BRANDS.find(b => b.id === brand)!

  return (
    <div className="brand-demo-wrap">

      {/* ── Pills — sit outside and above the browser frame ── */}
      <div className="brand-demo-switcher">
        <span className="brand-demo-switcher__label">Live prototype</span>
        <div className="brand-demo-switcher__pills">
          {BRANDS.map(b => (
            <button
              key={b.id}
              onClick={() => setBrand(b.id)}
              className={`brand-switcher-pill brand-switcher-pill--${b.id}${brand === b.id ? ' is-active' : ''}`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Browser chrome ── */}
      <div className="browser-wrap brand-demo-frame">
        <div className="browser-toolbar">
          <div className="browser-dots">
            <span className="browser-dot browser-dot--red" />
            <span className="browser-dot browser-dot--yellow" />
            <span className="browser-dot browser-dot--green" />
          </div>
          <div className="browser-url-bar">
            <span className="browser-url-text">{active.url}</span>
          </div>
          <div className="browser-dots-spacer" />
        </div>

        {/* ── Live demo area ── */}
        <div className="brand-demo-screen">
          {brand === 'spinny'  && <SpinnyDemo  />}
          {brand === 'autocar' && <AutocarDemo />}
        </div>
      </div>

    </div>
  )
}
