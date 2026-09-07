import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Star, ArrowRight, Gift, Zap } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const LootChestModal = () => {
  const { 
    showLootChest, 
    lootChestData, 
    setShowLootChest, 
    setActivePlayLevel 
  } = useGame();

  const [isOpened, setIsOpened] = useState(false);

  if (!showLootChest || !lootChestData) return null;

  const handleOpenChest = () => {
    playSound('chest_open');
    setIsOpened(true);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const handleContinue = () => {
    playSound('click');
    setShowLootChest(false);
    setIsOpened(false);
    setActivePlayLevel(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel border-2 border-amber-500/50 p-6 md:p-8 rounded-3xl text-center shadow-2xl bg-[#0d1022] overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {!isOpened ? (
          /* CLOSED VIBRATING CHEST */
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider border border-amber-500/30 animate-pulse">
              LEVEL {lootChestData.levelNumber} VICTORY!
            </span>

            {/* Stars Preview */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  size={32}
                  className={`${
                    s <= lootChestData.stars
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-bounce'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Vibrating Treasure Chest */}
            <div 
              onClick={handleOpenChest}
              className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-600 to-yellow-400 p-1 shadow-2xl shadow-amber-500/40 cursor-pointer animate-shake group"
            >
              <div className="w-full h-full bg-[#12162a] rounded-[22px] flex flex-col items-center justify-center">
                <span className="text-5xl group-hover:scale-125 transition duration-200">🎁</span>
                <span className="text-[10px] font-mono text-amber-300 font-bold mt-1">TAP TO OPEN</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl text-white">
                Mystery Loot Chest Earned!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Score: <strong className="text-cyan-400 font-mono">{lootChestData.score} PTS</strong>
              </p>
            </div>

            <button
              onClick={handleOpenChest}
              className="w-full btn-cyber-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
            >
              <Gift size={16} />
              <span>Crack Open Loot Chest</span>
            </button>
          </div>
        ) : (
          /* OPENED CHEST LOOT DROPS */
          <div className="space-y-6 animate-fadeIn">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              CHEST UNLOCKED!
            </span>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  size={28}
                  className={`${
                    s <= lootChestData.stars
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>

            <h2 className="text-2xl font-heading font-black text-white">
              Rewards Collected!
            </h2>

            {/* Loot List */}
            <div className="space-y-2.5 max-w-xs mx-auto text-xs font-mono">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-slate-400">XP EARNED</span>
                <span className="font-bold text-purple-400 text-sm">+{lootChestData.earnedXp} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-slate-400">GEMS EARNED</span>
                <span className="font-bold text-cyan-400 text-sm">+{lootChestData.earnedGems} 💎</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-amber-300 font-bold">
                <span>MYSTERY DROP:</span>
                <span>{lootChestData.drop.name}</span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full btn-cyber-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Back to World Map</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
