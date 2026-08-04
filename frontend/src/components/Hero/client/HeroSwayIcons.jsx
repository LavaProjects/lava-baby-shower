import React from 'react';

const SWAY_EMOJIS = ['⚽', '🍼', '👶', '🎀', '🧸', '🏆', '⚽'];

export function HeroSwayIcons() {
  return (
    <div className="mb-2 md:mb-4 flex justify-center items-center space-x-2.5 animate-sway">
      {SWAY_EMOJIS.map((emoji, i) => (
        <div key={i} className="backdrop-blur-md bg-white/90 border border-white/90 px-4 py-2.5 rounded-2xl shadow-md text-xl md:text-2xl">
          {emoji}
        </div>
      ))}
    </div>
  );
}
