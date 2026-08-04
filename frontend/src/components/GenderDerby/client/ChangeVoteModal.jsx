import React from 'react';

export function ChangeVoteModal({
  showChangeVoteModal,
  setShowChangeVoteModal,
  voteChoice,
  pendingVoteOption,
  executeVote
}) {
  if (!showChangeVoteModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-float-delayed">
        <div className="w-16 h-16 bg-soccer-gold-light/40 text-soccer-gold border border-soccer-gold/20 rounded-full flex items-center justify-center mx-auto text-3xl">
          ⚽
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">¿Deseas cambiar tu voto?</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Ya habías votado por el equipo <strong>{voteChoice === 'nino' ? 'Niño F.C. 💙' : 'Niña F.C. 💗'}</strong>. 
            ¿Deseas transferir tu apoyo al equipo <strong>{pendingVoteOption === 'nino' ? 'Niño F.C. 💙' : 'Niña F.C. 💗'}</strong>?
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => executeVote(pendingVoteOption)}
            className="py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-2xl font-black transition text-xs tracking-wider uppercase shadow-md"
          >
            Sí, cambiar voto
          </button>
          <button
            onClick={() => setShowChangeVoteModal(false)}
            className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-extrabold transition text-xs tracking-wider uppercase"
          >
            No, mantener
          </button>
        </div>
      </div>
    </div>
  );
}
