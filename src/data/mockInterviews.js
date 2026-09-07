export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 'mock-1',
    role: 'Software Development Engineer (SDE-1)',
    category: 'Technical & Projects',
    companyTag: 'All Tier-1 Tech',
    question: 'Walk me through the most technically complex project you have built. What architectural challenges did you face and how did you resolve them?',
    tips: [
      'Mention your tech stack, system bottlenecks (e.g. database scaling, caching, concurrency).',
      'Quantify your impact (e.g., reduced latency by 35%, supported 1,000 concurrent users).',
      'Explain the trade-offs you made when selecting tools or architectures.'
    ],
    keywords: ['architecture', 'database', 'latency', 'api', 'cache', 'scalability', 'concurrency', 'optimization', 'trade-off']
  },
  {
    id: 'mock-2',
    role: 'Software Engineer',
    category: 'Behavioral & Leadership',
    companyTag: 'Amazon / Google',
    question: 'Tell me about a time when you received harsh critical feedback on your code or design. How did you react and what did you learn?',
    tips: [
      'Show low ego and a Growth Mindset.',
      'Explain the constructive changes you implemented immediately.',
      'Demonstrate how it improved the team\'s engineering standards.'
    ],
    keywords: ['feedback', 'code review', 'growth', 'improved', 'learned', 'refactored', 'collaboration', 'quality']
  },
  {
    id: 'mock-3',
    role: 'SDE / Core Developer',
    category: 'System Design & Problem Solving',
    companyTag: 'Google / Microsoft',
    question: 'How would you design a real-time collaborative code editor like Google Docs or Replit? How would you handle simultaneous edits without data loss?',
    tips: [
      'Discuss WebSockets for bidirectional duplex communication.',
      'Explain Operational Transformation (OT) or CRDTs (Conflict-free Replicated Data Types).',
      'Mention Redis Pub/Sub for syncing across multi-region server clusters.'
    ],
    keywords: ['websocket', 'crdt', 'operational transformation', 'concurrency', 'conflict', 'redis', 'real-time', 'sync']
  },
  {
    id: 'mock-4',
    role: 'Engineering Graduate',
    category: 'HR & Motivation',
    companyTag: 'General Placement',
    question: 'Where do you see yourself in the next 3 to 5 years, and how does this placement role fit into your long-term engineering vision?',
    tips: [
      'Align your technical ambitions with senior mentorship and ownership.',
      'Highlight your desire to deepen domain expertise (e.g., backend systems, cloud, AI).',
      'Express loyalty and readiness to drive measurable business impact.'
    ],
    keywords: ['growth', 'mentorship', 'architecture', 'expertise', 'leadership', 'impact', 'sde-2', 'ownership']
  }
];

export const evaluateInterviewAnswer = (question, answerText) => {
  if (!answerText || answerText.trim().length < 20) {
    return {
      overallScore: 35,
      starScore: 30,
      technicalScore: 30,
      communicationScore: 40,
      strengths: ['Attempted the question.'],
      improvements: ['Answer is too brief. Provide more concrete context, specific tools used, and measurable results.'],
      aiFeedback: 'Your response was too short for a placement round. Aim for 3-4 structured paragraphs covering the Situation, Task, Actions taken, and measurable Outcome.'
    };
  }

  const lower = answerText.toLowerCase();
  const wordCount = answerText.trim().split(/\s+/).length;

  // Check STAR signals
  let starHits = 0;
  if (/situation|context|background|project|when|at my|during/i.test(lower)) starHits++;
  if (/task|challenge|goal|problem|responsibility|needed to/i.test(lower)) starHits++;
  if (/action|implemented|created|developed|built|refactored|used|applied|designed/i.test(lower)) starHits++;
  if (/result|outcome|improved|reduced|increased|delivered|achieved|success|learned|%/i.test(lower)) starHits++;

  const starScore = Math.min(100, Math.round(40 + starHits * 15));

  // Check technical keyword depth
  let keywordHits = 0;
  question.keywords.forEach(kw => {
    if (lower.includes(kw)) keywordHits++;
  });
  const technicalScore = Math.min(100, Math.round(50 + (keywordHits / Math.max(3, question.keywords.length)) * 50));

  // Communication score based on length, punctuation, and flow
  const lengthScore = Math.min(40, Math.round((wordCount / 120) * 40));
  const structureBonus = /[.!?]/.test(answerText) ? 50 : 30;
  const communicationScore = Math.min(100, lengthScore + structureBonus);

  const overallScore = Math.round((starScore * 0.35) + (technicalScore * 0.40) + (communicationScore * 0.25));

  const strengths = [];
  const improvements = [];

  if (keywordHits >= 2) {
    strengths.push('Excellent use of industry technical terminology.');
  }
  if (starHits >= 3) {
    strengths.push('Strong structural flow adhering to the STAR method.');
  }
  if (wordCount >= 60) {
    strengths.push('Comprehensive depth with specific situational context.');
  }

  if (keywordHits < 2) {
    improvements.push(`Include specific technical concepts like ${question.keywords.slice(0, 3).join(', ')}.`);
  }
  if (starHits < 3) {
    improvements.push('Highlight the quantifiable Results (e.g. % performance increase, bugs reduced).');
  }
  if (wordCount < 50) {
    improvements.push('Expand on the exact steps and design choices you personally implemented.');
  }

  let aiFeedback = '';
  if (overallScore >= 80) {
    aiFeedback = `Outstanding answer! You clearly demonstrated technical maturity and structured communication. This response would rank in the top 10% of placement candidates.`;
  } else if (overallScore >= 60) {
    aiFeedback = `Good solid response. To push this into a Tier-1 offer standard, quantify your results with metrics and explain the trade-offs you considered.`;
  } else {
    aiFeedback = `Promising start. Structure your answer clearly using the STAR method (Situation -> Task -> Action -> Result) and mention specific technologies.`;
  }

  return {
    overallScore,
    starScore,
    technicalScore,
    communicationScore,
    strengths: strengths.length ? strengths : ['Clear intent and willingness to articulate.'],
    improvements: improvements.length ? improvements : ['Maintain this level of clarity in live pressure rounds.'],
    aiFeedback
  };
};
