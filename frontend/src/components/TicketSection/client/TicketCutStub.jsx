import React from 'react';
import { Scissors, Baby } from 'lucide-react';

export function TicketCutStub({ rsvpCompleted, animateCut, isValidated, guestInfo }) {
  const barcodeCode = isValidated && guestInfo ? guestInfo.codigoAcceso : 'XXXXXX';

  return (
    <>
      {/* Mobile Dotted Tear Line & Stub */}
      <div className={`md:hidden flex flex-col items-center border-t border-dashed border-slate-200 pt-6 mt-6 relative transition-all duration-300
        ${rsvpCompleted ? 'opacity-0 pointer-events-none' : ''}
        ${animateCut ? 'animate-tear-off-mobile' : ''}
      `}>
        <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full text-slate-400 border border-slate-200 shadow-md transition-all duration-300 z-10
          ${animateCut ? 'animate-scissors-cut-mobile' : 'text-xl hover:scale-110 -rotate-45 inline-block'}
        `}>
          <Scissors className="w-4 h-4 text-slate-500" />
        </div>
        
        <div className="w-full flex items-center justify-between px-2">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            BEBÉ F.C. 2026
          </span>
          <div className="w-10 h-10 bg-slate-50 border border-slate-200/50 rounded-full flex items-center justify-center shadow-inner">
            <Baby className="w-5 h-5 text-sky-600" />
          </div>
        </div>

        <div className="w-full pt-3">
          <svg className="w-full h-10" viewBox="0 0 100 30" fill="currentColor">
            <rect x="2" width="2" height="25" /><rect x="6" width="3" height="25" /><rect x="11" width="1" height="25" />
            <rect x="14" width="4" height="25" /><rect x="20" width="2" height="25" /><rect x="24" width="1" height="25" />
            <rect x="27" width="3" height="25" /><rect x="32" width="2" height="25" /><rect x="36" width="4" height="25" />
            <rect x="42" width="1" height="25" /><rect x="45" width="2" height="25" /><rect x="49" width="3" height="25" />
            <rect x="54" width="1" height="25" /><rect x="57" width="4" height="25" /><rect x="63" width="2" height="25" />
            <rect x="67" width="1" height="25" /><rect x="70" width="3" height="25" /><rect x="75" width="2" height="25" />
            <rect x="79" width="4" height="25" /><rect x="85" width="1" height="25" /><rect x="88" width="3" height="25" />
            <rect x="93" width="2" height="25" />
          </svg>
          <span className="block text-[8px] font-mono text-slate-400 mt-0.5 text-center">
            {barcodeCode}
          </span>
        </div>
      </div>

      {/* Desktop Dotted Tear Line & Stub */}
      <div className={`hidden md:flex flex-col justify-between items-center border-l border-dashed border-slate-200 pl-6 py-2 relative transition-all duration-300
        ${rsvpCompleted ? 'opacity-0 pointer-events-none' : ''}
        ${animateCut ? 'animate-tear-off' : ''}
      `}>
        <div className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full text-slate-400 border border-slate-200 shadow-md transition-all duration-300 z-10
          ${animateCut ? 'animate-scissors-cut' : 'top-1/2 hover:scale-110 hover:text-slate-600'}
        `}>
          <Scissors className="w-5 h-5 text-slate-500" />
        </div>
        
        <div className="w-full text-center space-y-4">
          <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase vertical-text">
            BEBÉ F.C. 2026
          </span>
          <div className="w-16 h-16 bg-slate-50 border border-slate-200/50 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Baby className="w-8 h-8 text-sky-600" />
          </div>
        </div>

        <div className="w-full pt-6">
          <svg className="w-full h-12" viewBox="0 0 100 40" fill="currentColor">
            <rect x="2" width="2" height="35" /><rect x="6" width="3" height="35" /><rect x="11" width="1" height="35" />
            <rect x="14" width="4" height="35" /><rect x="20" width="2" height="35" /><rect x="24" width="1" height="35" />
            <rect x="27" width="3" height="35" /><rect x="32" width="2" height="35" /><rect x="36" width="4" height="35" />
            <rect x="42" width="1" height="35" /><rect x="45" width="2" height="35" /><rect x="49" width="3" height="35" />
            <rect x="54" width="1" height="35" /><rect x="57" width="4" height="35" /><rect x="63" width="2" height="35" />
            <rect x="67" width="1" height="35" /><rect x="70" width="3" height="35" /><rect x="75" width="2" height="35" />
            <rect x="79" width="4" height="35" /><rect x="85" width="1" height="35" /><rect x="88" width="3" height="35" />
            <rect x="93" width="2" height="35" />
          </svg>
          <span className="block text-[8px] font-mono text-slate-400 mt-1 text-center">
            {barcodeCode}
          </span>
        </div>
      </div>
    </>
  );
}
