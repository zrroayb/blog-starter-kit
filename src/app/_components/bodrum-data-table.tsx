'use client';

import { useState } from 'react';
import Image from 'next/image';
import { bodrumData } from '@/lib/bodrum-data';
import { Modal } from './modal';

type BodrumDataType = {
  id: number;
  ilce: string;
  mahalle: string;
  nufus: number;
  photo: string;
  yuzolcumu: string;
};

type Filters = {
  ilce: string;
  mahalle: string;
  nufus: string;
  yuzolcumu: string;
};

export function BodrumDataTable() {
  const [filters, setFilters] = useState<Filters>({
    ilce: '',
    mahalle: '',
    nufus: '',
    yuzolcumu: ''
  });
  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState<BodrumDataType | null>(null);

  // Benzersiz değerleri al
  const uniqueValues = {
    ilce: [...new Set(bodrumData.map(item => item.ilce))],
    mahalle: [...new Set(bodrumData.map(item => item.mahalle))],
    nufus: [...new Set(bodrumData.map(item => item.nufus.toString()))],
    yuzolcumu: [...new Set(bodrumData.map(item => item.yuzolcumu))]
  };

  const filteredData = bodrumData.filter((item) => {
    const matchesFilters = (
      (!filters.ilce || item.ilce === filters.ilce) &&
      (!filters.mahalle || item.mahalle === filters.mahalle) &&
      (!filters.nufus || item.nufus.toString() === filters.nufus) &&
      (!filters.yuzolcumu || item.yuzolcumu === filters.yuzolcumu)
    );

    const searchLower = searchText.toLowerCase();
    const matchesSearch = searchText === '' || 
      item.ilce.toLowerCase().includes(searchLower) ||
      item.mahalle.toLowerCase().includes(searchLower) ||
      item.nufus.toString().includes(searchLower) ||
      item.yuzolcumu.toLowerCase().includes(searchLower);

    return matchesFilters && matchesSearch;
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAll = () => {
    setFilters({
      ilce: '',
      mahalle: '',
      nufus: '',
      yuzolcumu: ''
    });
    setSearchText('');
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1 block">
              Metin Ara
            </label>
            <input
              type="text"
              placeholder="İlçe, mahalle veya diğer bilgilerde ara..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">
                İlçe
              </label>
              <select
                className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                value={filters.ilce}
                onChange={(e) => handleFilterChange('ilce', e.target.value)}
              >
                <option value="">Tümü</option>
                {uniqueValues.ilce.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">
                Mahalle
              </label>
              <select
                className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                value={filters.mahalle}
                onChange={(e) => handleFilterChange('mahalle', e.target.value)}
              >
                <option value="">Tümü</option>
                {uniqueValues.mahalle.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">
                Nüfus
              </label>
              <select
                className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                value={filters.nufus}
                onChange={(e) => handleFilterChange('nufus', e.target.value)}
              >
                <option value="">Tümü</option>
                {uniqueValues.nufus.map((value) => (
                  <option key={value} value={value}>{parseInt(value).toLocaleString()}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">
                Yüzölçümü
              </label>
              <select
                className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
                value={filters.yuzolcumu}
                onChange={(e) => handleFilterChange('yuzolcumu', e.target.value)}
              >
                <option value="">Tümü</option>
                {uniqueValues.yuzolcumu.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {filteredData.length} sonuç bulundu
            </p>
            <button
              onClick={clearAll}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Tüm Filtreleri Temizle
            </button>
          </div>
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
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                  onClick={() => setSelectedData(item)}
                >
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

      <Modal
        isOpen={!!selectedData}
        onClose={() => setSelectedData(null)}
      >
        {selectedData && (
          <div className="text-center">
            <div className="mb-6">
              <Image
                src={selectedData.photo}
                alt={selectedData.ilce}
                width={400}
                height={240}
                className="rounded-lg mx-auto"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{selectedData.mahalle}</h2>
            <div className="grid grid-cols-2 gap-4 text-left mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">İlçe</p>
                <p className="font-medium dark:text-white">{selectedData.ilce}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">Mahalle</p>
                <p className="font-medium dark:text-white">{selectedData.mahalle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">Nüfus</p>
                <p className="font-medium dark:text-white">{selectedData.nufus.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">Yüzölçümü</p>
                <p className="font-medium dark:text-white">{selectedData.yuzolcumu}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
} 