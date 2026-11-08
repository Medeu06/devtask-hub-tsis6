import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkStyle = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-30 glass-card border-b border-slate-800 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
      <NavLink to="/" className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xl shadow-lg text-white">
          D
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white">DevTask Hub</h1>
          <p className="text-[10px] text-slate-400">TSIS6 Auth & Caching System</p>
        </div>
      </NavLink>

      <nav className="flex items-center space-x-1 sm:space-x-2">
        <NavLink to="/" end className={linkStyle}>Главная</NavLink>
        <NavLink to="/tasks" className={linkStyle}>Задачи</NavLink>
        <NavLink to="/dashboard" className={linkStyle}>
          Дашборд {isAuthenticated ? '🔒' : '🔑'}
        </NavLink>
        <NavLink to="/about" className={linkStyle}>О проекте</NavLink>

        {isAuthenticated ? (
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <span className="text-[11px] text-slate-300 font-medium">👤 {user.name}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
              {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 rounded-lg transition-colors"
            >
              Выйти
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={linkStyle}>Войти</NavLink>
        )}
      </nav>
    </header>
  );
}
