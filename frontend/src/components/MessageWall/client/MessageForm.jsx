import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function MessageForm({
  newMessageName,
  setNewMessageName,
  newMessageContent,
  setNewMessageContent,
  messageSuccess,
  handleMessageSubmit
}) {
  return (
    <form onSubmit={handleMessageSubmit} className="space-y-4 mb-8 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[9px] font-extrabold text-slate-500 mb-1 uppercase tracking-wider">
            Nombre del Hincha / Familia
          </label>
          <input
            type="text"
            placeholder="Ej: Familia Gómez"
            value={newMessageName}
            onChange={(e) => setNewMessageName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white text-slate-700 font-semibold"
          />
        </div>
        <div className="flex flex-col justify-end">
          <span className="text-[9px] text-slate-400 leading-tight">
            * Tu firma se colocará inmediatamente en las pizarras de abajo.
          </span>
        </div>
      </div>
      <div>
        <label className="block text-[9px] font-extrabold text-slate-500 mb-1 uppercase tracking-wider">
          Mensaje de Apoyo
        </label>
        <textarea
          rows="3"
          placeholder="Ej: ¡Felicidades Yolanda y Ulises! Ya queremos conocer al nuevo integrante de la alineación..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white text-slate-700 leading-relaxed"
        />
      </div>
      {messageSuccess && (
        <p className="text-xs text-emerald-600 font-bold text-center inline-flex items-center justify-center gap-1.5 w-full">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>¡Mensaje colgado con éxito en la pizarra de la afición!</span>
        </p>
      )}
      <button
        type="submit"
        onClick={handleMessageSubmit}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-extrabold transition text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 inline-flex items-center justify-center space-x-2"
      >
        <Send className="w-4 h-4 text-white" />
        <span>Colgar Mensaje de Aficionado</span>
      </button>
    </form>
  );
}
