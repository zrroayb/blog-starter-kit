'use client';

import { useState } from 'react';

type Props = {
  onAuth: () => void;
};

export function AdminAuth({ onAuth }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gerçek uygulamada güvenli bir kimlik doğrulama sistemi kullanılmalı
    if (password === 'admin123') {
      onAuth();
    } else {
      setError('Geçersiz şifre');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Yönetici Girişi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black hover:bg-white hover:text-black border border-black text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
} 