'use client'
import { useEffect, useRef } from 'react'

export default function Contact() {
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
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        })
        tl.to('.contact__headline', { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.out' })
          .to('.contact__sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .to('.contact__buttons', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      }, section)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <h2 className="contact__headline">Let&rsquo;s work.</h2>
      <p className="contact__sub">
        Open to UX writing roles, brand strategy engagements, and content consultancies.
        I care about craft and I work well with teams who do too.
      </p>
      <div className="contact__buttons">
        <a href="mailto:projectsforpooja@gmail.com" className="btn btn--fill">
          projectsforpooja@gmail.com
        </a>
        <a href="https://linkedin.com/in/poojakoundal" target="_blank" rel="noopener noreferrer" className="btn">
          LinkedIn ↗
        </a>
      </div>
    </section>
  )
}
