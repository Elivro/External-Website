'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ScrollThread — a narrative thread that visits every italic emphasis
 * word in the page's section headings.
 *
 * The path is constructed from the actual document positions of every
 * `<em>` inside `section h1, section h2`. As the reader scrolls, a
 * blurred ember bead rides the curve. When the bead approaches an
 * italic word, it merges into it (scales up, fades out). The word
 * receives a `.thread-touched` class — CSS transitions its color to
 * `--accent`, where it remains. Past the word, the bead reappears and
 * carries on toward the next emphasis.
 *
 * Once an anchor is touched, it stays touched for the session. The
 * system has marked the word; scrolling back doesn't undo that.
 *
 * Visual subtlety: there is no drawn line — only a single 6px halo at
 * 2.5% alpha + 5px CSS blur. It reads as a faint warm trace along the
 * route, not a thread. With `mix-blend-mode: plus-lighter`, the trace
 * dies into highlights instead of cutting across them. The bead is the
 * only crisp element on the route.
 *
 * Hidden below `lg`. Off under prefers-reduced-motion (the strand
 * stays etched, the bead doesn't render, words are never auto-touched).
 *
 * Pondus: the system reads along with you. It does not announce. It
 * only notices — and what it notices, it marks.
 */

// h1/h2 italics are the spine; `data-thread-anchor` opts a non-heading italic
// in (e.g. the LogoStrip blockquote) so the path threads through it instead of
// cutting across whatever sits beside it in the same row.
const ANCHOR_SELECTOR = 'section :is(h1, h2) em, section em[data-thread-anchor]'
const TOUCHED_CLASS = 'thread-touched'

const MERGE_RADIUS_PX = 100   // path-distance window for merge fade
const MERGE_SCALE_BOOST = 0.6 // bead grows up to 1.6x as it absorbs into a word
const IDLE_HIDE_MS = 1500
const FADE_IN_MS = 320
const FADE_OUT_MS = 900

/* Arrival — special-cased final approach to the LAST anchor (the closing CTA
   italic). The bead's whole journey ends there; rather than briefly merging
   like every other anchor, it ramps over a much longer document-y distance,
   blooms far larger, and stays absorbed past the anchor (no reappearance —
   the thread has reached its destination). The CTA halo reads
   `--thread-arrival` on <html> to bloom in sync.

   Source is viewport-center y, not bead displayLen — this decouples the
   ramp from the bead's stick state, so scrolling back up to the top of the
   page restores arrival=0 even though the bead is frozen at the anchor. */
const ARRIVAL_RAMP_DOC_PX = 700   // viewport-center distance over which bead/halo ramp 0→1
const ARRIVAL_SCALE_BOOST = 8     // peak bead scale ≈ 9× (vs 1.6× for normal merge)
const ARRIVAL_VAR = '--thread-arrival'

/* Smoothing — bead lerps toward scroll target with frame-rate-independent
   damping. Higher damping = snappier; lower = lazier. 6.5 ≈ 150ms timescale,
   which feels like the bead is gently catching up rather than tied 1:1 to
   scroll. */
const LERP_DAMPING = 6.5
const SETTLED_THRESHOLD_PX = 0.5

/* When the bead first crosses an anchor, displayLen is snapped to that
   anchor and held until viewport-center has scrolled STICK_DOC_DISTANCE_PX
   past it. Scroll-gated rather than time-gated: if the reader stops, the
   bead stays absorbed; only active scroll past the word releases it.
   While stuck, the merge math sees distOnPath = 0 → mergeAmount = 1 →
   opacity = 0 (bead invisible at the word). After release, lerp resumes
   and the bead reappears as it leaves the merge zone. */
const STICK_DOC_DISTANCE_PX = 350

const EMBER = 'rgb(210, 88, 68)'
const EMBER_BRIGHT = 'rgb(226, 110, 91)'
const EMBER_HOT = 'rgb(255, 184, 158)'

type Pt = { x: number; y: number }
type Anchor = { el: HTMLElement; x: number; y: number; lengthOnPath: number }

/**
 * Catmull-Rom-to-Bezier conversion. Builds a smooth cubic-bezier path
 * passing through every point in `pts`. Tension `t = 0.18` keeps the
 * curve gentle — high enough to feel alive, low enough not to overshoot
 * when adjacent anchors are far apart horizontally.
 */
function buildPathThrough(pts: Pt[]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? pts[i + 1]
    const t = 0.18
    const c1x = p1.x + (p2.x - p0.x) * t
    const c1y = p1.y + (p2.y - p0.y) * t
    const c2x = p2.x - (p3.x - p1.x) * t
    const c2y = p2.y - (p3.y - p1.y) * t
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

/**
 * Binary search: given a sorted-by-y list of (y, length) samples, find the
 * path-length where the path's y is closest to `targetY`. Linear-interpolate
 * between adjacent samples for sub-sample precision.
 */
function lengthAtY(
  targetY: number,
  samples: { y: number; length: number }[]
): number {
  if (samples.length === 0) return 0
  if (targetY <= samples[0].y) return samples[0].length
  if (targetY >= samples[samples.length - 1].y) {
    return samples[samples.length - 1].length
  }
  let lo = 0
  let hi = samples.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (samples[mid].y < targetY) lo = mid + 1
    else hi = mid
  }
  // `lo` is the first sample with y >= targetY. Interpolate between lo-1 and lo.
  const a = samples[lo - 1]
  const b = samples[lo]
  if (b.y === a.y) return b.length
  const t = (targetY - a.y) / (b.y - a.y)
  return a.length + (b.length - a.length) * t
}

function collectAnchorElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR))
    .filter((el) => {
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    })
}

