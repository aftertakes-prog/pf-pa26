'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function KiaCaseStudyPanel({ isOpen, onClose }: Props) {
  const panelRef   = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const animate = async () => {
      const { gsap } = await import('gsap')
      const panel   = panelRef.current
      const overlay = overlayRef.current
      if (!panel || !overlay) return

      if (isOpen) {
        document.body.style.overflow = 'hidden'
        gsap.set([panel, overlay], { display: 'block' })
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
        gsap.fromTo(panel,   { x: '-100%' }, { x: '0%', duration: 0.55, ease: 'power3.out' })
      } else {
        document.body.style.overflow = ''
        gsap.to(panel,   { x: '-100%', duration: 0.42, ease: 'power3.in' })
        gsap.to(overlay, {
          opacity: 0, duration: 0.35, ease: 'power2.in',
          onComplete: () => gsap.set([panel, overlay], { display: 'none' }),
        })
      }
    }
    animate()
  }, [isOpen, mounted])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="kia-panel-overlay"
        onClick={onClose}
        style={{ display: 'none' }}
      />

      {/* Panel */}
      <div ref={panelRef} className="kia-panel" style={{ display: 'none' }}>

        {/* Close */}
        <button className="kia-panel__close" onClick={onClose} aria-label="Close panel">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Scrollable inner */}
        <div className="kia-panel__inner" data-lenis-prevent>

          {/* ── Hero thumbnail ── */}
          <div className="kia-panel__hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.youtube.com/vi/ONc-QBLhIhk/maxresdefault.jpg"
              alt="Kia Sonet X Line — The Rare Kind"
              className="kia-panel__hero-img"
            />
            <div className="kia-panel__hero-overlay">
              <span className="kia-panel__hero-eyebrow">Brand Strategy Case Study · Innocean India × Kia India</span>
              <h2 className="kia-panel__hero-title">The Rare Kind<br />× Every Family</h2>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div className="kia-panel__stats">
            {[
              { val: '75M+',  label: 'YouTube Views'        },
              { val: '19K+',  label: 'Pre-Launch Bookings'  },
              { val: '200K+', label: 'Units Sold'           },
            ].map(s => (
              <div className="kia-panel__stat" key={s.label}>
                <span className="kia-panel__stat-val">{s.val}</span>
                <span className="kia-panel__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Body ── */}
          <div className="kia-panel__body">

            {/* Campaign 01 */}
            <div className="kia-campaign">
              <div className="kia-campaign__header">
                <span className="kia-campaign__num">01</span>
                <div>
                  <h3 className="kia-campaign__title">Sonet X Line</h3>
                  <p className="kia-campaign__sub">The Rare Kind · Integrated Brand Launch · ATL + Digital + Retail</p>
                </div>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Challenge</span>
                <p className="kia-section__text">The compact SUV segment runs on a feature arms race. Every brand competed on spec — mileage, ground clearance, infotainment screens. The Sonet X Line had to feel categorically different, not just better equipped.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Idea</span>
                <p className="kia-section__text">The X Line's design gave us real ammunition — blacked-out elements, aggressive stance, badging that said something before a single word of copy. We didn't lead with what it had. We led with who owns it.</p>
                <blockquote className="kia-pull-quote">The Rare Kind. Not rare as in limited — rare as in genuinely, authentically distinct.</blockquote>
                <p className="kia-section__text">The positioning spoke directly to a buyer who doesn't want what everyone else is driving. One idea. Every touchpoint built around it.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Work</span>
                <p className="kia-section__text">Led brand strategy and copy voice across the full integrated mix. The TVC brief: a young couple living in an entirely monochromatic world — except their car. The creative concept was downstream of the positioning, so the film didn't just showcase the Sonet X Line, it communicated who owns it.</p>
                <p className="kia-section__text">15+ copy assets written for print, dealership, and in-store use — deployed across 500+ Kia dealerships nationally. Every piece held the same self-assured tone as the TVC. The brand experience didn't drop the moment a buyer walked into a showroom.</p>
              </div>

              <div className="kia-numbers">
                {[
                  { val: '75M+', desc: 'YouTube views across campaign films' },
                  { val: '42M',  desc: 'Views on the flagship film alone'    },
                  { val: '500+', desc: 'Dealerships carrying the same voice'  },
                ].map(n => (
                  <div className="kia-number" key={n.desc}>
                    <span className="kia-number__val">{n.val}</span>
                    <span className="kia-number__desc">{n.desc}</span>
                  </div>
                ))}
              </div>

              <div className="kia-section kia-section--lens">
                <span className="kia-section__label">Strategy Lens</span>
                <p className="kia-section__text">The discipline that drove ROI was <em>omission</em>. The Sonet X Line had a long spec list — Xclusive Matte Graphite exterior, Crystal Cut alloys, BOSE sound system. The strategic call was to not lead with any of it. Identity over inventory. Deciding what a car <em>stands for</em> over what it <em>has</em> is positioning work, not copywriting. That's the layer this campaign was built on.</p>
              </div>
            </div>

            <div className="kia-divider" />

            {/* Campaign 02 */}
            <div className="kia-campaign">
              <div className="kia-campaign__header">
                <span className="kia-campaign__num">02</span>
                <div>
                  <h3 className="kia-campaign__title">Carens + #CarensFamilyDrive</h3>
                  <p className="kia-campaign__sub">Made for Every Family · Brand Launch + Community Storytelling</p>
                </div>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Challenge</span>
                <p className="kia-section__text">Launching a family MPV in India means navigating a minefield of category clichés. Happy families. Open fields. Children laughing in back seats. The Carens needed to feel relevant to the full, varied reality of modern Indian families — not a postcard version of one. Then, post-launch, the challenge shifted: move from brand claim to community proof.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">Phase 1 — The Positioning</span>
                <p className="kia-section__text">The insight: no two Indian families are alike. Rather than constructing one aspirational model family, the campaign took a deliberate multi-family approach — four to five families, different cities, household structures, lifestyles, and needs.</p>
                <blockquote className="kia-pull-quote">The Carens doesn't ask you to be a certain kind of family first.</blockquote>
                <p className="kia-section__text">Five ad films. Each built around a distinct family. A shared visual and narrative language designed so that whether a viewer saw one film or all five, the Carens impression was identical: spacious, thoughtful, built for real life.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Launch</span>
                <p className="kia-section__text">The gamified digital activation — #60SecondsWithKiaCarens developed with InMobi and Innocean — prompted users to find feature hotspots on the Carens within 60 seconds, then share on social. Result: 2× industry-standard engagement rate within two weeks of launch. A published benchmark, not an internal metric.</p>
                <p className="kia-section__text">Pre-launch: 19,000+ bookings before launch day. The market had already decided before the car was officially available.</p>
              </div>

              <div className="kia-numbers">
                {[
                  { val: '19K+', desc: 'Pre-launch bookings before Day 1'      },
                  { val: '2×',   desc: 'Industry engagement rate in 2 weeks'   },
                  { val: '200K+',desc: 'Units sold — Kia India\'s 3rd top model'},
                ].map(n => (
                  <div className="kia-number" key={n.desc}>
                    <span className="kia-number__val">{n.val}</span>
                    <span className="kia-number__desc">{n.desc}</span>
                  </div>
                ))}
              </div>

              <div className="kia-section">
                <span className="kia-section__label">Phase 2 — From Claim to Proof</span>
                <p className="kia-section__text">Post-launch, the most credible thing Kia could say about the Carens was what actual owners said about it. The #CarensFamilyDrive was built on exactly that premise: real owners, real drives, no managed testimonials.</p>
                <p className="kia-section__text">Scripted the event's full narrative arc — how it opened, how families were brought into it, what moments were being designed for. Built the interview prompt framework: questions designed to surface genuine, emotionally resonant stories without leading anyone toward a manufactured answer. Planned how raw event footage would become official brand content across owned and social channels.</p>
                <blockquote className="kia-pull-quote">Knowing when a brand needs to step back and let its community speak is a positioning decision.</blockquote>
                <p className="kia-section__text">The launch campaign told the world what the Carens stood for. The Family Drive demonstrated it — through people who had no reason to say it unless they meant it. That's a complete brand strategy arc: establish, then prove.</p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="kia-panel__footer">
            <span className="kia-panel__footer-scope">Brand Strategy · Campaign Writing · ATL + Digital + Retail</span>
            <span className="kia-panel__footer-credit">Innocean India × Kia India · Nov 2021 – Dec 2022</span>
          </div>

        </div>
      </div>
    </>,
    document.body
  )
}
