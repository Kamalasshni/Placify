export const INITIAL_QUESTS = [
  {
    id: 'quest-diag',
    title: 'Take the AI Diagnostic Assessment',
    category: 'Onboarding',
    type: 'campaign',
    targetCategory: 'all',
    xpReward: 300,
    gemReward: 50,
    icon: 'Sparkles',
    description: 'Complete the 10-question placement readiness diagnostic to unlock your personalized AI Skill Gap Radar.',
    progress: 0,
    maxProgress: 1,
    completed: false,
    badgeAward: 'Diagnostic Pioneer'
  },
  {
    id: 'quest-code-arena',
    title: 'Code Arena: Solve Two Sum',
    category: 'DSA Mastery',
    type: 'daily',
    targetCategory: 'dsa',
    xpReward: 200,
    gemReward: 30,
    icon: 'Code',
    description: 'Implement an optimal O(N) Hash Map solution for the Two Sum problem in the Code Arena.',
    progress: 0,
    maxProgress: 1,
    completed: false
  },
  {
    id: 'quest-aptitude-citadel',
    title: 'Speed Math Blitz: Clear Stage 1',
    category: 'Aptitude & Logic',
    type: 'daily',
    targetCategory: 'aptitude',
    xpReward: 250,
    gemReward: 35,
    icon: 'Zap',
    description: 'Complete the Aptitude Citadel challenge in your Target Company World with 100% accuracy.',
    progress: 0,
    maxProgress: 1,
    completed: false
  },
  {
    id: 'quest-ai-mock',
    title: 'AI Mock Interview: Complete 1 Round',
    category: 'Behavioral & HR',
    type: 'daily',
    targetCategory: 'hr',
    xpReward: 200,
    gemReward: 30,
    icon: 'MessageSquare',
    description: 'Answer an interactive AI technical or behavioral question and score at least 70% on the STAR rubric.',
    progress: 0,
    maxProgress: 1,
    completed: false
  },
  {
    id: 'quest-boss-slayer',
    title: 'Defeat the Target Company Boss',
    category: 'Boss Battle',
    type: 'campaign',
    targetCategory: 'boss',
    xpReward: 600,
    gemReward: 100,
    icon: 'Flame',
    description: 'Survive all 4 combat phases against the Lead Hiring Bar Raiser and claim your Placement Ready Certificate.',
    progress: 0,
    maxProgress: 1,
    completed: false,
    badgeAward: 'Boss Slayer'
  }
];

export const generateSkillGapQuests = (weakSkills) => {
  const generated = [];

  if (weakSkills.some(s => s.includes('Trees') || s.includes('Dynamic Programming') || s.includes('Graph'))) {
    generated.push({
      id: `quest-gap-dsa-${Date.now()}`,
      title: '🎯 AI Remediation: Dynamic Programming Sprint',
      category: 'Skill Gap Remediation',
      type: 'skill_gap',
      targetCategory: 'dsa',
      xpReward: 350,
      gemReward: 60,
      icon: 'Target',
      description: 'Your diagnostic identified a gap in DP & Algorithms. Solve the Optimal Coin Change problem in the Code Arena.',
      progress: 0,
      maxProgress: 1,
      completed: false
    });
  }

  if (weakSkills.some(s => s.includes('Deadlocks') || s.includes('DBMS') || s.includes('Normalization'))) {
    generated.push({
      id: `quest-gap-core-${Date.now()}`,
      title: '🎯 AI Remediation: Core CS Sanctuary',
      category: 'Skill Gap Remediation',
      type: 'skill_gap',
      targetCategory: 'core_cs',
      xpReward: 300,
      gemReward: 50,
      icon: 'Shield',
      description: 'Reinforce OS Coffman conditions and 3NF normalization in the Core CS Tower.',
      progress: 0,
      maxProgress: 1,
      completed: false
    });
  }

  if (weakSkills.some(s => s.includes('Distance') || s.includes('Pattern') || s.includes('Probability'))) {
    generated.push({
      id: `quest-gap-apt-${Date.now()}`,
      title: '🎯 AI Remediation: Speed Quant Drills',
      category: 'Skill Gap Remediation',
      type: 'skill_gap',
      targetCategory: 'aptitude',
      xpReward: 250,
      gemReward: 40,
      icon: 'Zap',
      description: 'Master time-speed-distance equations and alpha-numeric series in the Aptitude Citadel.',
      progress: 0,
      maxProgress: 1,
      completed: false
    });
  }

  return generated;
};
