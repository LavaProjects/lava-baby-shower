import React, { useState } from 'react';
import { TicketHeaderBar } from './server/TicketHeaderBar';
import { ValidateCodeForm } from './client/ValidateCodeForm';
import { RSVPForm } from './client/RSVPForm';
import { TicketCutStub } from './client/TicketCutStub';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
  return `http://${hostname}:3000/api`;
};
const API_BASE_URL = getApiBaseUrl();

export function TicketSection({ onValidationChange }) {
  const [accessCode, setAccessCode] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [guestInfo, setGuestInfo] = useState(null);
  const [validationError, setValidationError] = useState('');
  
  // RSVP Form States
  const [asistira, setAsistira] = useState(true);
  const [pasesConfirmados, setPasesConfirmados] = useState(1);
  const [rsvpCompleted, setRsvpCompleted] = useState(false);
  const [animateCut, setAnimateCut] = useState(false);

  const handleValidateCode = async (e) => {
    e.preventDefault();
    setValidationError('');
    
    const code = accessCode.trim().toUpperCase();
    if (!code) {
      setValidationError('Por favor ingresa un código de acceso.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/guest/validate/${code}`);

      if (res.ok) {
        const data = await res.json();
        setGuestInfo(data);
        setIsValidated(true);
        setPasesConfirmados(data.pasesConfirmados > 0 ? data.pasesConfirmados : data.pasesMaximos);
        if (data.confirmado) {
          setRsvpCompleted(true);
          setAsistira(data.asistira);
        }
        if (onValidationChange) {
          onValidationChange(data);
        }
      } else {
        setValidationError('Código no encontrado. Revisa tu boleto de invitación.');
      }
    } catch (err) {
      setValidationError('Error al conectar con la taquilla del estadio.');
    }
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/guest/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: guestInfo.codigoAcceso,
          pasesConfirmados: Number(pasesConfirmados),
          asistira
        })
      });

      if (res.ok) {
        const updatedGuest = await res.json();
        setGuestInfo(updatedGuest);
        setAnimateCut(true);
        if (onValidationChange) {
          onValidationChange(updatedGuest);
        }
        setTimeout(() => {
          setRsvpCompleted(true);
          setAnimateCut(false);
        }, 1500);
      }
    } catch (err) {
      alert('Error al procesar el ticket de asistencia');
    }
  };

  return (
    <section className={`bg-white border border-slate-200/60 rounded-3xl shadow-lg mb-10 overflow-hidden relative transition-all duration-500
      ${rsvpCompleted && !animateCut ? 'md:ticket-clipped' : ''}
    `}>
      <TicketHeaderBar />

      <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 relative">
        <div className="md:col-span-2 space-y-4">
          {!isValidated ? (
            <ValidateCodeForm
              accessCode={accessCode}
              setAccessCode={setAccessCode}
              validationError={validationError}
              handleValidateCode={handleValidateCode}
            />
          ) : (
            <RSVPForm
              guestInfo={guestInfo}
              rsvpCompleted={rsvpCompleted}
              setRsvpCompleted={setRsvpCompleted}
              asistira={asistira}
              setAsistira={setAsistira}
              pasesConfirmados={pasesConfirmados}
              setPasesConfirmados={setPasesConfirmados}
              handleRSVPSubmit={handleRSVPSubmit}
            />
          )}
        </div>

        <TicketCutStub
          rsvpCompleted={rsvpCompleted}
          animateCut={animateCut}
          isValidated={isValidated}
          guestInfo={guestInfo}
        />
      </div>
    </section>
  );
}
