'use client'
import { useEffect } from 'react'

export function useCursorSwitch() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const kite = document.querySelector<HTMLElement>('.kite-cursor')
    const pen  = document.querySelector<HTMLElement>('.pen-cursor')
    if (!kite || !pen) return

    // Nib tip is at (3, 3) in the 24×36 SVG scaled to 32×48 — rendered tip = 4px from edge
    const KITE_W = 4
    const KITE_H = 4
    // Pen tip is at (10, 60), rotate -45deg around it
    const PEN_TIP_X = 10
    const PEN_TIP_Y = 60
    pen.style.transformOrigin = `${PEN_TIP_X}px ${PEN_TIP_Y}px`

    let mouseX = 0, mouseY = 0
    let kiteX  = 0, kiteY  = 0
    let penX   = 0, penY   = 0
    let inScribble = false
    let rafId: number

    const tick = () => {
      if (inScribble) {
        penX  += (mouseX - penX)  * 0.25
        penY  += (mouseY - penY)  * 0.25
        pen.style.transform = `translate(${penX - PEN_TIP_X}px, ${penY - PEN_TIP_Y}px) rotate(-45deg)`
      } else {
        kiteX += (mouseX - kiteX) * 0.85
        kiteY += (mouseY - kiteY) * 0.85
        kite.style.transform = `translate(${kiteX - KITE_W}px, ${kiteY - KITE_H}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (!inScribble) {
        kite.classList.remove('is-hidden'); kite.classList.add('is-visible')
      }
    }
    const onMouseLeave = () => {
      kite.classList.remove('is-visible'); kite.classList.add('is-hidden')
      pen.classList.remove('is-visible');  pen.classList.add('is-hidden')
    }
    const onMouseEnter = () => {
      if (!inScribble) {
        kite.classList.remove('is-hidden'); kite.classList.add('is-visible')
      } else {
        pen.classList.remove('is-hidden'); pen.classList.add('is-visible')
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    rafId = requestAnimationFrame(tick)

    // Show kite immediately so it's visible on first interaction
    kite.classList.add('is-visible')

    // Delay context setup — ensures full DOM (including Scribble at bottom) is ready
    let scribble: Element | null = null
    const onScribbleEnter = () => {
      inScribble = true
      kite.classList.remove('is-visible'); kite.classList.add('is-hidden')
      penX = mouseX; penY = mouseY
      pen.classList.remove('is-hidden', 'is-lifted'); pen.classList.add('is-visible')
    }
    const onScribbleLeave = () => {
      inScribble = false
      pen.classList.remove('is-visible'); pen.classList.add('is-hidden')
      kiteX = mouseX; kiteY = mouseY
      kite.classList.remove('is-hidden'); kite.classList.add('is-visible')
    }

    const cleanups: (() => void)[] = []
    const t = setTimeout(() => {
      // Attach scribble section cursor swap
      scribble = document.querySelector('.scribble-section')
      if (scribble) {
        scribble.addEventListener('mouseenter', onScribbleEnter)
        scribble.addEventListener('mouseleave', onScribbleLeave)
      }
      // Lift kite on interactive elements
      document.querySelectorAll<HTMLElement>('a, button').forEach(el => {
        const enter = () => {
          if (!inScribble) {
            kite.classList.add('is-lifted'); kite.classList.remove('is-visible')
          }
        }
        const leave = () => {
          if (!inScribble) {
            kite.classList.remove('is-lifted'); kite.classList.add('is-visible')
          }
        }
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      })
    }, 600)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (scribble) {
        scribble.removeEventListener('mouseenter', onScribbleEnter)
        scribble.removeEventListener('mouseleave', onScribbleLeave)
      }
      cleanups.forEach(fn => fn())
    }
  }, [])
}
