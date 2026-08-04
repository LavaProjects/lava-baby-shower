import React from 'react';
import { Vote } from 'lucide-react';

export function DerbyHeader() {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 mb-1">
        <Vote className="w-6 h-6 text-emerald-600" />
        <h3 className="text-2xl font-extrabold text-slate-900 text-center">¡Gran Derbi de Revelación!</h3>
      </div>
      <p className="text-slate-500 text-center text-xs mb-8">
        ¿Quién anotará el primer gol? Vota por tu alineación favorita antes de la revelación de género.
      </p>
    </>
  );
}
