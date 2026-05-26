'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Users, ShieldCheck, Check } from 'lucide-react'

/**
 * HeroLiveFeed — auto-cycling Canvas2D demo of the system noticing,
 * working, and completing tasks across three Elivro domains:
 * schemaläggning, rekrytering, ledningssystem.
 *
 * The canvas runs an ambient generative system (drifting dots,
 * listening arcs, particles) and surfaces a real HTML signal overlay
 * with each suggestion. State machine cycles continuously — no user
 * interaction needed.
 *
 * Reads `--accent` from CSS so canvas drawing matches the brand color.
 *
 * Reduced motion: serves a single static composition with the first
 * suggestion frozen. No rAF loop, no timers.
 */

type Phase = 'ambient' | 'surfacing' | 'showing' | 'working' | 'complete' | 'transitioning'

type Suggestion = {
  domain: 'schemalaggning' | 'rekrytering' | 'ledningssystem'
  label: string
  text: string
  reasoning: string
  working: string
  complete: string
}

const SUGGESTIONS: Suggestion[] = [
  {
    domain: 'schemalaggning',
    label: 'Schemaläggning',
    text: 'Anna har sjukanmält sig torsdag 15:00.',
    reasoning: 'Elin matchar 94% — samma brukare, liknande pass, lika erfarenhet.',
    working: 'Söker tillgängliga ersättare och kontrollerar kompetens',
    complete: 'Elin schemalagd torsdag 15:00 · meddelande skickat',
  },
  {
    domain: 'rekrytering',
    label: 'Rekrytering',
    text: 'Tre nya ansökningar matchar helgpassprofilen.',
    reasoning: 'Linda främst — 92% match på erfarenhet, tillgänglighet och referenser.',
    working: 'Granskar ansökningar och förbereder första intervjuer',
    complete: '3 kandidater rangordnade · intervjuer föreslagna',
  },
  {
    domain: 'ledningssystem',
    label: 'Ledningssystem',
    text: 'Avvikelse rapporterad hos Margareta.',
    reasoning: 'Utebliven medicinering 14:00 — föreslår uppföljning och riskbedömning.',
    working: 'Sammanställer underlag och kontrollerar mot rutinerna',
    complete: 'Riskbedömning öppnad · ansvarig tilldelad',
  },
]

// Lucide icons earn their place here by carrying differentiating
// information — which domain Liv is working on. Strokewidth held to 1.4
// to match the Obsidian primitive language.
const DomainIcon = ({ name }: { name: Suggestion['domain'] }) => {
  const common = { size: 14, strokeWidth: 1.4, 'aria-hidden': true } as const
  if (name === 'schemalaggning') return <Calendar {...common} />
  if (name === 'rekrytering') return <Users {...common} />
  return <ShieldCheck {...common} />
}

