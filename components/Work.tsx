'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import PhoneFrame from './PhoneFrame'
import BrowserFrame from './BrowserFrame'
import KiaBrandCard from './KiaBrandCard'
import MmtCaseStudyPanel from './MmtCaseStudyPanel'
import OttCaseStudyPanel from './OttCaseStudyPanel'

// ── Flip-board character scramble ─────────────────────────────────────────
const FLIP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function flipText(el: HTMLElement, startDelay = 0) {
  const original = el.getAttribute('data-original') ?? el.textContent ?? ''
  if (!el.getAttribute('data-original')) el.setAttribute('data-original', original)

  // Spaces stay as plain text nodes so the browser keeps natural word-break
  // points — prevents individual characters from wrapping mid-word.
  // Non-space chars each get a .flip-char span (display: inline).
  el.innerHTML = original
    .split('')
    .map(ch =>
      ch === ' '
        ? ' '
        : `<span class="flip-char" data-final="${ch}">${FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)]}</span>`
    )
    .join('')

  el.querySelectorAll<HTMLSpanElement>('.flip-char').forEach((span, i) => {
    const finalChar = span.getAttribute('data-final') ?? ''
    const delay  = startDelay + i * 28   // 28 ms stagger between chars
    const tickMs = 32                     // ~31 fps scramble
    const ticks  = Math.ceil(300 / tickMs) // 300 ms of scramble per char
    let count = 0

    setTimeout(() => {
      const timer = setInterval(() => {
        count++
        if (count >= ticks) {
          clearInterval(timer)
          span.textContent = finalChar
        } else {
          span.textContent = FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)]
        }
      }, tickMs)
    }, delay)
  })
}

interface BrandProject {
  index: string
  title: string
  company: string
  scope: string[]
  period: string
  desc: string
  outcome: string
  phoneVideo?: string
  phonePoster?: string
  /** 'browser' = show a browser frame with an embedded playlist/URL */
  frameType?: 'phone' | 'browser'
  /** Interactive YouTube playlist — fetched from RSS, no API key */
  playlistId?: string
  embedUrl?: string
  browserUrl?: string
}

interface ProductProject {
  index: string
  title: string
  company: string
  scope: string[]
  period: string
  desc: string
  outcome: string
  caseStudyHref?: string
  /** Opens a slide-in panel instead of navigating */
  panelId?: 'mmt'
  /** 'browser' = desktop screen recording; 'phone' = mobile screen recording */
  frameType: 'browser' | 'phone'
  videoSrc?: string
  videoPoster?: string
  /** URL shown in the browser address bar (browser frameType only) */
  browserUrl?: string
}

const brandProjects: BrandProject[] = [
  {
    index: '01',
    title: 'OTTplay Brand Voice',
    company: 'HT Media Group',
    scope: ['Brand Voice', 'Content Systems', 'Campaign Writing'],
    period: 'Dec 2022–Jul 2023',
    desc: "Shaped OTTplay's identity in the competitive streaming discovery market. Built brand voice guidelines from scratch, led the OTTplay Changemakers Awards 2023 end-to-end, and wrote the Jhakaas Pack campaign series.",
    outcome: 'Instagram 50K to 150K followers · 3x growth in 7 months',
    phoneVideo: '/videos/ottplay-changemakers.mp4',
  },
  {
    index: '02',
    title: 'Kia India — Two Launches, One Voice',
    company: 'Innocean India × Kia India',
    scope: ['Brand Strategy', 'Campaign Writing', 'ATL + Digital + Retail'],
    period: 'Nov 2021–Dec 2022',
    desc: 'Built brand strategy and copy voice for two flagship Kia India launches — the Sonet X Line and the Carens. From positioning through execution across TV, OOH, digital, and 500+ dealerships. One idea carried everything.',
    outcome: '75M+ YouTube views · 19K+ pre-launch bookings · 200K+ units sold',
    frameType: 'browser',
    browserUrl: 'youtube.com/playlist?list=PL_mUkanXQHmdparUnp5U155w9BXqEbuzj',
    playlistId: 'PL_mUkanXQHmdparUnp5U155w9BXqEbuzj',
  },
]

