import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle2, Shield, Heart, Sparkles, Zap, Lock } from 'lucide-react';
import { SHOP_POWERUPS, AVATAR_SKINS } from '../data/shopItems';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const GameShopModal = () => {
  const { 
    user, 
    inventory, 
    hearts, 
    maxHearts, 
    avatarSkin, 
    unlockedSkins, 
    showShopModal, 
    setShowShopModal, 
    buyShopItem, 
    equipAvatarSkin 
  } = useGame();

  const [activeTab, setActiveTab] = useState('powerups'); // 'powerups', 'skins'

  if (!showShopModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel border border-amber-500/40 p-6 md:p-8 rounded-3xl bg-[#0b0e1e] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl text-amber-400">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-xl text-white">Cyber Item Shop</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  BLACK MARKET
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Upgrade your arcade loadout with gems</p>
            </div>
          </div>

          {/* Right Wallet & Close */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 font-heading font-bold text-xs text-cyan-300 flex items-center gap-1.5">
              <span>💎</span>
              <span className="font-mono text-sm">{user.gems}</span>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setShowShopModal(false);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-4 border-b border-white/5 pb-2">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('powerups');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition cursor-pointer ${
              activeTab === 'powerups'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Power-ups & Lives
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('skins');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition cursor-pointer ${
              activeTab === 'skins'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🤖 Avatar Skins
          </button>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 no-scrollbar">
          {activeTab === 'powerups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SHOP_POWERUPS.map((item) => {
                const ownedCount = item.id === 'heart_refill' ? hearts : (inventory[item.id] || 0);
                const canBuy = user.gems >= item.cost;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          {item.id === 'heart_refill' ? (
                            <span className="text-rose-400 font-bold">{hearts}/{maxHearts} Hearts</span>
                          ) : (
                            <span className="text-slate-400">Owned: <strong className="text-white">{ownedCount}</strong></span>
                          )}
                        </div>
                      </div>

                      <h4 className="font-heading font-bold text-sm text-white mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="font-heading font-black text-cyan-300 text-sm flex items-center gap-1">
                        <span>💎</span>
                        <span>{item.cost}</span>
                      </span>

                      <button
                        onClick={() => buyShopItem(item)}
                        disabled={!canBuy}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold transition ${
                          canBuy
                            ? 'btn-cyber-primary'
                            : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                        }`}
                      >
                        {canBuy ? 'Buy Item' : 'Need Gems'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'skins' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVATAR_SKINS.map((skin) => {
                const isUnlocked = unlockedSkins.includes(skin.id);
                const isEquipped = avatarSkin === skin.id;
                const canBuy = user.gems >= skin.cost;

                return (
                  <div
                    key={skin.id}
                    className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                      isEquipped
                        ? 'bg-purple-950/40 border-purple-500 shadow-md shadow-purple-500/20'
                        : isUnlocked
                        ? 'bg-white/[0.03] border-white/15'
                        : 'bg-white/[0.01] border-white/5 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${skin.color}25`, border: `1px solid ${skin.color}40` }}
                        >
                          {skin.icon}
                        </div>
                        {isEquipped ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 size={11} /> EQUIPPED
                          </span>
                        ) : isUnlocked ? (
                          <span className="text-[10px] font-mono text-slate-400">UNLOCKED</span>
                        ) : (
                          <span className="text-xs font-mono font-bold text-cyan-300">💎 {skin.cost}</span>
                        )}
                      </div>

                      <h4 className="font-heading font-bold text-sm text-white mb-1">
                        {skin.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {skin.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                      {isEquipped ? (
                        <span className="text-xs font-mono text-emerald-400 font-bold">Active Avatar</span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => equipAvatarSkin(skin.id)}
                          className="btn-cyber-secondary text-xs px-4 py-1.5 font-bold"
                        >
                          Equip Skin
                        </button>
                      ) : (
                        <button
                          onClick={() => buyShopItem(skin)}
                          disabled={!canBuy}
                          className={`px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition ${
                            canBuy
                              ? 'btn-cyber-primary'
                              : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                          }`}
                        >
                          {canBuy ? `Unlock (${skin.cost} 💎)` : `Need ${skin.cost} 💎`}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
