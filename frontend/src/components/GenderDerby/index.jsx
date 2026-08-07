import React, { useState, useEffect } from 'react';
import { DerbyHeader } from './server/DerbyHeader';
import { DerbyTeamCards } from './client/DerbyTeamCards';
import { DerbyProgressBar } from './client/DerbyProgressBar';
import { ChangeVoteModal } from './client/ChangeVoteModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function GenderDerby({ isValidated, guestInfo }) {
  const [voted, setVoted] = useState(false);
  const [voteChoice, setVoteChoice] = useState('');
  const [voteStats, setVoteStats] = useState({ nino: 0, nina: 0, total: 0, porcentajeNino: 0, porcentajeNina: 0 });
  const [showChangeVoteModal, setShowChangeVoteModal] = useState(false);
  const [pendingVoteOption, setPendingVoteOption] = useState('');

  useEffect(() => {
    fetchVoteStats();
  }, []);

  useEffect(() => {
    if (guestInfo) {
      if (guestInfo.voted) {
        setVoted(true);
        setVoteChoice(guestInfo.voteChoice || '');
      }
    }
  }, [guestInfo]);

  const fetchVoteStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/vote/summary`);
      if (res.ok) {
        const data = await res.json();
        setVoteStats(data);
      }
    } catch (err) {
      console.error('Error al cargar estadisticas de votos:', err);
    }
  };

  const handleVote = async (opcion) => {
    if (!isValidated || !guestInfo) {
      alert('Por favor valida tu pase de entrada primero.');
      return;
    }

    if (voted && voteChoice === opcion) {
      alert(`Ya votaste por ${opcion === 'nino' ? 'Team Niño 💙' : 'Team Niña 💗'}.`);
      return;
    }

    if (voted && voteChoice !== opcion) {
      setPendingVoteOption(opcion);
      setShowChangeVoteModal(true);
      return;
    }

    executeVote(opcion);
  };

  const executeVote = async (opcion) => {
    try {
      const res = await fetch(`${API_BASE_URL}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: guestInfo.codigoAcceso,
          opcion
        })
      });

      if (res.ok) {
        setVoted(true);
        setVoteChoice(opcion);
        setShowChangeVoteModal(false);
        fetchVoteStats();
      }
    } catch (err) {
      alert('Error al registrar tu gol de voto');
    }
  };

  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#bbf7d0_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>

      <DerbyHeader />
      <DerbyTeamCards
        handleVote={handleVote}
        isValidated={isValidated}
        voted={voted}
        voteChoice={voteChoice}
      />
      <DerbyProgressBar voteStats={voteStats} />

      {!isValidated && (
        <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[1px] flex items-center justify-center z-20">
          <div className="bg-slate-900 text-white border border-slate-800 px-5 py-3 rounded-full shadow-lg text-[9px] font-black tracking-widest uppercase">
            🔒 Valida tu boleto para ingresar al marcador
          </div>
        </div>
      )}

      <ChangeVoteModal
        showChangeVoteModal={showChangeVoteModal}
        setShowChangeVoteModal={setShowChangeVoteModal}
        voteChoice={voteChoice}
        pendingVoteOption={pendingVoteOption}
        executeVote={executeVote}
      />
    </section>
  );
}
