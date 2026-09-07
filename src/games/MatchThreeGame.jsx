import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw, Timer, Flame, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

const TILE_TYPES = [
  { id: 'array', icon: '📦', name: 'Array', color: '#6366f1' },
  { id: 'tree', icon: '🌲', name: 'Tree', color: '#10b981' },
  { id: 'graph', icon: '🕸️', name: 'Graph', color: '#a855f7' },
  { id: 'hash', icon: '🔑', name: 'Hash Map', color: '#f59e0b' },
  { id: 'stack', icon: '🥞', name: 'Stack', color: '#ec4899' }
];

const GRID_SIZE = 6;

const getRandomTile = () => {
  return TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
};

const createInitialBoard = () => {
  const board = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push({ ...getRandomTile(), key: `${r}-${c}-${Math.random()}` });
    }
    board.push(row);
  }
  return board;
};

export const MatchThreeGame = ({ onGameComplete }) => {
  const [board, setBoard] = useState(createInitialBoard);
  const [selectedTile, setSelectedTile] = useState(null); // { r, c }
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [floatingPoints, setFloatingPoints] = useState([]);

  const targetMatches = 15;

  // Game Timer
  useEffect(() => {
    if (isGameFinished || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishMatchGame(score, matchesCount);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameFinished, timeLeft, score, matchesCount]);

  // Check for matches on board
  const checkMatches = (currentBoard) => {
    const matchedCoords = new Set();

    // Check rows
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE - 2; c++) {
        const id1 = currentBoard[r][c].id;
        const id2 = currentBoard[r][c + 1].id;
        const id3 = currentBoard[r][c + 2].id;
        if (id1 === id2 && id2 === id3) {
          matchedCoords.add(`${r},${c}`);
          matchedCoords.add(`${r},${c + 1}`);
          matchedCoords.add(`${r},${c + 2}`);
        }
      }
    }

    // Check columns
    for (let c = 0; c < GRID_SIZE; c++) {
      for (let r = 0; r < GRID_SIZE - 2; r++) {
        const id1 = currentBoard[r][c].id;
        const id2 = currentBoard[r + 1][c].id;
        const id3 = currentBoard[r + 2][c].id;
        if (id1 === id2 && id2 === id3) {
          matchedCoords.add(`${r},${c}`);
          matchedCoords.add(`${r + 1},${c}`);
          matchedCoords.add(`${r + 2},${c}`);
        }
      }
    }

    return matchedCoords;
  };

  const handleTileClick = (r, c) => {
    if (isGameFinished) return;
    playSound('click');

    if (!selectedTile) {
      setSelectedTile({ r, c });
      return;
    }

    // Check if clicked tile is adjacent
    const isAdjacent = 
      (Math.abs(selectedTile.r - r) === 1 && selectedTile.c === c) ||
      (Math.abs(selectedTile.c - c) === 1 && selectedTile.r === r);

    if (!isAdjacent) {
      setSelectedTile({ r, c });
      return;
    }

    // Swap tiles
    const newBoard = board.map(row => [...row]);
    const temp = newBoard[selectedTile.r][selectedTile.c];
    newBoard[selectedTile.r][selectedTile.c] = newBoard[r][c];
    newBoard[r][c] = temp;

    const matches = checkMatches(newBoard);

    if (matches.size > 0) {
      // Valid Match!
      processMatches(newBoard, matches);
    } else {
      // Invalid Swap -> Revert
      playSound('wrong');
    }

    setSelectedTile(null);
  };

  const processMatches = (currentBoard, matches) => {
    const matchedCount = matches.size;
    const newCombo = combo + 1;
    setCombo(newCombo);
    playSound('combo_hit', { combo: newCombo });

    const earned = Math.round(matchedCount * 50 * (1 + newCombo * 0.3));
    setScore(prev => prev + earned);
    const newMatchesTotal = matchesCount + Math.floor(matchedCount / 3);
    setMatchesCount(newMatchesTotal);

    // Replace matched tiles with new random tiles
    const updatedBoard = currentBoard.map((row, r) =>
      row.map((tile, c) => {
        if (matches.has(`${r},${c}`)) {
          return { ...getRandomTile(), key: `${r}-${c}-${Math.random()}` };
        }
        return tile;
      })
    );

    setBoard(updatedBoard);

    // Add floating visual
    const id = Date.now();
    setFloatingPoints(prev => [...prev, { id, text: `+${earned} PTS! (${newCombo}x Combo)` }]);
    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(p => p.id !== id));
    }, 1000);

    // Check if target reached
    if (newMatchesTotal >= targetMatches) {
      finishMatchGame(score + earned, newMatchesTotal);
    }
  };

  const finishMatchGame = (finalScore, finalMatches) => {
    setIsGameFinished(true);
    playSound('victory');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

    setTimeout(() => {
      if (onGameComplete) {
        onGameComplete(finalScore, finalMatches >= targetMatches ? 3 : 2);
      }
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 animate-fadeIn text-center select-none">
      {/* HUD Header */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/30 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Timer size={16} className={timeLeft <= 10 ? 'animate-ping text-rose-400' : ''} />
          <span>{timeLeft}s</span>
        </div>

        <div className="flex items-center gap-2">
          {combo > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center gap-1 animate-bounce">
              <Flame size={12} className="fill-amber-400" /> {combo}x
            </span>
          )}
          <span className="text-purple-300 font-bold text-sm">{score} PTS</span>
        </div>

        <div className="text-cyan-400 font-bold">
          {matchesCount} / {targetMatches} Matched
        </div>
      </div>

      {/* Floating combo notification */}
      {floatingPoints.map(fp => (
        <div key={fp.id} className="text-amber-300 font-heading font-black text-sm animate-bounce">
          ✨ {fp.text}
        </div>
      ))}

      {/* 6x6 Candy Grid */}
      <div className="glass-panel p-3 rounded-3xl border border-white/15 bg-[#0a0d1c] shadow-2xl inline-block">
        <div className="grid grid-cols-6 gap-2">
          {board.map((row, r) =>
            row.map((tile, c) => {
              const isSelected = selectedTile?.r === r && selectedTile?.c === c;
              return (
                <div
                  key={tile.key}
                  onClick={() => handleTileClick(r, c)}
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-150 transform hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500/40 border-2 border-amber-400 scale-110 shadow-lg shadow-amber-500/50 animate-pulse'
                      : 'bg-white/[0.04] border border-white/10 hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                  style={{
                    boxShadow: isSelected ? '0 0 15px rgba(245, 158, 11, 0.6)' : 'none'
                  }}
                >
                  <span className="drop-shadow-md">{tile.icon}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend Instructions */}
      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-around">
        <span>📦 Array</span>
        <span>🌲 Tree</span>
        <span>🕸️ Graph</span>
        <span>🔑 Hash</span>
        <span>🥞 Stack</span>
      </div>
    </div>
  );
};
