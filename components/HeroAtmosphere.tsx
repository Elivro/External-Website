'use client'

import { useEffect, useRef } from 'react'

/**
 * HeroAtmosphere — WebGL fragment shader providing slow, organic warm
 * depth behind the hero. Replaces the static radial-gradient halo.
 *
 * Reads `--accent` from CSS so any future color change in globals.css
 * automatically updates the shader. Falls back silently to whatever
 * sits behind the canvas if WebGL is unavailable (a faint CSS gradient
 * is rendered separately in Hero.tsx as a safety net).
 *
 * Reduced motion: renders one frame statically, no animation loop.
 */
export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const gl =
      (cv.getContext('webgl2', { alpha: true, premultipliedAlpha: false }) as WebGL2RenderingContext | null) ||
      (cv.getContext('webgl', { alpha: true, premultipliedAlpha: false }) as WebGLRenderingContext | null)
    if (!gl) return

    // --- Read --accent from CSS so the shader follows the design system ---
    const cs = getComputedStyle(document.documentElement)
    const hex = cs.getPropertyValue('--accent').trim().replace('#', '') || 'ff7a45'
    const AR = parseInt(hex.slice(0, 2), 16) / 255
    const AG = parseInt(hex.slice(2, 4), 16) / 255
    const AB = parseInt(hex.slice(4, 6), 16) / 255

    const vsSrc = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = (aPos + 1.0) * 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `

    // FBM-noise warm field. Two slowly drifting "regions" emerge and
    // dissolve, modulated by multi-octave noise so they're never visible
    // discs. Soft vignette pulls corners darker for atmospheric depth.
    const fsSrc = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2  uRes;
      uniform vec3  uAccent;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
                   mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int k = 0; k < 5; k++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        vec2 auv = uv;
        auv.x *= uRes.x / uRes.y;

        float t = uTime * 0.018;

        vec2 c1 = vec2(0.82 + sin(t * 0.7) * 0.20, 0.42 + cos(t * 0.5) * 0.16);
        vec2 c2 = vec2(0.30 + cos(t * 0.4) * 0.18, 0.74 + sin(t * 0.6) * 0.13);

        float d1 = distance(auv, c1);
        float d2 = distance(auv, c2);

        float field = smoothstep(1.30, 0.0, d1) * 0.85 +
                      smoothstep(1.45, 0.0, d2) * 0.55;

        float n_slow = fbm(uv * 1.5 + vec2(t * 0.45, t * 0.25));
        float n_med  = fbm(uv * 3.6 + vec2(-t * 0.20, t * 0.35));

        // Warmth EMERGES where slow noise crosses a threshold, dissolves
        // below — no visible disc shapes ever crystallize.
        float emerge = smoothstep(0.38, 0.72, n_slow);
        float warmth = field * emerge;

        vec2 vc = vec2(uRes.x / uRes.y * 0.5, 0.5);
        float vig = smoothstep(1.45, 0.45, length(auv - vc));

        float haze = n_med * 0.05;

        float i = (warmth + haze) * vig;

        vec3 col = uAccent * i * 0.42;
        gl_FragColor = vec4(col, i * 0.62);
      }
    `

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)
      if (!sh) return null
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null
      return sh
    }

    const vs = compile(gl.VERTEX_SHADER, vsSrc)
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uAccent = gl.getUniformLocation(prog, 'uAccent')

    let aW = 0
    let aH = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      const r = cv.getBoundingClientRect()
      aW = Math.max(1, Math.floor(r.width * dpr))
      aH = Math.max(1, Math.floor(r.height * dpr))
      cv.width = aW
      cv.height = aH
      gl.viewport(0, 0, aW, aH)
    }
    resize()
    window.addEventListener('resize', resize)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let rafId = 0
    // Pre-warm the clock by a large random offset so the noise field is
    // already in a "clouds visible" state on first paint. Random so each
    // refresh shows a different slice of the drift instead of the same one.
    const t0 = performance.now() - (60000 + Math.random() * 240000)
    const render = () => {
      const t = (performance.now() - t0) / 1000
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, aW, aH)
      gl.uniform3f(uAccent, AR, AG, AB)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (!reducedMotion) rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      gl.deleteBuffer(buf)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteProgram(prog)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
