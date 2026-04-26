'use client'
import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    let lenis: InstanceType<typeof import('lenis').default> | null = null
    let gsapTicker: ((time: number) => void) | null = null

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.65,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', ({ scroll }: { scroll: number }) => {
        void scroll
        ScrollTrigger.update()
        document.querySelectorAll<HTMLElement>('[data-lenis-speed]').forEach((el) => {
          const speed = parseFloat(el.dataset.lenisSpeed ?? '1')
          const rect = el.getBoundingClientRect()
          const centerFromMiddle = rect.top + rect.height / 2 - window.innerHeight / 2
          el.style.setProperty('--parallax-y', `${centerFromMiddle * (1 - speed)}px`)
        })
      })

      gsapTicker = (time: number) => { lenis!.raf(time * 1000) }
      gsap.ticker.add(gsapTicker)
      gsap.ticker.lagSmoothing(0)
      ;(window as unknown as Record<string, unknown>).__lenis = lenis
    }

    init()
    return () => {
      if (gsapTicker) {
        import('gsap').then(({ gsap }) => gsap.ticker.remove(gsapTicker!))
      }
      lenis?.destroy()
    }
  }, [])
}
