import React from 'react';

export function DerbyProgressBar({ voteStats }) {
  return (
    <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black text-slate-400 tracking-wider">
        <span>AFICIÓN CELESTE: {voteStats.porcentajeNino}%</span>
        <span>AFICIÓN ROSA: {voteStats.porcentajeNina}%</span>
      </div>

      <div className="w-full h-5 bg-slate-200/70 rounded-full overflow-hidden flex shadow-inner">
        <div 
          style={{ width: `${voteStats.porcentajeNino}%` }}
          className="h-full bg-gradient-to-r from-soccer-jersey-blue to-soccer-jersey-blue-dark transition-all duration-1000"
        ></div>
        <div 
          style={{ width: `${voteStats.porcentajeNina}%` }}
          className="h-full bg-gradient-to-r from-soccer-jersey-pink-dark to-soccer-jersey-pink transition-all duration-1000"
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-[10px] font-black text-slate-400 tracking-wider">
        <span>Votos: {voteStats.nino}</span>
        <span>Marcador Afición ({voteStats.total})</span>
        <span>Votos: {voteStats.nina}</span>
      </div>
    </div>
  );
}
