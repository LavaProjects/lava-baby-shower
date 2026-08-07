import React, { useState, useEffect } from 'react';
import { MessageWallHeader } from './server/MessageWallHeader';
import { MessageList } from './server/MessageList';
import { MessageForm } from './client/MessageForm';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

import { FaPen, FaFutbol, FaHeart } from 'react-icons/fa';

export function MessageWall({ guestInfo }) {
  // Mostrar banner informativo si no está validado o no está confirmado
  if (!guestInfo || !guestInfo.confirmado) {
    return (
      <section className="bg-slate-50/30 border border-dashed border-slate-200 rounded-3xl p-6 md:p-8 text-center space-y-4 mb-10">
        <div className="mx-auto w-16 h-16 bg-white border border-slate-100 text-slate-400 rounded-3xl flex items-center justify-center shadow-sm">
          <FaPen className="w-8 h-8 text-slate-400" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Muro de Felicitaciones</h4>
          <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed font-semibold">
            Una vez que confirmes tu asistencia en la zona de boletos de arriba, se activará esta pizarra para que cada integrante de tu grupo pueda dejarle un mensaje de cariño y apoyo a Yolanda y Ulises.{' '}
            <FaFutbol className="inline w-3.5 h-3.5 text-slate-400 ml-1 mb-0.5" />
            <FaHeart className="inline w-3.5 h-3.5 text-pink-400 ml-1 mb-0.5" />
          </p>
        </div>
      </section>
    );
  }

  const [messages, setMessages] = useState([]);
  const [newMessageName, setNewMessageName] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');
  const [numeroIntegrante, setNumeroIntegrante] = useState(1);
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [guestInfo]);

  // Obtener la lista de números de integrantes que ya escribieron
  const registeredIntegrantes = messages.map((m) => m.numeroIntegrante);

  // Seleccionar automáticamente el primer número de integrante libre al cambiar de mensajes o grupo
  useEffect(() => {
    const pases = guestInfo?.pasesConfirmados || 1;
    const nextAvailable = Array.from({ length: pases }, (_, i) => i + 1)
      .find((n) => !registeredIntegrantes.includes(n));
    if (nextAvailable) {
      setNumeroIntegrante(nextAvailable);
    }
  }, [messages, guestInfo]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/message?codigo=${guestInfo.codigoAcceso}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error al cargar mensajes del muro:', err);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!newMessageName.trim() || !newMessageContent.trim()) {
      alert('Por favor llena tu nombre y el mensaje.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: newMessageName.trim(),
          contenido: newMessageContent.trim(),
          codigo: guestInfo.codigoAcceso,
          numeroIntegrante: numeroIntegrante
        })
      });

      if (res.ok) {
        setMessageSuccess(true);
        setNewMessageName('');
        setNewMessageContent('');
        fetchMessages();
        setTimeout(() => setMessageSuccess(false), 4000);
      } else {
        const errData = await res.json();
        alert(errData.message || 'Error al publicar el mensaje.');
      }
    } catch (err) {
      alert('Error de conexión al publicar el mensaje.');
    }
  };

  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm mb-10">
      <MessageWallHeader />
      <MessageForm
        newMessageName={newMessageName}
        setNewMessageName={setNewMessageName}
        newMessageContent={newMessageContent}
        setNewMessageContent={setNewMessageContent}
        messageSuccess={messageSuccess}
        handleMessageSubmit={handleMessageSubmit}
        numeroIntegrante={numeroIntegrante}
        setNumeroIntegrante={setNumeroIntegrante}
        pasesConfirmados={guestInfo.pasesConfirmados}
        registeredIntegrantes={registeredIntegrantes}
      />
      <MessageList messages={messages} />
    </section>
  );
}
