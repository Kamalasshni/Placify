import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { CompanySelectorModal } from './components/CompanySelectorModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CertificateModal } from './components/CertificateModal';
import { AIGlitchCoachModal } from './components/AIGlitchCoachModal';

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

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStageForRunner, setSelectedStageForRunner] = useState(1);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a10] text-[#f8fafc]">
      {/* Top Navbar HUD */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCompanyModal={() => setIsCompanyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
      </main>

      {/* Modals */}
      <CompanySelectorModal 
        isOpen={isCompanyModalOpen} 
        onClose={() => setIsCompanyModalOpen(false)} 
      />
      <LevelUpModal />
      <CertificateModal />
      <AIGlitchCoachModal />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#07080d] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">⚡</span>
            <span className="font-heading font-black text-white">PLACIFY</span>
            <span>• Gamify Your Placement Journey</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span>Built by <strong>Team Glitch Theory</strong></span>
            <span>•</span>
            <span className="text-indigo-400">Choose Company → Take Assessment → Find Skill Gaps → Quests → Boss Battle</span>
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
