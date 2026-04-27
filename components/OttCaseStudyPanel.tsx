'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  isOpen:  boolean
  onClose: () => void
}

export default function OttCaseStudyPanel({ isOpen, onClose }: Props) {
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
          <div className="kia-panel__hero kia-panel__hero--ott">
            <div className="kia-panel__hero-overlay">
              <span className="kia-panel__hero-eyebrow">Brand Strategy Case Study · OTTplay (HT Media Labs)</span>
              <h2 className="kia-panel__hero-title">OTTplay Changemakers<br />— A Night of Inspiration</h2>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="kia-panel__stats">
            {[
              { val: '3.5M+',  label: 'Total Event Reach'  },
              { val: '176K',   label: 'Interactions'        },
              { val: '1K',     label: 'Shares'              },
              { val: '40+',    label: 'Honourees'           },
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
                <span className="kia-campaign__num">01</span>
                <div>
                  <h3 className="kia-campaign__title">OTTplay Changemakers Awards 2023</h3>
                  <p className="kia-campaign__sub">Brand Positioning · Experiential Event · Content Strategy · Digital Amplification</p>
                </div>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Context</span>
                <p className="kia-section__text">OTTplay launched in 2020 as HT Media's answer to a fragmented streaming landscape — 80+ OTT platforms, fragmented subscriptions, and users who couldn't figure out what to watch or where. By 2022, it had indexed 200,000+ titles and built an AI-powered recommendation engine. Product strength was real.</p>
                <p className="kia-section__text">But product strength alone doesn't build brand authority in a category this crowded. OTTplay needed a cultural moment. Something that placed it at the centre of the OTT conversation, not at its edges.</p>
                <blockquote className="kia-pull-quote">The brief wasn't to organise an event. It was to define what the event meant, what it said about the brand, and how it would live beyond the room it happened in.</blockquote>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Strategic Idea</span>
                <p className="kia-section__text">India's OTT boom had quietly created a new class of cultural changemakers — filmmakers who bypassed theatres, actors who found second careers on streaming, regional storytellers with suddenly national audiences, digital-native creators who built fan bases without ever appearing on TV. Nobody had celebrated them as a collective, across languages and genres, on one stage.</p>
                <p className="kia-section__text">The Changemakers Awards was positioned to do exactly that. The framing — the trendsetters, the disruptors, the round pegs in square holes — gave the awards a clear identity, distinct from traditional film awards. This wasn't Filmfare. This was OTTplay saying: we understand this space better than anyone, and here are the people changing it.</p>
                <blockquote className="kia-pull-quote">The purple carpet (not red) was the visual signal that this was a different kind of night.</blockquote>
                <p className="kia-section__text">The theme, <em>A Night of Inspiration and Celebration</em>, was broad enough to hold actors, directors, creators, tech leaders, and business innovators — and make each feel equally at home.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">My Role — Building the Voice from the Ground Up</span>
                <p className="kia-section__text"><strong>Theme and narrative positioning:</strong> Defined the core idea running through everything. The positioning had to be credible enough for an Oscar winner like Guneet Monga to walk the purple carpet alongside a digital creator like Prajakta Koli, and have both feel equally at home.</p>
                <p className="kia-section__text"><strong>Voice across all touchpoints:</strong> Wrote and defined the tone across the event's full communication architecture — event name, stage content, panel prompts, and anchor scripts for host Rithvik Dhanjani. The voice had to feel celebratory but substantive, inclusive but authoritative.</p>
                <p className="kia-section__text"><strong>Content rollout calendar:</strong> Built the full content strategy across three phases. Pre-buzz (anticipation, nominee reveals, category announcements), live (real-time coverage, social amplification), and post-event amplification (winner content, highlight packaging, creator-shared moments). The goal: turn a one-night event into a sustained digital moment.</p>
              </div>

              <div className="kia-section">
                <span className="kia-section__label">The Execution</span>
                <p className="kia-section__text">26 March 2023, Mumbai. 40+ honourees across categories including Filmmaker in the Spotlight, Pathbreaking Performance, Entertainer of the Decade, Best VFX, and Rising Star of the Year.</p>
                <p className="kia-section__text">The guest list spanned Rajkummar Rao, Rishab Shetty (fresh off Kantara), Guneet Monga, Prajakta Koli, Prosenjit Chatterjee, Priyamani, Sayani Gupta, Yashraj Mukhate, and Munawar Faruqui. A deliberately cross-industry, cross-language, cross-format room that embodied the brand's positioning. Real Fruit Power presented the event.</p>
              </div>

              <div className="kia-numbers">
                {[
                  { val: '3.5M+', desc: 'Total event reach'                              },
                  { val: '176K',  desc: 'Interactions across the content rollout'         },
                  { val: '2nd',   desc: 'Edition launched in 2024 — South Indian focus'   },
                ].map(n => (
                  <div className="kia-number" key={n.desc}>
                    <span className="kia-number__val">{n.val}</span>
                    <span className="kia-number__desc">{n.desc}</span>
                  </div>
                ))}
              </div>

              <div className="kia-section kia-section--lens">
                <span className="kia-section__label">Strategy Lens</span>
                <p className="kia-section__text">The Changemakers Awards is a case study in brand authority through curation. OTTplay's product proposition was already strong. What it lacked was cultural credibility — the sense that it truly understood the OTT ecosystem, not just indexed it.</p>
                <p className="kia-section__text">By building and owning the first multi-lingual creator awards in India, OTTplay inserted itself into the cultural conversation as a participant, not just a platform. The escalation to a second edition in 2024 — with Zee5 as streaming partner and Fever FM as radio partner — is the clearest signal the inaugural event worked.</p>
              </div>

            </div>
          </div>

          {/* ── Footer ── */}
          <div className="kia-panel__footer">
            <span className="kia-panel__footer-scope">Brand Strategy · Experiential Event · Content Architecture · Digital Amplification</span>
            <span className="kia-panel__footer-credit">OTTplay (HT Media Labs) · Mar 2023</span>
          </div>

        </div>
      </div>
    </>,
    document.body
  )
}
