export const BOSS_ENCOUNTERS = {
  google: {
    bossName: 'Dr. Cypher - Google Fellow',
    bossTitle: 'Grand Arbiter of Distributed Systems',
    bossAvatar: '⚡',
    maxHp: 1200,
    themeColor: '#4285F4',
    bgGradient: 'radial-gradient(circle at 50% 30%, rgba(66, 133, 244, 0.25), rgba(9, 10, 16, 0.95))',
    introDialogue: 'So, another challenger attempts the Mountain View Spire. Show me your optimal complexity bounds, or be garbage-collected!',
    victoryDialogue: 'Impossible... Your algorithmic efficiency exceeded O(N log N). You have proven your mastery. Welcome to the elite tier, Engineer.',
    defeatDialogue: 'Your memory allocated exceeded the quota. Review your data structures and return when you can optimize time and space.',
    rounds: [
      {
        roundNumber: 1,
        bossAction: 'Dr. Cypher casts: [Strict Big-O Barrier]!',
        question: 'Which data structure offers O(1) average time complexity for Insert, Delete, and GetRandom operations?',
        options: [
          'Binary Search Tree with balance factors',
          'Array List + Hash Map combination',
          'Doubly Linked List with head and tail pointers',
          'B-Tree Index'
        ],
        correctAnswer: 1,
        damageToBoss: 300,
        damageToPlayer: 25,
        hint: 'You need an array for O(1) random index access and a hash map to map values to their array indices for O(1) lookups and deletions.'
      },
      {
        roundNumber: 2,
        bossAction: 'Dr. Cypher unleashes: [Distributed Split-Brain Attack]!',
        question: 'In distributed systems, which protocol is specifically designed to achieve consensus among a cluster of nodes even in the presence of network partitions?',
        options: [
          'Raft / Paxos Consensus Protocol',
          'Simple Round Robin DNS',
          'Two-Phase Commit without Coordinator Backup',
          'Gossip Protocol only for data dissemination'
        ],
        correctAnswer: 0,
        damageToBoss: 300,
        damageToPlayer: 30,
        hint: 'Think of leader election, log replication, and terms used in etcd and Kubernetes.'
      },
      {
        roundNumber: 3,
        bossAction: 'Dr. Cypher charges: [Dynamic Programming Obliteration]!',
        question: 'What is the time complexity of finding the Longest Common Subsequence (LCS) of two strings of lengths M and N using standard 2D DP?',
        options: [
          'O(M + N)',
          'O(M * N)',
          'O(2^(M + N))',
          'O(M log N)'
        ],
        correctAnswer: 1,
        damageToBoss: 350,
        damageToPlayer: 35,
        hint: 'A 2D grid of size (M+1) x (N+1) is filled where each cell takes O(1) work.'
      },
      {
        roundNumber: 4,
        bossAction: 'FINAL STAND: [Bar-Raising Algorithmic Singularity]!',
        question: 'When designing a scalable URL shortener (e.g. tinyurl), what base encoding is standard to convert a 64-bit integer ID into a compact 7-character string?',
        options: [
          'Base2 (Binary)',
          'Base16 (Hexadecimal)',
          'Base64 or Base62 ([a-zA-Z0-9])',
          'Base10 (Decimal)'
        ],
        correctAnswer: 2,
        damageToBoss: 350,
        damageToPlayer: 40,
        hint: 'Base62 gives 62^7 = ~3.5 trillion unique short URLs without confusing characters.'
      }
    ]
  },
  amazon: {
    bossName: 'Vanguard Prime - The Bar Raiser',
    bossTitle: 'Keeper of the 16 Leadership Principles',
    bossAvatar: '🛡️',
    maxHp: 1100,
    themeColor: '#FF9900',
    bgGradient: 'radial-gradient(circle at 50% 30%, rgba(255, 153, 0, 0.25), rgba(9, 10, 16, 0.95))',
    introDialogue: 'I am the Bar Raiser. I do not just evaluate your code; I test your Customer Obsession, Ownership, and Bias for Action.',
    victoryDialogue: 'You have raised the bar. Your code is robust, your STAR metrics are crystal clear, and your architecture scales.',
    defeatDialogue: 'You failed to demonstrate Bias for Action with deep dive data. Study the leadership principles and try again.',
    rounds: [
      {
        roundNumber: 1,
        bossAction: 'Vanguard Prime activates: [Customer Obsession Inquest]!',
        question: 'A critical order placement microservice is experiencing p99 latency spikes during Prime Day. Which architectural pattern prevents cascading failures across dependent services?',
        options: [
          'Circuit Breaker pattern with Fallback Graceful Degradation',
          'Infinite retry loops on every failed TCP request',
          'Direct synchronous HTTP calls with no timeouts',
          'Dropping all incoming traffic without an event queue'
        ],
        correctAnswer: 0,
        damageToBoss: 280,
        damageToPlayer: 25,
        hint: 'Think of Netflix Hystrix or resilience4j which trips open to protect downstream systems.'
      },
      {
        roundNumber: 2,
        bossAction: 'Vanguard Prime strikes with: [Heap Sorting Avalanche]!',
        question: 'What is the optimal time complexity to find the Kth largest element in an unsorted stream of N elements?',
        options: [
          'O(N^2)',
          'O(N log K) using a Min-Heap of size K',
          'O(N * K)',
          'O(K log N)'
        ],
        correctAnswer: 1,
        damageToBoss: 280,
        damageToPlayer: 25,
        hint: 'A Min-Heap of size K maintains the top K elements. For every incoming element, insertion/removal takes O(log K).'
      },
      {
        roundNumber: 3,
        bossAction: 'Vanguard Prime triggers: [Deep Dive Ownership Challenge]!',
        question: 'Under Amazon Leadership Principles, which answer demonstrates genuine "Are Right, A Lot" and "Disagree and Commit"?',
        options: [
          'Arguing endlessly until everyone gives up and accepts your design.',
          'Presenting empirical data and benchmarks to advocate your view, but fully committing to the team consensus once the decision is made.',
          'Silently agreeing during meetings but implementing your own code behind everyone\'s back.',
          'Refusing to participate if your preferred database is not selected.'
        ],
        correctAnswer: 1,
        damageToBoss: 290,
        damageToPlayer: 30,
        hint: 'Leaders have conviction and are tenacious, yet they commit wholeheartedly to executed decisions.'
      },
      {
        roundNumber: 4,
        bossAction: 'FINAL STAND: [Extreme High-Throughput Barrage]!',
        question: 'In DynamoDB or NoSQL distributed key-value stores, what mechanism is used to partition data evenly across physical storage nodes?',
        options: [
          'Consistent Hashing on the Partition Key',
          'Sorting all data sequentially on a single master disk',
          'Random round-robin distribution without keys',
          'Alphabetical range locks'
        ],
        correctAnswer: 0,
        damageToBoss: 300,
        damageToPlayer: 35,
        hint: 'Consistent Hashing places nodes and keys on a virtual hash ring to minimize data movement when nodes scale.'
      }
    ]
  },
  zoho: {
    bossName: 'The Logic Maestro',
    bossTitle: 'Warden of Clean Native Algorithms',
    bossAvatar: '🔥',
    maxHp: 950,
    themeColor: '#E42528',
    bgGradient: 'radial-gradient(circle at 50% 30%, rgba(228, 37, 40, 0.25), rgba(9, 10, 16, 0.95))',
    introDialogue: 'Welcome to Zoho. No fancy third-party libraries here. Just you, raw logic, matrices, and clean code.',
    victoryDialogue: 'Bravo! You understand how code runs on bare metal. You are ready for Zoho product engineering.',
    defeatDialogue: 'Your logic tripped on nested boundary checks. Master matrix traversals and recursion without shortcuts.',
    rounds: [
      {
        roundNumber: 1,
        bossAction: 'The Maestro casts: [Matrix Spiral Trap]!',
        question: 'When traversing an N x M 2D matrix in Spiral Order, how many directional boundary pointers (top, bottom, left, right) must be maintained and shifted?',
        options: ['2 pointers', '4 boundary pointers', '1 pointer', '8 pointers'],
        correctAnswer: 1,
        damageToBoss: 250,
        damageToPlayer: 20,
        hint: 'You track `top`, `bottom`, `left`, and `right` and increment/decrement them as each outer layer is printed.'
      },
      {
        roundNumber: 2,
        bossAction: 'The Maestro casts: [Pure String Manipulation]!',
        question: 'Given an encoded string like "3[a2[c]]", what is the decoded expansion without using external regex libraries?',
        options: ['accaccacc', 'aaccaacc', 'acacac', 'acccaccc'],
        correctAnswer: 0,
        damageToBoss: 250,
        damageToPlayer: 25,
        hint: '2[c] becomes "cc", so "a2[c]" becomes "acc". 3[acc] becomes "accaccacc".'
      },
      {
        roundNumber: 3,
        bossAction: 'FINAL STAND: [Low-Level Object Design]!',
        question: 'When designing an in-memory Railway Ticket Booking or Taxi Reservation system CLI in Java/C++, which design pattern is best for managing seat allocation states (Booked, RAC, Waiting List)?',
        options: [
          'State Design Pattern with clean encapsulation',
          'One single 1000-line function with 50 nested IF-ELSE statements',
          'Global static variables without classes',
          'Direct memory dumping'
        ],
        correctAnswer: 0,
        damageToBoss: 450,
        damageToPlayer: 35,
        hint: 'The State pattern allows ticket objects to alter behavior when their internal booking status changes.'
      }
    ]
  }
};

export const getBossForCompany = (companyId) => {
  return BOSS_ENCOUNTERS[companyId] || BOSS_ENCOUNTERS.google;
};
