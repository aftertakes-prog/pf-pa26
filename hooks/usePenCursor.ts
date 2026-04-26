'use client'
import { useEffect } from 'react'

export function usePenCursor() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const pen = document.querySelector<HTMLElement>('.pen-cursor')
    if (!pen) return

    // The pen SVG is 20x60px. Nib tip is at (10, 60) in element space.
    // We rotate -45deg around that point so the tip tracks the cursor exactly.
    const TIP_X = 10
    const TIP_Y = 60

    pen.style.transformOrigin = `${TIP_X}px ${TIP_Y}px`

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      pen.classList.remove('is-hidden')
      pen.classList.add('is-visible')
    }
    const onMouseLeave = () => {
      pen.classList.remove('is-visible')
      pen.classList.add('is-hidden')
    }
    const onMouseEnter = () => {
      pen.classList.remove('is-hidden')
      pen.classList.add('is-visible')
    }

    const tick = () => {
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      // Translate so the tip (TIP_X, TIP_Y) lands at cursor, then rotate around that tip
      pen.style.transform = `translate(${curX - TIP_X}px, ${curY - TIP_Y}px) rotate(-45deg)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    rafId = requestAnimationFrame(tick)

    // Lift pen slightly on interactive elements
    const cleanups: (() => void)[] = []
    const initContext = () => {
      document.querySelectorAll<HTMLElement>('a, button').forEach(el => {
        const enter = () => { pen.classList.add('is-lifted'); pen.classList.remove('is-visible') }
        const leave = () => { pen.classList.remove('is-lifted'); pen.classList.add('is-visible') }
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      })
    }
    const t = setTimeout(initContext, 500)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cleanups.forEach(fn => fn())
    }
  }, [])
}
