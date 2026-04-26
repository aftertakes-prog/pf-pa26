'use client'
import { useEffect, useRef } from 'react'

const experience = [
  { period: 'Jul 2023–Apr 2025', role: 'Creative Strategist', company: 'MakeMyTrip' },
  { period: 'Dec 2022–Jul 2023', role: 'Copywriter', company: 'HT Media Group' },
  { period: 'Nov 2021–Dec 2022', role: 'Copywriter (Consultant)', company: 'Innocean India – Kia' },
  { period: 'Mar 2020–Jul 2021', role: 'Content Associate', company: 'Templatolio Technologies' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      ctx = gsap.context(() => {
        // Label
        gsap.to(section.querySelector('.section__label-line'), {
          width: '2rem', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.section__label'), start: 'top 85%', toggleActions: 'play none none none' },
        })
        gsap.to(section.querySelector('.section__label-text'), {
          opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.section__label'), start: 'top 85%', toggleActions: 'play none none none' },
        })

        // Bio paragraphs
        section.querySelectorAll('.about__bio p').forEach((p, i) => {
          gsap.to(p, {
            opacity: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: p, start: 'top 88%', toggleActions: 'play none none none' },
          })
        })

        // Experience rows
        section.querySelectorAll('.experience__row').forEach((row) => {
          gsap.to(row, {
            borderTopColor: 'rgba(240,237,232,0.07)',
            duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' },
          })
          gsap.to(row.querySelectorAll('.experience__period, .experience__role, .experience__company'), {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.05, delay: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' },
          })
        })
      }, section)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="section" id="about" ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div className="section__label" data-lenis-speed="0.88">
        <div className="section__label-line" />
        <span className="section__label-text">About</span>
      </div>

      <div className="about__cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', position: 'relative' }}>
        <div>
          <div className="about__bio" data-lenis-speed="0.93">
            <p>I&apos;m Pooja — a UX writer who thinks in systems but writes for people. Five years across MakeMyTrip, HT Media, and Kia taught me that the best copy disappears into the experience.</p>
            <p>I&apos;ve designed video content formats, built brand voice systems, and written the unglamorous load-bearing stuff — error states, onboarding flows, empty states — that determines whether a user trusts a product or abandons it.</p>
            <p>I&apos;ve also spent just as long thinking about <em>why</em> certain words work and others don&apos;t. The craft matters as much as the output.</p>
            <p><em>Currently open to roles where words are taken seriously.</em></p>
          </div>

          <div style={{ marginTop: '4rem' }}>
            {experience.map((row) => (
              <div key={row.period} className="experience__row">
                <span className="experience__period">{row.period}</span>
                <span className="experience__role">{row.role}</span>
                <span className="experience__company">{row.company}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <span className="about__ghost" data-lenis-speed="0.55" aria-hidden="true">2020</span>
        </div>
      </div>
    </section>
  )
}