const productProjects: ProductProject[] = [
  {
    index: '01',
    title: 'Spinny AI Copy Studio',
    company: 'Spinny + Autocar India',
    scope: ['AI Tooling', 'Content Systems', 'UX Writing'],
    period: 'Oct 2025–Apr 2026',
    desc: 'Built a constraint-based AI writing system for two brands with completely different voices across 9 product surfaces. Not a prompt interface — a structured tool with brand knowledge encoded as rules, not suggestions.',
    outcome: '12 pod contexts mapped · 2 brand skills deployed · 500+ tickets served',
    caseStudyHref: '/work/spinny',
    frameType: 'browser',
    browserUrl: 'copy-studio.spinny.com',
    videoSrc: '/videos/spinny-ai-studio.mov',
  },
  {
    index: '02',
    title: 'Spinny Buy Homepage',
    company: 'Spinny',
    scope: ['UX Writing', 'Product Strategy', 'Copy Systems'],
    period: '4 Weeks · 2025',
    desc: "Redesigned the homepage to recognise returning buyers by transaction stage — test drive booked, pending, completed, cancelled. The page stopped showing a stranger's view to people who'd already committed.",
    outcome: '−5.14% time-to-visit · +3.6% user-to-visit · +3.2% user-to-delivery · A/B at 2.5M MAU',
    caseStudyHref: '/work/spinny-buy',
    frameType: 'phone',
  },
  {
    index: '03',
    title: 'go-Tribe Loyalty Redesign',
    company: 'MakeMyTrip · goibibo',
    scope: ['UX Writing', 'Content Strategy', 'Research'],
    period: '2023–2024',
    desc: "Rewrote a loyalty program that members knew about but didn't change their behaviour for. Argued for structural change first, then aligned copy to a structure it could be honest about.",
    outcome: '+22% booker activation · +18% bookings per booker · +16% conversion · +4% seat attach',
    caseStudyHref: '/work/gotribe',
    frameType: 'phone',
    videoPoster: '/images/gotribe-thumbnail.png',
  },
  {
    index: '04',
    title: 'MMT Treels',
    company: 'MakeMyTrip',
    scope: ['Creative Direction', 'Content Systems', 'Scriptwriting'],
    period: 'Jul 2023–Apr 2025',
    desc: 'Conceptualised and built MMT\'s scroll-first video discovery format for 250+ premium hotels pan-India. Two-format content system: 15-second Treels for discovery, 60-second walkthroughs for decision. Directed shoots, scripted 500+ videos, and built every storyboard from scratch.',
    outcome: '30K+ unique visitors · 150% engagement lift · 25% topline lift from premium stays above ₹15K',
    panelId: 'mmt',
    frameType: 'phone',
    videoSrc: '/videos/mmt-treels.mp4',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const brandBtnRef = useRef<HTMLButtonElement>(null)
  const productBtnRef = useRef<HTMLButtonElement>(null)
  const [mode, setMode] = useState<'brand' | 'product'>('product')
  const [ottPanelOpen, setOttPanelOpen] = useState(false)
  const [mmtPanelOpen, setMmtPanelOpen] = useState(false)

  // Section label reveal
  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const section = sectionRef.current
      if (!section) return
      ctx = gsap.context(() => {
        gsap.to(section.querySelector('.section__label-line'), {
          width: '2rem', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.section__label'), start: 'top 85%', toggleActions: 'play none none none' },
        })
        gsap.to(section.querySelector('.section__label-text'), {
          opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.section__label'), start: 'top 85%', toggleActions: 'play none none none' },
        })
      }, section)
    }
    init()
    return () => ctx?.revert()
  }, [])

  // Indicator position on mount
  useEffect(() => {
    const btn = productBtnRef.current
    const indicator = indicatorRef.current
    if (!btn || !indicator) return
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`
    indicator.style.width = `${btn.offsetWidth}px`
  }, [])

  // Card reveals — shared animation for both modes
  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      setTimeout(() => {
        ScrollTrigger.refresh()
        const section = sectionRef.current
        if (!section) return
        const cardClass = mode === 'brand' ? '.brand-card' : '.product-card'
        ctx = gsap.context(() => {
          section.querySelectorAll(cardClass).forEach((card) => {
            const media  = card.querySelector('.work-card__media')
            const title  = card.querySelector('.card-title')
            const desc   = card.querySelector('.card-desc')
            const outcome = card.querySelector('.card-outcome')

            if (media) gsap.to(media, {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
            })
            if (title) {
              if (mode === 'product') {
                // Flip-board scramble animation for product card titles
                const el = title as HTMLElement
                gsap.set(el, { clipPath: 'none', y: 0, opacity: 0 })
                ScrollTrigger.create({
                  trigger: card,
                  start: 'top 80%',
                  once: true,
                  onEnter: () => {
                    gsap.set(el, { opacity: 1 })
                    flipText(el, 60)
                  },
                })
              } else {
                gsap.to(title, {
                  clipPath: 'inset(0 0 0% 0)', y: '0%', duration: 1.0, delay: 0.1, ease: 'power3.out',
                  scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
                })
              }
            }
            if (desc) gsap.to(desc, {
              opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
            })
            if (outcome) gsap.to(outcome, {
              opacity: 1, y: 0, duration: 0.7, delay: 0.45, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
            })
          })
        }, section)
      }, 50)
    }
    init()
    return () => ctx?.revert()
  }, [mode])

  const switchMode = async (newMode: 'brand' | 'product') => {
    if (newMode === mode) return
    const { gsap } = await import('gsap')
    const targetBtn = newMode === 'brand' ? brandBtnRef.current : productBtnRef.current
    if (indicatorRef.current && targetBtn) {
      gsap.to(indicatorRef.current, { x: targetBtn.offsetLeft, width: targetBtn.offsetWidth, duration: 0.45, ease: 'power3.out' })
    }
    const cards = document.querySelectorAll('.brand-card, .product-card')
    if (cards.length > 0) {
      gsap.to(cards, { opacity: 0, y: -16, stagger: 0.04, duration: 0.28, ease: 'power2.in', onComplete: () => setMode(newMode) })
    } else {
      setMode(newMode)
    }
  }

  return (
    <section className="section work" id="work" ref={sectionRef}>
      <div className="section__label" data-lenis-speed="0.88">
        <div className="section__label-line" />
        <span className="section__label-text">Selected Work</span>
      </div>

      <div className="work__toggle">
        <button ref={brandBtnRef} className={`work__toggle-btn${mode === 'brand' ? ' is-active' : ''}`} onClick={() => switchMode('brand')}>
          Brand Work
        </button>
        <button ref={productBtnRef} className={`work__toggle-btn${mode === 'product' ? ' is-active' : ''}`} onClick={() => switchMode('product')}>
          Product Work
        </button>
        <div ref={indicatorRef} className="work__toggle-indicator" />
      </div>

      {mode === 'brand' && (
        <div className="work-list">
          {brandProjects.map((p) => {
            if (p.index === '02') return <KiaBrandCard key={p.index} />
            return (
              <div className={`brand-card${p.frameType === 'browser' ? ' brand-card--browser' : ''}`} key={p.index}>
                <div className="work-card__media">
                  {p.frameType === 'browser'
                    ? <BrowserFrame url={p.browserUrl} playlistId={p.playlistId} embedUrl={p.embedUrl} />
                    : <PhoneFrame videoSrc={p.phoneVideo} poster={p.phonePoster} />
                  }
                </div>
                <div className="work-card__content">
                  <div className="card-meta">
                    <span className="card-meta__index">{p.index}</span>
                    <span className="card-meta__company">{p.company}</span>
                    <span className="card-meta__period">{p.period}</span>
                  </div>
                  <h3 className="card-title">{p.title}</h3>
                  <div className="card-scope">
                    {p.scope.map((s) => <span key={s}>{s}</span>)}
                  </div>
                  <p className="card-desc">{p.desc}</p>
                  <p className="card-outcome">↗ {p.outcome}</p>
                  {p.index === '01' && (
                    <button className="kia-cs-cta" onClick={() => setOttPanelOpen(true)}>
                      Read case study →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <OttCaseStudyPanel isOpen={ottPanelOpen} onClose={() => setOttPanelOpen(false)} />
      <MmtCaseStudyPanel isOpen={mmtPanelOpen} onClose={() => setMmtPanelOpen(false)} />

      {mode === 'product' && (
        <div className="work-list">
          {productProjects.map((p) => (
            <div className={`product-card${p.frameType === 'phone' ? ' product-card--phone' : ''}`} key={p.index}>
              <div className="work-card__media">
                {p.frameType === 'browser'
                  ? <BrowserFrame videoSrc={p.videoSrc} poster={p.videoPoster} url={p.browserUrl} />
                  : <PhoneFrame videoSrc={p.videoSrc} poster={p.videoPoster} />
                }
              </div>
              <div className="work-card__content">
                <div className="card-meta">
                  <span className="card-meta__index">{p.index}</span>
                  <span className="card-meta__company">{p.company}</span>
                  <span className="card-meta__period">{p.period}</span>
                </div>
                <h3 className="card-title">{p.title}</h3>
                <div className="card-scope">
                  {p.scope.map((s) => <span key={s}>{s}</span>)}
                </div>
                <p className="card-desc">{p.desc}</p>
                <p className="card-outcome">↗ {p.outcome}</p>
                {p.panelId === 'mmt'
                  ? <button className="kia-cs-cta" onClick={() => setMmtPanelOpen(true)}>Read case study →</button>
                  : p.caseStudyHref && <Link href={p.caseStudyHref} className="project-cs-link">Read case study</Link>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
