import React, { useState, useEffect } from 'react';
import { MessageWallHeader } from './server/MessageWallHeader';
import { MessageList } from './server/MessageList';
import { MessageForm } from './client/MessageForm';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
  return `http://${hostname}:3000/api`;
};
const API_BASE_URL = getApiBaseUrl();

export function MessageWall({ guestInfo }) {
  const [messages, setMessages] = useState([]);
  const [newMessageName, setNewMessageName] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (guestInfo && guestInfo.nombre) {
      setNewMessageName(guestInfo.nombre);
    }
  }, [guestInfo]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/message`);
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
          nombre: newMessageName,
          contenido: newMessageContent
        })
      });

      if (res.ok) {
        setMessageSuccess(true);
        setNewMessageContent('');
        fetchMessages();
        setTimeout(() => setMessageSuccess(false), 4000);
      }
    } catch (err) {
      alert('Error al publicar el mensaje.');
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
      />
      <MessageList messages={messages} />
    </section>
  );
}
