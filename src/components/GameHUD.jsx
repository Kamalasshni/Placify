import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Sparkles, 
  ShoppingBag, 
  Volume2, 
  VolumeX, 
  Award, 
  Bot, 
  Compass, 
  Target, 
  Map, 
  Code2, 
  Radio, 
  Network, 
  Radar, 
  Trophy,
  Swords,
  ChevronDown,
  ChefHat,
  Scissors,
  BookOpen
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const GameHUD = ({ activeTab, setActiveTab, onOpenCompanyModal }) => {
  const { 
    user, 
    hearts, 
    maxHearts, 
    currentSkinObj, 
    soundEnabled, 
    toggleAudio, 
    targetCompany, 
    xpProgressPercent,
    xpInCurrentLevel,
    xpRequiredForCurrentLevel,
    setShowShopModal,
    setShowGlitchCoachModal,
    setShowCertModal
  } = useGame();

  const navItems = [
    { id: 'world-map', label: '🎮 Candy Map', isSpecial: true },
    { id: 'code-kitchen', label: '🍳 Code Kitchen', isSpecial: true },
    { id: 'resume-salon', label: '💄 Resume Salon', isSpecial: true },
    { id: 'company-history', label: '🏢 Company Lore' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'worlds', label: 'Company Worlds' },
    { id: 'quests', label: 'Quests' },
    { id: 'boss', label: 'Boss Arena', isHot: true },
    { id: 'code-arena', label: 'Code Arena' },
    { id: 'mock-interview', label: 'AI Mock' },
    { id: 'skill-tree', label: 'Skill Tree' },
    { id: 'radar', label: 'Skill Radar' },
    { id: 'leaderboard', label: 'Ranks & Badges' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070913]/90 backdrop-blur-xl">
      {/* Top Arcade Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between border-b border-white/5 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-pink-300 font-mono font-bold border border-pink-500/40 flex items-center gap-1">
            <span>✨</span>
            <span>TEAM GLITCH THEORY</span>
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-300 font-mono text-[11px]">PLACIFY CASUAL ARCADE</span>
        </div>

        {/* Quick Utility Triggers */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              playSound('click');
              setShowGlitchCoachModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 transition cursor-pointer font-heading font-semibold text-xs"
          >
            <Bot size={13} className="text-purple-400 animate-pulse" />
            <span>AI Coach</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              setShowCertModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer font-heading font-semibold text-xs"
          >
            <Award size={13} className="text-amber-400" />
            <span>Certificate</span>
          </button>

          <button 
            onClick={() => {
              playSound('click');
              toggleAudio();
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
            title={soundEnabled ? 'Mute Game SFX' : 'Enable Game SFX'}
          >
            {soundEnabled ? <Volume2 size={15} className="text-cyan-400" /> : <VolumeX size={15} className="text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Gaming HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Left: Logo & Active Skin Avatar */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => {
              playSound('click');
              setActiveTab('world-map');
            }}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-pink-500/30 group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#0d1020] rounded-[14px] flex items-center justify-center text-2xl">
                {currentSkinObj.icon}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl tracking-wider gradient-text-rainbow group-hover:scale-105 transition">
                  PLACIFY
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold">
                  ARCADE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">{currentSkinObj.name}</p>
            </div>
          </div>

          {/* Target Company Switcher Pill */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCompanyModal();
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-indigo-500/30 hover:border-indigo-400/60 transition cursor-pointer"
          >
            <span className="text-xs">🏢</span>
            <div className="text-left">
              <span className="text-xs font-semibold text-white block">{targetCompany.name}</span>
              <span className="text-[10px] text-amber-400 font-mono">{targetCompany.ctc}</span>
            </div>
            <ChevronDown size={13} className="text-slate-400 ml-1" />
          </button>
        </div>

        {/* Right HUD: Hearts, Gems, Shop, Level */}
        <div className="flex items-center gap-3">
          {/* Hearts / Lives */}
          <div 
            onClick={() => {
              if (hearts < maxHearts) {
                playSound('click');
                setShowShopModal(true);
              }
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 transition cursor-pointer ${
              hearts <= 1 ? 'animate-bounce border-rose-500' : ''
            }`}
            title="Candidate Lives (Depletes on mistakes. Refill in Shop!)"
          >
            {[...Array(maxHearts)].map((_, i) => (
              <Heart
                key={i}
                size={16}
                className={`transition ${
                  i < hearts
                    ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Gems Wallet */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-heading font-bold text-xs shadow-sm">
            <span className="text-sm">💎</span>
            <span className="font-mono text-sm">{user.gems}</span>
          </div>

          {/* Item Shop Button */}
          <button
            onClick={() => {
              playSound('click');
              setShowShopModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:from-amber-500/30 hover:to-orange-500/30 transition cursor-pointer font-heading font-bold text-xs shadow-md shadow-amber-500/20"
          >
            <ShoppingBag size={15} className="text-amber-400" />
            <span className="hidden sm:inline">Item Shop</span>
          </button>

          {/* Player Level Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-heading font-black text-white text-xs shadow-md shadow-pink-500/30">
              {user.level}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-[11px] font-semibold text-slate-200 block truncate">{user.levelTitle}</span>
              <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                <div className="xp-bar-fill h-full rounded-full" style={{ width: `${xpProgressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition cursor-pointer relative ${
                item.isSpecial
                  ? isActive
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-black shadow-lg shadow-pink-500/30 border border-pink-400'
                    : 'bg-pink-500/15 text-pink-300 border border-pink-500/30 hover:bg-pink-500/25'
                  : isActive
                  ? 'bg-gradient-to-r from-indigo-600/40 to-purple-600/40 text-white border border-indigo-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{item.label}</span>
              {item.isHot && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-1 right-1" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
