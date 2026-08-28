import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { FaSearch, FaSortAmountDown } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AdminDashboard() {
  const [adminPassword, setAdminPassword] = useState(() => sessionStorage.getItem('adminPassword') || '');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => !!sessionStorage.getItem('adminPassword'));
  const [adminLoginError, setAdminLoginError] = useState('');
  const [adminGuests, setAdminGuests] = useState([]);
  const [adminSummary, setAdminSummary] = useState(null);
  const [adminMessages, setAdminMessages] = useState([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestMaxPasses, setNewGuestMaxPasses] = useState(2);
  const [newGuestCode, setNewGuestCode] = useState('');
  const [guestFormSuccess, setGuestFormSuccess] = useState('');
  const [guestFormError, setGuestFormError] = useState('');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilter, setAdminFilter] = useState('todos');
  const [adminSort, setAdminSort] = useState('confirmacion-desc');
  const [editingGuestId, setEditingGuestId] = useState(null);

  useEffect(() => {
    if (isAdminLoggedIn && adminPassword) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn, adminPassword]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoginError('');

    try {
      const res = await fetch(`${API_BASE_URL}/admin/guests`, {
        headers: { 'x-admin-password': adminPassword }
      });

      if (res.ok) {
        sessionStorage.setItem('adminPassword', adminPassword);
        setIsAdminLoggedIn(true);
      } else {
        setAdminLoginError('Contraseña incorrecta. Acceso denegado.');
      }
    } catch (err) {
      setAdminLoginError('Error de servidor al conectar.');
    }
  };

  const fetchAdminData = async () => {
    if (!adminPassword) return;

    try {
      const resGuests = await fetch(`${API_BASE_URL}/admin/guests`, {
        headers: { 'x-admin-password': adminPassword }
      });
      if (resGuests.ok) {
        const data = await resGuests.json();
        setAdminGuests(data);
      } else if (resGuests.status === 401) {
        setIsAdminLoggedIn(false);
        setAdminPassword('');
        sessionStorage.removeItem('adminPassword');
        return;
      }

      const resSummary = await fetch(`${API_BASE_URL}/admin/summary`, {
        headers: { 'x-admin-password': adminPassword }
      });
      if (resSummary.ok) {
        const summaryData = await resSummary.json();
        setAdminSummary(summaryData);
      }

      const resMsgs = await fetch(`${API_BASE_URL}/message`);
      if (resMsgs.ok) {
        const msgs = await resMsgs.json();
        setAdminMessages(msgs);
      }
    } catch (err) {
      console.error('Error cargando datos de admin:', err);
    }
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();
    setGuestFormError('');
    setGuestFormSuccess('');

    if (!newGuestName.trim()) {
      setGuestFormError('El nombre del invitado es requerido.');
      return;
    }

    const isEditing = editingGuestId !== null;
    const url = isEditing
      ? `${API_BASE_URL}/admin/guests/update/${editingGuestId}`
      : `${API_BASE_URL}/admin/guests`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword
        },
        body: JSON.stringify({
          nombre: newGuestName.trim(),
          pasesMaximos: Number(newGuestMaxPasses),
          codigoAcceso: newGuestCode.trim() ? newGuestCode.trim().toUpperCase() : undefined
        })
      });

      if (res.ok) {
        const result = await res.json();
        if (isEditing) {
          setGuestFormSuccess(`¡Invitado ${result.nombre} actualizado con éxito!`);
          setEditingGuestId(null);
        } else {
          setGuestFormSuccess(`¡Invitado ${result.nombre} fichado con éxito! Código: ${result.codigoAcceso}`);
        }
        setNewGuestName('');
        setNewGuestMaxPasses(2);
        setNewGuestCode('');
        fetchAdminData();
      } else {
        const errData = await res.json();
        setGuestFormError(errData.message || 'Error al procesar invitado.');
      }
    } catch (err) {
      setGuestFormError('Error de conexión.');
    }
  };

  const handleEditClick = (guest) => {
    setEditingGuestId(guest.id);
    setNewGuestName(guest.nombre);
    setNewGuestMaxPasses(guest.pasesMaximos);
    setNewGuestCode(guest.codigoAcceso);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingGuestId(null);
    setNewGuestName('');
    setNewGuestMaxPasses(2);
    setNewGuestCode('');
  };


  const handleDeleteGuest = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este invitado?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/guests/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword }
      });

      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert('Error al eliminar invitado.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('¿Seguro que deseas retirar este mensaje del muro?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword }
      });

      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert('Error de red al moderar el mensaje.');
    }
  };

  const filteredGuests = adminGuests
    .filter((guest) => {
      const matchesSearch = guest.nombre.toLowerCase().includes(adminSearch.toLowerCase()) || 
                            guest.codigoAcceso.toLowerCase().includes(adminSearch.toLowerCase());
      
      if (adminFilter === 'confirmados-si') {
        return matchesSearch && guest.confirmado && guest.asistira;
      }
      if (adminFilter === 'confirmados-no') {
        return matchesSearch && guest.confirmado && !guest.asistira;
      }
      if (adminFilter === 'pendientes') {
        return matchesSearch && !guest.confirmado;
      }
      if (adminFilter === 'voto-nino') {
        return matchesSearch && guest.voto === 'nino';
      }
      if (adminFilter === 'voto-nina') {
        return matchesSearch && guest.voto === 'nina';
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (adminSort === 'confirmacion-desc') {
        // Confirmados primero, ordenados por fecha de confirmación más reciente
        if (a.confirmado && !b.confirmado) return -1;
        if (!a.confirmado && b.confirmado) return 1;
        if (a.confirmado && b.confirmado) {
          const dateA = a.confirmadoEn ? new Date(a.confirmadoEn).getTime() : 0;
          const dateB = b.confirmadoEn ? new Date(b.confirmadoEn).getTime() : 0;
          if (dateB !== dateA) return dateB - dateA;
        }
        return a.nombre.localeCompare(b.nombre);
      }
      if (adminSort === 'confirmacion-asc') {
        if (a.confirmado && !b.confirmado) return -1;
        if (!a.confirmado && b.confirmado) return 1;
        if (a.confirmado && b.confirmado) {
          const dateA = a.confirmadoEn ? new Date(a.confirmadoEn).getTime() : 0;
          const dateB = b.confirmadoEn ? new Date(b.confirmadoEn).getTime() : 0;
          if (dateA !== dateB) return dateA - dateB;
        }
        return a.nombre.localeCompare(b.nombre);
      }
      if (adminSort === 'nombre-asc') {
        return a.nombre.localeCompare(b.nombre);
      }
      if (adminSort === 'nombre-desc') {
        return b.nombre.localeCompare(a.nombre);
      }
      if (adminSort === 'pases-desc') {
        return b.pasesMaximos - a.pasesMaximos;
      }
      if (adminSort === 'pases-asc') {
        return a.pasesMaximos - b.pasesMaximos;
      }
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 selection:bg-soccer-gold selection:text-white font-sans bg-white min-h-screen text-slate-800">
      {/* Admin Header */}
      <header className="flex flex-col md:flex-row justify-between items-center border-b border-slate-100 pb-8 mb-10 gap-4">
        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-[10px] font-black tracking-widest rounded-full uppercase border border-slate-200/50">
            Dirección Técnica (Admin)
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            Bebé F.C. — Gestión del Club
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { window.location.hash = ''; }}
            className="px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-slate-700 rounded-full transition text-sm flex items-center space-x-2 shadow-sm"
          >
            <span>🏟️</span> <span>Ir a la Cancha</span>
          </button>
          
          <button
            onClick={() => {
              sessionStorage.removeItem('adminPassword');
              setAdminPassword('');
              setIsAdminLoggedIn(false);
              window.location.hash = '';
            }}
            className="px-6 py-3 border border-red-200 bg-red-50 hover:bg-red-100 font-extrabold text-red-700 rounded-full transition text-sm flex items-center space-x-2 shadow-sm animate-fade-in"
          >
            <span>🚪</span> <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* Admin Login Panel */}
      {!isAdminLoggedIn ? (
        <div className="max-w-md mx-auto bg-white border border-slate-200/70 rounded-3xl p-8 shadow-lg text-center mt-12">
          <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-2">Oficina de Directores</h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Ingresa la contraseña maestra para administrar los invitados y mensajes del Baby Shower.
          </p>
          
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña de Admin"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-5 py-3.5 text-center border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-800 text-lg font-black tracking-widest text-slate-800"
            />
            {adminLoginError && (
              <p className="text-xs text-red-500 font-bold">{adminLoginError}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-950 text-white rounded-2xl font-black transition tracking-wider text-sm uppercase shadow-md"
            >
              Acceder al Vestidor
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-10 animate-float-delayed">
          {/* Dashboard Statistics */}
          {adminSummary && (
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Plantilla Total</span>
                <span className="text-4xl font-extrabold text-slate-800 mt-1 block">{adminSummary.totalInvitados}</span>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block">Invitaciones en DB</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Pases Ocupados</span>
                <span className="text-4xl font-extrabold text-soccer-pitch-dark mt-1 block">
                  {adminSummary.totalPasesConfirmados} <span className="text-lg text-slate-400">/ {adminSummary.totalPasesMaximos}</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block">Asistencia confirmada</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Respuestas RSVP</span>
                <span className="text-4xl font-extrabold text-slate-800 mt-1 block">
                  {adminSummary.totalConfirmados} <span className="text-lg text-slate-400">/ {adminSummary.totalInvitados}</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block">Confirmados / Inasistencias</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Marcador del Derbi</span>
                <span className="text-4xl font-extrabold text-slate-800 mt-1 block">
                  {adminSummary.votosNino} <span className="text-slate-300">-</span> {adminSummary.votosNina}
                </span>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block">Votos totales: {adminSummary.votosTotal}</span>
              </div>
            </section>
          )}

          {/* Quick Add Guest Form */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-800 mb-5">
              {editingGuestId ? '✏️ Editar Invitado' : '📝 Fichar Nuevo Invitado'}
            </h3>
            <form onSubmit={handleAddGuest} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 tracking-wider">Nombre Completo / Familia</label>
                <input
                  type="text"
                  placeholder="Ej: Familia Gómez"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 font-semibold text-slate-700 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 tracking-wider">Pases Máximos</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newGuestMaxPasses}
                  onChange={(e) => setNewGuestMaxPasses(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 font-semibold text-slate-700 bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 tracking-wider">Código de Boleto</label>
                <input
                  type="text"
                  placeholder="Ej: FAM001"
                  value={newGuestCode}
                  onChange={(e) => setNewGuestCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 font-semibold text-slate-700 bg-white uppercase tracking-wider"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-950 transition text-xs tracking-wider uppercase shadow-sm"
                >
                  {editingGuestId ? 'Guardar' : 'Fichar'}
                </button>
                {editingGuestId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition text-xs tracking-wider uppercase border border-slate-200/50 font-semibold"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
            {guestFormSuccess && <p className="text-xs text-emerald-600 font-bold mt-4 text-center">{guestFormSuccess}</p>}
            {guestFormError && <p className="text-xs text-red-500 font-bold mt-4 text-center">{guestFormError}</p>}
          </section>

          {/* Guest Management Table */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">📋 Lista General de Aficionados</h3>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto items-stretch sm:items-center">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-56">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input
                    type="text"
                    placeholder="Buscar hincha o código..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-800 font-semibold text-slate-700 bg-white w-full"
                  />
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600">
                  <FaSortAmountDown className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="text-[10px] uppercase font-extrabold text-slate-400">Orden:</span>
                  <select
                    value={adminSort}
                    onChange={(e) => setAdminSort(e.target.value)}
                    className="bg-transparent text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="confirmacion-desc">⚡ Confirmados (Más reciente)</option>
                    <option value="confirmacion-asc">⏳ Confirmados (Más antiguo)</option>
                    <option value="nombre-asc">🔤 Nombre (A - Z)</option>
                    <option value="nombre-desc">🔤 Nombre (Z - A)</option>
                    <option value="pases-desc">🎟️ Más Pases</option>
                    <option value="pases-asc">🎟️ Menos Pases</option>
                  </select>
                </div>

                {/* Status and vote filters */}
                <div className="flex flex-wrap border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5 text-[10px] font-extrabold text-slate-500 w-full sm:w-auto gap-0.5">
                  {[
                    { key: 'todos', label: 'Todos' },
                    { key: 'confirmados-si', label: 'Asistirá ⚽' },
                    { key: 'confirmados-no', label: 'No Asistirá ❌' },
                    { key: 'pendientes', label: 'Pendientes ⏳' },
                    { key: 'voto-nino', label: 'Niño 👶' },
                    { key: 'voto-nina', label: 'Niña 👧' }
                  ].map((filterObj) => (
                    <button
                      key={filterObj.key}
                      onClick={() => setAdminFilter(filterObj.key)}
                      type="button"
                      className={`px-2.5 py-1.5 rounded-lg transition text-center ${
                        adminFilter === filterObj.key 
                          ? 'bg-white text-slate-800 shadow-sm border border-slate-200/40 font-black' 
                          : 'hover:text-slate-800'
                      }`}
                    >
                      {filterObj.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-slate-600">
                <thead className="bg-slate-50/50 uppercase text-[9px] tracking-wider text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="py-4 px-4 font-black">Invitado</th>
                    <th className="py-4 px-4 font-black">Boleto / Código</th>
                    <th className="py-4 px-4 font-black">Pases Disponibles</th>
                    <th className="py-4 px-4 font-black">Estado RSVP</th>
                    <th className="py-4 px-4 font-black">Voto Género</th>
                    <th className="py-4 px-4 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400 font-handwritten text-3xl">
                        No se encontraron hinchas en el vestidor.
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-slate-50/20 transition">
                        <td className="py-4.5 px-4 font-extrabold text-slate-800 text-sm">{guest.nombre}</td>
                        <td className="py-4.5 px-4 font-mono font-bold tracking-wider text-slate-400 uppercase">{guest.codigoAcceso}</td>
                        <td className="py-4.5 px-4 text-slate-500">{guest.pasesMaximos} Pases</td>
                        <td className="py-4.5 px-4">
                          {!guest.confirmado ? (
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-wider">
                              Pendiente ⏳
                            </span>
                          ) : guest.asistira ? (
                            <div className="space-y-0.5">
                              <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100/50 rounded-full text-[9px] font-black uppercase tracking-wider">
                                Confirma: {guest.pasesConfirmados} pases ⚽
                              </span>
                              {guest.confirmadoEn && (
                                <span className="block text-[10px] text-slate-400 font-semibold">
                                  {new Date(guest.confirmadoEn).toLocaleDateString('es-MX', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="inline-block px-2.5 py-1 bg-red-50 text-red-700 border border-red-100/50 rounded-full text-[9px] font-black uppercase tracking-wider">
                                No Asistirá ❌
                              </span>
                              {guest.confirmadoEn && (
                                <span className="block text-[10px] text-slate-400 font-semibold">
                                  {new Date(guest.confirmadoEn).toLocaleDateString('es-MX', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-4.5 px-4">
                          {guest.voto === 'nino' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200/60 rounded-full text-[9px] font-black uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                              <span>Niño ⚽</span>
                            </span>
                          ) : guest.voto === 'nina' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 text-pink-700 border border-pink-200/60 rounded-full text-[9px] font-black uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                              <span>Niña 🎀</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px] font-bold">
                              Sin voto —
                            </span>
                          )}
                        </td>
                        <td className="py-4.5 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditClick(guest)}
                              className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition text-[10px] font-bold"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteGuest(guest.id)}
                              className="px-3 py-1.5 border border-red-100 hover:border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition text-[10px] font-bold"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Message Wall Moderation */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-800 mb-5">💬 Moderación de Firmas de la Afición</h3>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {adminMessages.length === 0 ? (
                <p className="text-center text-slate-400 py-10 font-handwritten text-2xl">Aún no hay firmas de la afición registradas.</p>
              ) : (
                adminMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/50 flex justify-between items-start gap-4 hover:bg-slate-50 transition"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="font-extrabold text-sm text-slate-700">{msg.nombre}</span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(msg.fechaCreacion).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed italic">"{msg.contenido}"</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold whitespace-nowrap px-3 py-1.5 border border-red-100/50 hover:bg-red-50 rounded-lg transition"
                    >
                      Retirar firma
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
