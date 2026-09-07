import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Timer, Flame, Trophy, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

const BUG_TYPES = [
  { icon: '🐛', name: 'Null Pointer', points: 50 },
  { icon: '🪲', name: 'Memory Leak', points: 75 },
  { icon: '🕷️', name: 'Deadlock Hazard', points: 100 },
  { icon: '🐞', name: 'Stack Overflow', points: 60 }
];

export const WhackABugGame = ({ onGameComplete }) => {
  const [activeHoles, setActiveHoles] = useState({}); // { 0: bugObj, 4: bugObj }
  const [whackedCount, setWhackedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [floatingText, setFloatingText] = useState([]);

  const targetWhacks = 15;

  // Countdown clock
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame(score, whackedCount);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, timeLeft, score, whackedCount]);

  // Bug Spawning Loop
  useEffect(() => {
    if (isFinished) return;

    const spawner = setInterval(() => {
      const randomHole = Math.floor(Math.random() * 9);
      const randomBug = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];

      setActiveHoles(prev => ({
        ...prev,
        [randomHole]: randomBug
      }));

      // Auto-hide bug after 1.2s if not whacked
      setTimeout(() => {
        setActiveHoles(prev => {
          const copy = { ...prev };
          delete copy[randomHole];
          return copy;
        });
      }, 1200);
    }, 700);

    return () => clearInterval(spawner);
  }, [isFinished]);

  const handleWhack = (holeIndex) => {
    if (isFinished || !activeHoles[holeIndex]) return;

    const bug = activeHoles[holeIndex];
    playSound('boss_hit');

    // Remove from active
    setActiveHoles(prev => {
      const copy = { ...prev };
      delete copy[holeIndex];
      return copy;
    });

    const newCombo = combo + 1;
    setCombo(newCombo);
    playSound('combo_hit', { combo: newCombo });

    const earned = Math.round(bug.points * (1 + newCombo * 0.25));
    setScore(prev => prev + earned);
    const newTotalWhacks = whackedCount + 1;
    setWhackedCount(newTotalWhacks);

    // Floating score popup
    const id = Date.now();
    setFloatingText(prev => [...prev, { id, text: `+${earned} PTS! (${bug.name})` }]);
    setTimeout(() => {
      setFloatingText(prev => prev.filter(f => f.id !== id));
    }, 800);

    if (newTotalWhacks >= targetWhacks) {
      finishGame(score + earned, newTotalWhacks);
    }
  };

  const finishGame = (finalScore, finalWhacks) => {
    setIsFinished(true);
    playSound('victory');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

    setTimeout(() => {
      if (onGameComplete) {
        onGameComplete(finalScore, finalWhacks >= targetWhacks ? 3 : 2);
      }
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 animate-fadeIn text-center select-none">
      {/* HUD Header */}
      <div className="glass-panel p-4 rounded-2xl border border-rose-500/30 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Timer size={16} className={timeLeft <= 8 ? 'animate-ping text-rose-400' : ''} />
          <span>{timeLeft}s</span>
        </div>

        <div className="flex items-center gap-2">
          {combo > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center gap-1 animate-bounce">
              <Flame size={12} className="fill-amber-400" /> {combo}x
            </span>
          )}
          <span className="text-purple-300 font-bold text-sm">{score} PTS</span>
        </div>

        <div className="text-emerald-400 font-bold">
          {whackedCount} / {targetWhacks} Whacked
        </div>
      </div>

      {/* Floating combo notification */}
      {floatingText.map(ft => (
        <div key={ft.id} className="text-rose-400 font-heading font-black text-sm animate-bounce">
          🔨 {ft.text}
        </div>
      ))}

      {/* 3x3 Server Holes Grid */}
      <div className="glass-panel p-5 rounded-3xl border border-white/15 bg-[#0e1122] shadow-2xl inline-block">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => {
            const currentBug = activeHoles[i];
            return (
              <div
                key={i}
                onClick={() => handleWhack(i)}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex items-center justify-center text-4xl cursor-pointer transition-all duration-100 transform active:scale-90 ${
                  currentBug
                    ? 'bg-rose-500/30 border-rose-400 scale-105 shadow-lg shadow-rose-500/40 animate-bounce'
                    : 'bg-[#090b14] border-white/10 hover:border-white/20'
                }`}
              >
                {currentBug ? (
                  <span className="drop-shadow-lg cursor-pointer">
                    {currentBug.icon}
                  </span>
                ) : (
                  <span className="text-slate-700 text-xs font-mono select-none">PORT {i + 1}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs font-mono text-slate-400">
        Tap the bugs popping out of the server ports before they cause a production crash!
      </p>
    </div>
  );
};
