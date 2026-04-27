'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

type Campaign = 'sonet' | 'carens'

interface Props {
  isOpen:   boolean
  onClose:  () => void
  campaign: Campaign
}

// ── Per-campaign panel data ───────────────────────────────────────────────────
const DATA = {
  sonet: {
    heroImg:   'https://img.youtube.com/vi/ONc-QBLhIhk/maxresdefault.jpg',
    heroAlt:   'Kia Sonet X Line — The Rare Kind',
    heroTitle: 'Sonet X Line\n— The Rare Kind',
    eyebrow:   'Brand Strategy Case Study · Innocean India × Kia India',
    stats: [
      { val: '75M+', label: 'YouTube Views'         },
      { val: '42M',  label: 'Flagship Film Views'   },
      { val: '500+', label: 'Dealerships, One Voice' },
    ],
  },
  carens: {
    heroImg:   'https://img.youtube.com/vi/LdeiRXNjJqk/maxresdefault.jpg',
    heroAlt:   'Kia Carens — Made for Every Family',
    heroTitle: 'Carens\n— Made for Every Family',
    eyebrow:   'Brand Strategy Case Study · Innocean India × Kia India',
    stats: [
      { val: '19K+', label: 'Pre-Launch Bookings'   },
      { val: '2×',   label: 'Industry Engagement'   },
      { val: '200K+',label: 'Units Sold'             },
    ],
  },
}

