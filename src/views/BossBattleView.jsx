import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Shield, 
  Timer, 
  Sparkles, 
  Zap, 
  Flame, 
  Award, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Bot
} from 'lucide-react';
import { getBossForCompany } from '../data/bossBattles';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const BossBattleView = ({ setActiveTab }) => {
  const { 
    user, 
    targetCompany, 
    addXP, 
    addGems, 
    unlockBadge, 
    setShowCertModal 
  } = useGame();

  const bossData = getBossForCompany(targetCompany.id);

  // Combat State
  const [bossHp, setBossHp] = useState(bossData.maxHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [roundIdx, setRoundIdx] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [shieldActive, setShieldActive] = useState(false);
  const [combatLog, setCombatLog] = useState([
    `${bossData.bossName}: "${bossData.introDialogue}"`
  ]);
  const [battleState, setBattleState] = useState('fighting'); // 'fighting', 'victory', 'defeat'
  const [isHitAnim, setIsHitAnim] = useState(false);

  const currentRound = bossData.rounds[roundIdx] || bossData.rounds[0];

  // Round Timer
  useEffect(() => {
    if (battleState !== 'fighting' || selectedOption !== null) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [battleState, selectedOption, roundIdx]);

  const handleTimeout = () => {
    playSound('boss_attack');
    const dmg = currentRound.damageToPlayer;
    setPlayerHp(prev => Math.max(0, prev - dmg));
    setCombo(0);
    setCombatLog(prev => [
      `⏰ TIME OUT! ${bossData.bossName} struck you with ${currentRound.bossAction} for ${dmg} DMG!`,
      ...prev
    ]);
    checkDefeat(playerHp - dmg);
  };

  const handleSelectOption = (idx) => {
    if (selectedOption !== null || battleState !== 'fighting') return;
    setSelectedOption(idx);

    const isCorrect = idx === currentRound.correctAnswer;

    if (isCorrect) {
      playSound('boss_hit');
      setIsHitAnim(true);
      setTimeout(() => setIsHitAnim(false), 500);

      const comboBonus = 1 + combo * 0.25;
      const totalDmg = Math.round(currentRound.damageToBoss * comboBonus);
      const newBossHp = Math.max(0, bossHp - totalDmg);
      setBossHp(newBossHp);
      setCombo(prev => prev + 1);

      setCombatLog(prev => [
        `💥 CRITICAL HIT! You answered correctly and dealt ${totalDmg} DMG! (Combo: ${combo + 1}x)`,
        ...prev
      ]);

      if (newBossHp <= 0 || roundIdx >= bossData.rounds.length - 1) {
        handleVictory();
      } else {
        setTimeout(() => nextRound(), 1200);
      }
    } else {
      playSound('boss_attack');
      let incomingDmg = currentRound.damageToPlayer;
      if (shieldActive) {
        incomingDmg = Math.round(incomingDmg * 0.3);
        setShieldActive(false);
      }

      const newPlayerHp = Math.max(0, playerHp - incomingDmg);
      setPlayerHp(newPlayerHp);
      setCombo(0);

      setCombatLog(prev => [
        `❌ WRONG CODE! ${bossData.bossName} retaliated for ${incomingDmg} DMG!`,
        ...prev
      ]);

      checkDefeat(newPlayerHp);
    }
  };

  const nextRound = () => {
    if (roundIdx < bossData.rounds.length - 1) {
      setRoundIdx(prev => prev + 1);
      setSelectedOption(null);
      setEliminatedOptions([]);
      setTimeLeft(30);
    }
  };

  const checkDefeat = (hp) => {
    if (hp <= 0) {
      playSound('wrong');
      setBattleState('defeat');
      setCombatLog(prev => [`💀 DEFEATED! ${bossData.bossName}: "${bossData.defeatDialogue}"`, ...prev]);
    } else {
      setTimeout(() => nextRound(), 1200);
    }
  };

  const handleVictory = () => {
    playSound('victory');
    setBattleState('victory');
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });

    addXP(800);
    addGems(150);

    unlockBadge({
      id: `boss-slayer-${targetCompany.id}`,
      name: `${targetCompany.name} Boss Slayer`,
      desc: `Defeated ${bossData.bossName} in the final placement simulation round.`,
      icon: '⚔️',
      unlockedAt: 'Today'
    });

    setCombatLog(prev => [
      `🎉 VICTORY! ${bossData.bossName}: "${bossData.victoryDialogue}"`,
      ...prev
    ]);
  };

  const handleUsePowerup = (type) => {
    if (battleState !== 'fighting') return;
    playSound('click');

    switch (type) {
      case 'shield':
        setShieldActive(true);
        setCombatLog(prev => ['🛡️ AI Shield Activated: Next incoming hit reduced by 70%!', ...prev]);
        break;
      case 'timewarp':
        setTimeLeft(prev => prev + 15);
        setCombatLog(prev => ['⏳ Time Warp: +15 Seconds added to turn clock!', ...prev]);
        break;
      case '5050':
        // Eliminate 2 wrong options
        const wrongIndices = currentRound.options
          .map((_, i) => i)
          .filter(i => i !== currentRound.correctAnswer);
        const toEliminate = wrongIndices.slice(0, 2);
        setEliminatedOptions(toEliminate);
        setCombatLog(prev => ['⚔️ 50/50 Excalibur eliminated 2 incorrect choices!', ...prev]);
        break;
      case 'debug_strike':
        playSound('boss_hit');
        setBossHp(prev => Math.max(0, prev - 150));
        setCombatLog(prev => ['🤖 AI Debugger Strike dealt 150 direct unblockable damage!', ...prev]);
        break;
    }
  };

  const resetBattle = () => {
    playSound('click');
    setBossHp(bossData.maxHp);
    setPlayerHp(100);
    setRoundIdx(0);
    setCombo(0);
    setTimeLeft(30);
    setSelectedOption(null);
    setEliminatedOptions([]);
    setShieldActive(false);
    setBattleState('fighting');
    setCombatLog([`${bossData.bossName}: "${bossData.introDialogue}"`]);
  };

  const bossHpPercent = Math.max(0, Math.round((bossHp / bossData.maxHp) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div 
        className="glass-panel p-6 rounded-3xl border border-rose-500/40 relative overflow-hidden shadow-2xl"
        style={{ backgroundImage: bossData.bgGradient }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Boss Profile */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-1 shadow-lg shadow-rose-500/30 ${isHitAnim ? 'animate-shake' : 'animate-float'}`}>
              <div className="w-full h-full bg-[#0d1020] rounded-[12px] flex items-center justify-center text-4xl">
                {bossData.bossAvatar}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                  STAGE 5 BOSS
                </span>
                <span className="text-xs text-slate-400">• {targetCompany.name}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
                {bossData.bossName}
              </h1>
              <p className="text-xs text-slate-300">{bossData.bossTitle}</p>
            </div>
          </div>

          {/* Combat HUD Metrics */}
          <div className="w-full md:w-72 space-y-3 font-mono text-xs">
            {/* Boss HP */}
            <div>
              <div className="flex justify-between text-rose-400 font-bold mb-1">
                <span>BOSS HP</span>
                <span>{bossHp} / {bossData.maxHp} ({bossHpPercent}%)</span>
              </div>
              <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div 
                  className="health-bar-boss h-full rounded-full transition-all duration-300"
                  style={{ width: `${bossHpPercent}%` }}
                />
              </div>
            </div>

            {/* Player HP */}
            <div>
              <div className="flex justify-between text-emerald-400 font-bold mb-1">
                <span>CANDIDATE HP</span>
                <span>{playerHp} / 100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div 
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMBAT ARENA MAIN */}
      {battleState === 'fighting' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question / Combat Phase Card */}
          <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
            {/* Combat Round Meta */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-purple-400 font-bold">
                  Phase {roundIdx + 1} of {bossData.rounds.length}
                </span>
                {combo > 1 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                    <Flame size={12} className="text-amber-400 fill-amber-400" />
                    {combo}x COMBO
                  </span>
                )}
              </div>

              {/* Turn Timer */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
                <Timer size={14} className={timeLeft <= 10 ? 'text-rose-400 animate-ping' : 'text-amber-400'} />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Boss Threat Action */}
            <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center gap-2">
              <Zap size={15} className="text-rose-400 shrink-0" />
              <span>{currentRound.bossAction}</span>
            </div>

            {/* Question */}
            <h3 className="text-lg md:text-xl font-heading font-semibold text-white leading-relaxed">
              {currentRound.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentRound.options.map((opt, i) => {
                const isEliminated = eliminatedOptions.includes(i);
                const isSelected = selectedOption === i;
                const isCorrect = i === currentRound.correctAnswer;

                if (isEliminated) {
                  return (
                    <div key={i} className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 opacity-30 text-slate-600 line-through text-xs font-mono">
                      [Option Eliminated by 50/50 Excalibur]
                    </div>
                  );
                }

                let btnStyle = 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-slate-200';
                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-white';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-white';
                  }
                }

                return (
                  <div
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={`p-4 rounded-2xl border transition duration-150 cursor-pointer flex items-center justify-between gap-4 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 bg-white/5 border border-white/10">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm">{opt}</span>
                    </div>
                    {selectedOption !== null && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                    {selectedOption !== null && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Power-ups & Combat Log */}
          <div className="lg:col-span-4 space-y-4">
            {/* Power-ups Panel */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold block">
                SPECIAL CANDIDATE SKILLS
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUsePowerup('5050')}
                  disabled={eliminatedOptions.length > 0}
                  className="p-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-left transition disabled:opacity-40"
                >
                  <span className="text-sm block">⚔️ 50/50 Slash</span>
                  <span className="text-[10px] text-slate-400">Remove 2 wrong</span>
                </button>

                <button
                  onClick={() => handleUsePowerup('timewarp')}
                  className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition"
                >
                  <span className="text-sm block">⏳ Time Warp</span>
                  <span className="text-[10px] text-slate-400">+15s Clock</span>
                </button>

                <button
                  onClick={() => handleUsePowerup('shield')}
                  disabled={shieldActive}
                  className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition disabled:opacity-40"
                >
                  <span className="text-sm block">🛡️ AI Shield</span>
                  <span className="text-[10px] text-slate-400">-70% Next Dmg</span>
                </button>

                <button
                  onClick={() => handleUsePowerup('debug_strike')}
                  className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left transition"
                >
                  <span className="text-sm block">🤖 Debug Strike</span>
                  <span className="text-[10px] text-slate-400">150 Instant DMG</span>
                </button>
              </div>
            </div>

            {/* Real-time Combat Log */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold block">
                BATTLE TRANSMISSION LOG
              </span>
              <div className="h-44 overflow-y-auto no-scrollbar space-y-2 font-mono text-xs">
                {combatLog.map((log, i) => (
                  <div key={i} className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300 leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VICTORY SCREEN */}
      {battleState === 'victory' && (
        <div className="glass-panel border-2 border-amber-500/50 p-8 md:p-12 rounded-3xl text-center space-y-6 animate-fadeIn bg-gradient-to-b from-[#131730] to-[#090b14]">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-purple-600 p-1 mx-auto shadow-2xl shadow-amber-500/40 animate-bounce">
            <div className="w-full h-full bg-[#0d1020] rounded-[22px] flex items-center justify-center text-4xl">
              👑
            </div>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
              PLACEMENT BAR RAISED & CONQUERED!
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mt-2">
              Defeated {bossData.bossName}
            </h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
              "{bossData.victoryDialogue}"
            </p>
          </div>

          {/* Loot Drops */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto grid grid-cols-3 gap-2 font-mono text-xs">
            <div>
              <span className="text-slate-400 block">LOOT XP</span>
              <span className="text-lg font-bold text-purple-400">+800 XP</span>
            </div>
            <div>
              <span className="text-slate-400 block">LOOT GEMS</span>
              <span className="text-lg font-bold text-cyan-400">+150 💎</span>
            </div>
            <div>
              <span className="text-slate-400 block">PRI BOOST</span>
              <span className="text-lg font-bold text-emerald-400">+10%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                playSound('click');
                setShowCertModal(true);
              }}
              className="btn-cyber-primary px-6 py-3 text-xs font-bold"
            >
              <Award size={15} />
              <span>Claim Placement Ready Certificate</span>
            </button>
            <button
              onClick={resetBattle}
              className="btn-cyber-secondary px-5 py-3 text-xs font-semibold"
            >
              <RefreshCw size={14} />
              <span>Fight Again</span>
            </button>
          </div>
        </div>
      )}

      {/* DEFEAT SCREEN */}
      {battleState === 'defeat' && (
        <div className="glass-panel border border-rose-500/50 p-8 rounded-3xl text-center space-y-6 animate-fadeIn bg-gradient-to-b from-[#180e18] to-[#090b14]">
          <div className="text-5xl">💀</div>
          <div>
            <h2 className="text-2xl font-heading font-black text-white">
              Defeated by {bossData.bossName}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              "{bossData.defeatDialogue}"
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={resetBattle}
              className="btn-cyber-primary px-6 py-3 text-xs font-bold"
            >
              <RefreshCw size={14} />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('code-arena');
              }}
              className="btn-cyber-secondary px-5 py-3 text-xs"
            >
              <span>Practice in Code Arena</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
