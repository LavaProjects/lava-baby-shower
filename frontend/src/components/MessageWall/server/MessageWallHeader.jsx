import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

export function MessageWallHeader() {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 mb-1">
        <MessageSquarePlus className="w-6 h-6 text-emerald-600" />
        <h3 className="text-2xl font-extrabold text-slate-900 text-center">Muro de la Afición</h3>
      </div>
      <p className="text-slate-400 text-center text-xs mb-8">
        Envía tu mensaje de aliento y buenos deseos a Yolanda y Ulises para esta nueva temporada de padres.
      </p>
    </>
  );
}
