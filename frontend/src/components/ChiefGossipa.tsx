import React from "react";
import "../Sparkle.css"; // we'll define the sparkle animation here

const ChiefGossipaCard = () => {
  return (
    <div className="premium-aside mb-6">
      <div className="premium-card group relative rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2c2c2c] p-6 text-white shadow-xl border border-white/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(255,215,0,0.3)]">
        
        {/* Sparkling Crown */}
        <div className="crown-icon text-3xl mb-2 sparkle animate-sparkle">👑</div>

        <h3 className="premium-title text-lg font-bold mb-2 text-white">
          Become a Chief Gossipa
        </h3>

        <p className="premium-text text-sm text-zinc-300 mb-3 leading-relaxed">
          Stand out in the World of anonymity. Get Heard. Remain Unknown.
        </p>

        <div className="trending-stats text-xs text-yellow-400 mb-3">
          🔥 Trending Now: <strong>152</strong> Gissipas
        </div>

        <div className="avatar-hint flex items-center justify-center gap-2 mb-4">
          <img
            src="/img/avatars/thumbs/dog.jpg"
            alt="Anonymous"
            className="w-8 h-8 rounded-full object-cover brightness-90 blur-[1px]"
          />
          <p className="text-xs text-zinc-400">
            You’re 1 step from <strong className="text-yellow-300">trending</strong>…
          </p>
        </div>

        <a
          href="/subscribe"
          className="premium-btn inline-block rounded-full bg-yellow-400 text-black font-bold text-sm px-5 py-2 transition hover:bg-yellow-300"
        >
          Chief Gossipa
        </a>
      </div>
    </div>
  );
};

export default ChiefGossipaCard;
