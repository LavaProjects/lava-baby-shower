import React from 'react';
import { FaUtensils, FaHeart } from 'react-icons/fa';

export function MenuSection() {
  const menuItems = [
    {
      timing: "La Entrada",
      title: "Sopa Azteca",
      description: "Deliciosa sopa tradicional mexicana de tortilla con tiras crujientes, aguacate fresco, cubos de queso y un toque de crema.",
      image: "/sopa_azteca.jpg",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200/50"
    },
    {
      timing: "Primer Tiempo",
      title: "Spaghetti a la Bolognesa",
      description: "Pasta clásica al dente bañada en una rica salsa boloñesa de carne selecta y finas hierbas, espolvoreada con queso parmesano rallado.",
      image: "/spaghetti_bolognese.jpg",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200/50"
    },
    {
      timing: "Plato Fuerte",
      title: "Lomo Adobado con Puré de Papa",
      description: "Jugoso lomo de puerco bañado en un adobo especial artesanal, servido con una guarnición de puré de papa suave y sumamente cremoso.",
      image: "/lomo_adobado.jpg",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200/50"
    }
  ];

  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10 overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center space-x-2.5 mb-1.5">
          <FaUtensils className="w-5 h-5 text-emerald-600" />
          <h3 className="text-2xl font-extrabold text-slate-900">Menú del Campeonato</h3>
        </div>
        <p className="text-slate-400 text-xs uppercase font-black tracking-wider">
          Fichajes gourmet para recargar energías durante el entretiempo
        </p>
      </div>

      {/* Grid of Dishes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="group bg-slate-50/50 border border-slate-200/60 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 hover:border-slate-300"
          >
            {/* Dish Image Container */}
            <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className={`inline-block px-2.5 py-0.5 border rounded-full text-[9px] font-black uppercase tracking-wider ${item.badgeColor} bg-white/95 backdrop-blur-xs shadow-sm`}>
                  {item.timing}
                </span>
              </div>
            </div>

            {/* Dish Description */}
            <div className="p-4.5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/40 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Bebé F.C. ⚽</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  ¡A comer! <FaHeart className="w-2.5 h-2.5 text-pink-500 inline animate-pulse" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
