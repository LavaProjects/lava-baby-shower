import React, { useState, useEffect } from 'react';
import { ScoreboardHeader } from './server/ScoreboardHeader';
import { CountdownTimer } from './client/CountdownTimer';

export function Scoreboard({ targetDateString = '2026-10-25T14:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(targetDateString);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetDateString]);

  return (
    <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm text-center mb-10 relative overflow-hidden bg-gradient-to-br from-emerald-50/30 via-white to-sky-50/30">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
      <ScoreboardHeader />
      <CountdownTimer timeLeft={timeLeft} />
    </section>
  );
}
