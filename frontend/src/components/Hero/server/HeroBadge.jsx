import React from 'react';
import { Baby, Sparkles } from 'lucide-react';

export function HeroBadge() {
  return (
    <div className="mt-2 md:mt-4 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs md:text-base font-extrabold bg-white/95 border border-emerald-200 text-slate-800 tracking-wider uppercase shadow-xl backdrop-blur-md">
      <Baby className="w-4 h-4 md:w-5 md:h-5 text-sky-500" />
      <span className="bg-gradient-to-r from-sky-600 via-emerald-600 to-pink-600 bg-clip-text text-transparent font-extrabold tracking-wider">
        Baby Shower & Revelación de Género — Bebé F.C.
      </span>
      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
    </div>
  );
}
