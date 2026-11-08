import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Пароли не совпадают!');
    }

    if (password.length < 6) {
      return setError('Длина пароля должна быть не менее 6 символов.');
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate('/profile');
    } catch (err) {
      setError(`Ошибка регистрации: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (err) {
      setError(`Ошибка регистрации через Google: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto glass-card p-6 rounded-xl space-y-4 my-10 border border-slate-800">
      <div className="text-center">
        <h1 className="text-lg font-bold text-white">Регистрация (Firebase Auth)</h1>
        <p className="text-xs text-slate-400 mt-1">Создайте новый аккаунт пользователя</p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-xs">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="newuser@example.com"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Пароль *</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1 font-semibold">Подтвердите пароль *</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-lg transition-all shadow-md disabled:opacity-50"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase">или</span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-all flex items-center justify-center space-x-2 text-xs"
      >
        <span>🌐</span>
        <span>Продолжить через Google</span>
      </button>

      <div className="text-center text-xs text-slate-400 pt-2">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-indigo-400 hover:underline font-bold">
          Войти
        </Link>
      </div>
    </div>
  );
}
