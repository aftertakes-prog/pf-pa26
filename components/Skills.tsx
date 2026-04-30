'use client'
import { useEffect, useRef } from 'react'

// ── Item types ────────────────────────────────────────────────────────────────
type PillItem   = { kind: 'pill';   category: string; name: string }
type CircleItem = { kind: 'circle'; symbol: string }
type StarItem   = { kind: 'star';   size: 'sm' | 'md' | 'lg' }

type Item = PillItem | CircleItem | StarItem

const ITEMS: Item[] = [
  // Skill pills
  { kind: 'pill', category: 'Craft',    name: 'UX Writing'          },
  { kind: 'pill', category: 'Craft',    name: 'Brand Voice'         },
  { kind: 'pill', category: 'Craft',    name: 'Microcopy'           },
  { kind: 'pill', category: 'Craft',    name: 'Error States'        },
  { kind: 'pill', category: 'Process',  name: 'Content Audits'      },
  { kind: 'pill', category: 'Process',  name: 'User Research'       },
  { kind: 'pill', category: 'Process',  name: 'A/B Testing'         },
  { kind: 'pill', category: 'Process',  name: 'Content Systems'     },
  { kind: 'pill', category: 'Strategy', name: 'Brand Strategy'      },
  { kind: 'pill', category: 'Strategy', name: 'Messaging Frameworks'},
  { kind: 'pill', category: 'Strategy', name: 'Campaign Writing'    },
  { kind: 'pill', category: 'Tools',    name: 'Figma'               },
  { kind: 'pill', category: 'Tools',    name: 'Notion'              },
  { kind: 'pill', category: 'Tools',    name: 'Maze'                },
  // Stat pills
  { kind: 'pill', category: 'Context',  name: '5 Yrs Experience'    },
  { kind: 'pill', category: 'Context',  name: '50M+ Views'          },
  { kind: 'pill', category: 'Context',  name: 'Delhi · Remote'      },

  // Decorative circles
  { kind: 'circle', symbol: '✦' },
  { kind: 'circle', symbol: '∞' },
  { kind: 'circle', symbol: '→' },
  { kind: 'circle', symbol: '©' },

  // Asterisk / star shapes
  { kind: 'star', size: 'lg' },
  { kind: 'star', size: 'md' },
  { kind: 'star', size: 'sm' },
]

// ── Asterisk SVG ──────────────────────────────────────────────────────────────
function AsteriskSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="4"  width="10" height="92" rx="5" />
      <rect x="45" y="4"  width="10" height="92" rx="5" transform="rotate(45  50 50)" />
      <rect x="45" y="4"  width="10" height="92" rx="5" transform="rotate(90  50 50)" />
      <rect x="45" y="4"  width="10" height="92" rx="5" transform="rotate(135 50 50)" />
    </svg>
  )
}

