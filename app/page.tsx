'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Scribble from '@/components/Scribble'
import Loader from '@/components/Loader'

export default function Page() {
  useSmoothScroll()

  const [loaderDone, setLoaderDone] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Post-loader scroll animations
  useEffect(() => {
    if (!loaderDone) return
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.to('.hero__headline', {
          y: -60, opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
        })
        gsap.to('.hero__scroll-line', {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: '30% top', scrub: true },
        })
      })
    }
    init()
    return () => ctx?.revert()
  }, [loaderDone])

  // Brief collapses, overlay fades, hero reveals — called automatically by Loader
  const handleEnter = useCallback(async () => {
    const { gsap } = await import('gsap')

    // Brief collapses inward
    gsap.to('.loader__brief', { scale: 0.97, opacity: 0, duration: 0.28, ease: 'power3.in' })
    gsap.to('.loader__corner', { opacity: 0, duration: 0.18 })

    // Overlay fades
    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.38,
      delay: 0.2,
      ease: 'power2.inOut',
      onComplete: () => setLoaderDone(true),
    })

    // Hero reveals with staggered text
    const tl = gsap.timeline({ delay: 0.28 })
    tl.fromTo('.hero__label',
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
      0
    )
      .to('.hero-line', {
        clipPath: 'inset(0 0 0% 0)',
        y: '0%',
        duration: 1.05,
        stagger: 0.13,
        ease: 'power3.out',
      }, 0.1)
      .to('.hero__sub',       { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 0.5)
      .to('.hero__scroll-cue', { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' }, 0.75)
      .to('.hero__glyph',      { opacity: 0.4,     duration: 0.8,  ease: 'power3.out' }, 0.65)
  }, [setLoaderDone])

  return (
    <>
      {!loaderDone && <Loader loaderRef={loaderRef} onEnter={handleEnter} />}

      <Nav />
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
      <Scribble />
    </>
  )
}
