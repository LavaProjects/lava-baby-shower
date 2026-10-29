import React from 'react';
import { Shirt, Heart } from 'lucide-react';

const DECO_EMOJIS = ['⚽', '🍼', '👶', '🎀', '🧸', '🏆', '⚽'];

export function IntroCard() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xl text-slate-700 max-w-2xl mx-auto leading-relaxed text-sm md:text-base border-t-4 border-t-emerald-500 mb-10 text-center animate-float-delayed">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2 leading-none">
        Yola & Ulises
      </h1>

      <p className="font-handwritten text-3xl md:text-5xl text-emerald-700 font-bold mt-1 mb-5">
        ¡Presentan a su Fichaje Estrella! ⚽✨
      </p>

      <div className="flex justify-center items-center space-x-2 mb-6">
        <span className="inline-flex items-center px-4 py-1.5 bg-pink-100/90 text-pink-800 rounded-full text-xs font-black border border-pink-200 shadow-xs">
          <Heart className="w-3.5 h-3.5 mr-1.5 text-pink-600 fill-current" /> ¡ES NIÑA! ⚽💖
        </span>
        <span className="text-xs font-black text-slate-400">•</span>
        <span className="inline-flex items-center px-4 py-1.5 bg-amber-100/90 text-amber-900 rounded-full text-xs font-black border border-amber-200 shadow-xs">
          🏆 LÍA SAORI 👶
        </span>
      </div>

      <p className="font-medium text-slate-700">
        Yolanda Ramírez y Ulises Lavariega agradecen profundamente a toda la afición por habernos acompañado en el <strong>Baby Shower & Revelación de Género</strong> de nuestro bebé al estilo <strong>Bebé F.C.</strong>
      </p>
      <p className="mt-3 font-semibold text-pink-800">
        ¡El silbatazo final sonó, el Team Niña se llevó la copa y nuestra princesa <strong>Lía Saori</strong> ya siente todo el inmenso cariño de su afición! 🏟️🎀⚽✨
      </p>

      <div className="flex justify-center items-center space-x-2 mt-6">
        {DECO_EMOJIS.map((emoji, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-lg shadow-xs">
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
