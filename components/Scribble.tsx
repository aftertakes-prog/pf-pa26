'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

type Mode = 'steady' | 'unhinged'

interface Blob {
  x: number; y: number
  vx: number; vy: number
  r: number; color: string
  settled: boolean; opacity: number
}

const PEN_COLORS = [
  { label: 'Ink',      value: '#2c1f12' },
  { label: 'Rust',     value: '#eb5939' },
  { label: 'Slate',    value: '#3a6b80' },
  { label: 'Sage',     value: '#5a7a60' },
  { label: 'Marigold', value: '#c4834a' },
]

const PEN_WEIGHTS = [
  { label: 'Hairline', value: 1.5 },
  { label: 'Normal',   value: 3.5 },
  { label: 'Bold',     value: 7 },
]

const HIDDEN_MESSAGES = [
  { line1: 'hi. still here?', line2: 'same energy as copy review at 11pm.' },
]

export default function Scribble() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const ctxRef      = useRef<CanvasRenderingContext2D | null>(null)
  const isDrawing   = useRef(false)
  const pts         = useRef<{ x: number; y: number; t: number }[]>([])
  const blobs       = useRef<Blob[]>([])
  const rafId       = useRef<number>(0)
  const modeRef     = useRef<Mode>('steady')
  const colorRef    = useRef(PEN_COLORS[0].value)
  const weightRef   = useRef(PEN_WEIGHTS[1].value)
  const blobCount   = useRef(0)
  const showRevealRef = useRef(false)

  const [mode, setMode]         = useState<Mode>('steady')
  const [color, setColor]       = useState(PEN_COLORS[0].value)
  const [weight, setWeight]     = useState(PEN_WEIGHTS[1].value)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [showReveal, setShowReveal] = useState(false)
  const [easterEgg, setEasterEgg]   = useState<string | null>(null)

  // Keep refs in sync with state
  useEffect(() => { modeRef.current = mode }, [mode])
  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { weightRef.current = weight }, [weight])

  const triggerEasterEgg = useCallback((msg: string) => {
    setEasterEgg(msg)
    setTimeout(() => setEasterEgg(null), 4000)
  }, [])

  // --- Canvas setup (runs once) ---
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')!
    ctxRef.current = ctx

    const resize = () => {
      canvas.width  = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const getPos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect()
      if ('touches' in e) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top, t: Date.now() }
      return { x: (e as MouseEvent).clientX - r.left, y: (e as MouseEvent).clientY - r.top, t: Date.now() }
    }

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      isDrawing.current = true
      pts.current = [getPos(e)]
      setHasDrawn(true)
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return
      const p = getPos(e)

      if (modeRef.current === 'unhinged') {
        // Repel blobs near cursor
        blobs.current.forEach(b => {
          const dx = b.x - p.x; const dy = b.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 70 && dist > 0) {
            const f = (70 - dist) / 70 * 12
            b.vx += (dx / dist) * f
            b.vy += (dy / dist) * f - 1.5
            b.settled = false
          }
        })
        // Spawn blobs from drawing
        const prev = pts.current[pts.current.length - 1]
        if (prev) {
          const dx = p.x - prev.x; const dy = p.y - prev.y
          if (Math.sqrt(dx*dx + dy*dy) > 6) {
            blobs.current.push({
              x: p.x, y: p.y,
              vx: dx * 0.25 + (Math.random() - 0.5) * 3,
              vy: dy * 0.25 - Math.random() * 2.5,
              r: weightRef.current * 1.6 + Math.random() * 5,
              color: colorRef.current,
              settled: false,
              opacity: 0.7 + Math.random() * 0.3,
            })
            blobCount.current++
            // Easter egg at 80 blobs
            if (blobCount.current === 80) {
              triggerEasterEgg("okay... you're kind of obsessed with this")
            }
            // Reveal hint at 45 blobs
            if (blobCount.current === 45 && !showRevealRef.current) {
              showRevealRef.current = true
              setShowReveal(true)
            }
          }
        }
        pts.current = [p]
        return
      }

      // Steady mode: smooth variable-weight bezier
      pts.current.push(p)
      const arr = pts.current
      if (arr.length < 3) return
      const i = arr.length - 2
      const dt = Math.max(arr[i].t - arr[i-1].t, 1)
      const vdx = arr[i].x - arr[i-1].x; const vdy = arr[i].y - arr[i-1].y
      const speed = Math.sqrt(vdx*vdx + vdy*vdy) / dt
      const lw = weightRef.current * Math.max(0.4, Math.min(1.6, 1.6 - speed * 6))
      ctx.lineWidth = lw
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.strokeStyle = colorRef.current
      ctx.globalAlpha = 0.88
      const mid = { x: (arr[i].x + arr[i+1].x)/2, y: (arr[i].y + arr[i+1].y)/2 }
      const prevMid = { x: (arr[i-1].x + arr[i].x)/2, y: (arr[i-1].y + arr[i].y)/2 }
      ctx.beginPath()
      ctx.moveTo(prevMid.x, prevMid.y)
      ctx.quadraticCurveTo(arr[i].x, arr[i].y, mid.x, mid.y)
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    const onUp = () => { isDrawing.current = false; pts.current = [] }

    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', onDown, { passive: false })
    canvas.addEventListener('touchmove', onMove, { passive: false })
    canvas.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove', onMove)
      canvas.removeEventListener('touchend', onUp)
    }
  }, [triggerEasterEgg])

  // --- Animation loop for Unhinged mode ---
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    if (mode !== 'unhinged') {
      cancelAnimationFrame(rafId.current)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      blobs.current = []
      blobCount.current = 0
      showRevealRef.current = false
      setHasDrawn(false)
      setShowReveal(false)
      return
    }

    // Clear ink drawing and start physics
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    blobs.current = []
    blobCount.current = 0

    const GRAVITY = 0.38
    const BOUNCE  = 0.25

    const { line1, line2 } = HIDDEN_MESSAGES[0]

    const drawMessage = () => {
      ctx.save()
      ctx.globalAlpha = 0.065
      ctx.fillStyle = '#2c1f12'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `600 ${Math.min(canvas.width * 0.055, 56)}px 'Caveat', cursive`
      ctx.fillText(line1, canvas.width / 2, canvas.height * 0.4)
      ctx.font = `600 ${Math.min(canvas.width * 0.032, 30)}px 'Caveat', cursive`
      ctx.fillText(line2, canvas.width / 2, canvas.height * 0.54)
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawMessage()

      blobs.current.forEach(b => {
        if (!b.settled) {
          b.vy += GRAVITY
          b.x  += b.vx
          b.y  += b.vy
          b.vx *= 0.985
          if (b.y + b.r >= canvas.height) {
            b.y = canvas.height - b.r
            b.vy *= -BOUNCE
            b.vx *= 0.88
            if (Math.abs(b.vy) < 0.9 && Math.abs(b.vx) < 0.4) {
              b.settled = true; b.vy = 0; b.vx = 0
            }
          }
          if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.4 }
          if (b.x + b.r > canvas.width) { b.x = canvas.width - b.r; b.vx = -Math.abs(b.vx) * 0.4 }
        }
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.globalAlpha = b.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      rafId.current = requestAnimationFrame(tick)
    }
    tick()

    return () => cancelAnimationFrame(rafId.current)
  }, [mode])

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    blobs.current = []
    blobCount.current = 0
    showRevealRef.current = false
    setHasDrawn(false)
    setShowReveal(false)
    if (mode === 'unhinged') {
      triggerEasterEgg('you found it. it was here the whole time.')
    }
  }

  return (
    <section className="scribble-section" ref={containerRef}>
      <div className={`scribble__prompt${hasDrawn ? ' is-faded' : ''}`}>
        <span className="scribble__label">Scribble here</span>
        <span className="scribble__hint">
          {mode === 'steady' ? 'click and drag to write' : 'draw something. watch what happens.'}
        </span>
      </div>

      <canvas ref={canvasRef} className="scribble__canvas" />

      {showReveal && (
        <div className="scribble__reveal-hint">
          drag your cursor over the blobs — something is hiding underneath
        </div>
      )}

      {easterEgg && (
        <div className="scribble__easter-egg">{easterEgg}</div>
      )}

      {/* Footer overlay */}
      <div className="scribble__footer" aria-hidden="true">
        <span className="scribble__footer-copy">© 2026 Pooja Koundal</span>
        <span className="scribble__footer-copy">UX Writer · Brand Strategist · Gurgaon, India</span>
      </div>

      {/* Controls */}
      <div className="scribble__controls">
        {/* Mode toggle */}
        <div className="scribble__mode-toggle">
          <button
            className={`scribble__mode-btn${mode === 'steady' ? ' is-active' : ''}`}
            onClick={() => setMode('steady')}
          >
            Steady
          </button>
          <button
            className={`scribble__mode-btn${mode === 'unhinged' ? ' is-active' : ''}`}
            onClick={() => setMode('unhinged')}
          >
            Unhinged
          </button>
        </div>

        {/* Divider */}
        <span style={{ width: '1px', height: '1.2rem', background: 'rgba(139,119,96,0.25)', flexShrink: 0 }} />

        {/* Color swatches */}
        <div className="scribble__colors">
          {PEN_COLORS.map(c => (
            <button
              key={c.value}
              className={`scribble__color-swatch${color === c.value ? ' is-active' : ''}`}
              style={{ background: c.value }}
              onClick={() => setColor(c.value)}
              aria-label={c.label}
              title={c.label}
            />
          ))}
        </div>

        {/* Divider */}
        <span style={{ width: '1px', height: '1.2rem', background: 'rgba(139,119,96,0.25)', flexShrink: 0 }} />

        {/* Weight buttons */}
        <div className="scribble__weights">
          {PEN_WEIGHTS.map(w => (
            <button
              key={w.value}
              className={`scribble__weight-btn${weight === w.value ? ' is-active' : ''}`}
              onClick={() => setWeight(w.value)}
              aria-label={w.label}
              title={w.label}
            >
              <span style={{
                width: `${Math.min(w.value * 2, 12)}px`,
                height: `${Math.min(w.value * 2, 12)}px`,
                background: color,
                borderRadius: '50%',
                display: 'block',
              }} />
            </button>
          ))}
        </div>

        {hasDrawn && (
          <>
            <span style={{ width: '1px', height: '1.2rem', background: 'rgba(139,119,96,0.25)', flexShrink: 0 }} />
            <button className="scribble__clear" onClick={clear}>Clear</button>
          </>
        )}
      </div>
    </section>
  )
}
