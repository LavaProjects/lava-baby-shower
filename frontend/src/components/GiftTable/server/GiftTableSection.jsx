import React from 'react';
import { Gift, Trophy } from 'lucide-react';

export function GiftTableSection() {
  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-soccer-gold/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0 bg-soccer-gold-light/20 border border-soccer-gold/10 p-4 rounded-2xl text-center">
          <Gift className="w-12 h-12 mx-auto text-soccer-gold" />
          <span className="text-[9px] font-black text-soccer-gold-dark uppercase tracking-widest block mt-2">Bebé F.C.</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Gift className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-extrabold text-slate-800 text-center md:text-left">Equipamiento de Juego</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed text-center md:text-left">
            Para el debut del <strong>Bebé F.C.</strong>, no contamos con una mesa de regalos oficial en tiendas. Sin embargo, cualquier detalle, ropita o pañales que deseen traer para equipar al nuevo integrante de la escuadra (¡y a sus directores técnicos!) será recibido con muchísimo amor en la cancha el día del evento.
          </p>
          <div className="text-center md:text-left pt-1">
            <span className="font-handwritten text-2xl text-soccer-gold-dark font-bold inline-flex items-center gap-1.5">
              <span>¡Tu cariño y apoyo son nuestro mejor campeonato!</span>
              <Trophy className="w-6 h-6 text-soccer-gold inline" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
