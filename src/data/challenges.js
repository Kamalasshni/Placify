export const CODE_ARENA_PROBLEMS = [
  {
    id: 'two-sum',
    title: 'Two Sum Target Finder',
    difficulty: 'Easy',
    tier: 'Core Pattern',
    category: 'Arrays & Hashing',
    xpReward: 150,
    gemReward: 25,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\``,
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Use a Hash Map for O(N) time complexity
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    # Use a dictionary for O(N) lookup
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (mp.find(comp) != mp.end()) {
            return {mp[comp], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}`
    },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
      { input: { nums: [1, 5, 8, 12, 19], target: 20 }, expected: [0, 4] }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    aiHint: 'Instead of checking every pair with nested loops O(N^2), remember previously seen numbers in a Hash Map to find the complement in O(1) time.'
  },
  {
    id: 'longest-substring',
    title: 'Longest Unique Substring',
    difficulty: 'Medium',
    tier: 'High Frequency',
    category: 'Sliding Window',
    xpReward: 250,
    gemReward: 40,
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.

**Example 1:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
\`\`\``,
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();

  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }
    charMap.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    max_len = 0
    start = 0
    for end, char in enumerate(s):
        if char in char_map and char_map[char] >= start:
            start = char_map[char] + 1
        char_map[char] = end
        max_len = max(max_len, end - start + 1)
    return max_len`,
      cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> charMap;
    int maxLen = 0, start = 0;
    for (int end = 0; end < s.length(); end++) {
        if (charMap.count(s[end]) && charMap[s[end]] >= start) {
            start = charMap[s[end]] + 1;
        }
        charMap[s[end]] = end;
        maxLen = max(maxLen, end - start + 1);
    }
    return maxLen;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int maxLen = 0, start = 0;
    for (int end = 0; end < s.length(); end++) {
        char c = s.charAt(end);
        if (map.containsKey(c) && map.get(c) >= start) {
            start = map.get(c) + 1;
        }
        map.put(c, end);
        maxLen = Math.max(maxLen, end - start + 1);
    }
    return maxLen;
}`
    },
    testCases: [
      { input: { s: "abcabcbb" }, expected: 3 },
      { input: { s: "bbbbb" }, expected: 1 },
      { input: { s: "pwwkew" }, expected: 3 },
      { input: { s: "placify" }, expected: 7 }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M))',
    aiHint: 'Use the Sliding Window technique with two pointers `start` and `end`. Maintain the last seen index of each character to dynamically slide the left boundary.'
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Syntax Validator',
    difficulty: 'Easy',
    tier: 'Core Pattern',
    category: 'Stack',
    xpReward: 160,
    gemReward: 25,
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "(]"
Output: false
\`\`\``,
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.push(char)
    return len(stack) == 0`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`
    },
    testCases: [
      { input: { s: "()[]{}" }, expected: true },
      { input: { s: "(]" }, expected: false },
      { input: { s: "([{}])" }, expected: true },
      { input: { s: "[(])" }, expected: false }
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    aiHint: 'A Last-In-First-Out (LIFO) Stack data structure is perfect for matching nested brackets in linear time.'
  },
  {
    id: 'coin-change',
    title: 'Optimal Coin Change DP',
    difficulty: 'Medium',
    tier: 'MAANG Classic',
    category: 'Dynamic Programming',
    xpReward: 300,
    gemReward: 50,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

**Example 1:**
\`\`\`
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\`

**Example 2:**
\`\`\`
Input: coins = [2], amount = 3
Output: -1
\`\`\``,
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i - coin >= 0) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    },
    testCases: [
      { input: { coins: [1, 2, 5], amount: 11 }, expected: 3 },
      { input: { coins: [2], amount: 3 }, expected: -1 },
      { input: { coins: [1], amount: 0 }, expected: 0 },
      { input: { coins: [1, 3, 4], amount: 6 }, expected: 2 }
    ],
    timeComplexity: 'O(amount * len(coins))',
    spaceComplexity: 'O(amount)',
    aiHint: 'Build a bottom-up DP table where dp[i] represents the minimum coins required to form amount i. For each coin, dp[i] = min(dp[i], dp[i - coin] + 1).'
  }
];

