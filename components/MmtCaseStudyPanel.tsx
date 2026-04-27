'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  isOpen:  boolean
  onClose: () => void
}

export default function MmtCaseStudyPanel({ isOpen, onClose }: Props) {
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
          <div className="kia-panel__hero kia-panel__hero--mmt">
            <div className="kia-panel__hero-overlay">
              <span className="kia-panel__hero-eyebrow">Product Content Case Study · MakeMyTrip</span>
              <h2 className="kia-panel__hero-title">MMT Treels<br />— Bite-Sized Travel Reels</h2>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="kia-panel__stats">
            {[
              { val: '30K+',  label: 'Unique Visitors (6 Months)' },
              { val: '150%',  label: 'Engagement Lift'            },
              { val: '25%',   label: 'Premium Stay Topline Lift'  },
              { val: '500+',  label: 'Videos Scripted'            },
            ].map(s => (
              <div className="kia-panel__stat" key={s.label}>
                <span className="kia-panel__stat-val">{s.val}</span>
                <span className="kia-panel__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Body ── */}
          <div className="kia-panel__body">
            <div className="kia-campaign">

              <div className="kia-campaign__header">
                <span className="kia-campaign__num">03</span>
                <div>
                  <h3 className="kia-campaign__title">MMT Treels</h3>
                  <p className="kia-campaign__sub">Bite-Sized Travel Reels · In-App Short-Form Video · Premium Hotel Discovery</p>
                </div>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Problem</span>
                <p className="kia-section__text">India's premium travel had a discovery gap that no filter could fix. MMT listed tens of thousands of domestic properties, but the genuinely exceptional ones — the cliff-edge retreats in Coorg, the heritage havelis in Rajasthan, the private beach villas in Goa — were getting lost in listing pages built for transaction, not seduction.</p>
                <p className="kia-section__text">Static images and star ratings don't communicate what it feels like to wake up in a room with a plunge pool overlooking a valley. They don't sell the experience of a stay that costs ₹20,000 a night. For a buyer spending that kind of money, feeling is the product.</p>
                <blockquote className="kia-pull-quote">Travellers were finding their dream stays on Instagram Reels at midnight — saving them, sitting with them for days — and only then opening MMT to actually book. We had the inventory. We didn't have the format.</blockquote>
                <p className="kia-section__text">Treels was built to close that loop, natively, inside the app, at the moment intent was highest.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Product — Two Formats, One System</span>
                <p className="kia-section__text">The <strong>15-second Treel</strong> was designed for the scroll. Hook-first, emotion-led, built to stop a thumb in under two seconds and make a user feel something about a property they weren't actively searching for. It lived in a dedicated discovery surface inside the MMT app — modelled on the visual language users already knew from social, but connected directly to the booking funnel.</p>
                <p className="kia-section__text">The <strong>60-second walkthrough</strong> was designed for the decision. Once a user landed on a property detail page, the walkthrough gave them an immersive, sequenced tour in a format no photograph could replicate. It answered the question static imagery never could: what does it actually feel like to be here?</p>
                <blockquote className="kia-pull-quote">Two formats, two jobs, one funnel that didn't exist in the MMT experience before.</blockquote>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Scale</span>
                <p className="kia-section__text">250+ of India's most premium hotels and homestays. Every state, every category. Cliff-side retreats, heritage properties, design-forward boutique stays, private villa estates, high-altitude mountain lodges, beachfront escapes. The kind of properties that warranted exceptional storytelling because their price point demanded it.</p>
                <p className="kia-section__text">500+ videos. Consistent quality. A distinct creative voice for each property. Producing at that scale required building a system, not just a shoot schedule.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">My Role — Building the Creative System</span>
                <p className="kia-section__text"><strong>Storyboarding and moodboarding:</strong> Before a single shot was taken, I built a storyboard and moodboard for every property. What was its core emotional sell? Who was the traveller it was talking to? A private forest lodge in Jim Corbett is a completely different brief from a Portuguese-heritage villa in Goa. The board determined the shoot, not the other way around.</p>
                <p className="kia-section__text"><strong>Shoot direction:</strong> Directed the production team across 250+ properties, calling specific shots, controlling pacing, holding the visual rhythm tight enough to carry both the 15-second cut and the 60-second walkthrough. The first two seconds of every Treel were non-negotiable — the hook had to land before a thumb could move.</p>
                <p className="kia-section__text"><strong>Scripting at scale:</strong> Wrote scripts for all 500+ videos. Each one built around a single emotional truth, not a feature list. The property with a rooftop infinity pool wasn't sold on its pool. It was sold on the specific, irreplaceable feeling of being suspended above a valley at sunset. The script surfaced that. The visuals closed it.</p>
                <p className="kia-section__text"><strong>Cross-functional alignment:</strong> Worked closely with MMT's product team so the content system served both storytelling and conversion — embedding wishlist saves, share actions, and cross-sell touchpoints into the viewing experience without breaking the narrative.</p>
              </div>

              <div className="kia-numbers">
                {[
                  { val: '30K+',  desc: 'Unique visitors in the first six months'       },
                  { val: '150%',  desc: 'Engagement lift (saves, shares, cross-sells)'  },
                  { val: '25%',   desc: 'Topline lift from premium stays above ₹15K'    },
                ].map(n => (
                  <div className="kia-number" key={n.desc}>
                    <span className="kia-number__val">{n.val}</span>
                    <span className="kia-number__desc">{n.desc}</span>
                  </div>
                ))}
              </div>

              <div className="kia-section kia-section--lens">
                <span className="kia-section__label">Strategy Lens</span>
                <p className="kia-section__text">Premium hotel discovery isn't a search problem. It's an emotional one. A traveller spending ₹15,000 to ₹40,000 a night isn't filtering by star rating — they're waiting to feel something. Traditional OTA interfaces were built for transactional search. They weren't built for aspiration.</p>
                <p className="kia-section__text">Treels moved MMT's discovery moment upstream — from "I know what I want, find it for me" to "I didn't know I wanted this until I just saw it." That's the territory Instagram and YouTube had already colonised. MMT was bringing it into premium travel booking, natively, with a direct path to a transaction. The 150% engagement lift and 25% revenue contribution from premium stays are the proof: when storytelling is built for the right moment in the right format, it converts.</p>
              </div>

            </div>
          </div>

          {/* ── Footer ── */}
          <div className="kia-panel__footer">
            <span className="kia-panel__footer-scope">Creative Direction · Content Systems · Scriptwriting · Shoot Direction</span>
            <span className="kia-panel__footer-credit">MakeMyTrip · Jul 2023–Apr 2025</span>
          </div>

        </div>
      </div>
    </>,
    document.body
  )
}
