export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    category: 'aptitude',
    categoryLabel: 'Quantitative Aptitude',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: [
      '65 seconds',
      '89 seconds',
      '100 seconds',
      '75 seconds'
    ],
    correctAnswer: 1, // 89 seconds: Speed = 240/24 = 10 m/s. Total dist = 240+650 = 890m. Time = 890/10 = 89s.
    explanation: 'Speed of train = 240m / 24s = 10 m/s. To cross platform, total distance = train length + platform length = 240 + 650 = 890m. Time = 890 / 10 = 89 seconds.',
    skillTag: 'Speed, Time & Distance'
  },
  {
    id: 'diag-2',
    category: 'aptitude',
    categoryLabel: 'Logical Reasoning',
    question: 'In a code language, if "GAMIFY" is written as "IBOKHA", how is "CAREER" coded in the same pattern?',
    options: [
      'ECTGGT',
      'ECTFFR',
      'DBSFFS',
      'ECUGGU'
    ],
    correctAnswer: 0, // G(+2)=I, A(+1)=B, M(+2)=O, I(+2)=K, F(+2)=H, Y(+2)=A. Let's see: C(+2)=E, A(+2)=C, R(+2)=T, E(+2)=G, E(+2)=G, R(+2)=T => ECTGGT (+2 to each letter)
    explanation: 'Each letter is shifted forward by +2 alphabetical positions: C->E, A->C, R->T, E->G, E->G, R->T = ECTGGT.',
    skillTag: 'Pattern Deduction'
  },
  {
    id: 'diag-3',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    question: 'What is the time complexity of finding an element in a balanced Binary Search Tree (AVL / Red-Black Tree) with N nodes?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctAnswer: 1,
    explanation: 'A balanced BST maintains height h = O(log N). Traversing from root to leaf takes at most h comparisons, resulting in O(log N) worst-case time complexity.',
    skillTag: 'Trees & Logarithmic Search'
  },
  {
    id: 'diag-4',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    question: 'Which algorithmic paradigm does Dijkstra\'s Shortest Path algorithm on non-negative weighted graphs follow?',
    options: [
      'Dynamic Programming',
      'Divide and Conquer',
      'Greedy Approach with Priority Queue',
      'Backtracking with Pruning'
    ],
    correctAnswer: 2,
    explanation: 'Dijkstra repeatedly selects the unvisited node with the minimum tentative distance using a Greedy strategy powered by a min-heap.',
    skillTag: 'Graph Algorithms'
  },
  {
    id: 'diag-5',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    question: 'In Dynamic Programming, what are the two essential characteristics required for a problem to be solvable via DP?',
    options: [
      'Greedy choice property & Memory locality',
      'Optimal substructure & Overlapping subproblems',
      'Sorted inputs & Binary partitioning',
      'Tail recursion & Constant space'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic Programming applies when a problem exhibits: (1) Optimal Substructure (an optimal solution contains optimal solutions to subproblems), and (2) Overlapping Subproblems (subproblems are computed repeatedly).',
    skillTag: 'Dynamic Programming'
  },
  {
    id: 'diag-6',
    category: 'core_cs',
    categoryLabel: 'Operating Systems',
    question: 'Which of the following is NOT one of Coffman\'s four necessary conditions for a Deadlock to occur in an OS?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemption of Resources',
      'Circular Wait'
    ],
    correctAnswer: 2,
    explanation: 'The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. "Preemption of resources" prevents deadlock, not causes it.',
    skillTag: 'OS Concurrency & Deadlocks'
  },
  {
    id: 'diag-7',
    category: 'core_cs',
    categoryLabel: 'Database Management Systems',
    question: 'In relational databases, which SQL normalization form guarantees that every non-key attribute is non-transitively dependent on the primary key?',
    options: [
      '1st Normal Form (1NF)',
      '2nd Normal Form (2NF)',
      '3rd Normal Form (3NF)',
      'Boyce-Codd Normal Form (BCNF)'
    ],
    correctAnswer: 2,
    explanation: '3NF removes transitive functional dependencies: all non-prime attributes must depend directly on the superkey (Nothing but the key, the whole key, and nothing but the key).',
    skillTag: 'DBMS Normalization & SQL'
  },
  {
    id: 'diag-8',
    category: 'system_design',
    categoryLabel: 'System Design & Scalability',
    question: 'When designing a high-throughput read-heavy system, which caching eviction policy is best suited for keeping frequently requested items in memory?',
    options: [
      'FIFO (First In First Out)',
      'LRU (Least Recently Used) or LFU (Least Frequently Used)',
      'Random Eviction',
      'LIFO (Last In First Out)'
    ],
    correctAnswer: 1,
    explanation: 'LRU (Least Recently Used) and LFU (Least Frequently Used) discard the least relevant cached items based on temporal locality, maximizing cache hit ratio.',
    skillTag: 'Caching & High Throughput'
  },
  {
    id: 'diag-9',
    category: 'system_design',
    categoryLabel: 'System Design & Scalability',
    question: 'According to the CAP theorem in distributed systems, when a network partition (P) occurs, what trade-off must a system make?',
    options: [
      'Choose between Consistency (C) and Availability (A)',
      'Choose between Performance and Security',
      'Sacrifice both Consistency and Partition Tolerance',
      'Distributed systems can easily achieve all three simultaneously'
    ],
    correctAnswer: 0,
    explanation: 'CAP theorem dictates that during network partitions (P), a distributed system must choose between returning consistent latest data (C) or responding immediately (A).',
    skillTag: 'Distributed Systems & CAP'
  },
  {
    id: 'diag-10',
    category: 'hr',
    categoryLabel: 'Behavioral & Leadership',
    question: 'When asked in an interview: "Tell me about a time you had a technical disagreement with a team member", which approach best demonstrates high emotional intelligence and leadership?',
    options: [
      'Explain that you were 100% correct and forced them to use your solution.',
      'Use the STAR method: explain the Situation, the Task, how you engaged in respectful data-backed discussion, and the positive Outcome.',
      'State that you never disagree with anyone to avoid conflict.',
      'Tell the interviewer to ask the teammate because you moved on.'
    ],
    correctAnswer: 1,
    explanation: 'Using the STAR framework (Situation, Task, Action, Result) with data-backed diplomacy demonstrates mature collaboration and leadership principles.',
    skillTag: 'STAR Behavioral Framework'
  }
];