export default function HeroLiveFeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<Phase>('ambient')
  const [idx, setIdx] = useState(0)

  // Refs for the imperative canvas system, so React renders don't
  // recreate the world on every state change.
  const phaseRef = useRef<Phase>('ambient')
  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // --- Read --accent from CSS ---
    const cs = getComputedStyle(document.documentElement)
    const hex = cs.getPropertyValue('--accent').trim().replace('#', '') || 'ff7a45'
    const AR = parseInt(hex.slice(0, 2), 16)
    const AG = parseInt(hex.slice(2, 4), 16)
    const AB = parseInt(hex.slice(4, 6), 16)
    const accentRGB = `${AR}, ${AG}, ${AB}`

    // --- Sizing ---
    let W = 0
    let H = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      W = r.width
      H = r.height
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const EDGE_MARGIN = 36
    const edgeFade = (x: number, y: number) => {
      const d = Math.min(x, y, W - x, H - y)
      return clamp(d / EDGE_MARGIN, 0, 1)
    }

    // --- Element classes ---

    class Particle {
      x = rand(0, W)
      y = rand(0, H)
      vx = rand(-0.06, 0.06)
      vy = rand(-0.04, 0.04)
      life = rand(8000, 18000)
      age = 0
      r = rand(0.4, 1)
      update(dt: number) {
        this.age += dt
        this.x += this.vx * dt * 0.06
        this.y += this.vy * dt * 0.06
        if (this.age > this.life) return false
        if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) return false
        return true
      }
      draw(c: CanvasRenderingContext2D) {
        const t = this.age / this.life
        const fade = Math.sin(t * Math.PI)
        const edge = edgeFade(this.x, this.y)
        c.fillStyle = `rgba(${accentRGB}, ${0.18 * fade * edge})`
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        c.fill()
      }
    }

    class Dot {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      maxLife: number
      age = 0
      fadeIn = 800
      fadeOut = 1200
      focus: boolean
      permanent: boolean
      breathOffset: number
      constructor(
        x: number,
        y: number,
        opts: { vx?: number; vy?: number; r?: number; life?: number; focus?: boolean; permanent?: boolean } = {}
      ) {
        this.x = x
        this.y = y
        this.vx = opts.vx ?? rand(-0.025, 0.025)
        this.vy = opts.vy ?? rand(-0.015, 0.015)
        this.r = opts.r ?? rand(2, 3)
        this.maxLife = opts.life ?? rand(6000, 12000)
        this.focus = !!opts.focus
        this.permanent = !!opts.permanent
        this.breathOffset = rand(0, Math.PI * 2)
      }
      update(dt: number) {
        this.age += dt
        this.x += this.vx * dt * 0.06
        this.y += this.vy * dt * 0.06
        if (!this.permanent && this.age > this.maxLife) return false
        return true
      }
      opacity() {
        const breath = 0.6 + 0.4 * Math.sin((performance.now() / 3200) * Math.PI * 2 + this.breathOffset)
        const edge = edgeFade(this.x, this.y)
        if (this.permanent) {
          return (0.7 + 0.3 * Math.sin((performance.now() / 3200) * Math.PI * 2 + this.breathOffset)) * edge
        }
        let o = 1
        if (this.age < this.fadeIn) o = this.age / this.fadeIn
        else if (this.age > this.maxLife - this.fadeOut) o = (this.maxLife - this.age) / this.fadeOut
        return clamp(o, 0, 1) * breath * edge
      }
      draw(c: CanvasRenderingContext2D) {
        const o = this.opacity()
        c.fillStyle = `rgba(${accentRGB}, ${o * (this.focus ? 1 : 0.8)})`
        c.beginPath()
        c.arc(this.x, this.y, this.r * (this.focus ? 1.3 : 1), 0, Math.PI * 2)
        c.fill()
        if (this.focus) {
          c.strokeStyle = `rgba(${accentRGB}, ${o * 0.5})`
          c.lineWidth = 1
          c.beginPath()
          c.arc(this.x, this.y, this.r * 2.4, 0, Math.PI * 2)
          c.stroke()
        }
      }
    }

    class ListeningArc {
      x: number
      y: number
      r: number
      age = 0
      life = 2400
      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.r = rand(20, 30)
      }
      update(dt: number) {
        this.age += dt
        return this.age < this.life
      }
      draw(c: CanvasRenderingContext2D) {
        const t = this.age / this.life
        const o = Math.sin(t * Math.PI)
        c.strokeStyle = `rgba(${accentRGB}, ${o * 0.7})`
        c.lineWidth = 1.2
        c.lineCap = 'round'
        c.beginPath()
        c.arc(this.x, this.y, this.r, Math.PI, 0, false)
        c.stroke()
      }
    }

    class Connection {
      from: Dot
      to: Dot
      age = 0
      drawDur: number
      holdDur: number
      fadeDur: number
      curve: number
      constructor(from: Dot, to: Dot, opts: { drawDur?: number; holdDur?: number; fadeDur?: number; curve?: number } = {}) {
        this.from = from
        this.to = to
        this.drawDur = opts.drawDur ?? 600
        this.holdDur = opts.holdDur ?? 1200
        this.fadeDur = opts.fadeDur ?? 600
        this.curve = opts.curve ?? 0
      }
      update(dt: number) {
        this.age += dt
        return this.age < this.drawDur + this.holdDur + this.fadeDur
      }
      draw(c: CanvasRenderingContext2D) {
        const a = this.age
        const drawT = clamp(a / this.drawDur, 0, 1)
        let opacity = 1
        if (a > this.drawDur + this.holdDur) opacity = 1 - (a - this.drawDur - this.holdDur) / this.fadeDur
        const fx = this.from.x
        const fy = this.from.y
        const tx = this.to.x
        const ty = this.to.y
        const ex = lerp(fx, tx, easeOutCubic(drawT))
        const ey = lerp(fy, ty, easeOutCubic(drawT))
        c.strokeStyle = `rgba(${accentRGB}, ${opacity * 0.55})`
        c.lineWidth = 0.9
        c.lineCap = 'round'
        c.beginPath()
        c.moveTo(fx, fy)
        if (this.curve !== 0) {
          const mx = (fx + ex) / 2 + this.curve
          const my = (fy + ey) / 2 + this.curve
          c.quadraticCurveTo(mx, my, ex, ey)
        } else {
          c.lineTo(ex, ey)
        }
        c.stroke()
      }
    }

    class RadialPulse {
      x: number
      y: number
      age = 0
      life: number
      maxR: number
      constructor(x: number, y: number, opts: { life?: number; maxR?: number } = {}) {
        this.x = x
        this.y = y
        this.life = opts.life ?? 1800
        this.maxR = opts.maxR ?? 60
      }
      update(dt: number) {
        this.age += dt
        return this.age < this.life
      }
      draw(c: CanvasRenderingContext2D) {
        const t = this.age / this.life
        const r = lerp(4, this.maxR, easeOutCubic(t))
        const o = Math.pow(1 - t, 1.5)
        c.strokeStyle = `rgba(${accentRGB}, ${o * 0.6})`
        c.lineWidth = 1
        c.beginPath()
        c.arc(this.x, this.y, r, 0, Math.PI * 2)
        c.stroke()
      }
    }

    class PartialOrbit {
      x: number
      y: number
      r: number
      age = 0
      life: number
      startAngle: number
      spread = Math.PI * 0.7
      constructor(x: number, y: number, opts: { r?: number; life?: number } = {}) {
        this.x = x
        this.y = y
        this.r = opts.r ?? 24
        this.life = opts.life ?? 2400
        this.startAngle = rand(0, Math.PI * 2)
      }
      update(dt: number) {
        this.age += dt
        this.startAngle += dt * 0.0024
        return this.age < this.life
      }
      draw(c: CanvasRenderingContext2D) {
        const t = this.age / this.life
        const o = Math.sin(t * Math.PI)
        c.strokeStyle = `rgba(${accentRGB}, ${o * 0.7})`
        c.lineWidth = 1.2
        c.lineCap = 'round'
        c.beginPath()
        c.arc(this.x, this.y, this.r, this.startAngle, this.startAngle + this.spread)
        c.stroke()
      }
    }

    // --- World state ---

    const particles: Particle[] = []
    const dots: Dot[] = []
    const arcs: ListeningArc[] = []
    const connections: Connection[] = []
    const pulses: RadialPulse[] = []
    const orbits: PartialOrbit[] = []

    let focus: Dot | null = null
    let stateTimer = 0
    let nextSurfaceAt = rand(3500, 5500)
    let suggestionIndex = 0

    const timers: ReturnType<typeof setTimeout>[] = []
    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms))
    }

    const setLocalPhase = (p: Phase) => {
      phaseRef.current = p
      setPhase(p)
    }

    // --- State transitions ---

    const surfaceSuggestion = () => {
      if (phaseRef.current !== 'ambient') return
      setLocalPhase('surfacing')
      stateTimer = 0

      const fx = rand(W * 0.35, W * 0.65)
      const fy = rand(H * 0.22, H * 0.38)
      focus = new Dot(fx, fy, {
        vx: rand(-0.005, 0.005),
        vy: rand(-0.003, 0.003),
        r: 3,
        focus: true,
        permanent: true,
      })
      dots.push(focus)

      for (let i = 0; i < 3; i++) {
        const angle = rand(0, Math.PI * 2)
        const dist = rand(40, 70)
        dots.push(
          new Dot(fx + Math.cos(angle) * dist, fy + Math.sin(angle) * dist, {
            vx: rand(-0.015, 0.015),
            vy: rand(-0.008, 0.008),
            r: rand(1.5, 2.2),
            life: 14000,
          })
        )
      }

      arcs.push(new ListeningArc(fx, fy))

      later(() => {
        if (phaseRef.current === 'surfacing') {
          setLocalPhase('showing')
        }
      }, 700)

      later(() => {
        transitionToWorking()
      }, 4400)
    }

    const transitionToWorking = () => {
      if (phaseRef.current !== 'showing' && phaseRef.current !== 'surfacing') return
      setLocalPhase('working')

      if (!focus) return
      const fx = focus.x
      const fy = focus.y

      ;[0, 600, 1200].forEach((d) =>
        later(() => {
          if (phaseRef.current === 'working') pulses.push(new RadialPulse(fx, fy, { life: 1600, maxR: 80 }))
        }, d)
      )

      later(() => {
        if (phaseRef.current === 'working') orbits.push(new PartialOrbit(fx, fy, { r: 28, life: 2200 }))
      }, 200)
      later(() => {
        if (phaseRef.current === 'working') orbits.push(new PartialOrbit(fx, fy, { r: 44, life: 2000 }))
      }, 500)

      later(() => {
        if (phaseRef.current !== 'working' || !focus) return
        const others = dots.filter((d) => d !== focus && !d.permanent).slice(0, 4)
        others.forEach((d, i) =>
          later(() => {
            if (phaseRef.current === 'working' && focus) {
              connections.push(
                new Connection(focus, d, {
                  drawDur: 500,
                  holdDur: 800,
                  fadeDur: 500,
                  curve: rand(-8, 8),
                })
              )
            }
          }, i * 180)
        )
      }, 400)

      later(() => transitionToComplete(), 2800)
    }

    const transitionToComplete = () => {
      if (phaseRef.current !== 'working') return
      setLocalPhase('complete')

      if (focus) pulses.push(new RadialPulse(focus.x, focus.y, { life: 1400, maxR: 50 }))

      later(() => returnToAmbient(), 2400)
    }

    const returnToAmbient = () => {
      setLocalPhase('transitioning')

      later(() => {
        stateTimer = 0
        nextSurfaceAt = rand(4500, 7500)
        if (focus) {
          focus.permanent = false
          focus.maxLife = focus.age + 1500
          focus.fadeOut = 1200
          focus = null
        }
        suggestionIndex++
        setIdx(suggestionIndex)
        setLocalPhase('ambient')
      }, 700)
    }

    // --- Spawn helpers ---

    const spawnParticle = () => {
      if (particles.length < 14) particles.push(new Particle())
    }
    const spawnAmbientDot = () => {
      if (dots.length > 8) return
      const inset = EDGE_MARGIN + 20
      const x = rand(inset, W - inset)
      const y = rand(H * 0.28, H * 0.62)
      dots.push(
        new Dot(x, y, {
          vx: rand(-0.025, 0.025),
          vy: rand(-0.012, 0.012),
          r: rand(1.8, 2.6),
        })
      )
    }
    const spawnAmbientArc = () => {
      if (dots.length === 0) return
      const d = dots[Math.floor(Math.random() * dots.length)]
      if (d.permanent || d.age < 1500 || d.age > 6000) return
      arcs.push(new ListeningArc(d.x, d.y))
    }

    // --- Reduced motion: static frame, no loop ---
    if (reducedMotion) {
      const fx = W * 0.5
      const fy = H * 0.32
      ctx.fillStyle = `rgba(${accentRGB}, 0.7)`
      ;[
        [fx - 60, fy + 40],
        [fx + 50, fy + 30],
        [fx, fy + 60],
      ].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.fillStyle = `rgba(${accentRGB}, 1)`
      ctx.beginPath()
      ctx.arc(fx, fy, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = `rgba(${accentRGB}, 0.7)`
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(fx, fy, 24, Math.PI, 0, false)
      ctx.stroke()

      setLocalPhase('showing')

      return () => {
        window.removeEventListener('resize', resize)
      }
    }

    // --- Main loop ---

    let last = performance.now()
    let pAcc = 0
    let dAcc = 0
    let aAcc = 0
    let rafId = 0

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      stateTimer += dt

      pAcc += dt
      dAcc += dt
      aAcc += dt
      if (pAcc > rand(800, 1400)) {
        spawnParticle()
        pAcc = 0
      }

      if (phaseRef.current === 'ambient') {
        if (dAcc > rand(1800, 3200)) {
          spawnAmbientDot()
          dAcc = 0
        }
        if (aAcc > rand(3500, 6000)) {
          spawnAmbientArc()
          aAcc = 0
        }
        if (stateTimer > nextSurfaceAt) surfaceSuggestion()
      }

      for (let i = particles.length - 1; i >= 0; i--) if (!particles[i].update(dt)) particles.splice(i, 1)
      for (let i = dots.length - 1; i >= 0; i--) if (!dots[i].update(dt)) dots.splice(i, 1)
      for (let i = arcs.length - 1; i >= 0; i--) if (!arcs[i].update(dt)) arcs.splice(i, 1)
      for (let i = connections.length - 1; i >= 0; i--) if (!connections[i].update(dt)) connections.splice(i, 1)
      for (let i = pulses.length - 1; i >= 0; i--) if (!pulses[i].update(dt)) pulses.splice(i, 1)
      for (let i = orbits.length - 1; i >= 0; i--) if (!orbits[i].update(dt)) orbits.splice(i, 1)

      ctx.clearRect(0, 0, W, H)

      particles.forEach((p) => p.draw(ctx))
      pulses.forEach((p) => p.draw(ctx))
      orbits.forEach((o) => o.draw(ctx))
      connections.forEach((c) => c.draw(ctx))
      arcs.forEach((a) => a.draw(ctx))
      dots.forEach((d) => d.draw(ctx))

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      timers.forEach((t) => clearTimeout(t))
      window.removeEventListener('resize', resize)
    }
  }, [])

  const sug = SUGGESTIONS[idx % SUGGESTIONS.length]
  const overlayVisible = phase !== 'ambient' && phase !== 'transitioning'
  const showStatus = phase === 'working' || phase === 'complete'
  const isPending = phase === 'showing' || phase === 'surfacing'
  const ease = 'cubic-bezier(0.2, 0.7, 0.2, 1)'

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />

      {/* Floating signal overlay — pure typography on canvas, no card chrome */}
      <div
        className="absolute inset-x-0 bottom-0 px-7 pb-3 pt-5 pointer-events-none z-[2]"
        role="region"
        aria-live="polite"
      >
        {/* Top row: domain stays put across all phases. A status badge
            slides in beside it for working / complete. */}
        <div className="flex items-center gap-3 mb-4 min-h-[16px]">
          <p
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-accent"
            style={{
              opacity: overlayVisible ? 1 : 0,
              transform: overlayVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 600ms ${ease}, transform 600ms ${ease}`,
            }}
          >
            <DomainIcon name={sug.domain} />
            <span>{sug.label}</span>
          </p>

          {/* Separator dot — only visible alongside status */}
          <span
            className="font-mono text-fg-muted text-[10px]"
            aria-hidden="true"
            style={{
              opacity: showStatus ? 1 : 0,
              transition: `opacity 400ms ${ease}`,
            }}
          >
            ·
          </span>

          {/* Status badge: working ⇄ complete cross-fade in the same slot */}
          <div className="relative inline-block min-w-[110px] h-[16px]">
            <p
              className="absolute left-0 top-0 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-accent whitespace-nowrap"
              style={{
                opacity: phase === 'working' ? 1 : 0,
                transform: phase === 'working' ? 'translateY(0)' : 'translateY(2px)',
                transition: `opacity 500ms ${ease}, transform 500ms ${ease}`,
              }}
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-accent"
                style={{ animation: 'livBreath 3.2s ease-in-out infinite' }}
              />
              <span>Liv arbetar</span>
            </p>

            <p
              className="absolute left-0 top-0 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-accent whitespace-nowrap"
              style={{
                opacity: phase === 'complete' ? 1 : 0,
                transform: phase === 'complete' ? 'translateY(0)' : 'translateY(2px)',
                transition: `opacity 500ms ${ease}, transform 500ms ${ease}`,
              }}
            >
              <Check size={12} strokeWidth={2} aria-hidden="true" />
              <span>Klart</span>
            </p>
          </div>
        </div>

        {/* Main message — three options stacked, only the active phase shows.
            Cross-fade with translateY creates a soft "transformation" between
            task → working → complete instead of three separate lines. */}
        <div className="relative min-h-[80px] mb-3 max-w-[40ch]">
          <p
            className="absolute inset-0 m-0 font-serif italic text-[19px] leading-[1.3] text-fg"
            style={{
              opacity: isPending ? 1 : 0,
              transform: isPending ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 700ms ${ease} 100ms, transform 700ms ${ease} 100ms`,
            }}
          >
            {sug.text}
          </p>

          <p
            className="absolute inset-0 m-0 font-serif italic text-[19px] leading-[1.3] text-fg"
            style={{
              opacity: phase === 'working' ? 1 : 0,
              transform: phase === 'working' ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 700ms ${ease}, transform 700ms ${ease}`,
            }}
          >
            {sug.working}…
          </p>

          <p
            className="absolute inset-0 m-0 font-serif italic text-[19px] leading-[1.3] text-fg"
            style={{
              opacity: phase === 'complete' ? 1 : 0,
              transform: phase === 'complete' ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 700ms ${ease}, transform 700ms ${ease}`,
            }}
          >
            {sug.complete}
          </p>
        </div>

        {/* Context line — reasoning during pending, dimmed task during
            working / complete (so the original ask stays visible as
            context for what Liv is operating on). */}
        <div className="relative min-h-[44px] max-w-[42ch] text-[13px] leading-[1.55]">
          <p
            className="absolute inset-0 m-0 text-fg-muted"
            style={{
              opacity: isPending ? 1 : 0,
              transform: isPending ? 'translateY(0)' : 'translateY(4px)',
              transition: `opacity 500ms ${ease}, transform 500ms ${ease}`,
            }}
          >
            {sug.reasoning}
          </p>

          <p
            className="absolute inset-0 m-0 text-fg-dim"
            style={{
              opacity: showStatus ? 1 : 0,
              transition: `opacity 500ms ${ease}`,
            }}
          >
            {sug.text}
          </p>
        </div>
      </div>
    </div>
  )
}
