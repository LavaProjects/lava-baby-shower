import React, { useState, useEffect } from 'react';
import './App.css';

// Modular Section Components
import { SoccerConfettiBg } from './components/BackgroundConfetti/server/SoccerConfettiBg';
import { Hero } from './components/Hero';
import { IntroCard } from './components/Intro/server/IntroCard';
import { Scoreboard } from './components/Scoreboard';
import { TicketSection } from './components/TicketSection';
import { GenderDerby } from './components/GenderDerby';
import { ScheduleSection } from './components/Schedule/server/ScheduleSection';
import { MatchDetailsSection } from './components/MatchDetails/server/MatchDetailsSection';
import { GiftTableSection } from './components/GiftTable/server/GiftTableSection';
import { MessageWall } from './components/MessageWall';
import { Footer } from './components/Footer/server/Footer';
import { AdminDashboard } from './components/Admin/client/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('user'); // 'user' | 'admin'
  const [isValidated, setIsValidated] = useState(false);
  const [guestInfo, setGuestInfo] = useState(null);

  // URL Hash Listener for Admin (#admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      setCurrentView(hash === '#admin' || hash === '#/admin' ? 'admin' : 'user');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleValidationChange = (data) => {
    setIsValidated(!!data);
    setGuestInfo(data);
  };

  // Render Admin View
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  // Render Main User View (Bebé F.C.)
  return (
    <div className="min-h-screen relative overflow-x-hidden select-none font-sans text-slate-800">
      <SoccerConfettiBg />
      <Hero />

      <main className="max-w-4xl mx-auto px-4 pb-10 relative z-10">
        <IntroCard />
        <Scoreboard />
        <TicketSection onValidationChange={handleValidationChange} />
        <GenderDerby isValidated={isValidated} guestInfo={guestInfo} />
        <ScheduleSection />
        <MatchDetailsSection />
        <GiftTableSection />
        <MessageWall guestInfo={guestInfo} />
        <Footer />
      </main>
    </div>
  );
}

export default App;