export default function KiaCaseStudyPanel({ isOpen, onClose, campaign }: Props) {
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
        gsap.fromTo(panel,   { x: '100%' }, { x: '0%', duration: 0.55, ease: 'power3.out' })
      } else {
        document.body.style.overflow = ''
        gsap.to(panel,   { x: '100%', duration: 0.42, ease: 'power3.in' })
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

  const d = DATA[campaign]

  return createPortal(
    <>
      <div ref={overlayRef} className="kia-panel-overlay" onClick={onClose} style={{ display: 'none' }} />

      <div ref={panelRef} className="kia-panel" style={{ display: 'none' }}>

        <button className="kia-panel__close" onClick={onClose} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="kia-panel__inner" data-lenis-prevent>

          {/* ── Hero ── */}
          <div className="kia-panel__hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.heroImg} alt={d.heroAlt} className="kia-panel__hero-img" />
            <div className="kia-panel__hero-overlay">
              <span className="kia-panel__hero-eyebrow">{d.eyebrow}</span>
              <h2 className="kia-panel__hero-title">
                {d.heroTitle.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="kia-panel__stats">
            {d.stats.map(s => (
              <div className="kia-panel__stat" key={s.label}>
                <span className="kia-panel__stat-val">{s.val}</span>
                <span className="kia-panel__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Body — campaign-specific ── */}
          <div className="kia-panel__body">
            {campaign === 'sonet' ? <SonetContent /> : <CarensContent />}
          </div>

          {/* ── Footer ── */}
          <div className="kia-panel__footer">
            <span className="kia-panel__footer-scope">
              {campaign === 'sonet'
                ? 'Brand Strategy · Campaign Writing · ATL + Digital + Retail'
                : 'Brand Strategy · Campaign Writing · Community Storytelling'}
            </span>
            <span className="kia-panel__footer-credit">Innocean India × Kia India · {campaign === 'sonet' ? 'Aug–Oct 2022' : 'Nov 2021–Feb 2022'}</span>
          </div>

        </div>
      </div>
    </>,
    document.body
  )
}

// ── Sonet content ─────────────────────────────────────────────────────────────
function SonetContent() {
  return (
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
        <p className="kia-section__text">The X Line's design gave us real ammunition — blacked-out elements, aggressive stance, badging that communicated something before a single word of copy. We didn't lead with what it had. We led with who owns it.</p>
        <blockquote className="kia-pull-quote">The Rare Kind. Not rare as in limited — rare as in genuinely, authentically distinct.</blockquote>
        <p className="kia-section__text">The positioning spoke directly to a buyer who doesn't want what everyone else is driving. One idea. Every touchpoint built around it.</p>
      </div>

      <div className="kia-section">
        <span className="kia-section__label">The Work</span>
        <p className="kia-section__text">Led brand strategy and copy voice across the full integrated mix. The TVC brief: a young couple living in an entirely monochromatic world — except their car. The concept was downstream of the positioning, so the ad didn't just showcase the Sonet X Line, it communicated who owns one.</p>
        <p className="kia-section__text">15+ copy assets for print, dealership, and in-store — deployed across 500+ Kia dealerships nationally. Every piece held the same self-assured tone as the TVC. The brand experience didn't drop the moment a buyer walked into a showroom.</p>
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
        <p className="kia-section__text">The discipline that drove ROI was <em>omission</em>. The Sonet X Line had a long spec list — Xclusive Matte Graphite exterior, Crystal Cut alloys, BOSE sound system. The strategic call was to not lead with any of it. Identity over inventory. Deciding what a car <em>stands for</em> over what it <em>has</em> is positioning work. That's the layer this campaign was built on.</p>
      </div>
    </div>
  )
}

// ── Carens content ────────────────────────────────────────────────────────────
function CarensContent() {
  return (
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
        <p className="kia-section__text">Launching a family MPV in India means navigating a category minefield — happy families, open fields, children laughing in back seats. The Carens needed to feel relevant to the full, varied reality of modern Indian families. Then post-launch, the challenge shifted: move from brand claim to community proof.</p>
      </div>

      <div className="kia-section">
        <span className="kia-section__label">Phase 1 — The Positioning</span>
        <p className="kia-section__text">The insight: no two Indian families are alike. Rather than constructing one aspirational model family, the campaign took a deliberate multi-family approach — four to five families, different cities, household structures, lifestyles, and needs.</p>
        <blockquote className="kia-pull-quote">The Carens doesn't ask you to be a certain kind of family first.</blockquote>
        <p className="kia-section__text">Five ad films. Each built around a distinct family. A shared visual language so that whether a viewer saw one film or all five, the Carens impression was identical: spacious, thoughtful, built for real life.</p>
      </div>

      <div className="kia-section">
        <span className="kia-section__label">The Launch</span>
        <p className="kia-section__text">The gamified digital activation — #60SecondsWithKiaCarens developed with InMobi — prompted users to find feature hotspots on the Carens within 60 seconds, then share on social. Result: 2× industry-standard engagement rate in two weeks. A published benchmark.</p>
        <p className="kia-section__text">Pre-launch: 19,000+ bookings before launch day. The market had already decided before the car was officially available.</p>
      </div>

      <div className="kia-numbers">
        {[
          { val: '19K+', desc: 'Pre-launch bookings before Day 1'       },
          { val: '2×',   desc: 'Industry engagement rate in 2 weeks'    },
          { val: '200K+',desc: "Units sold — Kia India's 3rd top model" },
        ].map(n => (
          <div className="kia-number" key={n.desc}>
            <span className="kia-number__val">{n.val}</span>
            <span className="kia-number__desc">{n.desc}</span>
          </div>
        ))}
      </div>

      <div className="kia-section">
        <span className="kia-section__label">Phase 2 — From Claim to Proof</span>
        <p className="kia-section__text">Post-launch, the most credible thing Kia could say about the Carens was what actual owners said about it. The #CarensFamilyDrive was built on exactly that: real owners, real drives, no managed testimonials.</p>
        <p className="kia-section__text">Scripted the event's full narrative arc. Built the interview prompt framework — questions designed to surface genuine, emotionally resonant stories without leading anyone toward a manufactured answer. Planned how raw event footage would become official brand content.</p>
        <blockquote className="kia-pull-quote">Knowing when a brand needs to step back and let its community speak is a positioning decision.</blockquote>
        <p className="kia-section__text">The launch campaign told the world what the Carens stood for. The Family Drive demonstrated it through people who had no reason to say it unless they meant it. That's a complete brand strategy arc: establish, then prove.</p>
      </div>

      <div className="kia-section kia-section--lens">
        <span className="kia-section__label">Strategy Lens</span>
        <p className="kia-section__text">Designing the transition from brand-narrated to owner-narrated storytelling is a strategic function, not a production one. The event content — raw, unscripted — became official Kia brand content. That's the clearest possible proof that the original campaign positioning had landed in the real world.</p>
      </div>
    </div>
  )
}
