'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CRTScreen from '@/components/arcade/CRTScreen';
import ArcadeButton from '@/components/arcade/ArcadeButton';
import PixelAvatar from '@/components/ui/PixelAvatar';
import StatBar from '@/components/ui/StatBar';
import { profile, skills } from '@/data/projects';
import { useAudio } from '@/hooks/useAudio';

export default function ProfilePage() {
  const { playSound } = useAudio();

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-arcade text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ABOUT ME
          </h1>
          <p className="font-readable text-lg text-gray-300 mt-3">
            Get to know the developer behind the projects
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Character Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <PixelAvatar size="xl" animated />
                <motion.h2
                  className="font-arcade text-xl text-yellow-400 mt-4"
                  style={{ textShadow: '0 0 10px rgba(255, 255, 0, 0.5)' }}
                >
                  {profile.name}
                </motion.h2>
                <p className="font-readable text-sm text-purple-300 text-center mt-2">
                  {profile.title}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Level', value: profile.stats.level, icon: '⭐' },
                  { label: 'Experience', value: profile.stats.experience, icon: '📊' },
                  { label: 'Projects', value: profile.stats.projectsCompleted, icon: '🎯' },
                  { label: 'Bugs Fixed', value: profile.stats.bugsSquashed, icon: '🐛' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 rounded-lg p-3 text-center border border-white/10"
                  >
                    <div className="text-xl mb-1">{stat.icon}</div>
                    <p className="font-readable text-xs text-gray-400">{stat.label}</p>
                    <p className="font-arcade text-sm text-cyan-400">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Contact Links */}
              <div className="space-y-2">
                <h3 className="font-arcade text-sm text-green-400 mb-3 text-center">
                  Get In Touch
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Email', icon: '📧', href: `mailto:${profile.contact.email}` },
                    { label: 'GitHub', icon: '💻', href: profile.contact.github },
                    { label: 'LinkedIn', icon: '💼', href: profile.contact.linkedin }
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound('select')}
                    >
                      <motion.div
                        className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-center 
                          border border-white/10 hover:border-cyan-500/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{link.icon}</span>
                        <p className="font-readable text-xs text-gray-300 mt-1">{link.label}</p>
                      </motion.div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-6">
                <h3 className="font-arcade text-lg text-yellow-400 mb-4">
                  About
                </h3>
                <p className="font-readable text-base text-gray-200 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </motion.div>

            {/* Skills/Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card p-6">
                <h3 className="font-arcade text-lg text-cyan-400 mb-4">
                  Skills
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <StatBar
                        label={skill.name}
                        value={skill.score}
                        maxValue={skill.maxScore}
                        color={`hsl(${180 + i * 30}, 70%, 50%)`}
                        size="md"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-card p-6">
                <h3 className="font-arcade text-lg text-purple-400 mb-4">
                  Tech Stack
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {profile.equipment.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-3"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">
                          {['⚔️', '🛡️', '🔮', '🐴'][i]}
                        </span>
                      </div>
                      <div>
                        <p className="font-readable text-sm text-gray-400">{item.name}</p>
                        <p className="font-readable text-base text-cyan-300">{item.item}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="glass-card p-6">
                <h3 className="font-arcade text-lg text-yellow-400 mb-4">
                  Achievements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.achievements.map((achievement, i) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 
                        rounded-lg p-4 border border-yellow-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <motion.span
                          className="text-3xl"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        >
                          🏅
                        </motion.span>
                        <div>
                          <p className="font-arcade text-sm text-yellow-400">
                            {achievement.title}
                          </p>
                          <p className="font-readable text-sm text-gray-300 mt-1">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div className="glass-card p-6 text-center">
                <h3 className="font-arcade text-lg text-cyan-400 mb-4">
                  Download Resume
                </h3>
                <p className="font-readable text-gray-400 mb-4">
                  Get my full CV with detailed experience and qualifications
                </p>
                <Link href="/resume">
                  <ArcadeButton variant="primary" size="md" glowing>
                    💾 DOWNLOAD SAVE FILE
                  </ArcadeButton>
                </Link>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/select">
                <ArcadeButton variant="primary" size="md">
                  🎮 VIEW PROJECTS
                </ArcadeButton>
              </Link>
              <Link href="/contact">
                <ArcadeButton variant="secondary" size="md">
                  📬 CONTACT ME
                </ArcadeButton>
              </Link>
              <Link href="/">
                <ArcadeButton variant="secondary" size="md">
                  🏠 RETURN TO LOBBY
                </ArcadeButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
