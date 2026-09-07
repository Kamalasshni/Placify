import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Trophy, Sparkles, Heart } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const FlappyCoderGame = ({ onGameComplete }) => {
  const { currentSkinObj } = useGame();

  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameover', 'victory'
  const [birdY, setBirdY] = useState(150);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([
    { x: 300, topHeight: 80, bottomHeight: 120, passed: false },
    { x: 500, topHeight: 120, bottomHeight: 80, passed: false }
  ]);
  const [score, setScore] = useState(0);

  const gravity = 0.6;
  const jumpStrength = -7;
  const targetScore = 8;

  const jump = () => {
    if (gameState === 'start') {
      setGameState('playing');
      setVelocity(jumpStrength);
      playSound('click');
      return;
    }
    if (gameState === 'playing') {
      setVelocity(jumpStrength);
      playSound('click');
    }
  };

  // Physics Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = setInterval(() => {
      // Update bird
      setBirdY(prev => {
        const nextY = prev + velocity;
        if (nextY > 280 || nextY < 0) {
          handleCrash();
          return prev;
        }
        return nextY;
      });

      setVelocity(prev => prev + gravity);

      // Update pipes
      setPipes(prevPipes => {
        return prevPipes.map(pipe => {
          const nextX = pipe.x - 3;
          let passed = pipe.passed;

          // Check if bird passed pipe
          if (!passed && nextX < 50) {
            passed = true;
            setScore(s => {
              const nextScore = s + 1;
              playSound('correct');
              if (nextScore >= targetScore) {
                handleVictory(nextScore);
              }
              return nextScore;
            });
          }

          // Respawn pipe when off screen
          if (nextX < -60) {
            const top = 50 + Math.floor(Math.random() * 90);
            const bottom = 50 + Math.floor(Math.random() * 90);
            return { x: 380, topHeight: top, bottomHeight: bottom, passed: false };
          }

          // Collision Check
          const birdBox = { x: 50, y: birdY, size: 24 };
          if (
            pipe.x < birdBox.x + birdBox.size &&
            pipe.x + 40 > birdBox.x &&
            (birdBox.y < pipe.topHeight || birdBox.y + birdBox.size > 300 - pipe.bottomHeight)
          ) {
            handleCrash();
          }

          return { ...pipe, x: nextX, passed };
        });
      });
    }, 25);

    return () => clearInterval(loop);
  }, [gameState, velocity, birdY]);

  const handleCrash = () => {
    playSound('wrong');
    setGameState('gameover');
  };

  const handleVictory = (finalScore) => {
    playSound('victory');
    setGameState('victory');
    confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });

    setTimeout(() => {
      if (onGameComplete) {
        onGameComplete(finalScore * 100, 3);
      }
    }, 1200);
  };

  const resetGame = () => {
    setBirdY(150);
    setVelocity(0);
    setPipes([
      { x: 300, topHeight: 80, bottomHeight: 120, passed: false },
      { x: 500, topHeight: 120, bottomHeight: 80, passed: false }
    ]);
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="max-w-md mx-auto space-y-4 animate-fadeIn text-center select-none">
      {/* Header */}
      <div className="glass-panel p-4 rounded-2xl border border-pink-500/30 flex items-center justify-between font-mono text-xs">
        <span className="text-pink-400 font-bold">🚀 Flappy Syntax Coder</span>
        <span className="text-amber-300 font-bold text-sm">Gems: {score} / {targetScore}</span>
      </div>

      {/* 2D Canvas Play Area */}
      <div
        onClick={jump}
        className="relative w-full h-[300px] rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#0e1633] to-[#080a14] overflow-hidden shadow-2xl cursor-pointer"
      >
        {/* Bird Avatar */}
        <div
          className="absolute left-[50px] w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center text-lg shadow-lg shadow-cyan-500/50 transition-transform duration-75"
          style={{
            top: `${birdY}px`,
            transform: `rotate(${Math.min(30, Math.max(-30, velocity * 4))}deg)`
          }}
        >
          {currentSkinObj.icon}
        </div>

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            {/* Top Pipe (Stack Overflow) */}
            <div
              className="absolute w-10 bg-gradient-to-b from-rose-600 to-rose-800 border-2 border-rose-400 rounded-b-xl shadow-md"
              style={{
                left: `${pipe.x}px`,
                top: 0,
                height: `${pipe.topHeight}px`
              }}
            />

            {/* Bottom Pipe (Memory Leak) */}
            <div
              className="absolute w-10 bg-gradient-to-t from-purple-600 to-purple-800 border-2 border-purple-400 rounded-t-xl shadow-md"
              style={{
                left: `${pipe.x}px`,
                bottom: 0,
                height: `${pipe.bottomHeight}px`
              }}
            />
          </React.Fragment>
        ))}

        {/* Start Overlay */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
            <span className="text-3xl mb-2 animate-bounce">👆</span>
            <h3 className="font-heading font-black text-lg text-white">Tap to Jump & Dodge Bugs!</h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">Collect {targetScore} Gems to win</p>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-4 space-y-3">
            <span className="text-3xl">💥</span>
            <h3 className="font-heading font-black text-xl text-rose-400">Stack Overflow Crash!</h3>
            <p className="text-xs text-slate-300 font-mono">Score: {score} Gems</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="btn-cyber-primary text-xs px-5 py-2 font-bold flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>

      <p className="text-xs font-mono text-slate-400">
        Click, Tap, or Press Space to jump through memory leak pipes!
      </p>
    </div>
  );
};
