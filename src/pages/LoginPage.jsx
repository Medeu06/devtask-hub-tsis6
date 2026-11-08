import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('medeu@example.com');
  const [password, setPassword] = useState('password123');

  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto glass-card p-8 rounded-xl text-center space-y-4 my-10">
        <h2 className="text-base font-bold text-white">Вы уже авторизованы!</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg"
        >
          Перейти в Дашборд →
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="max-w-md mx-auto glass-card p-6 rounded-xl space-y-4 my-10 border border-slate-800">
      <div className="text-center">
        <h1 className="text-lg font-bold text-white">Авторизация (Auth TSIS6)</h1>
        <p className="text-xs text-slate-400 mt-1">
          {location.state?.from ? '🔒 Пожалуйста, войдите для доступа к закрытой странице' : 'Введите данные для входа'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Email / Логин</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-lg transition-all shadow-md mt-2"
        >
          Войти в систему
        </button>
      </form>
    </div>
  );
}
