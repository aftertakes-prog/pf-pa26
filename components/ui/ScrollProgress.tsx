'use client'
import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.to('.scroll-progress__bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true },
      })
    }
    init()
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" />
    </div>
  )
}
