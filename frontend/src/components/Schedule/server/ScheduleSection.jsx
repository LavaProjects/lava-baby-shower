import React from 'react';
import { Calendar, Users, Baby, Sparkles, Trophy, Gift, Sparkle } from 'lucide-react';

export function ScheduleSection() {
  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <h3 className="text-2xl font-extrabold text-slate-900">Cronograma del Partido (Minuto a Minuto)</h3>
        </div>
        <p className="text-slate-400 text-xs uppercase font-black tracking-wider">Minuto de juego de la Jornada Oficial</p>
      </div>

      <div className="relative border-l border-slate-200 ml-4 md:ml-6 space-y-8 py-2">
        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            14:00 Hrs
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-1.5">
            <span>Apertura de Puertas / Calentamiento</span>
            <Users className="w-4 h-4 text-emerald-600 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Llegada de la afición oficial a la cancha, registro en boletería y asignación de asientos en el estadio.
          </p>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            15:00 Hrs
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-1.5">
            <span>Silbatazo Inicial & Aperitivos</span>
            <Baby className="w-4 h-4 text-sky-600 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Saque inicial del evento con deliciosas botanas y las primeras quinielas y votaciones en el marcador.
          </p>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            16:00 Hrs
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-1.5">
            <span>El Primer Tiempo (Juegos del Club)</span>
            <Sparkles className="w-4 h-4 text-amber-500 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Comienzan las dinámicas, competencias de afición y juegos tradicionales de Baby Shower.
          </p>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-soccer-gold border-4 border-white shadow-sm animate-pulse"></div>
          <span className="inline-block px-2.5 py-0.5 bg-soccer-gold-light/50 text-soccer-gold-dark text-[10px] font-black rounded-full border border-soccer-gold/20 tracking-wider uppercase mb-1">
            17:00 Hrs
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-1.5">
            <span>El Gran Gol de Oro: Revelación</span>
            <Trophy className="w-4 h-4 text-soccer-gold inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
            ¡Momento estelar de la tarde! El silbatazo que definirá el marcador oficial del derbi. ¿Será Niño o Niña?
          </p>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-900 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-black rounded-full border border-slate-200/50 tracking-wider uppercase mb-1">
            17:30 Hrs
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-1.5">
            <span>Banquete de la Victoria (Bocados y Pastel)</span>
            <Gift className="w-4 h-4 text-pink-500 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Banquete oficial, comida especial y apertura de la mesa de postres para celebrar el resultado.
          </p>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-purple-500 border-4 border-white shadow-sm"></div>
          <span className="inline-block px-2.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full border border-purple-200/30 tracking-wider uppercase mb-1">
            19:00 Hrs
          </span>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5 inline-flex items-center gap-1.5">
            <span>El Tercer Tiempo: ¡Fiesta Loca!</span>
            <Sparkle className="w-4 h-4 text-purple-600 inline" />
          </h4>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold text-purple-900/80">
            Fin de la jornada de protocolo. Se encienden las luces del estadio, arranca la pista de baile y comienza la fiesta libre para toda la afición.
          </p>
        </div>

      </div>
    </section>
  );
}
