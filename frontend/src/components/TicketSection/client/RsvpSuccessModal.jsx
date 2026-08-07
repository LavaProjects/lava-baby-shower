import React from 'react';
import { FaTrophy, FaFutbol, FaCommentDots, FaTimes } from 'react-icons/fa';

export function RsvpSuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleAction = (targetId) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-center space-y-6 transform transition-all animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-50"
          aria-label="Cerrar modal"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="mx-auto w-20 h-20 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
          <FaTrophy className="w-10 h-10 text-emerald-600" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-slate-900 text-xl leading-tight">
            ¡Pase Confirmado! 🎫🏆
          </h4>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            Tu asistencia al **Bebé F.C.** ha sido registrada correctamente. Ahora estás en la lista de convocados. ¿Qué te parece iniciar tu calentamiento para el partido?
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col space-y-3">
          
          {/* Action 1: Vote Derby */}
          <button
            onClick={() => handleAction('gender-derby-section')}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-slate-900 text-white hover:bg-slate-950 font-extrabold rounded-xl transition text-xs uppercase tracking-wider shadow-sm"
          >
            <FaFutbol className="w-3.5 h-3.5 text-white" />
            <span>Votar en el Derby de Género</span>
          </button>

          {/* Action 2: Leave Message */}
          <button
            onClick={() => handleAction('message-wall-section')}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-xl transition text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20"
          >
            <FaCommentDots className="w-3.5 h-3.5 text-white" />
            <span>Dejar Mensaje de Aliento</span>
          </button>

          {/* Cancel/Dismiss */}
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-50 text-slate-500 hover:bg-slate-100 font-extrabold rounded-xl transition text-xs uppercase tracking-wider border border-slate-200/60"
          >
            Ver Detalles del Evento
          </button>
        </div>

      </div>
    </div>
  );
}
