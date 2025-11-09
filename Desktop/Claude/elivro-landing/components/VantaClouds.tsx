'use client'

import { useEffect, useRef, useState } from 'react'

interface VantaCloudsProps {
  children: React.ReactNode
}

export default function VantaClouds({ children }: VantaCloudsProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    // Only load on desktop for performance
    if (typeof window === 'undefined' || window.innerWidth < 1024) {
      return
    }

    let isMounted = true
    let VANTA: any
    let THREE: any
    let effect: any = null

    const loadVanta = async () => {
      try {
        // Dynamically import Three.js and Vanta
        THREE = await import('three')
        const VantaModule = await import('vanta/dist/vanta.clouds.min.js')
        VANTA = VantaModule.default

        // Check if component is still mounted and ref is available
        if (!isMounted || !vantaRef.current) return

        // Initialize Vanta Clouds
        effect = VANTA({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          backgroundColor: 0xffffff,    // White background
          skyColor: 0x68b8d7,           // Light blue sky
          cloudColor: 0xadc1de,         // Soft cloud blue/gray
          cloudShadowColor: 0x183550,   // Dark blue shadow
          sunColor: 0xff9919,           // Warm orange sun
          sunGlareColor: 0xff6633,      // Bright orange glare
          sunlightColor: 0xff9933,      // Golden orange light
          speed: 1.0,                   // Natural cloud movement
        })

        if (isMounted) {
          setVantaEffect(effect)
        }
      } catch (error) {
        console.error('Failed to load Vanta:', error)
      }
    }

    loadVanta()

    // Cleanup
    return () => {
      isMounted = false
      if (effect) {
        effect.destroy()
      }
    }
  }, [])

  return (
    <div ref={vantaRef} className="w-full h-full relative pointer-events-none">
      {children}
    </div>
  )
}
