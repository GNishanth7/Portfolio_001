'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import { useAudio } from '@/hooks/useAudio';

interface GameCartridgeProps {
  project: Project;
  isSelected?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
}

export default function GameCartridge({
  project,
  isSelected = false,
  onClick,
  onSelect
}: GameCartridgeProps) {
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('select');
    onClick?.();
  };

  const handleMouseEnter = () => {
    playSound('hover');
    onSelect?.();
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`
        relative cursor-pointer select-none
        w-40 h-56 md:w-48 md:h-64
        transition-all duration-300
      `}
      whileHover={{ y: -10 }}
      animate={isSelected ? { 
        y: -15, 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300 }
      } : { 
        y: 0, 
        scale: 1 
      }}
    >
      {/* Cartridge body */}
      <div
        className={`
          absolute inset-0 rounded-t-lg rounded-b-sm
          border-4 transition-colors duration-300
          ${isSelected ? 'border-yellow-400' : 'border-gray-600'}
        `}
        style={{
          background: `linear-gradient(180deg, 
            ${project.color}33 0%, 
            #1a1a2e 50%, 
            #0f0f1a 100%
          )`,
          boxShadow: isSelected
            ? `0 0 20px ${project.color}, 0 0 40px ${project.color}66`
            : '0 4px 0 0 rgba(0,0,0,0.5), 0 6px 10px 0 rgba(0,0,0,0.3)'
        }}
      >
        {/* Cartridge notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-gray-800 rounded-b-lg" />

        {/* Label area */}
        <div className="absolute top-6 left-2 right-2 bottom-12 bg-gray-900 rounded border-2 border-gray-700 overflow-hidden">
          {/* Project thumbnail placeholder */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(45deg, ${project.color}22, ${project.color}44)`
            }}
          >
            {/* Pixel art style icon */}
            <div className="grid grid-cols-4 gap-0.5">
              {[...Array(16)].map((_, i) => {
                // Deterministic pattern based on index to avoid hydration mismatch
                const showColor = [0, 2, 5, 6, 9, 10, 12, 15].includes(i);
                return (
                  <motion.div
                    key={i}
                    className="w-2 h-2 md:w-3 md:h-3"
                    style={{
                      backgroundColor: showColor ? project.color : 'transparent'
                    }}
                    animate={isSelected ? {
                      opacity: [0.5, 1, 0.5]
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Genre tag */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-black/80 py-1 px-2"
          >
            <p 
              className="font-arcade text-[6px] md:text-[8px] truncate"
              style={{ color: project.color }}
            >
              {project.genre}
            </p>
          </div>
        </div>

        {/* Cartridge title */}
        <div className="absolute bottom-2 left-2 right-2">
          <p 
            className="font-arcade text-[8px] md:text-[10px] text-center text-white truncate"
            style={{
              textShadow: `0 0 5px ${project.color}`
            }}
          >
            {project.title}
          </p>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div 
              className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent"
              style={{ borderTopColor: '#facc15' }}
            />
          </motion.div>
        )}
      </div>

      {/* Glow effect when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-t-lg rounded-b-sm pointer-events-none"
          animate={{
            boxShadow: [
              `0 0 20px ${project.color}66`,
              `0 0 40px ${project.color}99`,
              `0 0 20px ${project.color}66`
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
