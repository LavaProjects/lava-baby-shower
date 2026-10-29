import React from 'react';

export function CountdownTimer({ timeLeft, isFinished = true }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto relative z-10">
      <div className="grid grid-cols-4 gap-3 md:gap-5">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all">
            <span className="block text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent font-mono tracking-tight">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mt-1">
              {unit === 'days' ? 'Días' : unit === 'hours' ? 'Hrs' : unit === 'minutes' ? 'Min' : 'Seg'}
            </span>
          </div>
        ))}
      </div>

      {isFinished && (
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200/80 p-3.5 rounded-2xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-700 block mb-0.5">
            ¡Marcador Definitivo del Silbatazo Final!
          </span>
          <p className="font-extrabold text-slate-800 text-sm md:text-base">
            ¡Triunfo del Team Niña! 🎀 Bienvenida <span className="text-pink-600 font-black">Lía Saori</span> ⚽✨
          </p>
        </div>
      )}
    </div>
  );
}
