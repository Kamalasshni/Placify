import React from 'react';
import { Award, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const LevelUpModal = () => {
  const { levelUpModalData, setLevelUpModalData } = useGame();

  if (!levelUpModalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel border-2 border-amber-500/50 p-8 rounded-3xl text-center shadow-2xl bg-[#0e1224] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Level Emblem */}
        <div className="relative mx-auto w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-500 p-1 mb-4 shadow-xl shadow-amber-500/30 animate-bounce">
          <div className="w-full h-full bg-[#0d101e] rounded-[14px] flex flex-col items-center justify-center">
            <span className="text-3xl">👑</span>
            <span className="text-xs font-mono font-bold text-amber-400">LVL {levelUpModalData.newLevel}</span>
          </div>
        </div>

        {/* Text */}
        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
          LEVEL UP ACHIEVED!
        </span>
        <h2 className="text-3xl font-heading font-black text-white mb-1">
          {levelUpModalData.title}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Your algorithmic endurance and placement mastery have evolved to a new tier.
        </p>

        {/* Rewards Box */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 flex items-center justify-around">
          <div>
            <p className="text-xs text-slate-400 font-mono">PRI BOOST</p>
            <p className="text-lg font-heading font-bold text-emerald-400">+3.0%</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-xs text-slate-400 font-mono">BONUS GEMS</p>
            <p className="text-lg font-heading font-bold text-cyan-400">+{levelUpModalData.bonusGems} 💎</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-xs text-slate-400 font-mono">NEW RANK</p>
            <p className="text-lg font-heading font-bold text-amber-400">Lv. {levelUpModalData.newLevel}</p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            playSound('click');
            setLevelUpModalData(null);
          }}
          className="w-full btn-cyber-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
        >
          <span>Claim Rewards & Continue</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
