import React from 'react';
import { KeyRound } from 'lucide-react';

export function ValidateCodeForm({ accessCode, setAccessCode, validationError, handleValidateCode }) {
  return (
    <div className="py-4 text-center md:text-left">
      <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">¡Canjea tu Entrada para el Partido!</h3>
      <p className="text-slate-500 text-sm mt-2 mb-6 leading-relaxed">
        Para acceder a la confirmación de tus pases y participar en el derbi de revelación de género, ingresa el código asignado.
      </p>
      <form onSubmit={handleValidateCode} className="space-y-4">
        <div className="relative">
          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="INGRESA CÓDIGO (Ej: FAM001)"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 text-base font-black tracking-widest rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 uppercase text-slate-700 bg-slate-50/50"
          />
        </div>
        {validationError && (
          <p className="text-sm text-red-500 font-bold">{validationError}</p>
        )}
        <button
          type="submit"
          onClick={handleValidateCode}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-extrabold active:scale-[0.98] transition shadow-lg shadow-emerald-600/20"
        >
          Validar Boleto de Aficionado
        </button>
      </form>
    </div>
  );
}
