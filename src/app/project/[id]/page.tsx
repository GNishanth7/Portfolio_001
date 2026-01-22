'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CRTScreen from '@/components/arcade/CRTScreen';
import ArcadeButton from '@/components/arcade/ArcadeButton';
import { projects } from '@/data/projects';
import { useAudio } from '@/hooks/useAudio';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { playSound } = useAudio();

  const project = projects.find((p) => p.id === id);
  const projectIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  if (!project) {
    notFound();
  }

  // Keyboard navigation
  useKeyboardNavigation({
    Escape: () => {
      playSound('back');
      router.push('/select');
    },
    ArrowRight: () => {
      playSound('select');
      router.push(`/project/${nextProject.id}`);
    },
    ArrowLeft: () => {
      playSound('select');
      router.push(`/project/${prevProject.id}`);
    }
  });

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              {/* Title */}
              <div>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-readable mb-2"
                  style={{ 
                    backgroundColor: `${project.color}22`,
                    color: project.color,
                    border: `1px solid ${project.color}44`
                  }}
                >
                  {project.genre}
                </span>
                <h1 
                  className="font-arcade text-xl md:text-2xl"
                  style={{ 
                    color: project.color,
                    textShadow: `0 0 20px ${project.color}66`
                  }}
                >
                  {project.title}
                </h1>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-4">
                <span className="font-readable text-sm text-gray-400">
                  Project {projectIndex + 1} of {projects.length}
                </span>
                <div className="flex gap-1">
                  {projects.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === projectIndex ? 'bg-cyan-400' : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Screenshot/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass-card p-4 md:p-6">
                {/* Project visualization */}
                <div 
                  className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15, ${project.color}30)`
                  }}
                >
                  {/* Decorative corner pixels */}
                  <div className="absolute top-2 left-2 grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5" style={{ backgroundColor: [0,2,6,8].includes(i) ? project.color : 'transparent' }} />
                    ))}
                  </div>
                  <div className="absolute top-2 right-2 grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5" style={{ backgroundColor: [0,2,6,8].includes(i) ? project.color : 'transparent' }} />
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5" style={{ backgroundColor: [0,2,6,8].includes(i) ? project.color : 'transparent' }} />
                    ))}
                  </div>
                  <div className="absolute bottom-2 right-2 grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5" style={{ backgroundColor: [0,2,6,8].includes(i) ? project.color : 'transparent' }} />
                    ))}
                  </div>
                  
                  {/* Central content */}
                  <motion.div
                    className="relative z-10 text-center p-8"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="text-7xl mb-4">
                      {project.genre.includes('Distributed') ? '🌐' : 
                       project.genre.includes('Satellite') ? '🛰️' :
                       project.genre.includes('Generative') ? '🤖' :
                       project.genre.includes('Quantum') ? '⚛️' : '💼'}
                    </div>
                    <p className="font-arcade text-sm mb-2" style={{ color: project.color }}>
                      {project.genre.toUpperCase()}
                    </p>
                    <p className="font-readable text-gray-400 text-sm">
                      Screenshot coming soon
                    </p>
                  </motion.div>
                  
                  {/* Scanline effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                    }}
                  />
                </div>

                {/* Project links */}
                <div className="flex justify-center gap-4 mt-6">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ArcadeButton variant="success" size="sm">
                        🌐 LIVE DEMO
                      </ArcadeButton>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <ArcadeButton variant="secondary" size="sm">
                        💻 SOURCE CODE
                      </ArcadeButton>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Mission Brief */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card rounded-xl p-6">
                <h2 className="font-arcade text-sm text-yellow-400 mb-4 flex items-center gap-2">
                  <span>📜</span> About This Project
                </h2>
                <p className="font-readable text-base text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Power-Ups (Technologies) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-arcade text-sm text-cyan-400 mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="font-readable text-sm px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-card p-5">
                <h3 className="font-arcade text-sm text-amber-400 mb-4">
                  Challenges Solved
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="font-readable text-sm text-gray-200 flex items-start gap-3"
                    >
                      <span className="text-amber-400 mt-0.5">▸</span>
                      <span>{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="glass-card p-5">
                <h3 className="font-arcade text-sm text-green-400 mb-4">
                  Key Outcomes
                </h3>
                <ul className="space-y-3">
                  {project.outcomes.map((outcome, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="font-readable text-sm text-gray-200 flex items-start gap-3"
                    >
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <Link href={`/project/${prevProject.id}`}>
                  <ArcadeButton variant="secondary" size="sm" className="w-full">
                    ← PREV
                  </ArcadeButton>
                </Link>
                <Link href={`/project/${nextProject.id}`}>
                  <ArcadeButton variant="secondary" size="sm" className="w-full">
                    NEXT →
                  </ArcadeButton>
                </Link>
              </div>
              <Link href="/select">
                <ArcadeButton variant="primary" size="sm" className="w-full">
                  BACK TO SELECT
                </ArcadeButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
