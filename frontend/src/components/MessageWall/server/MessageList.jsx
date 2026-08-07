import React from 'react';
import { FaFutbol } from 'react-icons/fa';

export function MessageList({ messages }) {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {messages.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-10 font-handwritten text-2xl">
          Aún no hay mensajes de tu familia. ¡Dejen su primer mensaje!
        </p>
      ) : (
        messages.map((msg) => (
          <div 
            key={msg.id} 
            className="bg-white p-5 rounded-2xl border border-slate-200/50 shadow-sm relative hover:shadow-md transition-all hover:translate-x-0.5"
          >
            <FaFutbol className="absolute top-5 right-5 w-6 h-6 text-slate-200 opacity-25 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-2.5 pr-6">
              <span className="font-extrabold text-sm text-slate-700">
                {msg.nombre} 
                <span className="ml-2 inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-black uppercase">
                  Integrante {msg.numeroIntegrante}
                </span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">
                {new Date(msg.fechaCreacion).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed italic">
              "{msg.contenido}"
            </p>
          </div>
        ))
      )}
    </div>
  );
}
