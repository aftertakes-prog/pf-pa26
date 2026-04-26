'use client'
import { useEffect, useRef } from 'react'

const FIELDS = [
  { label: 'CANDIDATE', value: 'POOJA KOUNDAL'            },
  { label: 'SKILL',     value: 'MAKES PRODUCTS FEEL HUMAN' },
  { label: 'EVIDENCE',  value: 'SPINNY · MMT · KIA'        },
  { label: 'VERDICT',   value: '■  HIRE HER'               },
] as const

const CHAR_MS  = 16   // ms per character — snappy typewriter
const FIELD_MS = 130  // pause between fields
const HOLD_MS  = 500  // 0.5s reading pause on VERDICT before auto-dismiss

interface Props {
  loaderRef: React.RefObject<HTMLDivElement>
  onEnter: () => void
}

export default function Loader({ loaderRef, onEnter }: Props) {
  const valueRefs = useRef<(HTMLSpanElement | null)[]>(Array(FIELDS.length).fill(null))

  useEffect(() => {
    let dead = false

    const run = async () => {
      const { gsap } = await import('gsap')

      // ── Initial states ───────────────────────────────────────────────────
      gsap.set('.loader__brief',       { opacity: 0, y: 28 })
      gsap.set('.loader__brief-title', { clipPath: 'inset(0 100% 0 0)' })
      gsap.set('.loader__brief-rule',  { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.loader__field-label', { opacity: 0, x: -8 })
      gsap.set('.loader__field-dots',  { scaleX: 0, transformOrigin: 'left center' })

      // ── Reveal brief card ────────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.1 })
      tl.to('.loader__brief',       { opacity: 1, y: 0,  duration: 0.42, ease: 'power3.out' })
        .to('.loader__brief-title', { clipPath: 'inset(0 0% 0 0)', duration: 0.42, ease: 'power3.out' }, '-=0.28')
        .to('.loader__brief-rule',  { scaleX: 1, duration: 0.35, ease: 'power3.out' }, '-=0.18')
        .to('.loader__field-label', { opacity: 1, x: 0, stagger: 0.07, duration: 0.25, ease: 'power2.out' }, '-=0.08')
        .to('.loader__field-dots',  { scaleX: 1, stagger: 0.07, duration: 0.25, ease: 'power2.out' }, '<')

      await new Promise(r => setTimeout(r, 780))

      // ── Type each value sequentially ─────────────────────────────────────
      for (let i = 0; i < FIELDS.length; i++) {
        if (dead) return
        const el = valueRefs.current[i]
        if (!el) continue

        el.classList.add('is-typing')

        for (const ch of FIELDS[i].value) {
          if (dead) return
          el.textContent = (el.textContent ?? '') + ch
          await new Promise(r => setTimeout(r, CHAR_MS))
        }

        el.classList.remove('is-typing')
        el.classList.add('is-done')

        if (i < FIELDS.length - 1) {
          await new Promise(r => setTimeout(r, FIELD_MS))
        }
      }

      // ── Hold on STATUS: READY, then auto-dismiss ─────────────────────────
      if (!dead) {
        await new Promise(r => setTimeout(r, HOLD_MS))
        if (!dead) onEnter()
      }
    }

    run()
    return () => { dead = true }
  }, [onEnter])

  return (
    <div className="loader" ref={loaderRef} aria-hidden="true">

      <span className="loader__corner loader__corner--tl">PK — PORTFOLIO</span>
      <span className="loader__corner loader__corner--tr">001 / 2025</span>
      <span className="loader__corner loader__corner--bl">LOADING EXPERIENCE</span>

      <div className="loader__brief">
        <header className="loader__brief-header">
          <span className="loader__brief-eyebrow">Document</span>
          <span className="loader__brief-title">Creative Brief</span>
        </header>

        <div className="loader__brief-rule" />

        <div className="loader__fields">
          {FIELDS.map((f, i) => (
            <div className="loader__field" key={f.label}>
              <span className="loader__field-label">{f.label}</span>
              <span className="loader__field-dots" aria-hidden="true" />
              <span
                className={`loader__field-value${i === FIELDS.length - 1 ? ' loader__field-value--status' : ''}`}
                ref={(el: HTMLSpanElement | null) => { valueRefs.current[i] = el }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