export const generateSkillGapReport = (userAnswers) => {
  // Score per category
  const categories = {
    aptitude: { total: 0, correct: 0, label: 'Aptitude & Logic' },
    dsa: { total: 0, correct: 0, label: 'Data Structures & Algorithms' },
    core_cs: { total: 0, correct: 0, label: 'Core CS (OS & DBMS)' },
    system_design: { total: 0, correct: 0, label: 'System Design' },
    hr: { total: 0, correct: 0, label: 'Behavioral & HR' }
  };

  const weakSkills = [];
  const strongSkills = [];

  DIAGNOSTIC_QUESTIONS.forEach(q => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    categories[q.category].total += 1;
    if (isCorrect) {
      categories[q.category].correct += 1;
      strongSkills.push(q.skillTag);
    } else {
      weakSkills.push(q.skillTag);
    }
  });

  const radarScores = {
    aptitude: Math.round((categories.aptitude.correct / categories.aptitude.total) * 100),
    dsa: Math.round((categories.dsa.correct / categories.dsa.total) * 100),
    core_cs: Math.round((categories.core_cs.correct / categories.core_cs.total) * 100),
    system_design: Math.round((categories.system_design.correct / categories.system_design.total) * 100),
    hr: Math.round((categories.hr.correct / categories.hr.total) * 100)
  };

  // Calculate overall PRI (Placement Readiness Index)
  const totalCorrect = Object.values(categories).reduce((acc, c) => acc + c.correct, 0);
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const overallPRI = Math.round((totalCorrect / totalQuestions) * 100);

  // Generate AI Coach Feedback
  let aiCoachFeedback = '';
  let priorityFocus = '';

  if (radarScores.dsa < 60) {
    priorityFocus = 'Data Structures & Algorithms';
    aiCoachFeedback = 'Critical Gap Detected in Algorithmic Problem Solving! Your diagnostic reveals vulnerability in Graph algorithms and Dynamic Programming. Placify AI is configuring your Daily Quests with intensive Tree & Array coding drills.';
  } else if (radarScores.core_cs < 60) {
    priorityFocus = 'OS & Database Architecture';
    aiCoachFeedback = 'Solid coding baseline, but Core CS foundations (Deadlocks, SQL Normalization, Concurrency) need immediate reinforcement before technical face-to-face rounds.';
  } else if (radarScores.aptitude < 60) {
    priorityFocus = 'Speed Quantitative Aptitude';
    aiCoachFeedback = 'Aptitude screening is the #1 filter gate! We must boost your speed math and pattern recognition to clear Round 1 Online Assessments.';
  } else {
    priorityFocus = 'System Design & Boss Battle Readiness';
    aiCoachFeedback = 'Exceptional all-round performance! You are primed for Tier-1 Product Companies. Let\'s sharpen high-level architecture and simulate the final Bar Raiser Boss Battle.';
  }

  return {
    radarScores,
    overallPRI,
    weakSkills,
    strongSkills,
    priorityFocus,
    aiCoachFeedback,
    completedAt: new Date().toISOString()
  };
};
