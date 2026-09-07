import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ChefHat, Timer, Flame, CheckCircle2, RotateCcw, Star, ArrowRight, Sparkles, Utensils } from 'lucide-react';
import { playSound } from '../utils/audio';

const RECIPES = [
  {
    id: 'two-sum-pasta',
    dishName: 'Two-Sum Truffle Pasta',
    customer: 'Google Recruiter 🏢',
    icon: '🍝',
    targetComplexity: 'O(N) Time • O(N) Space',
    desc: 'Assemble the optimal Hash Map recipe to find matching complement pairs!',
    steps: [
      { id: 'step-1', label: '1. Initialize Empty Hash Map', order: 1 },
      { id: 'step-2', label: '2. Iterate through Array of Numbers', order: 2 },
      { id: 'step-3', label: '3. Calculate Complement = Target - Current', order: 3 },
      { id: 'step-4', label: '4. Check if Complement exists in Map', order: 4 },
      { id: 'step-5', label: '5. Return Indices or Store Current Number', order: 5 }
    ]
  },
  {
    id: 'lru-cache-burger',
    dishName: 'LRU Cache Double Burger',
    customer: 'Amazon Bar Raiser 🛡️',
    icon: '🍔',
    targetComplexity: 'O(1) Get & Put Operations',
    desc: 'Stack the Doubly Linked List and Hash Map buns in optimal order!',
    steps: [
      { id: 'step-1', label: '1. Create Doubly Linked List with Head & Tail', order: 1 },
      { id: 'step-2', label: '2. Create Hash Map to map Keys to Node Pointers', order: 2 },
      { id: 'step-3', label: '3. On GET: Move accessed node to Head (Most Recent)', order: 3 },
      { id: 'step-4', label: '4. On PUT: Check Capacity; evict Tail if full', order: 4 },
      { id: 'step-5', label: '5. Insert new Node at Head & update Hash Map', order: 5 }
    ]
  },
  {
    id: 'binary-search-ramen',
    dishName: 'Binary Search Spicy Ramen',
    customer: 'Microsoft Architect 💎',
    icon: '🍜',
    targetComplexity: 'O(log N) Time Bound',
    desc: 'Divide and conquer the broth by bisecting the sorted search space!',
    steps: [
      { id: 'step-1', label: '1. Verify Array is Sorted & Set Left = 0, Right = N-1', order: 1 },
      { id: 'step-2', label: '2. While Left <= Right, compute Midpoint', order: 2 },
      { id: 'step-3', label: '3. If Arr[Mid] == Target, Serve Dish immediately', order: 3 },
      { id: 'step-4', label: '4. If Arr[Mid] < Target, Shift Left to Mid + 1', order: 4 },
      { id: 'step-5', label: '5. Else Shift Right to Mid - 1', order: 5 }
    ]
  }
];

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const CodeKitchenGame = ({ onGameComplete }) => {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(() => RECIPES[0]);
  const [availableIngredients, setAvailableIngredients] = useState(() => shuffleArray(RECIPES[0].steps));
  const [cookingPot, setCookingPot] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [dishState, setDishState] = useState('cooking'); // 'cooking', 'served', 'burned'
  const [completedRecipes, setCompletedRecipes] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (dishState !== 'cooking' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleBurnDish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [dishState, timeLeft]);

  const handleAddIngredient = (item) => {
    if (dishState !== 'cooking') return;
    playSound('click');

    const nextOrderNeeded = cookingPot.length + 1;

    if (item.order === nextOrderNeeded) {
      // Correct step added!
      playSound('correct');
      setCookingPot(prev => [...prev, item]);
      setAvailableIngredients(prev => prev.filter(i => i.id !== item.id));

      if (cookingPot.length + 1 === currentOrder.steps.length) {
        handleServeDish();
      }
    } else {
      // Wrong ingredient order!
      playSound('wrong');
      setCombo(0);
      alert(`⚠️ Recipe Order Mistake! You tried to add step #${item.order} before completing step #${nextOrderNeeded}. Follow the chronological execution order!`);
    }
  };

  const handleServeDish = () => {
    playSound('victory');
    setDishState('served');
    const newCombo = combo + 1;
    setCombo(newCombo);

    const speedBonus = timeLeft * 15;
    const earned = Math.round((250 + speedBonus) * (1 + newCombo * 0.3));
    setScore(prev => prev + earned);
    const totalDone = completedRecipes + 1;
    setCompletedRecipes(totalDone);

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      if (recipeIndex < RECIPES.length - 1) {
        const nextIdx = recipeIndex + 1;
        setRecipeIndex(nextIdx);
        setCurrentOrder(RECIPES[nextIdx]);
        setAvailableIngredients(shuffleArray(RECIPES[nextIdx].steps));
        setCookingPot([]);
        setTimeLeft(30);
        setDishState('cooking');
      } else {
        if (onGameComplete) {
          onGameComplete(score + earned, 3);
        }
      }
    }, 1500);
  };

  const handleBurnDish = () => {
    playSound('wrong');
    setDishState('burned');
  };

  const handleRestartCurrentDish = () => {
    playSound('click');
    setCookingPot([]);
    setAvailableIngredients(shuffleArray(currentOrder.steps));
    setTimeLeft(30);
    setDishState('cooking');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn select-none">
      {/* Kitchen HUD */}
      <div className="glass-panel p-4 md:p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#1c120c] via-[#241710] to-[#0d0e1a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl">
            👨‍🍳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-white text-lg">FAANG Code Kitchen</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                COOKING MAMA CHEF
              </span>
            </div>
            <p className="text-xs text-amber-300 font-mono">Customer: {currentOrder.customer}</p>
          </div>
        </div>

        {/* Score & Timer */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 ${
            timeLeft <= 8 ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-ping' : 'bg-white/5 border-white/10 text-amber-400'
          }`}>
            <Timer size={15} />
            <span>{timeLeft}s</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 font-bold text-purple-300">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4 text-center bg-[#0d1020]">
        <div className="text-4xl animate-bounce">{currentOrder.icon}</div>
        <div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 font-bold">
            RECIPE {recipeIndex + 1} OF {RECIPES.length}: {currentOrder.targetComplexity}
          </span>
          <h2 className="text-2xl font-heading font-black text-white mt-2">
            {currentOrder.dishName}
          </h2>
          <p className="text-xs text-slate-300 mt-1">{currentOrder.desc}</p>
        </div>

        {/* The Cooking Pot (Assembled Steps) */}
        <div className="p-4 rounded-2xl bg-amber-950/20 border-2 border-dashed border-amber-500/40 text-left space-y-2 min-h-[140px]">
          <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold border-b border-amber-500/20 pb-2">
            <span className="flex items-center gap-1.5">
              <Utensils size={14} /> Cooking Pot (Chronological Algorithm Sequence):
            </span>
            <span>{cookingPot.length} / {currentOrder.steps.length} Assembled</span>
          </div>

          {cookingPot.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4 text-center">
              The pot is empty! Tap the algorithm ingredients below in the exact logical execution order.
            </p>
          ) : (
            <div className="space-y-1.5 animate-fadeIn">
              {cookingPot.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
                  <span>{item.label}</span>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Ingredients to Click */}
        {dishState === 'cooking' && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-400 font-bold block text-left">
              🥕 Tap Next Ingredient in Correct Order:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableIngredients.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddIngredient(item)}
                  className="p-3 rounded-2xl bg-white/[0.04] hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-xs font-mono text-slate-200 text-left transition transform active:scale-95 cursor-pointer flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-amber-400 font-bold">+ Add</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Served Dish Banner */}
        {dishState === 'served' && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-sm font-heading font-black animate-bounce">
            🎉 Dish Served Perfectly! 5-Star Customer Tip Earned!
          </div>
        )}

        {/* Burned Dish Retry */}
        {dishState === 'burned' && (
          <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-300 text-xs font-mono space-y-3">
            <p>🔥 Dish Burned! You ran out of kitchen time.</p>
            <button
              onClick={handleRestartCurrentDish}
              className="btn-cyber-primary text-xs px-4 py-2 font-bold"
            >
              <RotateCcw size={14} />
              <span>Retry Dish</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
