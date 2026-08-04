import React from 'react';
import { Calendar, Clock, Shirt, MapPin, Navigation } from 'lucide-react';

export function MatchDetailsSection() {
  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10 grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <h3 className="text-2xl font-extrabold text-slate-900">Detalles del Evento</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-slate-100 p-2.5 rounded-xl mr-4 text-emerald-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-slate-800 text-sm block">Fecha del Silbatazo</strong>
              <span className="text-slate-500 text-xs font-semibold">Domingo, 25 de Octubre del 2026</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-slate-100 p-2.5 rounded-xl mr-4 text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-slate-800 text-sm block">Hora de Acceso</strong>
              <span className="text-slate-500 text-xs font-semibold">02:00 PM - 07:00 PM (Protocolo) | Fiesta posterior</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-slate-100 p-2.5 rounded-xl mr-4 text-emerald-600">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-slate-800 text-sm block">Uniforme Oficial (Dress Code)</strong>
              <span className="text-slate-500 text-xs font-semibold">Semicasual (Sugerido colores pastel o de tu bando favorito)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <MapPin className="w-6 h-6 text-emerald-600 mb-2" />
          <h4 className="font-extrabold text-slate-800 leading-tight">Cancha: Salón de Eventos "Los Olivos"</h4>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Av. Universidad #1002, Col. Lindavista, Ciudad de México.
          </p>
        </div>
        
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center space-x-2 w-full py-2.5 bg-slate-900 text-white hover:bg-slate-950 font-extrabold rounded-xl transition text-xs shadow-sm"
        >
          <span>Trazar Ruta Estadio</span>
          <Navigation className="w-4 h-4 text-white" />
        </a>
      </div>
    </section>
  );
}
