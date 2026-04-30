'use client'
import { useEffect, useRef } from 'react'

type Pill = { category: string; name: string }

// ── Four tracks — distributed evenly, grouped by theme ───────────────────────
const TRACKS: { pills: Pill[]; dir: 1 | -1; duration: number }[] = [
  {
    dir: -1,          // scrolls left
    duration: 42,
    pills: [
      { category: 'Craft',   name: 'UX Writing'             },
      { category: 'Craft',   name: 'Brand Voice'            },
      { category: 'Craft',   name: 'Microcopy'              },
      { category: 'Craft',   name: 'Error States'           },
      { category: 'Craft',   name: 'Conversion Copywriting' },
      { category: 'Craft',   name: 'Tone of Voice Systems'  },
      { category: 'Craft',   name: 'Creative Direction'     },
      { category: 'Craft',   name: 'Conceptualisation'      },
      { category: 'Context', name: '5 Yrs Experience'       },
    ],
  },
  {
    dir: 1,           // scrolls right
    duration: 38,
    pills: [
      { category: 'Strategy', name: 'Brand Strategy'         },
      { category: 'Strategy', name: 'Messaging Frameworks'   },
      { category: 'Strategy', name: 'Campaign Writing'       },
      { category: 'Strategy', name: 'Positioning & Messaging'},
      { category: 'Strategy', name: 'Go-to-Market Copy'      },
      { category: 'Strategy', name: 'Competitive Analysis'   },
      { category: 'Strategy', name: 'Product Thinking'       },
      { category: 'Context',  name: '50M+ Views'             },
    ],
  },
  {
    dir: -1,          // scrolls left
    duration: 46,
    pills: [
      { category: 'Process', name: 'Content Audits'                },
      { category: 'Process', name: 'User Research'                 },
      { category: 'Process', name: 'A/B Testing'                   },
      { category: 'Process', name: 'Content Systems'               },
      { category: 'Process', name: 'Design Systems Collaboration'  },
      { category: 'Process', name: 'Sprint-based Workflows'        },
      { category: 'Process', name: 'Cross-functional Storytelling' },
      { category: 'Process', name: 'Stakeholder Communication'     },
    ],
  },
  {
    dir: 1,           // scrolls right
    duration: 36,
    pills: [
      { category: 'Tools',   name: 'Figma'                  },
      { category: 'Tools',   name: 'Notion'                 },
      { category: 'Tools',   name: 'Maze'                   },
      { category: 'Tools',   name: 'Framer'                 },
      { category: 'Tools',   name: 'Claude / GPT Prompting' },
      { category: 'Tools',   name: 'Confluence'             },
      { category: 'Context', name: 'Delhi · Remote'         },
    ],
  },
]

export default function Skills() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRefs   = useRef<(HTMLDivElement | null)[]>([])

  // Section label reveal
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

  // Infinite marquee — each track loops by animating x ±50% of doubled content
  useEffect(() => {
    let tweens: { pause: () => void; resume: () => void; kill: () => void }[] = []

    const init = async () => {
      const { gsap } = await import('gsap')

      trackRefs.current.forEach((track, i) => {
        if (!track) return
        const { dir, duration } = TRACKS[i]

        // leftward: 0 → -50% | rightward: start at -50%, go to 0
        const fromX = dir === -1 ? '0%'   : '-50%'
        const toX   = dir === -1 ? '-50%' : '0%'

        gsap.set(track, { x: fromX })
        const tween = gsap.to(track, {
          x: toX,
          duration,
          ease: 'none',
          repeat: -1,
        })

        tweens.push(tween)

        // Pause on hover for readability
        const wrap = track.parentElement
        if (wrap) {
          wrap.addEventListener('mouseenter', () => tween.pause())
          wrap.addEventListener('mouseleave', () => tween.resume())
        }
      })
    }

    init()
    return () => { tweens.forEach(t => t.kill()) }
  }, [])

  return (
    <section className="section" id="skills" ref={sectionRef} style={{ background: 'var(--c-surface)' }}>
      <div className="section__label">
        <div className="section__label-line" />
        <span className="section__label-text">Capabilities</span>
      </div>

      <div className="skills-tracks">
        {TRACKS.map((track, ti) => (
          <div key={ti} className="skills-track-wrap">
            <div
              className="skills-track"
              ref={(el: HTMLDivElement | null) => { trackRefs.current[ti] = el }}
            >
              {/* Content doubled — second copy makes the loop seamless */}
              {[...track.pills, ...track.pills].map((pill, j) => (
                <div
                  key={j}
                  className={`skills-pill skills-pill--${pill.category.toLowerCase()}`}
                  aria-hidden={j >= track.pills.length ? 'true' : undefined}
                >
                  <span className="skills-pill__cat">{pill.category} ·</span>
                  {pill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
