'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CRTScreen from '@/components/arcade/CRTScreen';
import GameCartridge from '@/components/arcade/GameCartridge';
import HighScoreTable from '@/components/arcade/HighScoreTable';
import ArcadeButton from '@/components/arcade/ArcadeButton';
import { projects, skills } from '@/data/projects';
import { useAudio } from '@/hooks/useAudio';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

export default function SelectPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { playSound } = useAudio();

  const selectedProject = projects[selectedIndex];

  const navigateLeft = useCallback(() => {
    playSound('select');
    setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [playSound]);

  const navigateRight = useCallback(() => {
    playSound('select');
    setSelectedIndex((prev) => (prev + 1) % projects.length);
  }, [playSound]);

  const selectProject = useCallback(() => {
    playSound('confirm');
    router.push(`/project/${selectedProject.id}`);
  }, [playSound, router, selectedProject.id]);

  // Keyboard navigation
  useKeyboardNavigation({
    ArrowLeft: navigateLeft,
    ArrowRight: navigateRight,
    Enter: selectProject,
    KeyA: selectProject,
    Escape: () => router.push('/')
  });

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 
            className="font-arcade text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          >
            MY PROJECTS
          </h1>
          <p className="font-readable text-sm text-gray-400 mt-3">
            Use arrow keys or click to explore • Press Enter to view details
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Game Selection Area */}
          <div className="lg:col-span-3">
            <CRTScreen className="bg-gray-900 p-4 md:p-8">
              {/* Cartridge Carousel */}
              <div className="relative">
                {/* Navigation Arrows */}
                <button
                  onClick={navigateLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                    font-arcade text-4xl text-cyan-400 hover:text-cyan-300
                    transition-colors p-2"
                  style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
                >
                  ◀
                </button>
                <button
                  onClick={navigateRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                    font-arcade text-4xl text-cyan-400 hover:text-cyan-300
                    transition-colors p-2"
                  style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
                >
                  ▶
                </button>

                {/* Cartridges Display */}
                <div className="flex justify-center items-end gap-4 py-8 px-12 overflow-hidden">
                  {projects.map((project, index) => {
                    const offset = index - selectedIndex;
                    const isVisible = Math.abs(offset) <= 2;
                    
                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: offset === 0 ? 1 : 0.5,
                          scale: offset === 0 ? 1 : 0.8,
                          x: offset * 20,
                          zIndex: offset === 0 ? 10 : 5 - Math.abs(offset)
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <GameCartridge
                          project={project}
                          isSelected={index === selectedIndex}
                          onClick={() => {
                            if (index === selectedIndex) {
                              selectProject();
                            } else {
                              setSelectedIndex(index);
                            }
                          }}
                          onSelect={() => setSelectedIndex(index)}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {projects.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        playSound('select');
                        setSelectedIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === selectedIndex 
                          ? 'bg-cyan-400' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      animate={index === selectedIndex ? {
                        boxShadow: [
                          '0 0 5px rgba(0, 255, 255, 0.5)',
                          '0 0 15px rgba(0, 255, 255, 0.8)',
                          '0 0 5px rgba(0, 255, 255, 0.5)'
                        ]
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>

              {/* Selected Project Info */}
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center border-t border-gray-700/50 pt-6"
              >
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-readable mb-3"
                  style={{ 
                    backgroundColor: `${selectedProject.color}22`,
                    color: selectedProject.color,
                    border: `1px solid ${selectedProject.color}44`
                  }}
                >
                  {selectedProject.genre}
                </span>
                <h2 
                  className="font-arcade text-lg md:text-xl mb-3"
                  style={{ 
                    color: selectedProject.color,
                    textShadow: `0 0 20px ${selectedProject.color}66`
                  }}
                >
                  {selectedProject.title}
                </h2>
                <p className="font-readable text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Action buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <ArcadeButton
                    onClick={selectProject}
                    variant="success"
                    size="md"
                  >
                    [A] PLAY
                  </ArcadeButton>
                  <Link href={`/project/${selectedProject.id}`}>
                    <ArcadeButton variant="secondary" size="md">
                      [B] INFO
                    </ArcadeButton>
                  </Link>
                </div>
              </motion.div>
            </CRTScreen>
          </div>

          {/* Sidebar - High Scores & Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            {/* High Score Table */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <HighScoreTable skills={skills} />
            </motion.div>

            {/* Player Profile Link */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/80 border-4 border-cyan-500 rounded-lg p-4"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
            >
              <Link href="/profile">
                <motion.div
                  className="text-center cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-4xl mb-2">👤</div>
                  <h3 className="font-arcade text-xs text-cyan-400 mb-1">
                    PLAYER ONE
                  </h3>
                  <p className="font-arcade text-[8px] text-gray-500">
                    VIEW PROFILE
                  </p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Controls Legend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/80 border-2 border-gray-700 rounded-lg p-4"
            >
              <h4 className="font-arcade text-[10px] text-yellow-400 mb-3 text-center">
                CONTROLS
              </h4>
              <div className="space-y-2">
                {[
                  { key: '← →', action: 'NAVIGATE' },
                  { key: 'ENTER', action: 'SELECT' },
                  { key: 'ESC', action: 'BACK' }
                ].map((control) => (
                  <div key={control.key} className="flex justify-between items-center">
                    <span className="font-arcade text-[8px] text-cyan-400 bg-gray-800 px-2 py-1 rounded">
                      {control.key}
                    </span>
                    <span className="font-arcade text-[8px] text-gray-400">
                      {control.action}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
