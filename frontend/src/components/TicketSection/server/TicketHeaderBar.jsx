import React from 'react';
import { Ticket, Award } from 'lucide-react';

export function TicketHeaderBar() {
  return (
    <div className="bg-gradient-to-r from-sky-700 via-emerald-600 to-pink-700 px-6 py-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Ticket className="w-4 h-4 text-white" />
        <span className="font-extrabold tracking-wider text-xs uppercase text-slate-100">Pase Oficial de Entrada</span>
      </div>
      <span className="text-[10px] font-black bg-white/20 px-3.5 py-1 rounded-full border border-white/30 text-white inline-flex items-center space-x-1">
        <Award className="w-3 h-3 text-white" />
        <span>JORNADA ÚNICA</span>
      </span>
    </div>
  );
}
