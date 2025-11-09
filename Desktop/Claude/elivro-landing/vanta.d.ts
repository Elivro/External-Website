declare module 'vanta/dist/vanta.clouds.min.js' {
  interface VantaEffect {
    destroy: () => void
  }

  interface VantaOptions {
    el: HTMLElement
    THREE?: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    skyColor?: number
    cloudColor?: number
    cloudShadowColor?: number
    sunColor?: number
    sunGlareColor?: number
    sunlightColor?: number
    speed?: number
  }

  const VANTA: (options: VantaOptions) => VantaEffect

  export default VANTA
}
