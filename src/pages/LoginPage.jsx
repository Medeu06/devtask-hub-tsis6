import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(`Ошибка входа: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(`Ошибка Google входа: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto glass-card p-6 rounded-xl space-y-4 my-10 border border-slate-800">
      <div className="text-center">
        <h1 className="text-lg font-bold text-white">Вход в систему (Firebase Auth)</h1>
        <p className="text-xs text-slate-400 mt-1">
          {location.state?.from ? '🔒 Войдите для доступа к защищенной странице' : 'Введите данные вашего аккаунта'}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-xs">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Пароль</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-lg transition-all shadow-md disabled:opacity-50"
        >
          {loading ? 'Выполняется вход...' : 'Войти по Email'}
        </button>
      </form>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase">или</span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-all flex items-center justify-center space-x-2 text-xs"
      >
        <span>🌐</span>
        <span>Войти через Google</span>
      </button>

      <div className="text-center text-xs text-slate-400 pt-2">
        Еще нет аккаунта?{' '}
        <Link to="/signup" className="text-indigo-400 hover:underline font-bold">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
