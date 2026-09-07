import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound, toggleSound as setAudioMute } from '../utils/audio';
import { INITIAL_QUESTS, generateSkillGapQuests } from '../data/quests';
import { getCompanyById } from '../data/companies';

const GameContext = createContext();

const LEVEL_TITLES = [
  { level: 1, title: 'Intern Initiate', minXP: 0 },
  { level: 2, title: 'Bug Hunter', minXP: 400 },
  { level: 3, title: 'Code Squire', minXP: 900 },
  { level: 4, title: 'Algorithm Knight', minXP: 1600 },
  { level: 5, title: 'Data Structure Adept', minXP: 2500 },
  { level: 6, title: 'Concurrency Crusader', minXP: 3600 },
  { level: 7, title: 'System Architect', minXP: 5000 },
  { level: 8, title: 'Bar Raiser Challenger', minXP: 6800 },
  { level: 9, title: 'Grandmaster Coder', minXP: 9000 },
  { level: 10, title: 'Placement Ready Legend', minXP: 12000 }
];

const INITIAL_USER = {
  name: 'Kamalasshni M',
  avatar: '🚀',
  level: 3,
  levelTitle: 'Code Squire',
  xp: 1250,
  gems: 350,
  streak: 5,
  targetCompanyId: 'google',
  priScore: 78
};

const INITIAL_SKILL_MASTERY = {
  aptitude: 75,
  dsa: 65,
  core_cs: 80,
  system_design: 60,
  hr: 85
};

const INITIAL_BADGES = [
  { id: 'b-first-login', name: 'Placify Initiate', desc: 'Joined the gamified placement journey.', icon: '⚡', unlockedAt: 'Day 1' },
  { id: 'b-streak-5', name: 'Streak Flame', desc: 'Maintained a 5-day daily placement streak.', icon: '🔥', unlockedAt: 'Day 5' },
  { id: 'b-algo-solve', name: 'Clean Complexity', desc: 'Solved an optimal O(N) Hash Map algorithm in the Code Arena.', icon: '💎', unlockedAt: 'Day 3' }
];

