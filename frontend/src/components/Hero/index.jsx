import React from 'react';
import { HeroBadge } from './server/HeroBadge';
import { HeroSwayIcons } from './client/HeroSwayIcons';

export function Hero() {
  return (
    <header className="relative w-full overflow-hidden shadow-md mb-10 border-b-4 border-emerald-500 min-h-[340px] md:min-h-[480px] flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/baby_shower_hero_bg.png')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none"></div>

      <div className="relative z-10 px-6 py-4 md:py-6 text-center flex flex-col items-center justify-between w-full h-full min-h-[340px] md:min-h-[480px]">
        <HeroBadge />
        <HeroSwayIcons />
      </div>
    </header>
  );
}
