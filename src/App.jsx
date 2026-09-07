import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { GameHUD } from './components/GameHUD';
import { CandyWorldMap } from './components/CandyWorldMap';
import { CompanySelectorModal } from './components/CompanySelectorModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CertificateModal } from './components/CertificateModal';
import { AIGlitchCoachModal } from './components/AIGlitchCoachModal';
import { GameShopModal } from './components/GameShopModal';
import { LootChestModal } from './components/LootChestModal';

import { ArcadeLevelPlayView } from './views/ArcadeLevelPlayView';
import { DashboardView } from './views/DashboardView';
import { AssessmentView } from './views/AssessmentView';
import { SkillRadarView } from './views/SkillRadarView';
import { CompanyWorldsView } from './views/CompanyWorldsView';
import { StageRunnerView } from './views/StageRunnerView';
import { BossBattleView } from './views/BossBattleView';
import { CodeArenaView } from './views/CodeArenaView';
import { AIMockInterviewView } from './views/AIMockInterviewView';
import { QuestsView } from './views/QuestsView';
import { SkillTreeView } from './views/SkillTreeView';
import { LeaderboardBadgesView } from './views/LeaderboardBadgesView';
import { CompanyHistoryQuizView } from './views/CompanyHistoryQuizView';

import { CodeKitchenGame } from './games/CodeKitchenGame';
import { ResumeMakeoverGame } from './games/ResumeMakeoverGame';
import { playSound } from './utils/audio';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('world-map');
  const [selectedStageForRunner, setSelectedStageForRunner] = useState(1);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const { activePlayLevel, setActivePlayLevel, addXP, addGems } = useGame();

  const handleSelectLevelToPlay = (levelNumber) => {
    setActivePlayLevel(levelNumber);
  };

  const handleExitLevel = () => {
    setActivePlayLevel(null);
  };

  // Hackathon Quick Showcase shortcuts
  const hackathonShortcuts = [
    { label: '🍬 Candy Match-3', action: () => { setActiveTab('world-map'); setActivePlayLevel(4); } },
    { label: '🍳 Code Kitchen', action: () => { setActivePlayLevel(null); setActiveTab('code-kitchen'); } },
    { label: '💄 Resume Salon', action: () => { setActivePlayLevel(null); setActiveTab('resume-salon'); } },
    { label: '🏢 Company Lore', action: () => { setActivePlayLevel(null); setActiveTab('company-history'); } },
    { label: '🔨 Whack-A-Bug', action: () => { setActiveTab('world-map'); setActivePlayLevel(5); } },
    { label: '🃏 Memory Cards', action: () => { setActiveTab('world-map'); setActivePlayLevel(6); } },
    { label: '🚀 Flappy Coder', action: () => { setActiveTab('world-map'); setActivePlayLevel(7); } },
    { label: '💀 1000HP Boss', action: () => { setActiveTab('world-map'); setActivePlayLevel(9); } }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070913] text-[#f8fafc]">
      {/* HACKATHON JUDGE SHOWCASE QUICK BAR */}
      <div className="bg-gradient-to-r from-pink-950/90 via-purple-950/90 to-cyan-950/90 border-b border-pink-500/40 py-2 px-4 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black font-black uppercase text-[10px] animate-pulse">
              SRM IRIDESCENCE 1.0
            </span>
            <span className="text-pink-300 font-bold hidden sm:inline">⚡ Judge Quick-Play Showcase:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {hackathonShortcuts.map((sc, i) => (
              <button
                key={i}
                onClick={() => {
                  playSound('click');
                  sc.action();
                }}
                className="text-[11px] font-heading font-black px-2.5 py-1 rounded-lg bg-white/10 hover:bg-pink-500/30 text-white whitespace-nowrap transition cursor-pointer border border-white/10 hover:border-pink-500/40"
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Arcade Gaming HUD */}
      <GameHUD 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActivePlayLevel(null);
          setActiveTab(tab);
        }} 
        onOpenCompanyModal={() => setIsCompanyModalOpen(true)}
      />

      {/* Main Arcade Arena & World Map Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If user is actively playing a level */}
        {activePlayLevel !== null ? (
          <ArcadeLevelPlayView 
            levelNumber={activePlayLevel} 
            onExitLevel={handleExitLevel} 
          />
        ) : (
          <>
            {activeTab === 'world-map' && (
              <CandyWorldMap onSelectLevelToPlay={handleSelectLevelToPlay} />
            )}

            {activeTab === 'code-kitchen' && (
              <CodeKitchenGame onGameComplete={(pts, stars) => {
                addXP(500);
                addGems(60);
                alert(`🍳 5-Star Chef Rating! You earned ${pts} PTS & 60 Gems!`);
                setActiveTab('world-map');
              }} />
            )}

            {activeTab === 'resume-salon' && (
              <ResumeMakeoverGame onGameComplete={(pts, stars) => {
                addXP(600);
                addGems(80);
                alert(`💄 100% FAANG Ready Makeover! You earned ${pts} PTS & 80 Gems!`);
                setActiveTab('world-map');
              }} />
            )}

            {activeTab === 'company-history' && (
              <CompanyHistoryQuizView />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView 
                setActiveTab={setActiveTab} 
                onOpenCompanyModal={() => setIsCompanyModalOpen(true)} 
              />
            )}

            {activeTab === 'assessment' && (
              <AssessmentView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'radar' && (
              <SkillRadarView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'worlds' && (
              <CompanyWorldsView 
                setActiveTab={setActiveTab} 
                setSelectedStageForRunner={setSelectedStageForRunner} 
                onOpenCompanyModal={() => setIsCompanyModalOpen(true)} 
              />
            )}

            {activeTab === 'stage-runner' && (
              <StageRunnerView 
                stageNumber={selectedStageForRunner} 
                setActiveTab={setActiveTab} 
              />
            )}

            {activeTab === 'boss' && (
              <BossBattleView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'code-arena' && (
              <CodeArenaView />
            )}

            {activeTab === 'mock-interview' && (
              <AIMockInterviewView />
            )}

            {activeTab === 'quests' && (
              <QuestsView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'skill-tree' && (
              <SkillTreeView />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardBadgesView />
            )}
          </>
        )}
      </main>

      {/* Interactive Game Modals */}
      <CompanySelectorModal 
        isOpen={isCompanyModalOpen} 
        onClose={() => setIsCompanyModalOpen(false)} 
      />
      <GameShopModal />
      <LootChestModal />
      <LevelUpModal />
      <CertificateModal />
      <AIGlitchCoachModal />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#05070e] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <span className="font-heading font-black text-white">PLACIFY ARCADE</span>
            <span>• SRM Iridescence 1.0 Gamethon Entry</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span>Team Glitch Theory</span>
            <span>•</span>
            <span className="text-pink-400">Candy Match-3 • Code Kitchen Chef • Resume Salon • Company Lore</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