export const GameProvider = ({ children }) => {
  // Load from localStorage or defaults
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [skillMastery, setSkillMastery] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_skills');
      return saved ? JSON.parse(saved) : INITIAL_SKILL_MASTERY;
    } catch {
      return INITIAL_SKILL_MASTERY;
    }
  });

  const [diagnosticReport, setDiagnosticReport] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_diagnostic');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quests, setQuests] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_quests');
      return saved ? JSON.parse(saved) : INITIAL_QUESTS;
    } catch {
      return INITIAL_QUESTS;
    }
  });

  const [completedStages, setCompletedStages] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_completed_stages');
      return saved ? JSON.parse(saved) : { google: [1], amazon: [], zoho: [], microsoft: [] };
    } catch {
      return { google: [1], amazon: [], zoho: [], microsoft: [] };
    }
  });

  const [unlockedSkillNodes, setUnlockedSkillNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_skill_nodes');
      return saved ? JSON.parse(saved) : ['apt-speed-math', 'dsa-arrays-hashmaps', 'hr-star-method'];
    } catch {
      return ['apt-speed-math', 'dsa-arrays-hashmaps', 'hr-star-method'];
    }
  });

  const [badges, setBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [levelUpModalData, setLevelUpModalData] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showGlitchCoachModal, setShowGlitchCoachModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('placify_user', JSON.stringify(user));
    } catch (e) { console.error(e); }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('placify_skills', JSON.stringify(skillMastery));
    } catch (e) { console.error(e); }
  }, [skillMastery]);

  useEffect(() => {
    try {
      localStorage.setItem('placify_quests', JSON.stringify(quests));
    } catch (e) { console.error(e); }
  }, [quests]);

  useEffect(() => {
    try {
      localStorage.setItem('placify_completed_stages', JSON.stringify(completedStages));
    } catch (e) { console.error(e); }
  }, [completedStages]);

  useEffect(() => {
    try {
      localStorage.setItem('placify_skill_nodes', JSON.stringify(unlockedSkillNodes));
    } catch (e) { console.error(e); }
  }, [unlockedSkillNodes]);

  useEffect(() => {
    try {
      localStorage.setItem('placify_badges', JSON.stringify(badges));
    } catch (e) { console.error(e); }
  }, [badges]);

  useEffect(() => {
    if (diagnosticReport) {
      try {
        localStorage.setItem('placify_diagnostic', JSON.stringify(diagnosticReport));
      } catch (e) { console.error(e); }
    }
  }, [diagnosticReport]);

  const toggleAudio = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    setAudioMute(nextState);
  };

  const calculateLevel = (currentXP) => {
    let currentLevelObj = LEVEL_TITLES[0];
    for (let i = LEVEL_TITLES.length - 1; i >= 0; i--) {
      if (currentXP >= LEVEL_TITLES[i].minXP) {
        currentLevelObj = LEVEL_TITLES[i];
        break;
      }
    }
    return currentLevelObj;
  };

  const addXP = (amount) => {
    setUser(prev => {
      const streakMultiplier = prev.streak >= 7 ? 2.0 : prev.streak >= 3 ? 1.5 : 1.0;
      const gainedXP = Math.round(amount * streakMultiplier);
      const newTotalXP = prev.xp + gainedXP;
      const newLevelObj = calculateLevel(newTotalXP);

      if (newLevelObj.level > prev.level) {
        // Level up event!
        playSound('level_up');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        setLevelUpModalData({
          oldLevel: prev.level,
          newLevel: newLevelObj.level,
          title: newLevelObj.title,
          bonusGems: 100
        });
        return {
          ...prev,
          xp: newTotalXP,
          level: newLevelObj.level,
          levelTitle: newLevelObj.title,
          gems: prev.gems + 100,
          priScore: Math.min(99, prev.priScore + 3)
        };
      } else {
        playSound('correct');
        return {
          ...prev,
          xp: newTotalXP,
          priScore: Math.min(99, prev.priScore + 1)
        };
      }
    });
  };

  const addGems = (amount) => {
    setUser(prev => ({
      ...prev,
      gems: prev.gems + amount
    }));
  };

  const setTargetCompany = (companyId) => {
    setUser(prev => ({
      ...prev,
      targetCompanyId: companyId
    }));
    playSound('click');
  };

  const completeQuest = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    playSound('quest_complete');
    addXP(quest.xpReward);
    addGems(quest.gemReward);

    setQuests(prev => prev.map(q => {
      if (q.id === questId) {
        return { ...q, progress: q.maxProgress, completed: true };
      }
      return q;
    }));

    if (quest.badgeAward) {
      unlockBadge({
        id: `badge-${Date.now()}`,
        name: quest.badgeAward,
        desc: `Earned by completing quest: ${quest.title}`,
        icon: '🏆',
        unlockedAt: 'Today'
      });
    }
  };

  const completeStage = (companyId, stageNumber) => {
    setCompletedStages(prev => {
      const companyCompleted = prev[companyId] || [];
      if (!companyCompleted.includes(stageNumber)) {
        const nextList = [...companyCompleted, stageNumber];
        return { ...prev, [companyId]: nextList };
      }
      return prev;
    });

    // Award bonus XP and PRI update
    addXP(300);
    addGems(50);
  };

  const unlockSkillNode = (nodeId, cost) => {
    if (user.gems < cost) {
      playSound('wrong');
      return false;
    }

    playSound('level_up');
    setUser(prev => ({
      ...prev,
      gems: prev.gems - cost,
      priScore: Math.min(99, prev.priScore + 4)
    }));

    setUnlockedSkillNodes(prev => [...prev, nodeId]);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    return true;
  };

  const saveDiagnosticResult = (report) => {
    setDiagnosticReport(report);
    setSkillMastery(report.radarScores);
    setUser(prev => ({
      ...prev,
      priScore: report.overallPRI
    }));

    // Generate personalized remediation quests
    const gapQuests = generateSkillGapQuests(report.weakSkills);
    setQuests(prev => {
      // Mark diagnostic quest as completed
      const updatedExisting = prev.map(q => {
        if (q.id === 'quest-diag') {
          return { ...q, progress: 1, completed: true };
        }
        return q;
      });
      return [...updatedExisting, ...gapQuests];
    });

    addXP(350);
    addGems(75);
    unlockBadge({
      id: 'b-diag-pioneer',
      name: 'Diagnostic Pioneer',
      desc: 'Completed AI skill gap analysis across all 5 placement pillars.',
      icon: '🧠',
      unlockedAt: 'Today'
    });
  };

  const unlockBadge = (badgeObj) => {
    setBadges(prev => {
      if (prev.some(b => b.name === badgeObj.name)) return prev;
      return [badgeObj, ...prev];
    });
  };

  const resetProgress = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setSkillMastery(INITIAL_SKILL_MASTERY);
    setDiagnosticReport(null);
    setQuests(INITIAL_QUESTS);
    setCompletedStages({ google: [1], amazon: [], zoho: [], microsoft: [] });
    setUnlockedSkillNodes(['apt-speed-math', 'dsa-arrays-hashmaps', 'hr-star-method']);
    setBadges(INITIAL_BADGES);
    playSound('click');
  };

  // XP Progress Calculation
  const currentLevelObj = calculateLevel(user.xp);
  const nextLevelObj = LEVEL_TITLES.find(l => l.level === currentLevelObj.level + 1) || { minXP: user.xp + 1000 };
  const xpInCurrentLevel = user.xp - currentLevelObj.minXP;
  const xpRequiredForCurrentLevel = nextLevelObj.minXP - currentLevelObj.minXP;
  const xpProgressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpRequiredForCurrentLevel) * 100)));

  const targetCompany = getCompanyById(user.targetCompanyId);

  return (
    <GameContext.Provider value={{
      user,
      skillMastery,
      diagnosticReport,
      quests,
      completedStages,
      unlockedSkillNodes,
      badges,
      soundEnabled,
      targetCompany,
      xpProgressPercent,
      xpInCurrentLevel,
      xpRequiredForCurrentLevel,
      nextLevelTitle: nextLevelObj.title || 'Next Tier',
      levelUpModalData,
      showCertModal,
      showGlitchCoachModal,
      setLevelUpModalData,
      setShowCertModal,
      setShowGlitchCoachModal,
      toggleAudio,
      addXP,
      addGems,
      setTargetCompany,
      completeQuest,
      completeStage,
      unlockSkillNode,
      saveDiagnosticResult,
      unlockBadge,
      resetProgress
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
