'use client';

import { useState } from 'react';
import Image from 'next/image';
import { bodrumData } from '@/lib/bodrum-data';

type BodrumDataType = {
  id: number;
  ilce: string;
  mahalle: string;
  nufus: number;
  photo: string;
  yuzolcumu: string;
};

export function BodrumDataTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<keyof BodrumDataType>('ilce');

  const filteredData = bodrumData.filter((item) => {
    const searchValue = String(item[filterBy]).toLowerCase();
    return searchValue.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Ara..."
          className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
          onChange={(e) => setFilterBy(e.target.value as keyof BodrumDataType)}
        >
          <option value="ilce">İlçe</option>
          <option value="mahalle">Mahalle</option>
          <option value="nufus">Nüfus</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Fotoğraf
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                İlçe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Mahalle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Nüfus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Yüzölçümü
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-700">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={item.photo}
                    alt={item.ilce}
                    width={100}
                    height={60}
                    className="rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.ilce}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.mahalle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.nufus.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.yuzolcumu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 