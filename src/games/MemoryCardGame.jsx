import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Timer, CheckCircle2, RotateCcw, Trophy, Star } from 'lucide-react';
import { playSound } from '../utils/audio';

const CARD_PAIRS = [
  { pairId: 1, text: 'Binary Search', type: 'algo' },
  { pairId: 1, text: 'O(log N)', type: 'comp' },

  { pairId: 2, text: 'Two Sum Hash', type: 'algo' },
  { pairId: 2, text: 'O(N)', type: 'comp' },

  { pairId: 3, text: 'Merge Sort', type: 'algo' },
  { pairId: 3, text: 'O(N log N)', type: 'comp' },

  { pairId: 4, text: 'Bubble Sort', type: 'algo' },
  { pairId: 4, text: 'O(N²)', type: 'comp' },

  { pairId: 5, text: 'Dijkstra Heap', type: 'algo' },
  { pairId: 5, text: 'O(E log V)', type: 'comp' },

  { pairId: 6, text: 'Hash Lookup', type: 'algo' },
  { pairId: 6, text: 'O(1)', type: 'comp' },

  { pairId: 7, text: 'Matrix Chain DP', type: 'algo' },
  { pairId: 7, text: 'O(N³)', type: 'comp' },

  { pairId: 8, text: 'Graph DFS / BFS', type: 'algo' },
  { pairId: 8, text: 'O(V + E)', type: 'comp' }
];

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

export const MemoryCardGame = ({ onGameComplete }) => {
  const [cards, setCards] = useState(() => shuffleArray(CARD_PAIRS).map((c, i) => ({ ...c, id: i })));
  const [flippedIds, setFlippedIds] = useState([]); // indices currently flipped
  const [matchedPairIds, setMatchedPairIds] = useState([]); // pair IDs solved
  const [movesCount, setMovesCount] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame(score, matchedPairIds.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, timeLeft, score, matchedPairIds]);

  const handleCardClick = (card) => {
    if (
      isFinished ||
      flippedIds.includes(card.id) ||
      matchedPairIds.includes(card.pairId) ||
      flippedIds.length >= 2
    ) {
      return;
    }

    playSound('click');
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMovesCount(prev => prev + 1);
      const firstCard = cards.find(c => c.id === newFlipped[0]);
      const secondCard = card;

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        playSound('correct');
        const newMatched = [...matchedPairIds, firstCard.pairId];
        setMatchedPairIds(newMatched);
        setFlippedIds([]);
        setScore(prev => prev + 150);

        if (newMatched.length === 8) {
          finishGame(score + 150 + timeLeft * 10, 8);
        }
      } else {
        // NO MATCH -> Flip back
        playSound('wrong');
        setTimeout(() => {
          setFlippedIds([]);
        }, 700);
      }
    }
  };

  const finishGame = (finalScore, matchedCount) => {
    setIsFinished(true);
    playSound('victory');
    confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });

    setTimeout(() => {
      if (onGameComplete) {
        onGameComplete(finalScore, matchedCount >= 8 ? 3 : matchedCount >= 5 ? 2 : 1);
      }
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn text-center select-none">
      {/* HUD Header */}
      <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Timer size={16} className={timeLeft <= 10 ? 'animate-ping text-rose-400' : ''} />
          <span>{timeLeft}s</span>
        </div>

        <div className="text-purple-300 font-bold text-sm">{score} PTS</div>

        <div className="text-emerald-400 font-bold">
          {matchedPairIds.length} / 8 Pairs Solved
        </div>
      </div>

      {/* 4x4 Grid of Cards */}
      <div className="glass-panel p-4 rounded-3xl border border-white/15 bg-[#0a0f1d] shadow-2xl">
        <div className="grid grid-cols-4 gap-2.5">
          {cards.map((card) => {
            const isFlipped = flippedIds.includes(card.id) || matchedPairIds.includes(card.pairId);
            const isMatched = matchedPairIds.includes(card.pairId);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`h-20 sm:h-24 rounded-2xl border flex items-center justify-center p-2 text-center cursor-pointer transition-all duration-200 transform ${
                  isMatched
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/20'
                    : isFlipped
                    ? 'bg-indigo-950/70 border-indigo-500 text-white font-bold scale-105 shadow-lg shadow-indigo-500/30'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/30 hover:bg-white/[0.08] text-slate-500 hover:scale-105'
                }`}
              >
                {isFlipped ? (
                  <span className={`text-xs font-mono font-bold leading-tight ${card.type === 'comp' ? 'text-cyan-300' : 'text-purple-200'}`}>
                    {card.text}
                  </span>
                ) : (
                  <span className="text-xl">⚡</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs font-mono text-slate-400">
        Flip cards to match each Algorithm with its optimal Big-O Time Complexity!
      </p>
    </div>
  );
};
