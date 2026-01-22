'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CRTScreen from '@/components/arcade/CRTScreen';
import ArcadeButton from '@/components/arcade/ArcadeButton';
import Marquee from '@/components/arcade/Marquee';
import LoadingBar from '@/components/arcade/LoadingBar';
import { useAudio } from '@/hooks/useAudio';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

type GameState = 'idle' | 'inserting' | 'loading' | 'ready';

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [coinInserted, setCoinInserted] = useState(false);
  const router = useRouter();
  const { playSound } = useAudio();

  const marqueeTexts = [
    "★ DATA SCIENCE MASTER ★",
    "⚡ AI/ML ENGINEER ⚡",
    "🎮 QUANTUM COMPUTING EXPLORER 🎮",
    "✨ DISTRIBUTED SYSTEMS ARCHITECT ✨",
    "🚀 TRINITY COLLEGE DUBLIN 🚀"
  ];

  const handleInsertCoin = () => {
    if (gameState !== 'idle') return;
    
    playSound('coin');
    setCoinInserted(true);
    setGameState('inserting');
    
    // Simulate coin insertion animation
    setTimeout(() => {
      setGameState('loading');
    }, 1000);
  };

  const handleLoadComplete = () => {
    setGameState('ready');
    playSound('start');
  };

  const handleStart = () => {
    playSound('confirm');
    router.push('/select');
  };

  // Keyboard navigation
  useKeyboardNavigation({
    Enter: () => {
      if (gameState === 'idle') handleInsertCoin();
      else if (gameState === 'ready') handleStart();
    },
    Space: () => {
      if (gameState === 'idle') handleInsertCoin();
      else if (gameState === 'ready') handleStart();
    }
  });

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      {/* Arcade Cabinet Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        {/* Marquee */}
        <Marquee texts={marqueeTexts} className="mb-6" />

        {/* Main Screen */}
        <div className="glass-card p-8 md:p-12">
          <div className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {gameState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-8"
                >
                  {/* Title */}
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <h1 
                      className="font-arcade text-3xl md:text-5xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                      NISHANTH
                    </h1>
                    <h2 className="font-arcade text-xl md:text-3xl text-yellow-400 mt-2" style={{ textShadow: '0 0 20px rgba(255, 255, 0, 0.5)' }}>
                      GOPINATH
                    </h2>
                  </motion.div>

                  <motion.p
                    className="font-readable text-lg md:text-xl text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Data Scientist & AI Engineer
                  </motion.p>

                  {/* Pixel Art Decoration */}
                  <div className="flex justify-center gap-3">
                    {['🎮', '💻', '🤖', '📊', '⭐'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-3xl md:text-4xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: Infinity, 
                          delay: i * 0.1,
                          repeatDelay: 1
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>

                  {/* Insert Coin Button */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <ArcadeButton
                      onClick={handleInsertCoin}
                      variant="primary"
                      size="lg"
                      glowing
                    >
                      INSERT COIN
                    </ArcadeButton>
                  </motion.div>

                  <motion.p
                    className="font-readable text-sm text-gray-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Press Enter or Space to start
                  </motion.p>
                </motion.div>
              )}

              {gameState === 'inserting' && (
                <motion.div
                  key="inserting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  {/* Coin animation */}
                  <motion.div
                    initial={{ y: -100, opacity: 1 }}
                    animate={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeIn' }}
                    className="text-6xl"
                  >
                    🪙
                  </motion.div>
                  <motion.p
                    className="font-arcade text-yellow-400 text-lg mt-4"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    COIN INSERTED!
                  </motion.p>
                </motion.div>
              )}

              {gameState === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <LoadingBar
                    text="INITIALIZING SYSTEMS"
                    duration={2.5}
                    onComplete={handleLoadComplete}
                  />
                </motion.div>
              )}

              {gameState === 'ready' && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-8"
                >
                  <motion.h2
                    className="font-arcade text-3xl md:text-5xl text-green-400 text-glow-green"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      textShadow: [
                        '0 0 10px rgba(0, 255, 0, 0.8)',
                        '0 0 30px rgba(0, 255, 0, 1)',
                        '0 0 10px rgba(0, 255, 0, 0.8)'
                      ]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    READY!
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ArcadeButton
                      onClick={handleStart}
                      variant="success"
                      size="lg"
                      glowing
                    >
                      PRESS START
                    </ArcadeButton>
                  </motion.div>

                  <div className="flex justify-center gap-4 mt-6">
                    <motion.span
                      className="font-arcade text-xs text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      1 PLAYER
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cabinet Controls decoration */}
        <div className="bg-gray-800/50 backdrop-blur rounded-b-xl p-4 border-t border-white/10">
          <div className="flex justify-center gap-8">
            {/* Joystick decoration */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-900 rounded-full border-4 border-gray-600 flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
              </div>
              <span className="font-readable text-xs text-gray-400 mt-2">PLAYER 1</span>
            </div>

            {/* Button row */}
            <div className="flex gap-2 items-center">
              {['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'].map((color, i) => (
                <motion.div
                  key={i}
                  className={`w-8 h-8 ${color} rounded-full border-4 border-gray-700`}
                  style={{
                    boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)'
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Credits */}
        <motion.p
          className="text-center font-readable text-sm text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          © 2025 Nishanth Gopinath • Crafted with ♥ and pixels
        </motion.p>
      </motion.div>
    </div>
  );
}