function elementCenter(el: HTMLElement): Pt {
  const r = el.getBoundingClientRect()
  return {
    x: r.left + r.width / 2 + window.scrollX,
    y: r.top + r.height / 2 + window.scrollY,
  }
}

export default function ScrollThread() {
  const pathRef = useRef<SVGPathElement>(null)
  const beadInnerRef = useRef<SVGGElement>(null)
  const rafRef = useRef<number>(0)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const anchorsRef = useRef<Anchor[]>([])
  const totalLengthRef = useRef<number>(0)
  const touchedRef = useRef<Set<HTMLElement>>(new Set())

  // y→length lookup table. Sampling the path on mount lets us, per frame,
  // find the path-length whose y matches viewport center — which is what
  // keeps the bead vertically centered as the user scrolls.
  const ySamplesRef = useRef<{ y: number; length: number }[]>([])

  // Smoothing + stick state. All lives in refs so the rAF loop reads/writes
  // without triggering React re-renders.
  const displayLenRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)
  // While viewport-center is below this document-y, the bead is held at the
  // most recently crossed anchor. -Infinity = not currently stuck.
  const stickReleaseDocYRef = useRef<number>(-Infinity)

  const [docHeight, setDocHeight] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [pathD, setPathD] = useState('')
  const [reduced, setReduced] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  // Reduced-motion preference.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Measure dimensions, collect anchors, build path. Re-runs on resize and
  // any body-size change (lazy images, font swaps, accordions).
  useEffect(() => {
    if (typeof window === 'undefined') return

    const measure = () => {
      const w = window.innerWidth
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )

      const els = collectAnchorElements()
      const anchorPts: Pt[] = els
        .map(elementCenter)
        .sort((a, b) => a.y - b.y)

      // Frame the curve with explicit entry/exit points so the strand
      // reaches all the way from page top to page bottom even if the
      // first/last italics are far inside the document.
      const entryX = anchorPts[0]?.x ?? w * 0.58
      const exitX = anchorPts[anchorPts.length - 1]?.x ?? w * 0.58

      // Insert alternating-side "swing" points between consecutive anchors
      // so the path arcs further out toward the viewport edges. Three gates:
      //   1. yDiff < 700 → no swing (sections are too close vertically;
      //      a swing would have to bend hard and look like a hairpin).
      //   2. xDiff already wide (anchors spread on their own) → swing
      //      magnitude tapers so we don't pile curvature on top of curvature.
      //   3. Resulting magnitude must be > 50px to be worth adding.
      // baseSwing reduced from w*0.36 → w*0.18 — visibly more restrained.
      const swungAnchors: Pt[] = []
      for (let i = 0; i < anchorPts.length; i++) {
        swungAnchors.push(anchorPts[i])
        const next = anchorPts[i + 1]
        if (!next) continue
        const a = anchorPts[i]
        const yDiff = Math.abs(next.y - a.y)
        if (yDiff < 700) continue
        const xDiff = Math.abs(next.x - a.x)
        const baseSwing = w * 0.18
        const taper = Math.max(0, baseSwing - xDiff * 0.5)
        if (taper < 50) continue
        const midY = a.y + (next.y - a.y) * 0.5
        const midX = (a.x + next.x) / 2
        const sideSign = i % 2 === 0 ? -1 : 1
        const rawSwing = midX + sideSign * taper
        const clamped = Math.max(w * 0.08, Math.min(w * 0.92, rawSwing))
        swungAnchors.push({ x: clamped, y: midY })
      }

      const framed: Pt[] = [
        { x: entryX, y: 0 },
        ...swungAnchors,
        { x: exitX, y: h },
      ]
      const newD = buildPathThrough(framed)

      setViewportWidth((prev) => (prev === w ? prev : w))
      setDocHeight((prev) => (prev === h ? prev : h))
      setPathD((prev) => (prev === newD ? prev : newD))
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // After path renders, sample to find the path-length at which each
  // anchor sits. This is what lets us compute "bead-distance to anchor"
  // along the curve (rather than euclidean), which is what makes the
  // merge-fade feel like the bead is genuinely arriving at a word.
  useEffect(() => {
    if (!pathD) return
    const path = pathRef.current
    if (!path) return

    let totalLength = 0
    try {
      totalLength = path.getTotalLength()
    } catch {
      return
    }
    if (!totalLength || !Number.isFinite(totalLength)) return
    totalLengthRef.current = totalLength

    // Build y→length lookup: sample 800 points along the path and store
    // (y, length) pairs sorted by y for fast binary-search later. The path
    // is built so y is essentially monotonic (anchors sorted ascending),
    // but the sort is cheap insurance against minor curve reversals.
    {
      const SAMPLES = 800
      const ySamples: { y: number; length: number }[] = []
      for (let i = 0; i <= SAMPLES; i++) {
        const L = (i / SAMPLES) * totalLength
        const pt = path.getPointAtLength(L)
        ySamples.push({ y: pt.y, length: L })
      }
      ySamples.sort((a, b) => a.y - b.y)
      ySamplesRef.current = ySamples
    }

    const els = collectAnchorElements()
    const anchors: Anchor[] = []
    const samples = 1000
    for (const el of els) {
      const center = elementCenter(el)
      let bestL = 0
      let bestD = Infinity
      // Coarse-then-fine would be faster, but with ~12 anchors × 1000
      // samples we're at 12k getPointAtLength calls, each ~1µs — totals
      // around 12ms. Acceptable as a one-shot on path-change.
      for (let i = 0; i <= samples; i++) {
        const L = (i / samples) * totalLength
        const pt = path.getPointAtLength(L)
        const d = Math.hypot(pt.x - center.x, pt.y - center.y)
        if (d < bestD) {
          bestD = d
          bestL = L
        }
      }
      anchors.push({ el, x: center.x, y: center.y, lengthOnPath: bestL })
    }
    anchors.sort((a, b) => a.lengthOnPath - b.lengthOnPath)
    anchorsRef.current = anchors

    // Pre-highlight the first anchor (the hero italic). It's the brand's
    // signature word on the page; the page should land already showing it
    // ember rather than waiting for a scroll. We add it to touchedRef so
    // the bead glides past on first scroll without snapping/sticking.
    const first = anchors[0]
    if (first) {
      touchedRef.current.add(first.el)
      first.el.classList.add(TOUCHED_CLASS)
    }
  }, [pathD])

  // Self-perpetuating rAF loop: lerps displayLen toward scroll target with
  // damped smoothing, sticks at anchors until viewport-center has scrolled
  // past them, marks anchors touched on first crossing. The loop runs while
  // there's motion (lerping or stuck) and parks itself when settled — the
  // next scroll wakes it back up.
  useEffect(() => {
    if (reduced) return
    if (!pathD) return

    const path = pathRef.current
    const beadInner = beadInnerRef.current
    if (!path || !beadInner) return

    // On path rebuild (resize), snap displayLen to the current scroll target
    // so we don't lerp through a stale frame's worth of position. Target is
    // the path-length whose y matches viewport center.
    {
      const samples = ySamplesRef.current
      if (samples.length > 0) {
        const targetY = window.scrollY + window.innerHeight / 2
        displayLenRef.current = lengthAtY(targetY, samples)
      }
    }

    const tick = (now: number) => {
      const totalLength = totalLengthRef.current
      if (!totalLength) {
        rafRef.current = 0
        return
      }

      // Target = path-length whose y equals viewport-center document-y.
      // This is what keeps the bead vertically centered in the viewport
      // and aligns "bead reaches anchor" with "anchor passes viewport center."
      const samples = ySamplesRef.current
      const viewportCenterY = window.scrollY + window.innerHeight / 2
      const targetLen = samples.length > 0
        ? lengthAtY(viewportCenterY, samples)
        : 0

      let displayLen = displayLenRef.current
      const lastTick = lastTickRef.current
      const dt = lastTick > 0 ? Math.min(0.05, (now - lastTick) / 1000) : 0
      lastTickRef.current = now

      const touched = touchedRef.current
      let needsAnotherFrame = false

      // Stick is gated by scroll-distance, not time. Bead stays held as
      // long as viewport-center is still within STICK_DOC_DISTANCE_PX of
      // the anchor it last visited. If the reader stops, the bead stays
      // absorbed indefinitely; only active scroll past the word releases it.
      if (viewportCenterY < stickReleaseDocYRef.current) {
        // Held at the anchor. No frame is strictly needed (no animation
        // running), but we keep ticking so we can release promptly when
        // the reader resumes scrolling.
        needsAnotherFrame = true
      } else {
        // Damped lerp toward target. Frame-rate-independent: blend factor
        // is derived from elapsed seconds and a damping constant.
        const blend = dt > 0 ? 1 - Math.exp(-LERP_DAMPING * dt) : 0
        displayLen = displayLen + (targetLen - displayLen) * blend

        // Detect anchor crossings. We only stick on the FIRST crossing of
        // each anchor. After that, the bead glides through.
        for (const a of anchorsRef.current) {
          if (displayLen >= a.lengthOnPath && !touched.has(a.el)) {
            touched.add(a.el)
            a.el.classList.add(TOUCHED_CLASS)
            // Snap exactly to the anchor and arm the scroll-distance gate.
            displayLen = a.lengthOnPath
            stickReleaseDocYRef.current = a.y + STICK_DOC_DISTANCE_PX
            needsAnotherFrame = true
            break
          }
        }

        if (!needsAnotherFrame) {
          // Keep ticking while we're still settling toward target.
          if (Math.abs(targetLen - displayLen) > SETTLED_THRESHOLD_PX) {
            needsAnotherFrame = true
          } else {
            displayLen = targetLen
          }
        }
      }

      displayLenRef.current = displayLen

      // Merge math: how close are we to ANY anchor along the path? When
      // stuck, distOnPath = 0 → mergeAmount = 1 → bead opacity = 0.
      const anchors = anchorsRef.current
      const lastAnchor = anchors.length >= 2 ? anchors[anchors.length - 1] : null
      let mergeAmount = 0
      for (const a of anchors) {
        // The last anchor uses the arrival ramp instead of the regular
        // brief-merge — skip it here so the two systems don't double up.
        if (a === lastAnchor) continue
        const distOnPath = Math.abs(displayLen - a.lengthOnPath)
        if (distOnPath < MERGE_RADIUS_PX) {
          const t = 1 - distOnPath / MERGE_RADIUS_PX
          const eased = t * t * (3 - 2 * t) // smoothstep
          if (eased > mergeAmount) mergeAmount = eased
        }
      }

      // Arrival math: smoothstep ramp over ARRIVAL_RAMP_DOC_PX of viewport-
      // center distance before reaching the last anchor's y; stays at 1 once
      // the viewport is at or past it. Drives both the bead's bloom-and-
      // dissolve and the CTA halo's bloom (CSS var). Tied to viewport (not
      // bead displayLen) so scrolling back up correctly retracts arrival
      // even though the bead remains stuck at the anchor.
      let arrivalAmount = 0
      if (lastAnchor) {
        const distYBefore = lastAnchor.y - viewportCenterY
        if (distYBefore <= 0) {
          arrivalAmount = 1
        } else if (distYBefore < ARRIVAL_RAMP_DOC_PX) {
          const t = 1 - distYBefore / ARRIVAL_RAMP_DOC_PX
          arrivalAmount = t * t * (3 - 2 * t)
        }
      }

      try {
        const pt = path.getPointAtLength(displayLen)
        // Scale combines normal merge boost (small, brief) and arrival boost
        // (large, sustained). Opacity is 1 minus whichever fade is stronger.
        const scale =
          1 +
          mergeAmount * MERGE_SCALE_BOOST +
          arrivalAmount * ARRIVAL_SCALE_BOOST
        const fade = Math.max(mergeAmount, arrivalAmount)
        beadInner.setAttribute(
          'transform',
          `translate(${pt.x} ${pt.y}) scale(${scale.toFixed(3)})`
        )
        beadInner.style.opacity = (1 - fade).toFixed(3)
      } catch {
        /* path detached during a re-render — next tick recovers */
      }

      // Publish arrival to CSS so the closing CTA halo can bloom in sync.
      // Updated every frame the loop runs; settles when the bead settles.
      document.documentElement.style.setProperty(
        ARRIVAL_VAR,
        arrivalAmount.toFixed(3)
      )

      if (needsAnotherFrame) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = 0
        lastTickRef.current = 0
      }
    }

    const onScroll = () => {
      // Outer fade gate (CSS transition on parent <g>).
      setScrolling(true)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        setScrolling(false)
      }, IDLE_HIDE_MS)

      // Wake the loop if it's parked.
      if (!rafRef.current) {
        lastTickRef.current = 0
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    // Kick once to put the bead at the right initial position.
    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      // Don't leave a stale arrival value on <html> if we unmount or rebuild.
      document.documentElement.style.removeProperty(ARRIVAL_VAR)
    }
  }, [pathD, reduced])

  if (!pathD || viewportWidth === 0) return null

  const beadFadeMs = scrolling ? FADE_IN_MS : FADE_OUT_MS

  return (
    <svg
      aria-hidden="true"
      width={viewportWidth}
      height={docHeight}
      viewBox={`0 0 ${viewportWidth} ${docHeight}`}
      preserveAspectRatio="none"
      className="hidden lg:block absolute top-0 left-0 pointer-events-none"
      style={{
        zIndex: 1,
        mixBlendMode: 'plus-lighter',
      }}
    >
      <defs>
        <radialGradient id="thread-bead-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={EMBER_HOT} stopOpacity="0.85" />
          <stop offset="0.4" stopColor={EMBER_BRIGHT} stopOpacity="0.4" />
          <stop offset="1" stopColor={EMBER} stopOpacity="0" />
        </radialGradient>

        <filter
          id="thread-bead-blur"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/*
        TRACE hidden — the path renders nothing, but it stays in the DOM
        so getTotalLength + getPointAtLength still work for the bead.
        Re-enable a visible stroke (or restore the prior halo block) if
        the bead-only mode feels too disconnected.
      */}
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="none"
      />

      {/*
        BEAD — two-layer opacity: outer group handles idle scroll-activity
        fade (CSS transition), inner group handles merge fade (inline,
        immediate, no transition — tracks scroll position in real time).
      */}
      {!reduced && (
        <g
          style={{
            opacity: scrolling ? 1 : 0,
            transition: `opacity ${beadFadeMs}ms cubic-bezier(0.2, 0.7, 0.2, 1)`,
            willChange: 'opacity',
          }}
        >
          <g
            ref={beadInnerRef}
            style={{ willChange: 'transform, opacity' }}
          >
            <circle
              r="18"
              fill="url(#thread-bead-fill)"
              filter="url(#thread-bead-blur)"
              opacity="0.4"
            />
            <circle
              r="6"
              fill="url(#thread-bead-fill)"
              opacity="0.55"
            />
            <circle
              r="1.5"
              fill={EMBER_HOT}
              opacity="0.85"
            />
          </g>
        </g>
      )}
    </svg>
  )
}
