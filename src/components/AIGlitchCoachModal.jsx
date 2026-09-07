import React, { useState } from 'react';
import { X, Bot, Sparkles, Send, ArrowRight, Zap, Target, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const AIGlitchCoachModal = () => {
  const { 
    user, 
    targetCompany, 
    skillMastery, 
    diagnosticReport, 
    showGlitchCoachModal, 
    setShowGlitchCoachModal 
  } = useGame();

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user.name}! I am your AI Placement Coach from Team Glitch Theory. I'm actively tracking your progress for ${targetCompany.name}. What placement challenge can I help you conquer today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!showGlitchCoachModal) return null;

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    playSound('click');
    const userMsg = { sender: 'user', text: textToSend };
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('weak') || lower.includes('gap') || lower.includes('radar')) {
        reply = `Based on your diagnostic profile, your highest priority gap is in ${diagnosticReport ? diagnosticReport.priorityFocus : 'Dynamic Programming & Concurrency'}. I recommend solving the 'Optimal Coin Change DP' problem in the Code Arena to build pattern intuition.`;
      } else if (lower.includes('interview') || lower.includes('star') || lower.includes('hr')) {
        reply = `For ${targetCompany.name}, HR and behavioral rounds place massive weight on the STAR method. Always frame your answer with: 1) Situation (context), 2) Task (challenge), 3) Action (what YOU did with data/code), and 4) Result (quantified impact). Practice in our AI Mock tab!`;
      } else if (lower.includes('boss') || lower.includes('fight') || lower.includes('bar raiser')) {
        reply = `To defeat ${targetCompany.boss.name}, make sure you enter with a 3+ streak bonus. Use your '50/50 Excalibur' when hit by tricky Big-O traps, and don't rush—accuracy deals 300+ damage per round!`;
      } else if (lower.includes('ctc') || lower.includes('salary') || lower.includes('rounds')) {
        reply = `${targetCompany.name} typically offers ${targetCompany.ctc}. The selection consists of 5 stages: Online Screening, 2 Technical DSA/Core rounds, 1 Behavioral round, and the Final Bar Raiser review.`;
      } else {
        reply = `Great question! For ${targetCompany.name}, focus on mastering ${targetCompany.focusSkills.slice(0, 2).join(' and ')}. Keep your daily streak alive to earn double XP and unlock tier nodes on your RPG Skill Tree.`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsThinking(false);
      playSound('correct');
    }, 700);
  };

  const quickPrompts = [
    'What are my current skill gaps?',
    `How do I prepare for ${targetCompany.name}?`,
    'Tips for defeating the Bar Raiser Boss',
    'How do I use the STAR framework?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel border border-purple-500/40 p-6 rounded-3xl bg-[#0d1020] shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Bot size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-white">AI Glitch Coach</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">Targeting: {targetCompany.name} ({targetCompany.worldName})</p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setShowGlitchCoachModal(false);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300 text-xs shrink-0 font-bold">
                  AI
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-tr-none'
                    : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2 items-center text-xs text-purple-400 italic">
              <Sparkles size={14} className="animate-spin" />
              <span>Glitch AI is computing optimal response...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 pt-2 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI coach about algorithms, HR rounds, or company prep..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="btn-cyber-primary px-4 py-2.5 text-xs rounded-xl disabled:opacity-50"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
