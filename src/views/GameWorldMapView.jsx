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
  Award
} from 'lucide-react';
import { GAME_LEVELS } from '../data/gameLevels';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const GameWorldMapView = ({ onSelectLevelToPlay }) => {
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

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* World Map Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-[#0c0e1e] via-[#121630] to-[#090b14]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/30 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>ARCADE LEVEL-BY-LEVEL WORLD MAP</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• Target: {targetCompany.name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Placement Campaign Islands
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Clear each arcade level with at least 1 Star (⭐) to unlock the next level and conquer the final Grandmaster Boss!
          </p>
        </div>

        {/* Total Stars Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
          <Star size={24} className="text-amber-400 fill-amber-400 animate-bounce" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">TOTAL STARS</span>
            <span className="text-xl font-heading font-black text-amber-300 font-mono">
              {totalStarsEarned} / 30 ⭐
            </span>
          </div>
        </div>
      </div>

      {/* S-CURVE WINDING LEVEL PATH */}
      <div className="relative py-8 px-4 flex flex-col items-center">
        {/* Visual winding connecting line */}
        <div className="absolute top-12 bottom-12 w-1.5 bg-gradient-to-b from-indigo-500 via-purple-600 to-amber-500 rounded-full opacity-40 shadow-[0_0_15px_rgba(99,102,241,0.5)] pointer-events-none" />

        <div className="w-full max-w-2xl space-y-10 relative z-10">
          {GAME_LEVELS.map((lvl, index) => {
            const isUnlocked = unlockedLevels.includes(lvl.levelNumber);
            const stars = levelStars[lvl.levelNumber] || 0;
            const highScore = highScores[lvl.levelNumber] || 0;
            const isCurrentActive = isUnlocked && !unlockedLevels.includes(lvl.levelNumber + 1);

            // Alternate S-curve offset (Left, Center, Right, Center...)
            const offsetStyles = [
              'sm:-translate-x-24',
              'sm:translate-x-0',
              'sm:translate-x-24',
              'sm:translate-x-0'
            ];
            const curveClass = offsetStyles[index % 4];

            return (
              <div
                key={lvl.levelNumber}
                className={`flex flex-col items-center transition duration-300 ${curveClass}`}
              >
                {/* Active Player Pawn Badge */}
                {isCurrentActive && (
                  <div className="mb-2 px-3 py-1 rounded-full bg-cyan-500 text-[#090b10] font-heading font-black text-xs shadow-lg shadow-cyan-500/50 animate-bounce flex items-center gap-1.5">
                    <span>{currentSkinObj.icon}</span>
                    <span>NEXT CHALLENGE</span>
                  </div>
                )}

                {/* Level Island Pin Node */}
                <div
                  onClick={() => handleNodeClick(lvl)}
                  className={`relative w-24 h-24 rounded-3xl p-1 transition duration-200 cursor-pointer group select-none ${
                    isUnlocked
                      ? lvl.levelNumber >= 9
                        ? 'bg-gradient-to-tr from-rose-500 via-amber-500 to-orange-400 shadow-xl shadow-rose-500/40 hover:scale-110'
                        : 'bg-gradient-to-tr from-indigo-500 via-purple-600 to-cyan-400 shadow-xl shadow-indigo-500/40 hover:scale-110'
                      : 'bg-white/10 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="w-full h-full bg-[#0d1020] rounded-[20px] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Stars Earned */}
                    {isUnlocked && (
                      <div className="flex items-center gap-0.5 mb-1">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            size={10}
                            className={s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
                          />
                        ))}
                      </div>
                    )}

                    {/* Center Icon or Lock */}
                    {isUnlocked ? (
                      <span className="text-2xl group-hover:scale-125 transition duration-200">
                        {lvl.icon}
                      </span>
                    ) : (
                      <Lock size={22} className="text-slate-500" />
                    )}

                    {/* Level Number Pill */}
                    <span className="text-[10px] font-mono font-bold text-slate-300 mt-1">
                      LVL {lvl.levelNumber}
                    </span>
                  </div>
                </div>

                {/* Level Label */}
                <div className="text-center mt-2">
                  <h4 className="font-heading font-bold text-xs text-white">
                    {lvl.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 block">
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
          <div className="relative w-full max-w-md glass-panel border border-indigo-500/40 p-6 md:p-8 rounded-3xl bg-[#0c0f20] shadow-2xl text-center space-y-6">
            <div 
              className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-xl shadow-indigo-500/30"
              style={{ backgroundColor: `${selectedLevelPreview.color}25`, border: `1px solid ${selectedLevelPreview.color}40` }}
            >
              {selectedLevelPreview.icon}
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wider">
                LEVEL {selectedLevelPreview.levelNumber} • {selectedLevelPreview.category}
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
                      className={s <= (levelStars[selectedLevelPreview.levelNumber] || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
                    />
                  ))}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px]">HIGH SCORE</span>
                <span className="text-sm font-bold text-cyan-400 font-mono">
                  {highScores[selectedLevelPreview.levelNumber] || 0} PTS
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
                <span>Play Level {selectedLevelPreview.levelNumber}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