// Stage Specific Challenges for Company Worlds
export const COMPANY_STAGES = {
  // Stage 1: Aptitude Citadel
  stage1: {
    title: 'Stage 1: Aptitude Citadel',
    subtitle: 'Screening Round • Speed Math & Logical Reasoning',
    icon: 'Brain',
    color: '#06b6d4',
    xpReward: 200,
    questions: [
      {
        id: 'apt-1',
        type: 'mcq',
        question: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:',
        options: ['12 minutes', '15 minutes', '25 minutes', '50 minutes'],
        correctAnswer: 0,
        explanation: 'Work done in 1 min = (1/20 + 1/30) = (3+2)/60 = 5/60 = 1/12. Time = 12 minutes.'
      },
      {
        id: 'apt-2',
        type: 'mcq',
        question: 'Find the missing number in the series: 3, 8, 18, 38, 78, ?',
        options: ['158', '148', '168', '156'],
        correctAnswer: 0,
        explanation: 'Pattern: (3*2)+2 = 8, (8*2)+2 = 18, (18*2)+2 = 38, (38*2)+2 = 78, (78*2)+2 = 158.'
      },
      {
        id: 'apt-3',
        type: 'mcq',
        question: 'In a class of 60 students, 40% are girls. How many boys are there in the class?',
        options: ['24', '36', '30', '42'],
        correctAnswer: 1,
        explanation: 'Girls = 40% of 60 = 24. Boys = 60 - 24 = 36.'
      },
      {
        id: 'apt-4',
        type: 'mcq',
        question: 'A fair die is rolled. What is the probability of rolling a prime number?',
        options: ['1/3', '1/2', '2/3', '1/6'],
        correctAnswer: 1,
        explanation: 'Prime numbers on a 6-sided die are {2, 3, 5}. Total outcomes = 6. Probability = 3/6 = 1/2.'
      }
    ]
  },

  // Stage 2: Algorithm Dungeon
  stage2: {
    title: 'Stage 2: Algorithm Dungeon',
    subtitle: 'Technical Round 1 • Data Structures & Logic Arena',
    icon: 'Code',
    color: '#a855f7',
    xpReward: 350,
    problemId: 'two-sum'
  },

  // Stage 3: Core CS & System Tower
  stage3: {
    title: 'Stage 3: Core CS & System Tower',
    subtitle: 'Technical Round 2 • OS, DBMS, Computer Networks & Architecture',
    icon: 'Server',
    color: '#6366f1',
    xpReward: 300,
    questions: [
      {
        id: 'core-1',
        type: 'mcq',
        question: 'In Operating Systems, what is the primary purpose of the Translation Lookaside Buffer (TLB)?',
        options: [
          'To cache page table translations and speed up virtual-to-physical address translation',
          'To prevent process deadlocks by reallocating CPU registers',
          'To buffer disk I/O operations into secondary storage',
          'To manage network socket buffers during TCP handshakes'
        ],
        correctAnswer: 0,
        explanation: 'The TLB is a high-speed hardware cache that stores recent virtual-to-physical address mappings, avoiding multiple RAM lookups on every memory access.'
      },
      {
        id: 'core-2',
        type: 'mcq',
        question: 'Which SQL clause is used to filter group results created by the GROUP BY clause?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
        correctAnswer: 1,
        explanation: 'HAVING is evaluated after grouping (aggregations), whereas WHERE filters individual rows before grouping occurs.'
      },
      {
        id: 'core-3',
        type: 'mcq',
        question: 'In TCP 3-Way Handshake, what flags are sent in the second packet from Server to Client?',
        options: ['SYN', 'ACK', 'SYN + ACK', 'FIN + ACK'],
        correctAnswer: 2,
        explanation: 'The server acknowledges the client SYN and sends its own synchronize sequence number: SYN-ACK.'
      },
      {
        id: 'core-4',
        type: 'mcq',
        question: 'In Database Transactions, which ACID property ensures that changes are permanently recorded in non-volatile storage even in case of power failure?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctAnswer: 3,
        explanation: 'Durability guarantees that once a transaction commits, its modifications survive any subsequent system crashes.'
      }
    ]
  },

  // Stage 4: HR & Behavioral Arena
  stage4: {
    title: 'Stage 4: HR & Behavioral Arena',
    subtitle: 'Behavioral Round • Culture Fit, Leadership & STAR Scorer',
    icon: 'UserCheck',
    color: '#10b981',
    xpReward: 250,
    prompts: [
      {
        id: 'hr-1',
        question: 'Tell me about a challenging project deadline where things went wrong. How did you handle it?',
        keyCriteria: ['Situation clarity', 'Ownership / Task definition', 'Concrete Actions taken', 'Measurable Result / Learning'],
        sampleGoodAnswer: 'In my third-year capstone project, our backend API service crashed 48 hours before the college demo (Situation). As the team lead, I had to ensure we delivered a functional prototype on time (Task). I conducted an emergency triage session, identified a memory leak in our database connection pool, isolated the offending query, and set up fallback mock data (Action). We stabilized the build 12 hours ahead of the demo, received first prize in the showcase, and implemented health check monitors in all future projects (Result).'
      },
      {
        id: 'hr-2',
        question: 'Why do you want to join this specific company over others in the industry?',
        keyCriteria: ['Company culture knowledge', 'Specific product/tech stack alignment', 'Personal career growth trajectory'],
        sampleGoodAnswer: 'I have closely followed your engineering work on large-scale distributed systems and open-source contributions. My preparation in low-latency systems and data structures directly aligns with your team\'s high standards. Joining your engineering team offers the ideal environment to tackle complex real-world scale while contributing high-impact code.'
      }
    ]
  }
};
