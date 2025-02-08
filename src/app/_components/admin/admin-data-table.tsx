'use client';

import { useState } from 'react';
import Image from 'next/image';
import { bodrumData } from '@/lib/bodrum-data';

export function AdminDataTable() {
  const [data, setData] = useState(bodrumData);

  const handleDelete = (id: number) => {
    // Burada API çağrısı yapılacak
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Mevcut Veriler</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Fotoğraf
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                İlçe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Mahalle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Nüfus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Yüzölçümü
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-slate-700">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={item.photo}
                    alt={item.ilce}
                    width={60}
                    height={40}
                    className="rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-slate-200">{item.ilce}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-slate-200">{item.mahalle}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-slate-200">{item.nufus.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-slate-200">{item.yuzolcumu}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 