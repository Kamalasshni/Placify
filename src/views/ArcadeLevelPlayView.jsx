import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Timer, 
  Flame, 
  Star, 
  Sparkles, 
  Zap, 
  Shield, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  Code2,
  Play,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { getLevelByNumber } from '../data/gameLevels';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const ArcadeLevelPlayView = ({ levelNumber = 1, onExitLevel }) => {
  const { 
    hearts, 
    maxHearts, 
    inventory, 
    loseHeart, 
    useInventoryItem, 
    finishLevel, 
    refillHearts, 
    setShowShopModal, 
    user 
  } = useGame();

  const levelData = getLevelByNumber(levelNumber);

  // Gameplay State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(levelData.timePerQuestion || 15);
  const [isFrozen, setIsFrozen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // Boss Battle specific state for Levels 9 & 10
  const [bossCurrentHp, setBossCurrentHp] = useState(levelData.bossHp || 1000);
  const [bossHitAnim, setBossHitAnim] = useState(false);

  // Active Challenge references
  const isBossFight = levelData.gameType === 'boss_fight';
  const isBugBuster = levelData.gameType === 'bug_buster';
  const isAlgoDuel = levelData.gameType === 'algo_duel';

  const totalChallenges = isBossFight
    ? levelData.bossRounds.length
    : isBugBuster
    ? levelData.codePuzzles.length
    : isAlgoDuel
    ? levelData.duelRounds.length
    : levelData.questions.length;

  const currentChallenge = isBossFight
    ? levelData.bossRounds[currentQIndex]
    : isBugBuster
    ? levelData.codePuzzles[currentQIndex]
    : isAlgoDuel
    ? levelData.duelRounds[currentQIndex]
    : levelData.questions[currentQIndex];

  // Game Countdown Timer
  useEffect(() => {
    if (isAnswerRevealed || isFrozen || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAnswerRevealed, isFrozen, timeLeft, currentQIndex]);

  const handleTimeOut = () => {
    handleWrongAnswer('Time ran out!');
  };

  const handleSelectOption = (idx) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);

    const isCorrect = isBugBuster 
      ? idx === currentChallenge.bugLineIndex 
      : idx === currentChallenge.ans;

    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    const newCombo = combo + 1;
    setCombo(newCombo);
    playSound('combo_hit', { combo: newCombo });

    // Score calculation with combo bonus & speed bonus
    const speedBonus = timeLeft * 10;
    const comboMultiplier = 1 + (newCombo - 1) * 0.5;
    const earnedPoints = Math.round((150 + speedBonus) * comboMultiplier);
    setScore(prev => prev + earnedPoints);

    if (isBossFight) {
      playSound('boss_hit');
      setBossHitAnim(true);
      setTimeout(() => setBossHitAnim(false), 400);
      const dmg = Math.round((currentChallenge.dmgToBoss || 350) * comboMultiplier);
      setBossCurrentHp(prev => Math.max(0, prev - dmg));
    }
  };

  const handleWrongAnswer = (reason = '') => {
    setCombo(0);
    setIsShake(true);
    setTimeout(() => setIsShake(false), 400);

    const result = loseHeart();
    if (result.blockedByShield) {
      // Shield saved the heart!
      alert('🛡️ AI Firewall Shield absorbed the penalty! 0 Hearts lost.');
    }
  };

  const handleNextChallenge = () => {
    playSound('click');
    if (currentQIndex < totalChallenges - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setEliminatedOptions([]);
      setIsAnswerRevealed(false);
      setTimeLeft(levelData.timePerQuestion || 15);
      setIsFrozen(false);
    } else {
      handleLevelComplete();
    }
  };

  const handleLevelComplete = () => {
    // Calculate 1, 2, or 3 Stars based on score thresholds
    let stars = 1;
    if (score >= levelData.starThresholds[3]) {
      stars = 3;
    } else if (score >= levelData.starThresholds[2]) {
      stars = 2;
    }

    playSound('victory');
    finishLevel(levelNumber, score, stars, levelData.xpReward, levelData.gemReward);
  };

  // Power-up triggers
  const handleUseTimeFreeze = () => {
    if (useInventoryItem('time_freeze')) {
      playSound('freeze_sound');
      setIsFrozen(true);
      setTimeLeft(prev => prev + 15);
    } else {
      setShowShopModal(true);
    }
  };

  const handleUseExcalibur = () => {
    if (isBugBuster) return; // Cannot eliminate in code line spotter
    if (useInventoryItem('excalibur')) {
      const wrong = currentChallenge.options
        .map((_, i) => i)
        .filter(i => i !== currentChallenge.ans);
      setEliminatedOptions(wrong.slice(0, 2));
    } else {
      setShowShopModal(true);
    }
  };

  // Out of hearts Game Over screen
  if (hearts <= 0) {
    return (
      <div className="max-w-md mx-auto glass-panel border border-rose-500/50 p-8 rounded-3xl text-center space-y-6 animate-fadeIn bg-gradient-to-b from-[#1c0e18] to-[#090b14]">
        <div className="text-5xl animate-bounce">💔</div>
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
            OUT OF CANDIDATE LIVES
          </span>
          <h2 className="text-3xl font-heading font-black text-white mt-2">
            Game Over!
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            You ran out of hearts in Level {levelNumber}. Refill your hearts instantly using in-game gems to continue your placement streak!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              if (user.gems >= 50) {
                refillHearts();
              } else {
                setShowShopModal(true);
              }
            }}
            className="w-full btn-cyber-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
          >
            <Heart size={15} className="fill-rose-400 text-rose-400" />
            <span>Refill Hearts (50 💎)</span>
          </button>

          <button
            onClick={onExitLevel}
            className="w-full btn-cyber-secondary py-2.5 rounded-xl text-xs font-semibold"
          >
            <span>Return to World Map</span>
          </button>
        </div>
      </div>
    );
  }

  const bossHpPercent = isBossFight ? Math.max(0, Math.round((bossCurrentHp / levelData.bossHp) * 100)) : 100;

  return (
    <div className={`max-w-4xl mx-auto space-y-6 animate-fadeIn ${isShake ? 'animate-shake' : ''}`}>
      {/* Arcade Level Play Top HUD */}
      <div className="glass-panel p-4 md:p-6 rounded-3xl border border-indigo-500/30 flex items-center justify-between gap-4">
        {/* Exit to Map */}
        <button
          onClick={onExitLevel}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Map</span>
        </button>

        {/* Level Title & Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400">LVL {levelNumber}</span>
            <span className="text-xs text-slate-500">•</span>
            <h2 className="font-heading font-black text-sm md:text-base text-white truncate max-w-[200px] sm:max-w-none">
              {levelData.title}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Challenge {currentQIndex + 1} of {totalChallenges}
          </span>
        </div>

        {/* Score & Combo Pill */}
        <div className="flex items-center gap-3">
          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-black text-xs animate-bounce">
              <Flame size={14} className="fill-amber-400" />
              <span>{combo}x COMBO!</span>
            </div>
          )}

          <div className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/30 font-mono font-black text-sm text-purple-300">
            {score} PTS
          </div>
        </div>
      </div>

      {/* BOSS HP BAR (If Level 9 or 10) */}
      {isBossFight && (
        <div className="glass-panel p-4 rounded-2xl border border-rose-500/40 bg-gradient-to-r from-[#1b0d18] to-[#090b14] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-300">
            <span className="flex items-center gap-1.5">
              <span className="text-lg">{levelData.bossAvatar}</span>
              <span>{levelData.bossName}</span>
            </span>
            <span>{bossCurrentHp} / {levelData.bossHp} HP ({bossHpPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div className="health-bar-boss h-full rounded-full transition-all duration-300" style={{ width: `${bossHpPercent}%` }} />
          </div>
        </div>
      )}

      {/* ACTIVE ARCADE CHALLENGE WINDOW */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
        {/* Turn Clock & Timer */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-semibold">
            {levelData.category}
          </span>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-mono text-xs font-bold ${
            isFrozen
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse'
              : timeLeft <= 5
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-ping'
              : 'bg-white/5 border-white/10 text-amber-400'
          }`}>
            <Timer size={14} />
            <span>{isFrozen ? '❄️ FROZEN' : `${timeLeft}s`}</span>
          </div>
        </div>

        {/* BOSS THREAT / ACTION BANNER */}
        {isBossFight && currentChallenge.action && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300">
            ⚡ {currentChallenge.action}
          </div>
        )}

        {/* RENDER BUG BUSTER CODE SNIPPET (Level 2) */}
        {isBugBuster && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-base">
                {currentChallenge.title}
              </h3>
              <span className="text-xs font-mono text-purple-400">Tap the bug line!</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#090b14] font-mono text-xs">
              <div className="bg-[#12162a] px-4 py-1.5 border-b border-white/10 text-slate-400 font-bold">
                {currentChallenge.language} Editor
              </div>
              <div className="p-3 space-y-1">
                {currentChallenge.lines.map((line, lineIdx) => {
                  const isSelected = selectedOption === lineIdx;
                  const isBug = lineIdx === currentChallenge.bugLineIndex;

                  let lineClass = 'hover:bg-white/10 text-slate-300';
                  if (isAnswerRevealed) {
                    if (isBug) lineClass = 'bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/50';
                    else if (isSelected) lineClass = 'bg-rose-500/30 text-rose-300 font-bold';
                  }

                  return (
                    <div
                      key={lineIdx}
                      onClick={() => handleSelectOption(lineIdx)}
                      className={`p-2 rounded-lg cursor-pointer transition flex items-center justify-between gap-2 ${lineClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 select-none w-6 text-right font-mono">{lineIdx + 1}</span>
                        <span>{line}</span>
                      </div>
                      {isAnswerRevealed && isBug && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {isAnswerRevealed && isSelected && !isBug && <XCircle size={16} className="text-rose-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* RENDER STANDARD MULTIPLE CHOICE ARCADE (Levels 1, 3-10) */}
        {!isBugBuster && (
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-heading font-semibold text-white leading-relaxed whitespace-pre-line">
              {currentChallenge.q}
            </h3>

            <div className="space-y-3">
              {currentChallenge.options.map((opt, optIdx) => {
                const isEliminated = eliminatedOptions.includes(optIdx);
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentChallenge.ans;

                if (isEliminated) {
                  return (
                    <div key={optIdx} className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 opacity-30 text-slate-600 line-through text-xs font-mono">
                      [Option Eliminated by 50/50 Excalibur]
                    </div>
                  );
                }

                let btnStyle = 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-slate-200';
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-white shadow-md shadow-rose-500/20';
                  } else {
                    btnStyle = 'bg-white/[0.01] border-white/5 opacity-40 text-slate-500';
                  }
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border transition duration-150 cursor-pointer flex items-center justify-between gap-4 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 bg-white/5 border border-white/10">
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm">{opt}</span>
                    </div>
                    {isAnswerRevealed && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                    {isAnswerRevealed && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SOLUTION & EXPLANATION REVEAL */}
        {isAnswerRevealed && (
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed animate-fadeIn">
            <span className="font-mono font-bold text-cyan-400 block mb-1">💡 Solution Breakdown:</span>
            {currentChallenge.exp || currentChallenge.explanation}
          </div>
        )}

        {/* FOOTER & POWER-UP BAR */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          {/* Power-ups Inventory Bar */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleUseTimeFreeze}
              disabled={isAnswerRevealed || isFrozen}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono transition disabled:opacity-40"
              title="Pauses timer for 15 seconds"
            >
              <span>❄️ Freeze</span>
              <span className="font-bold">({inventory.time_freeze || 0})</span>
            </button>

            {!isBugBuster && (
              <button
                onClick={handleUseExcalibur}
                disabled={isAnswerRevealed || eliminatedOptions.length > 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono transition disabled:opacity-40"
                title="Eliminates 2 wrong options"
              >
                <span>⚔️ 50/50</span>
                <span className="font-bold">({inventory.excalibur || 0})</span>
              </button>
            )}
          </div>

          {/* Next Button */}
          {isAnswerRevealed && (
            <button
              onClick={handleNextChallenge}
              className="btn-cyber-primary text-xs px-6 py-2.5 font-bold flex items-center gap-1.5"
            >
              <span>{currentQIndex < totalChallenges - 1 ? 'Next Challenge' : 'Complete Level!'}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
