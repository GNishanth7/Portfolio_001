'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CRTScreenProps {
  children: ReactNode;
  className?: string;
  flickerIntensity?: 'low' | 'medium' | 'high';
  showScanlines?: boolean;
}

export default function CRTScreen({ 
  children, 
  className = '', 
  flickerIntensity = 'low',
  showScanlines = true 
}: CRTScreenProps) {
  const flickerOpacity = {
    low: [1, 0.98, 1, 0.99, 1],
    medium: [1, 0.95, 1, 0.97, 1],
    high: [1, 0.9, 1, 0.93, 1]
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      animate={{
        opacity: flickerOpacity[flickerIntensity]
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatType: 'loop',
        times: [0, 0.2, 0.4, 0.6, 1]
      }}
    >
      {/* CRT curved edge effect */}
      <div className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          boxShadow: `
            inset 0 0 100px rgba(0, 0, 0, 0.5),
            inset 0 0 50px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 255, 255, 0.3),
            0 0 40px rgba(0, 255, 255, 0.1)
          `
        }}
      />
      
      {/* Scanlines overlay */}
      {showScanlines && (
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`
          }}
        />
      )}

      {/* Screen content */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.4) 100%
          )`
        }}
      />

      {/* RGB shift effect on edges */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-20"
        style={{
          background: `
            linear-gradient(90deg, 
              rgba(255, 0, 0, 0.1) 0%, 
              transparent 5%, 
              transparent 95%, 
              rgba(0, 0, 255, 0.1) 100%
            )
          `
        }}
      />
    </motion.div>
  );
}
