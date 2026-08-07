import React from 'react';
import { 
  FaCalendarAlt, 
  FaDoorOpen, 
  FaFutbol, 
  FaUtensils, 
  FaGamepad, 
  FaHeadphones, 
  FaTrophy, 
  FaMusic, 
  FaSignOutAlt 
} from 'react-icons/fa';

export function ScheduleSection() {
  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <FaCalendarAlt className="w-5 h-5 text-emerald-600" />
          <h3 className="text-2xl font-extrabold text-slate-900">Cronograma del Partido (Minuto a Minuto)</h3>
        </div>
        <p className="text-slate-400 text-xs uppercase font-black tracking-wider">Minuto de juego de la Jornada Oficial</p>
      </div>

      <div className="relative border-l border-slate-200 ml-4 md:ml-6 space-y-8 py-2">
        
        {/* 02:00 PM - 02:30 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-400 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            02:00 PM - 02:30 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>Apertura de Puertas & Recepción</span>
            <FaDoorOpen className="w-5.5 h-5.5 text-slate-500 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Llegada de la afición oficial a la cancha, registro en boletería y acomodo de los invitados.
          </p>
        </div>

        {/* 02:30 PM - 03:00 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-sky-400 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            02:30 PM - 03:00 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>El Calentamiento (Socializar y Votos)</span>
            <FaFutbol className="w-5.5 h-5.5 text-sky-500 inline animate-spin-slow" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Un momento ideal para platicar, recibir a los invitados con bebidas y registrar su voto en el Derbi de Género en el marcador digital.
          </p>
        </div>

        {/* 03:00 PM - 04:00 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            03:00 PM - 04:00 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>Banquete de la Victoria (La Comida)</span>
            <FaUtensils className="w-5.5 h-5.5 text-emerald-600 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Servicio del banquete principal y comida especial acompañada de un ambiente relajado y música de fondo.
          </p>
        </div>

        {/* 04:00 PM - 05:00 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-amber-400 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            04:00 PM - 05:00 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>El Primer Tiempo (Juegos Clásicos)</span>
            <FaGamepad className="w-5.5 h-5.5 text-amber-500 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Comienzan las dinámicas tradicionales, competencias de afición y juegos divertidos de Baby Shower.
          </p>
        </div>

        {/* 05:00 PM - 06:00 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            05:00 PM - 06:00 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>El Entretiempo (Charla & DJ)</span>
            <FaHeadphones className="w-5.5 h-5.5 text-indigo-500 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Momento para convivir libremente, estirar las piernas y comenzar a disfrutar de la música del DJ a volumen medio.
          </p>
        </div>

        {/* 06:00 PM - 06:30 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-soccer-gold border-4 border-white shadow-sm animate-pulse"></div>
          <span className="inline-block px-2.5 py-0.5 bg-soccer-gold-light/50 text-soccer-gold-dark text-[10px] font-black rounded-full border border-soccer-gold/20 tracking-wider uppercase mb-1">
            06:00 PM - 06:30 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>El Gran Gol de Oro: Revelación</span>
            <FaTrophy className="w-6.5 h-6.5 text-soccer-gold inline animate-bounce" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
            ¡El silbatazo definitivo del partido! Momento estelar en el que descubriremos los colores de nuestro nuevo integrante estrella.
          </p>
        </div>

        {/* 06:30 PM - 07:30 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-purple-500 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full border border-purple-200/30 tracking-wider uppercase mb-1">
            06:30 PM - 07:30 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>Tiempo Extra (Música & DJ)</span>
            <FaMusic className="w-5.5 h-5.5 text-purple-600 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold text-purple-900/80">
            La pista de baile se abre oficialmente y el DJ sube el ritmo para celebrar en grande este gran campeonato.
          </p>
        </div>

        {/* 07:30 PM - 08:00 PM */}
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-red-500 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-black rounded-full border border-red-200/30 tracking-wider uppercase mb-1">
            07:30 PM - 08:00 PM
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-2">
            <span>El Silbatazo Final (La Salida)</span>
            <FaSignOutAlt className="w-5.5 h-5.5 text-red-500 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Despedida oficial de toda la afición y desalojo coordinado y tranquilo de la cancha del salón.
          </p>
        </div>

      </div>
    </section>
  );
}
