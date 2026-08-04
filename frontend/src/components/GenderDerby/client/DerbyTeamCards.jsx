import React from 'react';

export function DerbyTeamCards({ handleVote, isValidated, voted, voteChoice }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:gap-10 mb-8 relative z-10">
      {/* Team Boy */}
      <button
        onClick={() => handleVote('nino')}
        disabled={!isValidated}
        className={`flex flex-col items-center justify-between p-6 rounded-3xl border transition-all duration-300 ${
          voted && voteChoice === 'nino'
            ? 'border-soccer-jersey-blue-dark border-[4px] bg-soccer-jersey-blue-light/40 scale-[1.03] shadow-lg shadow-sky-200/50'
            : 'border-slate-200/60 bg-white hover:bg-slate-50 hover:border-slate-300'
        } active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed`}
      >
        <svg className="w-20 h-20 mb-4 drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
          <path d="M15 25 L30 15 L45 22 L55 22 L70 15 L85 25 L80 40 L70 38 L70 90 L30 90 L30 38 L20 40 Z" fill="#38bdf8" />
          <path d="M45 22 L50 28 L55 22 Z" fill="#0284c7" />
          <circle cx="50" cy="50" r="10" fill="#fff" />
          <path d="M50 43 L50 57 M43 50 L57 50" stroke="#0284c7" strokeWidth="3" />
          <text x="50" y="78" fill="white" fontSize="14" fontWeight="black" textAnchor="middle">NINO</text>
        </svg>
        <span className="font-extrabold text-xs text-soccer-jersey-blue-dark tracking-wider">TEAM NIÑO F.C.</span>
      </button>

      {/* Team Girl */}
      <button
        onClick={() => handleVote('nina')}
        disabled={!isValidated}
        className={`flex flex-col items-center justify-between p-6 rounded-3xl border transition-all duration-300 ${
          voted && voteChoice === 'nina'
            ? 'border-soccer-jersey-pink-dark border-[4px] bg-soccer-jersey-pink-light/40 scale-[1.03] shadow-lg shadow-pink-200/50'
            : 'border-slate-200/60 bg-white hover:bg-slate-50 hover:border-slate-300'
        } active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed`}
      >
        <svg className="w-20 h-20 mb-4 drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
          <path d="M15 25 L30 15 L45 22 L55 22 L70 15 L85 25 L80 40 L70 38 L70 90 L30 90 L30 38 L20 40 Z" fill="#f472b6" />
          <path d="M45 22 L50 28 L55 22 Z" fill="#db2777" />
          <circle cx="50" cy="50" r="10" fill="#fff" />
          <path d="M50 43 L50 57 M43 50 L57 50" stroke="#db2777" strokeWidth="3" />
          <text x="50" y="78" fill="white" fontSize="14" fontWeight="black" textAnchor="middle">NINA</text>
        </svg>
        <span className="font-extrabold text-xs text-soccer-jersey-pink-dark tracking-wider">TEAM NIÑA F.C.</span>
      </button>
    </div>
  );
}
