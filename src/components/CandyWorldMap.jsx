import React, { useState } from 'react';
import { 
  Lock, 
  Star, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  Flame, 
  ChevronRight,
  Shield,
  Zap,
  Award,
  Crown
} from 'lucide-react';
import { GAME_LEVELS } from '../data/gameLevels';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const CandyWorldMap = ({ onSelectLevelToPlay }) => {
  const { 
    user, 
    unlockedLevels, 
    levelStars, 
    highScores, 
    currentSkinObj, 
    targetCompany,
    hearts,
    setShowShopModal
  } = useGame();

  const [selectedLevelPreview, setSelectedLevelPreview] = useState(null);

  // Highest unlocked level for avatar positioning
  const currentHighestLevel = Math.max(...unlockedLevels, 1);

  const handleNodeClick = (level) => {
    playSound('click');
    const isUnlocked = unlockedLevels.includes(level.levelNumber);
    if (!isUnlocked) {
      playSound('wrong');
      return;
    }
    setSelectedLevelPreview(level);
  };

  const handlePlayLevel = (level) => {
    if (hearts <= 0) {
      playSound('wrong');
      setShowShopModal(true);
      return;
    }
    playSound('correct');
    setSelectedLevelPreview(null);
    onSelectLevelToPlay(level.levelNumber);
  };

  const totalStarsEarned = Object.values(levelStars).reduce((a, b) => a + b, 0);

  // Colors per island
  const islandGradients = [
    'from-cyan-500 via-blue-600 to-indigo-600',
    'from-purple-500 via-pink-600 to-rose-600',
    'from-blue-500 via-indigo-600 to-purple-600',
    'from-amber-400 via-orange-500 to-rose-500',
    'from-emerald-400 via-teal-500 to-cyan-600',
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-pink-500 via-rose-500 to-orange-500',
    'from-teal-400 via-emerald-500 to-green-600',
    'from-rose-600 via-red-600 to-amber-600',
    'from-amber-400 via-yellow-500 to-orange-500'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16 select-none">
      {/* Top Banner with Stars & Company */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-[#0d1024] via-[#141838] to-[#090b14] shadow-2xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 animate-pulse">
              <span>🍬</span>
              <span>CANDY ARCADE WORLD MAP</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• Target: <strong>{targetCompany.name}</strong></span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Placement Kingdom Path
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Hop from level to level, score 3 Stars (⭐⭐⭐) in every arcade game, and conquer the Grandmaster Placement Trial!
          </p>
        </div>

        {/* Total Stars Counter */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
          <Star size={26} className="text-amber-400 fill-amber-400 animate-bounce drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block font-bold">TOTAL STARS</span>
            <span className="text-xl font-heading font-black text-amber-300 font-mono">
              {totalStarsEarned} / 30 ⭐
            </span>
          </div>
        </div>
      </div>

      {/* S-CURVE WINDING CANDY PATH */}
      <div className="relative py-12 flex flex-col items-center">
        {/* Colorful winding background trail */}
        <div className="absolute top-12 bottom-12 w-3 bg-gradient-to-b from-cyan-400 via-pink-500 via-purple-500 to-amber-400 rounded-full opacity-60 shadow-[0_0_25px_rgba(236,72,153,0.8)] pointer-events-none" />

        <div className="w-full max-w-xl space-y-12 relative z-10">
          {GAME_LEVELS.map((lvl, index) => {
            const isUnlocked = unlockedLevels.includes(lvl.number || lvl.levelNumber);
            const levelNum = lvl.number || lvl.levelNumber;
            const stars = levelStars[levelNum] || 0;
            const isPawnHere = levelNum === currentHighestLevel;

            // S-Curve horizontal coordinates
            const offsets = [
              '-translate-x-20 sm:-translate-x-28',
              '-translate-x-6 sm:-translate-x-10',
              'translate-x-20 sm:translate-x-28',
              'translate-x-6 sm:translate-x-10'
            ];
            const curveClass = offsets[index % 4];
            const gradient = islandGradients[index % islandGradients.length];

            return (
              <div
                key={levelNum}
                className={`flex flex-col items-center transition-all duration-300 ${curveClass}`}
              >
                {/* ANIMATED PAWN STANDING ON ACTIVE NODE */}
                {isPawnHere && (
                  <div className="mb-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-heading font-black text-xs shadow-xl shadow-amber-500/60 animate-bounce flex items-center gap-1.5 z-20">
                    <span className="text-base">{currentSkinObj.icon}</span>
                    <span className="tracking-wider">YOU ARE HERE</span>
                  </div>
                )}

                {/* Island Node Disk */}
                <div
                  onClick={() => handleNodeClick(lvl)}
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] p-1 transition-all duration-200 cursor-pointer group transform hover:scale-110 active:scale-95 ${
                    isUnlocked
                      ? `bg-gradient-to-tr ${gradient} shadow-2xl shadow-indigo-500/40`
                      : 'bg-white/10 opacity-50 cursor-not-allowed'
                  }`}
                  style={{
                    boxShadow: isUnlocked
                      ? '0 0 25px rgba(168, 85, 247, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.6)'
                      : 'none'
                  }}
                >
                  <div className="w-full h-full bg-[#0d1020] rounded-[24px] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Stars Earned */}
                    {isUnlocked && (
                      <div className="flex items-center gap-0.5 mb-1">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            size={12}
                            className={s <= stars ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]' : 'text-slate-700'}
                          />
                        ))}
                      </div>
                    )}

                    {/* Icon or Padlock */}
                    {isUnlocked ? (
                      <span className="text-3xl group-hover:scale-125 transition duration-200">
                        {lvl.icon}
                      </span>
                    ) : (
                      <Lock size={24} className="text-slate-500" />
                    )}

                    {/* Level Number Pill */}
                    <span className="text-[10px] font-mono font-black text-white mt-1 px-2 py-0.2 rounded-full bg-white/10">
                      LVL {levelNum}
                    </span>
                  </div>
                </div>

                {/* Level Title */}
                <div className="text-center mt-2">
                  <h4 className="font-heading font-black text-xs text-white drop-shadow-md">
                    {lvl.title}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300 block">
                    {lvl.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LEVEL PREVIEW MODAL */}
      {selectedLevelPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md glass-panel border-2 border-indigo-500/50 p-6 md:p-8 rounded-3xl bg-[#0c0f20] shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl mx-auto bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-500/40 animate-bounce">
              <div className="w-full h-full bg-[#0d1020] rounded-[22px] flex items-center justify-center text-4xl">
                {selectedLevelPreview.icon}
              </div>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wider">
                LEVEL {selectedLevelPreview.number || selectedLevelPreview.levelNumber} • {selectedLevelPreview.category}
              </span>
              <h3 className="text-2xl font-heading font-black text-white mt-2">
                {selectedLevelPreview.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedLevelPreview.description}
              </p>
            </div>

            {/* Stars & High Score */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-around font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">CURRENT STARS</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= (levelStars[selectedLevelPreview.number || selectedLevelPreview.levelNumber] || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
                    />
                  ))}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px]">HIGH SCORE</span>
                <span className="text-sm font-bold text-cyan-400 font-mono">
                  {highScores[selectedLevelPreview.number || selectedLevelPreview.levelNumber] || 0} PTS
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedLevelPreview(null)}
                className="w-1/3 btn-cyber-secondary py-3 text-xs font-bold"
              >
                Close
              </button>

              <button
                onClick={() => handlePlayLevel(selectedLevelPreview)}
                className="w-2/3 btn-cyber-primary py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/40"
              >
                <Play size={15} className="fill-white" />
                <span>Play Level {selectedLevelPreview.number || selectedLevelPreview.levelNumber}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
