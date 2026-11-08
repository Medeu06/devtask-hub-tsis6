import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto glass-card p-6 rounded-xl space-y-6">
      <h1 className="text-xl font-bold text-white border-b border-slate-800 pb-3">О проекте (About Project TSIS6)</h1>
      
      <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
        <p>
          <strong>DevTask Hub</strong> — интерактивный менеджер задач для IT-команд, развиваемый в рамках практических работ </strong>.
        </p>
      </div>

      <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
        <h3 className="font-bold text-indigo-400 mb-2">Архитектура ТСИС6:</h3>
        <div><strong>Студент:</strong> Медеу Сейдали</div>
        <div><strong>Стек:</strong> React 18, React Router v6, Tailwind CSS, Vite, LocalStorage & Memory Cache</div>
        <div><strong>Безопасность:</strong> ProtectedRoute wrapper, AuthContext session persistence, simulated JWT token</div>
        <div><strong>Кэширование:</strong> In-memory API cache store с инвалидацией при мутациях (`create`, `update`, `remove`) и TTL 60с</div>
      </div>

      <div className="pt-2 flex space-x-3">
        <Link to="/tasks" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold">
          Перейти к списку задач
        </Link>
        <Link to="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs border border-slate-700">
          На главную
        </Link>
      </div>
    </div>
  );
}
