'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ArcadeButton from '@/components/arcade/ArcadeButton';
import { useAudio } from '@/hooks/useAudio';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Bumper {
  x: number;
  y: number;
  radius: number;
  points: number;
  color: string;
  hit: boolean;
}

export default function PlayPage() {
  const { playSound } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [balls, setBalls] = useState(3);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 600 });
  const [isMobile, setIsMobile] = useState(false);
  
  const ballRef = useRef<Ball>({ x: 300, y: 500, vx: 0, vy: 0, radius: 8 });
  const bumpersRef = useRef<Bumper[]>([]);
  const leftFlipperAngle = useRef(0);
  const rightFlipperAngle = useRef(0);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const launched = useRef(false);
  const scaleRef = useRef(1);

  // Detect mobile and set canvas size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 16;
        const baseWidth = 400;
        const baseHeight = 600;
        
        // Scale to fit container while maintaining aspect ratio
        const scale = Math.min(containerWidth / baseWidth, 1);
        scaleRef.current = scale;
        
        setCanvasSize({
          width: Math.floor(baseWidth * scale),
          height: Math.floor(baseHeight * scale)
        });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize bumpers based on scale
  useEffect(() => {
    const s = scaleRef.current;
    bumpersRef.current = [
      { x: 120 * s, y: 120 * s, radius: 22 * s, points: 100, color: '#00ffff', hit: false },
      { x: 200 * s, y: 90 * s, radius: 22 * s, points: 100, color: '#ff00ff', hit: false },
      { x: 280 * s, y: 120 * s, radius: 22 * s, points: 100, color: '#ffff00', hit: false },
      { x: 160 * s, y: 180 * s, radius: 18 * s, points: 50, color: '#00ff00', hit: false },
      { x: 240 * s, y: 180 * s, radius: 18 * s, points: 50, color: '#ff0066', hit: false },
      { x: 120 * s, y: 250 * s, radius: 14 * s, points: 25, color: '#00ffff', hit: false },
      { x: 280 * s, y: 250 * s, radius: 14 * s, points: 25, color: '#ff00ff', hit: false },
    ];
    
    // Reset ball position
    ballRef.current.radius = 8 * s;
  }, [canvasSize]);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('pinball-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Prevent scrolling when touching game area
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (gameState === 'playing') {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        setLeftPressed(true);
      }
      if (e.key === 'ArrowRight' || e.key === '/' || e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setRightPressed(true);
      }
      if (e.key === ' ' && gameState === 'playing' && !launched.current) {
        e.preventDefault();
        launchBall();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'z' || e.key === 'Z') {
        setLeftPressed(false);
      }
      if (e.key === 'ArrowRight' || e.key === '/' || e.key === 'm' || e.key === 'M') {
        setRightPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const launchBall = useCallback(() => {
    if (!launched.current && gameState === 'playing') {
      launched.current = true;
      const s = scaleRef.current;
      ballRef.current.vy = -12 * s;
      ballRef.current.vx = (Math.random() - 0.5) * 4 * s;
      playSound('confirm');
    }
  }, [gameState, playSound]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const ball = ballRef.current;
    const s = scaleRef.current;
    const gravity = 0.15 * s;
    const friction = 0.99;
    const flipperLength = 50 * s;
    const flipperY = height - 70 * s;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, width, height);

      // Draw border glow
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3 * s;
      ctx.shadowBlur = 10 * s;
      ctx.shadowColor = '#00ffff';
      ctx.strokeRect(4 * s, 4 * s, width - 8 * s, height - 8 * s);
      ctx.shadowBlur = 0;

      // Update flipper angles
      leftFlipperAngle.current = leftPressed ? -0.5 : 0.3;
      rightFlipperAngle.current = rightPressed ? 0.5 : -0.3;

      // Draw flippers
      const leftFlipperX = 80 * s;
      const rightFlipperX = width - 80 * s;
      
      // Left flipper
      ctx.save();
      ctx.translate(leftFlipperX, flipperY);
      ctx.rotate(leftFlipperAngle.current);
      ctx.fillStyle = leftPressed ? '#00ffff' : '#008888';
      ctx.shadowBlur = leftPressed ? 20 * s : 10 * s;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      ctx.roundRect(0, -7 * s, flipperLength, 14 * s, 7 * s);
      ctx.fill();
      ctx.restore();

      // Right flipper
      ctx.save();
      ctx.translate(rightFlipperX, flipperY);
      ctx.rotate(rightFlipperAngle.current);
      ctx.fillStyle = rightPressed ? '#ff00ff' : '#880088';
      ctx.shadowBlur = rightPressed ? 20 * s : 10 * s;
      ctx.shadowColor = '#ff00ff';
      ctx.beginPath();
      ctx.roundRect(-flipperLength, -7 * s, flipperLength, 14 * s, 7 * s);
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;

      // Draw bumpers
      bumpersRef.current.forEach((bumper, i) => {
        ctx.beginPath();
        ctx.arc(bumper.x, bumper.y, bumper.radius, 0, Math.PI * 2);
        ctx.fillStyle = bumper.hit ? '#ffffff' : bumper.color + '44';
        ctx.fill();
        ctx.strokeStyle = bumper.color;
        ctx.lineWidth = 3 * s;
        ctx.shadowBlur = bumper.hit ? 20 * s : 10 * s;
        ctx.shadowColor = bumper.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        if (bumper.hit) {
          setTimeout(() => { bumpersRef.current[i].hit = false; }, 100);
        }
      });

      // Draw side walls
      const wallWidth = 25 * s;
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, wallWidth, height);
      ctx.fillRect(width - wallWidth, 0, wallWidth, height);

      // Draw launcher area
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(width - 45 * s, height - 180 * s, 40 * s, 180 * s);

      // Draw launch guide
      if (!launched.current) {
        ctx.strokeStyle = '#ffff0066';
        ctx.lineWidth = 2 * s;
        ctx.setLineDash([5 * s, 5 * s]);
        ctx.beginPath();
        ctx.moveTo(width - 25 * s, height - 90 * s);
        ctx.lineTo(width - 25 * s, 50 * s);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Physics
      if (launched.current) {
        ball.vy += gravity;
        ball.vx *= friction;
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
        if (ball.x < wallWidth + ball.radius) {
          ball.x = wallWidth + ball.radius;
          ball.vx = Math.abs(ball.vx) * 0.8;
        }
        if (ball.x > width - wallWidth - ball.radius) {
          ball.x = width - wallWidth - ball.radius;
          ball.vx = -Math.abs(ball.vx) * 0.8;
        }
        if (ball.y < ball.radius) {
          ball.y = ball.radius;
          ball.vy = Math.abs(ball.vy) * 0.8;
        }

        // Bumper collisions
        bumpersRef.current.forEach((bumper, i) => {
          const dx = ball.x - bumper.x;
          const dy = ball.y - bumper.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < bumper.radius + ball.radius) {
            const angle = Math.atan2(dy, dx);
            ball.vx = Math.cos(angle) * 8 * s;
            ball.vy = Math.sin(angle) * 8 * s;
            ball.x = bumper.x + Math.cos(angle) * (bumper.radius + ball.radius + 1);
            ball.y = bumper.y + Math.sin(angle) * (bumper.radius + ball.radius + 1);
            bumpersRef.current[i].hit = true;
            setScore(prev => prev + bumper.points);
            playSound('coin');
          }
        });

        // Flipper collisions
        const checkFlipperCollision = (flipperX: number, isLeft: boolean) => {
          if (ball.y > flipperY - 20 * s && ball.y < flipperY + 20 * s) {
            const flipperMinX = isLeft ? flipperX : flipperX - flipperLength;
            const flipperMaxX = isLeft ? flipperX + flipperLength : flipperX;
            
            if (ball.x > flipperMinX - ball.radius && ball.x < flipperMaxX + ball.radius) {
              const pressing = isLeft ? leftPressed : rightPressed;
              if (pressing) {
                ball.vy = -12 * s;
                ball.vx = (ball.x - (flipperMinX + flipperMaxX) / 2) * 0.25;
                playSound('select');
              } else {
                ball.vy = -Math.abs(ball.vy) * 0.5;
              }
              ball.y = flipperY - 20 * s;
            }
          }
        };

        checkFlipperCollision(leftFlipperX, true);
        checkFlipperCollision(rightFlipperX, false);

        // Ball lost
        if (ball.y > height + 50 * s) {
          launched.current = false;
          ball.x = width - 25 * s;
          ball.y = height - 90 * s;
          ball.vx = 0;
          ball.vy = 0;
          
          setBalls(b => {
            if (b <= 1) {
              setGameState('gameover');
              if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('pinball-highscore', score.toString());
              }
              return 0;
            }
            return b - 1;
          });
        }
      }

      // Draw ball with trail effect
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#aaaaff');
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15 * s;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Launch instruction on canvas
      if (!launched.current) {
        ctx.fillStyle = '#ffff00';
        ctx.font = `${10 * s}px "Press Start 2P"`;
        ctx.textAlign = 'center';
        ctx.fillText('TAP', width - 25 * s, height - 140 * s);
        ctx.fillText('TO', width - 25 * s, height - 125 * s);
        ctx.fillText('LAUNCH', width - 25 * s, height - 110 * s);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, leftPressed, rightPressed, playSound, score, highScore, canvasSize]);

  const startGame = useCallback(() => {
    playSound('start');
    setGameState('playing');
    setScore(0);
    setBalls(3);
    launched.current = false;
    const s = scaleRef.current;
    ballRef.current = { 
      x: canvasSize.width - 25 * s, 
      y: canvasSize.height - 90 * s, 
      vx: 0, 
      vy: 0, 
      radius: 8 * s 
    };
  }, [playSound, canvasSize]);

  // Touch handlers for flippers
  const handleLeftFlipperStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setLeftPressed(true);
    if (navigator.vibrate) navigator.vibrate(10);
  }, []);

  const handleLeftFlipperEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setLeftPressed(false);
  }, []);

  const handleRightFlipperStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setRightPressed(true);
    if (navigator.vibrate) navigator.vibrate(10);
  }, []);

  const handleRightFlipperEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setRightPressed(false);
  }, []);

  const handleCanvasTap = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (gameState === 'playing' && !launched.current) {
      // Check if tap is in launch area (right side of canvas)
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      
      if (x > rect.width * 0.7) {
        launchBall();
        if (navigator.vibrate) navigator.vibrate(20);
      }
    }
  }, [gameState, launchBall]);

  return (
    <div className="min-h-screen gradient-bg py-4 md:py-8 px-2 md:px-4 select-none">
      <div className="max-w-lg mx-auto" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 md:mb-4"
        >
          <h1 className="font-arcade text-xl md:text-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            RETRO PINBALL
          </h1>
        </motion.div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-2 md:mb-4 glass-card p-2 md:p-3">
          <div className="font-arcade text-xs md:text-sm text-yellow-400">
            SCORE: {score}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`text-lg md:text-xl ${i < balls ? '' : 'opacity-30'}`}>
                ⚪
              </span>
            ))}
          </div>
          <div className="font-arcade text-xs md:text-sm text-purple-400">
            HI: {highScore}
          </div>
        </div>

        {/* Game Canvas Container */}
        <div className="glass-card p-1 md:p-2 mb-2 relative touch-none">
          {gameState === 'intro' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 rounded-lg p-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-5xl md:text-6xl mb-4"
              >
                🕹️
              </motion.div>
              <h2 className="font-arcade text-lg md:text-xl text-cyan-400 mb-4">PINBALL</h2>
              <div className="font-readable text-gray-400 mb-4 text-center text-xs md:text-sm space-y-1">
                {isMobile ? (
                  <>
                    <p>👆 Touch LEFT side = Left Flipper</p>
                    <p>👆 Touch RIGHT side = Right Flipper</p>
                    <p>👆 Tap launch area to shoot</p>
                  </>
                ) : (
                  <>
                    <p>← or Z = Left Flipper</p>
                    <p>→ or M = Right Flipper</p>
                    <p>SPACE = Launch Ball</p>
                  </>
                )}
              </div>
              <ArcadeButton onClick={startGame} variant="primary" size="lg" glowing>
                🚀 START
              </ArcadeButton>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 rounded-lg">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center p-4"
              >
                <div className="text-5xl md:text-6xl mb-4">🎯</div>
                <h2 className="font-arcade text-lg md:text-xl text-yellow-400 mb-2">GAME OVER</h2>
                <p className="font-arcade text-base md:text-lg text-cyan-400 mb-2">SCORE: {score}</p>
                {score >= highScore && score > 0 && (
                  <p className="font-arcade text-xs md:text-sm text-green-400 mb-4">NEW HIGH SCORE!</p>
                )}
                <ArcadeButton onClick={startGame} variant="primary">
                  🔄 PLAY AGAIN
                </ArcadeButton>
              </motion.div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="w-full mx-auto rounded-lg"
            style={{ touchAction: 'none' }}
            onTouchStart={handleCanvasTap}
            onClick={handleCanvasTap}
          />
        </div>

        {/* Mobile Touch Controls - Fixed at bottom */}
        {isMobile && gameState === 'playing' && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-between items-end pb-4 px-2 z-30 pointer-events-none">
            {/* Left Flipper Button */}
            <button
              onTouchStart={handleLeftFlipperStart}
              onTouchEnd={handleLeftFlipperEnd}
              onTouchCancel={handleLeftFlipperEnd}
              onMouseDown={handleLeftFlipperStart}
              onMouseUp={handleLeftFlipperEnd}
              onMouseLeave={handleLeftFlipperEnd}
              className={`pointer-events-auto w-28 h-28 md:w-32 md:h-32 rounded-full font-arcade text-3xl 
                transition-all duration-75 active:scale-95 flex items-center justify-center
                ${leftPressed 
                  ? 'bg-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.8)]' 
                  : 'bg-cyan-500/40 border-4 border-cyan-400'
                }`}
              style={{ touchAction: 'none' }}
            >
              <span className="text-white drop-shadow-lg">◀</span>
            </button>

            {/* Center Launch Button */}
            <button
              onTouchStart={(e) => {
                e.preventDefault();
                launchBall();
                if (navigator.vibrate) navigator.vibrate(20);
              }}
              className={`pointer-events-auto w-16 h-16 mb-8 rounded-full font-arcade text-xs 
                transition-all active:scale-95
                ${!launched.current 
                  ? 'bg-yellow-500 animate-pulse shadow-[0_0_20px_rgba(255,255,0,0.8)]' 
                  : 'bg-gray-600 opacity-50'
                }`}
              style={{ touchAction: 'none' }}
              disabled={launched.current}
            >
              🚀
            </button>

            {/* Right Flipper Button */}
            <button
              onTouchStart={handleRightFlipperStart}
              onTouchEnd={handleRightFlipperEnd}
              onTouchCancel={handleRightFlipperEnd}
              onMouseDown={handleRightFlipperStart}
              onMouseUp={handleRightFlipperEnd}
              onMouseLeave={handleRightFlipperEnd}
              className={`pointer-events-auto w-28 h-28 md:w-32 md:h-32 rounded-full font-arcade text-3xl 
                transition-all duration-75 active:scale-95 flex items-center justify-center
                ${rightPressed 
                  ? 'bg-purple-500 shadow-[0_0_30px_rgba(255,0,255,0.8)]' 
                  : 'bg-purple-500/40 border-4 border-purple-400'
                }`}
              style={{ touchAction: 'none' }}
            >
              <span className="text-white drop-shadow-lg">▶</span>
            </button>
          </div>
        )}

        {/* Navigation - Hidden on mobile during gameplay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex justify-center gap-2 md:gap-4 mt-2 ${isMobile && gameState === 'playing' ? 'hidden' : ''}`}
        >
          <Link href="/">
            <ArcadeButton variant="secondary" size="sm">
              🏠 HOME
            </ArcadeButton>
          </Link>
          <Link href="/select">
            <ArcadeButton variant="secondary" size="sm">
              🎮 PROJECTS
            </ArcadeButton>
          </Link>
        </motion.div>

        {/* Spacer for mobile controls */}
        {isMobile && gameState === 'playing' && <div className="h-36" />}
      </div>
    </div>
  );
}
