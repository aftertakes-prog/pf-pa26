'use client'
import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const orb = document.querySelector<HTMLElement>('.cursor-orb')
    if (!orb) return

    const halfSize = 60
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      orb.classList.remove('is-hidden')
      orb.classList.add('is-visible')
    }
    const onMouseLeave = () => { orb.classList.remove('is-visible'); orb.classList.add('is-hidden') }
    const onMouseEnter = () => { orb.classList.remove('is-hidden'); orb.classList.add('is-visible') }

    const tick = () => {
      curX += (mouseX - curX) * 0.08
      curY += (mouseY - curY) * 0.08
      orb.style.transform = `translate(${curX - halfSize}px, ${curY - halfSize}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    rafId = requestAnimationFrame(tick)

    // Cursor context — runs after DOM is populated
    const contextCleanups: (() => void)[] = []
    const initContext = () => {
      const contractEls = document.querySelectorAll<HTMLElement>('a, button, .nav__link')
      const expandEls = document.querySelectorAll<HTMLElement>('.project-row, .about__bio, .skill__cell')

      contractEls.forEach(el => {
        const enter = () => { orb.classList.add('is-contracted'); orb.classList.remove('is-expanded') }
        const leave = () => { orb.classList.remove('is-contracted', 'is-expanded') }
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        contextCleanups.push(() => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
      })
      expandEls.forEach(el => {
        const enter = () => { orb.classList.add('is-expanded'); orb.classList.remove('is-contracted') }
        const leave = () => { orb.classList.remove('is-expanded', 'is-contracted') }
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        contextCleanups.push(() => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
      })
    }
    const ctxTimer = setTimeout(initContext, 500)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(ctxTimer)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      contextCleanups.forEach(fn => fn())
    }
  }, [])
}
