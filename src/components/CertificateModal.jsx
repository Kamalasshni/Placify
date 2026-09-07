import React from 'react';
import { X, Award, CheckCircle2, Download, Printer, Share2, Sparkles, Shield } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const CertificateModal = () => {
  const { user, targetCompany, showCertModal, setShowCertModal } = useGame();

  if (!showCertModal) return null;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const certHash = `GLITCH-${targetCompany.id.toUpperCase()}-${user.level}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel border border-amber-500/40 p-6 md:p-10 rounded-3xl bg-[#0c0f1d] shadow-2xl overflow-hidden text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            setShowCertModal(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Certificate Border Canvas */}
        <div className="border-4 border-double border-amber-500/30 rounded-2xl p-6 md:p-8 bg-gradient-to-b from-slate-900/90 to-[#0b0e1a] relative">
          {/* Top Logo */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">⚡</span>
            <span className="font-heading font-black text-2xl tracking-widest text-white">
              PLACIFY
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
              TEAM GLITCH THEORY
            </span>
          </div>

          <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-6">
            OFFICIAL PLACEMENT READINESS CERTIFICATION
          </p>

          <p className="text-xs text-slate-400 mb-2">This is to certify that</p>
          <h2 className="text-3xl md:text-4xl font-heading font-black gradient-text-gold mb-2">
            {user.name}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            has successfully proven algorithmic competency, core computer science reasoning, and behavioral excellence targeted for recruitment at
          </p>

          {/* Company Target Box */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
            <span className="text-xl">🏢</span>
            <span className="font-heading font-bold text-lg text-white">{targetCompany.name}</span>
            <span className="text-xs text-slate-400">• {targetCompany.badge}</span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-6 text-left">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">PRI READINESS</span>
              <span className="text-xl font-heading font-black text-emerald-400">{user.priScore}%</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">PLAYER LEVEL</span>
              <span className="text-xl font-heading font-black text-amber-400">Lv. {user.level}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">STATUS</span>
              <span className="text-xs font-heading font-bold text-cyan-400 flex items-center gap-1 mt-1">
                <CheckCircle2 size={13} /> READY
              </span>
            </div>
          </div>

          {/* Verification Hash & Signature */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="text-left">
              <span className="text-[10px] text-slate-500 block">VERIFICATION ID</span>
              <span className="text-slate-300 text-[11px]">{certHash}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">VERIFIED BY</span>
              <span className="text-indigo-400 font-semibold">Placify AI Evaluation Engine</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            className="btn-cyber-primary text-xs py-2.5 px-5 flex items-center gap-2"
          >
            <Printer size={15} />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={() => {
              playSound('click');
              if (navigator.share) {
                navigator.share({
                  title: 'Placify Placement Readiness Certificate',
                  text: `I just achieved a ${user.priScore}% Placement Readiness Score for ${targetCompany.name} on Placify!`,
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(`I achieved ${user.priScore}% Placement Readiness Score for ${targetCompany.name} on Placify by Team Glitch Theory!`);
                alert('Certificate share link copied to clipboard!');
              }
            }}
            className="btn-cyber-secondary text-xs py-2.5 px-5 flex items-center gap-2"
          >
            <Share2 size={15} />
            <span>Share Achievement</span>
          </button>
        </div>
      </div>
    </div>
  );
};
