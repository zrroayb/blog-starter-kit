'use client';

import { useState } from 'react';
import { bodrumData } from '@/lib/bodrum-data';

export function AdminDataForm() {
  const [formData, setFormData] = useState({
    ilce: '',
    mahalle: '',
    nufus: '',
    yuzolcumu: '',
    photo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Burada API çağrısı yapılacak
    console.log('Yeni veri:', formData);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Yeni Veri Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              İlçe
            </label>
            <input
              type="text"
              value={formData.ilce}
              onChange={(e) => setFormData({ ...formData, ilce: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Mahalle
            </label>
            <input
              type="text"
              value={formData.mahalle}
              onChange={(e) => setFormData({ ...formData, mahalle: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Nüfus
            </label>
            <input
              type="number"
              value={formData.nufus}
              onChange={(e) => setFormData({ ...formData, nufus: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Yüzölçümü
            </label>
            <input
              type="text"
              value={formData.yuzolcumu}
              onChange={(e) => setFormData({ ...formData, yuzolcumu: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Fotoğraf URL
            </label>
            <input
              type="text"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black hover:bg-white hover:text-black border border-black text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
} 