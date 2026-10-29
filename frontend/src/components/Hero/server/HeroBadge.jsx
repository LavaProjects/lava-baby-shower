import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function HeroBadge() {
  return (
    <div className="mt-2 md:mt-4 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs md:text-base font-extrabold bg-white/95 border border-pink-200 text-slate-800 tracking-wider uppercase shadow-xl backdrop-blur-md">
      <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-500 fill-current" />
      <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 bg-clip-text text-transparent font-extrabold tracking-wider">
        ¡GRACIAS POR ACOMPAÑARNOS! • ¡ES NIÑA: LÍA SAORI! 🎀⚽
      </span>
      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
    </div>
  );
}
