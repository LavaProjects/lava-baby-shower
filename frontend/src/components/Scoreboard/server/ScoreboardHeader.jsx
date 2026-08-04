import React from 'react';
import { Clock } from 'lucide-react';

export function ScoreboardHeader() {
  return (
    <>
      <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-100/80 text-emerald-800 text-[10px] font-black tracking-widest uppercase rounded-full border border-emerald-200 shadow-xs mb-3">
        <Clock className="w-3.5 h-3.5 text-emerald-600" />
        <span>TABLERO DE TIEMPO: SILBATAZO INICIAL</span>
      </span>
      <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-1">Conteo Regresivo del Partido</h3>
      <p className="text-xs font-extrabold tracking-wider text-slate-400 mb-6 uppercase">25 Octubre 2026 • 16:00 Hrs</p>
    </>
  );
}