export default function Skills() {
  const sectionRef  = useRef<HTMLElement>(null)
  const arenaRef    = useRef<HTMLDivElement>(null)
  const itemEls     = useRef<(HTMLDivElement | null)[]>(Array(ITEMS.length).fill(null))
  const dragHintRef = useRef<HTMLDivElement>(null)

  // Section label animation
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

  // Matter.js physics
  useEffect(() => {
    const arena = arenaRef.current
    if (!arena) return

    let dead = false
    let animFrame = 0

    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()
      run()
    }, { threshold: 0.12 })
    observer.observe(arena)

    const run = async () => {
      const M = await import('matter-js')
      if (dead) return

      const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = M

      const W = arena.offsetWidth
      const H = arena.offsetHeight
      const THICK = 80

      const engine = Engine.create({ gravity: { y: 1.5 } })
      const runner = Runner.create()

      // Static boundaries
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + THICK / 2,   W * 2, THICK, { isStatic: true }),
        Bodies.rectangle(-THICK / 2,   H / 2, THICK, H * 3, { isStatic: true }),
        Bodies.rectangle(W + THICK / 2, H / 2, THICK, H * 3, { isStatic: true }),
      ])

      // Create physics body for each item based on its DOM element
      const bodyData: {
        body: ReturnType<typeof Bodies.rectangle>
        el: HTMLDivElement
        hw: number
        hh: number
      }[] = []

      itemEls.current.forEach((el, i) => {
        if (!el) return
        const item = ITEMS[i]
        const w = el.offsetWidth
        const h = el.offsetHeight

        const x = 70 + Math.random() * Math.max(W - 140, 1)
        const y = -70 - i * 52 - Math.random() * 30
        const angle = (Math.random() - 0.5) * 0.6

        const baseProps = {
          restitution: 0.25,
          friction: 0.6,
          frictionAir: 0.016,
          angle,
        }

        let body: ReturnType<typeof Bodies.rectangle>

        if (item.kind === 'pill') {
          body = Bodies.rectangle(x, y, w, h, {
            ...baseProps,
            chamfer: { radius: Math.min(h / 2, 22) },
          })
        } else if (item.kind === 'circle') {
          body = Bodies.circle(x, y, w / 2, {
            ...baseProps,
            restitution: 0.3,
            frictionAir: 0.012,
          }) as ReturnType<typeof Bodies.rectangle>
        } else {
          // star — circular physics body
          body = Bodies.circle(x, y, w / 2, {
            ...baseProps,
            restitution: 0.35,
            frictionAir: 0.01,
            friction: 0.4,
          }) as ReturnType<typeof Bodies.rectangle>
        }

        Composite.add(engine.world, body)
        bodyData.push({ body, el, hw: w / 2, hh: h / 2 })
        el.style.opacity = '1'
      })

      // Mouse drag
      const mouse = Mouse.create(arena)
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.15, damping: 0.1 },
      })
      Composite.add(engine.world, mc)

      // Remove matter-js wheel listener so page scroll still works
      const m = mc.mouse as unknown as Record<string, EventListener>
      mc.mouse.element.removeEventListener('mousewheel', m['mousewheel'])
      mc.mouse.element.removeEventListener('DOMMouseScroll', m['mousewheel'])

      Events.on(mc, 'startdrag', () => {
        if (dragHintRef.current) dragHintRef.current.style.opacity = '0'
      })

      Runner.run(runner, engine)

      const tick = () => {
        if (dead) return
        for (const { body, el, hw, hh } of bodyData) {
          const { x, y } = body.position
          el.style.transform =
            `translate(${Math.round(x - hw)}px, ${Math.round(y - hh)}px) rotate(${body.angle}rad)`
        }
        animFrame = requestAnimationFrame(tick)
      }
      tick()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(arena as any).__matterCleanup = () => {
        Runner.stop(runner)
        Engine.clear(engine)
      }
    }

    return () => {
      dead = true
      observer.disconnect()
      cancelAnimationFrame(animFrame)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cleanup = (arena as any).__matterCleanup as (() => void) | undefined
      cleanup?.()
    }
  }, [])

  return (
    <section className="section" id="skills" ref={sectionRef} style={{ background: 'var(--c-surface)' }}>
      <div className="section__label">
        <div className="section__label-line" />
        <span className="section__label-text">Capabilities</span>
      </div>

      <div className="skills-arena" ref={arenaRef}>
        {ITEMS.map((item, i) => {
          if (item.kind === 'pill') {
            return (
              <div
                key={i}
                className={`skills-pill skills-pill--${item.category.toLowerCase()}`}
                ref={(el: HTMLDivElement | null) => { itemEls.current[i] = el }}
              >
                <span className="skills-pill__cat">{item.category}</span>
                {item.name}
              </div>
            )
          }

          if (item.kind === 'circle') {
            return (
              <div
                key={i}
                className="skills-circle"
                ref={(el: HTMLDivElement | null) => { itemEls.current[i] = el }}
              >
                {item.symbol}
              </div>
            )
          }

          // star
          return (
            <div
              key={i}
              className={`skills-star skills-star--${item.size}`}
              ref={(el: HTMLDivElement | null) => { itemEls.current[i] = el }}
            >
              <AsteriskSVG />
            </div>
          )
        })}

        <div className="skills-drag-hint" ref={dragHintRef}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 11V6a3 3 0 0 0-6 0v5" />
            <path d="M15 11V3a3 3 0 0 0-6 0v8" />
            <path d="M12 11V5a3 3 0 0 0-6 0v9" />
            <path d="M9 19a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9z" />
          </svg>
          <span>drag me</span>
        </div>
      </div>
    </section>
  )
}
