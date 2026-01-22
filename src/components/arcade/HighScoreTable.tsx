'use client';

import { motion } from 'framer-motion';

interface HighScoreTableProps {
  skills: Array<{
    name: string;
    score: number;
    maxScore: number;
  }>;
  className?: string;
}

export default function HighScoreTable({ skills, className = '' }: HighScoreTableProps) {
  return (
    <div 
      className={`bg-black/90 border-4 border-purple-500 rounded-lg p-4 ${className}`}
      style={{
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <motion.h3
          className="font-arcade text-yellow-400 text-sm md:text-base"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            textShadow: '0 0 10px rgba(255, 255, 0, 0.8)'
          }}
        >
          ★ HIGH SCORES ★
        </motion.h3>
      </div>

      {/* Scores list */}
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            {/* Rank */}
            <span 
              className="font-arcade text-xs w-6 text-center"
              style={{
                color: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#00ffff'
              }}
            >
              {index + 1}.
            </span>

            {/* Skill name */}
            <span className="font-arcade text-[10px] md:text-xs text-gray-300 flex-1 truncate">
              {skill.name}
            </span>

            {/* Score bar */}
            <div className="w-20 h-3 bg-gray-800 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-green-300"
                initial={{ width: 0 }}
                animate={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>

            {/* Score value */}
            <motion.span
              className="font-arcade text-[10px] md:text-xs text-green-400 w-16 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {skill.score.toLocaleString()}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Footer decoration */}
      <div className="mt-4 flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="text-yellow-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
          >
            ●
          </motion.span>
        ))}
      </div>
    </div>
  );
}
