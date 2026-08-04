import React from 'react';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';

export function RSVPForm({
  guestInfo,
  rsvpCompleted,
  setRsvpCompleted,
  asistira,
  setAsistira,
  pasesConfirmados,
  setPasesConfirmados,
  handleRSVPSubmit
}) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Abonado del Club</span>
        <h3 className="text-3xl font-extrabold text-slate-900 leading-none">{guestInfo.nombre}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="px-3.5 py-1.5 bg-slate-100 text-[10px] font-black text-slate-500 rounded-full border border-slate-200/50 uppercase tracking-wider">
          🏷️ Código: {guestInfo.codigoAcceso}
        </span>
        <span className="px-3.5 py-1.5 bg-soccer-gold-light/40 text-[10px] font-black text-soccer-gold-dark rounded-full border border-soccer-gold/15">
          🎟️ {guestInfo.pasesMaximos} Pases Reservados
        </span>
      </div>

      {!rsvpCompleted ? (
        <form onSubmit={handleRSVPSubmit} className="space-y-6 pt-5 border-t border-dashed border-slate-200">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-3">
              ¿Confirmas asistencia a la Cancha?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAsistira(true)}
                className={`py-3 rounded-2xl font-black border transition-all duration-200 inline-flex items-center justify-center space-x-1.5 ${
                  asistira 
                    ? 'border-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Ahí estaré!</span>
              </button>
              <button
                type="button"
                onClick={() => setAsistira(false)}
                className={`py-3 rounded-2xl font-black border transition-all duration-200 inline-flex items-center justify-center space-x-1.5 ${
                  !asistira 
                    ? 'border-slate-800 bg-slate-100 text-slate-700' 
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Paso esta fecha</span>
              </button>
            </div>
          </div>

          {asistira && (
            <div className="space-y-3">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                ¿Cuántos asientos confirmas?
              </label>
              <div className="flex items-center space-x-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/50">
                <input
                  type="range"
                  min="1"
                  max={guestInfo.pasesMaximos}
                  value={pasesConfirmados}
                  onChange={(e) => setPasesConfirmados(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-2xl font-black text-slate-800 w-8 text-center">{pasesConfirmados}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            onClick={handleRSVPSubmit}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:opacity-95 text-white rounded-2xl font-black transition tracking-wide text-xs uppercase shadow-lg shadow-emerald-600/20"
          >
            Registrar en Boletería
          </button>
        </form>
      ) : (
        <div className="bg-emerald-50 border border-emerald-100/60 rounded-2xl p-6 text-center">
          <Trophy className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-extrabold text-emerald-800 mt-2">¡Asiento Asignado con Éxito!</h4>
          <p className="text-emerald-600 text-xs mt-1 leading-relaxed">
            {guestInfo.asistira 
              ? `Asistirás con ${guestInfo.pasesConfirmados} boleto(s). ¡Nos vemos en el campo!` 
              : 'Has liberado tus asientos. ¡Gracias por informarnos!'}
          </p>
          <button
            onClick={() => setRsvpCompleted(false)}
            className="text-xs font-bold text-emerald-700 underline mt-4 hover:text-emerald-800 block mx-auto"
          >
            Actualizar Entrada
          </button>
        </div>
      )}
    </div>
  );
}
