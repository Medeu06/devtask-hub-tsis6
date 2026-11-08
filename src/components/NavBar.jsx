import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      alert(`Ошибка при выходе: ${err.message}`);
    }
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
          <p className="text-[10px] text-slate-400">TSIS6 Firebase Auth & Cache</p>
        </div>
      </NavLink>

      <nav className="flex items-center space-x-1 sm:space-x-2">
        <NavLink to="/" end className={linkStyle}>Главная</NavLink>
        <NavLink to="/tasks" className={linkStyle}>Задачи</NavLink>
        <NavLink to="/dashboard" className={linkStyle}>
          Дашборд {currentUser ? '🔒' : '🔑'}
        </NavLink>
        <NavLink to="/about" className={linkStyle}>О проекте</NavLink>

        {currentUser ? (
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <NavLink to="/profile" className={linkStyle}>
              👤 Профиль ({currentUser.email?.split('@')[0]})
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 rounded-lg transition-colors"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-1 pl-2 border-l border-slate-800">
            <NavLink to="/login" className={linkStyle}>Войти</NavLink>
            <NavLink to="/signup" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md">
              Регистрация
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
