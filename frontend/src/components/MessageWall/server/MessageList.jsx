import React from 'react';

export function MessageList({ messages }) {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {messages.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-10 font-handwritten text-2xl">
          Aún no hay firmas de aficionados. ¡Sé el primero!
        </p>
      ) : (
        messages.map((msg) => (
          <div 
            key={msg.id} 
            className="bg-white p-5 rounded-2xl border border-slate-200/50 shadow-sm relative hover:shadow-md transition-all hover:translate-x-0.5"
          >
            <div className="absolute top-5 right-5 text-sm opacity-10">⚽</div>
            
            <div className="flex justify-between items-center mb-2.5 pr-6">
              <span className="font-extrabold text-sm text-slate-700">{msg.nombre}</span>
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
