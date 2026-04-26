'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Animations are triggered from page.tsx after loader Enter click
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">
      <p className="hero__label">Pooja Koundal</p>

      <h1 className="hero__headline">
        <span className="line-wrap"><span className="hero-line anim-line">Words that make</span></span>
        <span className="line-wrap"><span className="hero-line anim-line"><em>products</em> feel</span></span>
        <span className="line-wrap"><span className="hero-line anim-line">human.</span></span>
      </h1>

      <p className="hero__sub">
        UX writer. Creative strategist.<br />
        I turn friction into flow and features into<br />
        stories people actually remember.
      </p>

      <div className="hero__scroll-cue">
        <span className="hero__scroll-line" />
        Scroll
      </div>

      <span className="hero__glyph" data-lenis-speed="0.35" aria-hidden="true">✦</span>
    </section>
  )
}
