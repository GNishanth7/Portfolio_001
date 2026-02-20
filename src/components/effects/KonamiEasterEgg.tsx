'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/hooks/useKonamiCode';

interface ConfettiPiece {
  id: number;
  color: string;
  left: string;
  drift: number;
  rotate: number;
  duration: number;
  delay: number;
}

const confettiPalette = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0066'];
const confettiPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  color: confettiPalette[i % confettiPalette.length],
  left: `${(i * 17) % 100}%`,
  drift: ((i % 11) - 5) * 18,
  rotate: ((i * 73) % 720) + 45,
  duration: 2 + (i % 4) * 0.45,
  delay: (i % 6) * 0.08,
}));

export default function KonamiEasterEgg() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [score, setScore] = useState(0);

  const { reset } = useKonamiCode(() => {
    setShowEasterEgg(true);
    setScore(prev => prev + 30);
  });

  useEffect(() => {
    if (showEasterEgg) {
      const timer = setTimeout(() => {
        setShowEasterEgg(false);
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showEasterEgg, reset]);

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowEasterEgg(false)}
        >
          {/* Confetti/Pixel explosion */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-3 h-3"
                style={{
                  backgroundColor: piece.color,
                  left: piece.left,
                  top: '-20px'
                }}
                animate={{
                  y: ['0vh', '120vh'],
                  x: [0, piece.drift],
                  rotate: [0, piece.rotate],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeIn'
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  '0 0 20px #00ffff',
                  '0 0 40px #ff00ff',
                  '0 0 20px #00ffff'
                ]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-6xl md:text-8xl mb-6"
            >
              🎮
            </motion.div>
            
            <motion.h2
              className="font-arcade text-2xl md:text-4xl text-yellow-400 mb-4"
              animate={{ 
                textShadow: [
                  '0 0 10px #ffff00',
                  '0 0 30px #ffff00',
                  '0 0 10px #ffff00'
                ]
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              CHEAT CODE ACTIVATED!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <p className="font-arcade text-lg text-cyan-400">
                +30 BONUS POINTS!
              </p>
              
              <div className="flex justify-center gap-2">
                <span className="font-arcade text-sm text-gray-400">TOTAL SCORE:</span>
                <motion.span
                  className="font-arcade text-sm text-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {score}
                </motion.span>
              </div>

              <p className="font-readable text-gray-500 text-sm mt-6">
                You found the secret! Click anywhere to close
              </p>
            </motion.div>

            {/* Achievement badge */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 
                border border-yellow-500/50 rounded-lg px-6 py-3"
            >
              <span className="text-3xl">🏆</span>
              <div className="text-left">
                <p className="font-arcade text-xs text-yellow-400">ACHIEVEMENT UNLOCKED</p>
                <p className="font-readable text-sm text-gray-300">Retro Gamer</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
