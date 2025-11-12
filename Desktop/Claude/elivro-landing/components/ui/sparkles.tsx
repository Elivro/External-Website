"use client";
import React, { useCallback, useEffect, useState } from "react";
import type { Container, Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id = "tsparticles",
    className,
    background = "transparent",
    minSize = 0.6,
    maxSize = 1.4,
    speed = 1,
    particleColor = "#FFFFFF",
    particleDensity = 100,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticlesEngine = async (engine: Engine) => {
      await loadSlim(engine);
    };

    initParticlesEngine(window.tsParticles)
      .then(() => {
        setInit(true);
      })
      .catch((error) => {
        // Graceful degradation - continue without particles if they fail to load
        console.error('Failed to initialize particles:', error);
        setInit(true); // Allow page to continue rendering
      });
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log("Particles loaded", container);
      }
    },
    []
  );

  return (
    <Particles
      id={id}
      className={cn("h-full w-full", className)}
      particlesLoaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: background,
          },
        },
        fullScreen: {
          enable: false,
          zIndex: 0,
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: true as any,
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          move: {
            enable: true,
            speed: speed,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          number: {
            value: particleDensity,
            density: {
              enable: true,
            },
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: minSize, max: maxSize },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
