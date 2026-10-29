import React from 'react';
import { FaTrophy, FaHeart, FaFutbol } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import { TbBabyBottle } from 'react-icons/tb';

export function ThankYouRevealCard() {
  const triggerConfettiBlast = () => {
    window.dispatchEvent(new CustomEvent('celebrate-confetti'));
  };

  const scrollToMessages = () => {
    const el = document.getElementById('message-wall-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-pink-300/80 bg-gradient-to-br from-pink-50/95 via-white to-amber-50/90 p-6 md:p-10 shadow-2xl mb-10 text-center animate-float">
      {/* Glow decorative blurs */}
      <div className="absolute -top-10 -left-10 w-44 h-44 bg-pink-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-soccer-gold/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating trophy & stars ribbon */}
      <div className="inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-full text-xs md:text-sm font-black tracking-widest uppercase shadow-md mb-4 animate-bounce-slow">
        <FaTrophy className="w-4 h-4 text-yellow-200" />
        <span>¡PARTIDO CONCLUIDO • RESULTADO OFICIAL!</span>
        <FaTrophy className="w-4 h-4 text-yellow-200" />
      </div>

      {/* The Big Reveal Headline */}
      <h2 className="text-3xl md:text-6xl font-black tracking-tight text-slate-900 mb-2">
        ¡ES UNA HERMOSA <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">NIÑA</span>! 🎀⚽
      </h2>

      {/* The Baby's Name Card */}
      <div className="my-5 inline-block bg-white/90 border border-pink-200/90 px-6 py-4 rounded-3xl shadow-lg backdrop-blur-xs max-w-lg mx-auto">
        <span className="text-[11px] font-black tracking-widest text-pink-600 uppercase block mb-1">
          Nuestra Fichaje Estrella de la Vida
        </span>
        <h3 className="font-handwritten text-4xl md:text-6xl text-pink-600 font-extrabold tracking-wide drop-shadow-xs">
          Lía Saori ✨
        </h3>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 flex items-center justify-center gap-1.5">
          <span>El debut más esperado en Bebé F.C.</span>
          <FaHeart className="w-3 h-3 text-pink-500 inline fill-current animate-pulse" />
        </p>
      </div>

      {/* Team Niña Victory Banner */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs font-black">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-100 text-pink-800 rounded-full border border-pink-200/60 shadow-xs">
          <span className="text-sm">🏆</span>
          <span>¡Team Niña Campeón del Derbi!</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100/80 text-amber-900 rounded-full border border-amber-200/60 shadow-xs">
          <FaFutbol className="w-3 h-3 text-emerald-600" />
          <span>¡Gol de Oro Anotado!</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-200/60 shadow-xs">
          <span>👶</span>
          <span>Bienvenida Lía Saori</span>
        </span>
      </div>

      {/* Heartfelt Thank You Message */}
      <div className="max-w-2xl mx-auto space-y-3.5 text-slate-700 text-sm md:text-base leading-relaxed bg-white/60 p-5 md:p-7 rounded-2xl border border-slate-200/60 backdrop-blur-xs">
        <p className="font-extrabold text-slate-900 text-base md:text-lg">
          ¡A toda nuestra amada familia y amigos de la afición! 💖
        </p>
        <p>
          De parte de <strong>Yolanda Ramírez y Ulises Lavariega</strong>, no tenemos palabras suficientes para expresarles nuestra infinita gratitud por habernos acompañado en esta fecha tan mágica y especial.
        </p>
        <p>
          Sus risas, sus porras, sus abrazos y cada muestra de cariño hicieron que nuestro Baby Shower fuera un auténtico campeonato lleno de luz y felicidad. El silbatazo final ha sonado y el marcador favoreció al <strong>Team Niña</strong>.
        </p>
        <p className="text-pink-700 font-bold">
          ¡Nuestra pequeña princesa <span className="underline decoration-pink-400 font-black">Lía Saori</span> ya siente todo el amor con el que la afición la espera para su gran debut en este mundo! ⚽🍼
        </p>
        <p className="font-handwritten text-2xl md:text-3xl text-emerald-800 font-extrabold pt-2">
          ¡Gracias por ser los mejores directores técnicos, árbitros y afición de nuestras vidas! 🏆✨
        </p>
        <div className="pt-1 text-slate-500 font-bold text-xs uppercase tracking-widest">
          Con todo nuestro amor — Yola & Ulises
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={triggerConfettiBlast}
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-300/50 hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🎉 ¡Lanzar Más Confeti!</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin-slow" />
        </button>

        <button
          onClick={scrollToMessages}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/80 rounded-2xl font-black text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>💌 Ver Felicitaciones de la Afición</span>
        </button>
      </div>
    </section>
  );
}
