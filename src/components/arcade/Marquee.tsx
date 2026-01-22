'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MarqueeProps {
  texts: string[];
  speed?: number;
  className?: string;
}

export default function Marquee({ texts, speed = 20, className = '' }: MarqueeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={`relative overflow-hidden bg-black/80 border-4 border-yellow-400 rounded-lg ${className}`}>
      {/* Decorative lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-around py-1">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: ['#ff0000', '#ffff00', '#00ff00', '#ff0000'],
              boxShadow: [
                '0 0 5px #ff0000',
                '0 0 10px #ffff00',
                '0 0 5px #00ff00',
                '0 0 5px #ff0000'
              ]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </div>

      {/* Main marquee text */}
      <div className="py-4 px-6 mt-4">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span 
            className="font-arcade text-lg md:text-xl text-yellow-400"
            style={{
              textShadow: `
                0 0 10px rgba(255, 255, 0, 0.8),
                0 0 20px rgba(255, 255, 0, 0.6),
                0 0 30px rgba(255, 255, 0, 0.4)
              `
            }}
          >
            {texts[currentIndex]}
          </span>
        </motion.div>
      </div>

      {/* Scrolling background stars */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
}
