import React from 'react';
import { FaCalendarAlt, FaClock, FaTshirt, FaMapPin, FaLocationArrow, FaSubway, FaCar } from 'react-icons/fa';

export function MatchDetailsSection() {
  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10 space-y-6">
      
      {/* Header */}
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
        <FaMapPin className="w-5 h-5 text-emerald-600" />
        <h3 className="text-2xl font-extrabold text-slate-900">Ubicación y Cancha Oficial</h3>
      </div>

      {/* Unified 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Left Side: Details & Access Instructions (60% width) */}
        <div className="md:col-span-3 space-y-6 flex flex-col justify-between">
          
          {/* Key Event Details (Horizontal mini-cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50/50 border border-slate-200/50 p-4 rounded-2xl text-center flex flex-col items-center justify-center space-y-1">
              <FaCalendarAlt className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Fecha</span>
              <span className="text-slate-800 text-xs font-bold leading-tight">Dom, 25 Oct 2026</span>
            </div>
            
            <div className="bg-slate-50/50 border border-slate-200/50 p-4 rounded-2xl text-center flex flex-col items-center justify-center space-y-1">
              <FaClock className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Horario</span>
              <span className="text-slate-800 text-xs font-bold leading-tight">02:00 PM - 08:00 PM</span>
            </div>
            
            <div className="bg-slate-50/50 border border-slate-200/50 p-4 rounded-2xl text-center flex flex-col items-center justify-center space-y-1">
              <FaTshirt className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Dress Code</span>
              <span className="text-slate-800 text-xs font-bold leading-tight">Semicasual / Pastel</span>
            </div>
          </div>

          {/* Dress Code Highlight Banner */}
          <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4.5 flex items-center space-x-4 text-emerald-800">
            <FaTshirt className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div className="space-y-1 flex-1">
              <strong className="text-xs uppercase tracking-wider block font-black">Dress Code</strong>
              <p className="text-slate-700 text-xs leading-relaxed font-semibold">
                Sugerimos vestir tonos pastel (estilo semicasual). Sin embargo, estás invitado a llevar con orgullo el jersey de tu equipo de fútbol favorito durante todo el evento o, al menos, para el gran momento de la revelación de género. ⚽🏆
              </p>
            </div>
          </div>

          {/* Access Instructions */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">📋 ¿Cómo llegar al Salón?</h4>
            
            {/* Public Transport */}
            <div className="flex items-center gap-4 p-4.5 bg-sky-50/30 border border-sky-100/50 rounded-2xl">
              <FaSubway className="w-8 h-8 text-sky-600 flex-shrink-0" />
              <div className="space-y-1 flex-1">
                <span className="font-black text-xs text-sky-800 uppercase tracking-wider block">Transporte Público (Metro)</span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Bájate en la estación <strong>Metro Nezahualcóyotl (Línea B)</strong>. Sal del lado poniente (hacia Bosques de Aragón) y camina entre <strong>3 a 5 minutos</strong> (aproximadamente 250 metros) sobre el <strong>Boulevard Bosques de los Continentes</strong>. El salón está en el número 68, justo al lado de la tienda Oxxo.
                </p>
              </div>
            </div>

            {/* Auto / Parking */}
            <div className="flex items-center gap-4 p-4.5 bg-amber-50/30 border border-amber-100/50 rounded-2xl">
              <FaCar className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div className="space-y-1 flex-1">
                <span className="font-black text-xs text-amber-800 uppercase tracking-wider block">Llegada en Auto / Estacionamiento</span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  El salón <strong>no cuenta con estacionamiento propio</strong>. Sin embargo, para tu tranquilidad y comodidad, contaremos con <strong>franeleros autorizados en el acceso</strong> que te orientarán para estacionar tu auto de forma segura en las calles aledañas del salón.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Map & Venue Address Card (40% width) */}
        <div className="md:col-span-2 border border-slate-200/60 bg-white rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaMapPin className="w-5 h-5 text-emerald-600" />
              <h4 className="font-extrabold text-slate-900 text-base leading-tight">Salón Vahiardi</h4>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Bosques de los Continentes 68, Col. Bosques de Aragón, C.P. 57170, Ciudad Nezahualcóyotl, Edo. de México.
            </p>
            <div className="mt-2.5">
              <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100/50 rounded-full text-[10px] font-black uppercase tracking-wider gap-1.5">
                <FaSubway className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                Cerca de Metro Neza
              </span>
            </div>
          </div>

          {/* Embedded Map iframe */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-inner h-[200px] relative">
            <iframe
              src="https://maps.google.com/maps?q=Bosques%20de%20los%20Continentes%2068,%20Bosques%20de%20Arag%C3%B3n,%2057170%20Neza&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa del Salón de Eventos Sociales Vahiardi"
            ></iframe>
          </div>

          {/* Google Maps search button */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+de+Eventos+Sociales+Vahiardi+Bosques+de+los+Continentes+68"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-slate-900 text-white hover:bg-slate-950 font-extrabold rounded-xl transition text-xs shadow-sm"
          >
            <span>Abrir en Google Maps</span>
            <FaLocationArrow className="w-3 h-3 text-white" />
          </a>

        </div>

      </div>

    </section>
  );
}
