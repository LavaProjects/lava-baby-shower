import React from 'react';

export function CountdownTimer({ timeLeft }) {
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto relative z-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-md transition-all">
          <span className="block text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent font-mono tracking-tight">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mt-1">
            {unit === 'days' ? 'Días' : unit === 'hours' ? 'Hrs' : unit === 'minutes' ? 'Min' : 'Seg'}
          </span>
        </div>
      ))}
    </div>
  );
}
