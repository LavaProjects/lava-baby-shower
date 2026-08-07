import React from 'react';
import { FaPaperPlane, FaCheckCircle, FaEdit } from 'react-icons/fa';

export function MessageForm({
  newMessageName,
  setNewMessageName,
  newMessageContent,
  setNewMessageContent,
  messageSuccess,
  handleMessageSubmit,
  numeroIntegrante,
  setNumeroIntegrante,
  pasesConfirmados = 1,
  registeredIntegrantes = []
}) {
  const isEditing = registeredIntegrantes.includes(numeroIntegrante);

  return (
    <form onSubmit={handleMessageSubmit} className="space-y-4 mb-8 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60">
      
      {/* Grid 1: Integrante Selector & Nombre del Integrante */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[9px] font-extrabold text-slate-500 mb-1 uppercase tracking-wider">
            ¿Qué número de integrante de tu grupo eres?
          </label>
          <select
            value={numeroIntegrante}
            onChange={(e) => setNumeroIntegrante(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white text-slate-700 font-semibold"
          >
            {Array.from({ length: pasesConfirmados || 1 }, (_, i) => {
              const num = i + 1;
              const isRegistered = registeredIntegrantes.includes(num);
              return (
                <option key={num} value={num}>
                  Integrante {num} {isRegistered ? '✓ (Mensaje colgado)' : ''}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-extrabold text-slate-500 mb-1 uppercase tracking-wider">
            Nombre del Integrante
          </label>
          <input
            type="text"
            placeholder="Ej: Sofía Ramírez"
            value={newMessageName}
            onChange={(e) => setNewMessageName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white text-slate-700 font-semibold"
          />
        </div>
      </div>

      {/* Grid 2: Textarea */}
      <div>
        <label className="block text-[9px] font-extrabold text-slate-500 mb-1 uppercase tracking-wider">
          Mensaje de Apoyo / Felicitación
        </label>
        <textarea
          rows="3"
          placeholder="Ej: ¡Muchas felicidades Yolanda y Ulises! Les deseo lo mejor en esta nueva etapa..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white text-slate-700 leading-relaxed"
        />
      </div>

      {messageSuccess && (
        <p className="text-xs text-emerald-600 font-bold text-center inline-flex items-center justify-center gap-1.5 w-full">
          <FaCheckCircle className="w-4 h-4 text-emerald-600" />
          <span>¡Mensaje guardado con éxito en la pizarra familiar!</span>
        </p>
      )}

      {registeredIntegrantes.length >= pasesConfirmados && (
        <div className="text-center pt-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            💡 Has registrado todos los mensajes de tu grupo ({pasesConfirmados}/{pasesConfirmados}). Puedes seleccionar cualquiera en la lista para editarlo.
          </p>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-extrabold transition text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 inline-flex items-center justify-center space-x-2"
      >
        {isEditing ? (
          <>
            <FaEdit className="w-4 h-4 text-white" />
            <span>Actualizar Mensaje de Integrante {numeroIntegrante}</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="w-4 h-4 text-white" />
            <span>Colgar Mensaje de Integrante {numeroIntegrante}</span>
          </>
        )}
      </button>
    </form>
  );
}
