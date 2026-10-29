import React from 'react';
import { Vote } from 'lucide-react';

export function DerbyHeader() {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 mb-1">
        <Vote className="w-6 h-6 text-pink-600" />
        <h3 className="text-2xl font-extrabold text-slate-900 text-center">¡Gran Derbi de Revelación: Resultado Oficial!</h3>
      </div>
      <p className="text-pink-700 font-extrabold text-center text-xs mb-6">
        🏆 ¡Victoria Histórica del Team Niña! 🎀 Nuestra Fichaje Estrella se llama <span className="font-black underline decoration-pink-300">Lía Saori</span> ⚽
      </p>
    </>
  );
}
