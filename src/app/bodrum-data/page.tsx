'use client';

import Container from "@/app/_components/container";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from "@/app/_components/header";

interface LocationData {
  _id: string;
  ilce: string;
  mahalle: string;
  nufus: number;
  yuzolcumu: string;
  photo: string;
}

interface Filters {
  ilce: string;
  mahalle: string;
  nufus: string;
  yuzolcumu: string;
}

export default function BodrumData() {
  const [data, setData] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    ilce: '',
    mahalle: '',
    nufus: '',
    yuzolcumu: ''
  });

  // Benzersiz değerleri al
  const uniqueValues = {
    ilce: [...new Set(data.map(item => item.ilce))],
    mahalle: [...new Set(data.map(item => item.mahalle))],
    nufus: [...new Set(data.map(item => item.nufus.toString()))],
    yuzolcumu: [...new Set(data.map(item => item.yuzolcumu))]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/bodrum-data');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtreleme fonksiyonu
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.ilce.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mahalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nufus.toString().includes(searchTerm) ||
      item.yuzolcumu.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (!filters.ilce || item.ilce === filters.ilce) &&
      (!filters.mahalle || item.mahalle === filters.mahalle) &&
      (!filters.nufus || item.nufus.toString() === filters.nufus) &&
      (!filters.yuzolcumu || item.yuzolcumu === filters.yuzolcumu);

    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const renderFilterSelect = (name: keyof Filters, options: string[]) => (
    <select
      value={filters[name]}
      onChange={(e) => handleFilterChange(name, e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    >
      <option value="">Tümü</option>
      {options.sort().map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  if (loading) {
    return (
      <Container>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Veriler Yükleniyor...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Bodrum Nüfus Verileri</h1>
        
        {/* Arama kutusu */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Ara... (İlçe, mahalle, nüfus veya yüzölçümü)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="border p-4 dark:border-gray-700">Fotoğraf</th>
                <th className="border p-4 dark:border-gray-700">
                  İlçe
                  <div className="mt-2">
                    {renderFilterSelect('ilce', uniqueValues.ilce)}
                  </div>
                </th>
                <th className="border p-4 dark:border-gray-700">
                  Mahalle
                  <div className="mt-2">
                    {renderFilterSelect('mahalle', uniqueValues.mahalle)}
                  </div>
                </th>
                <th className="border p-4 dark:border-gray-700">
                  Nüfus
                  <div className="mt-2">
                    {renderFilterSelect('nufus', uniqueValues.nufus)}
                  </div>
                </th>
                <th className="border p-4 dark:border-gray-700">
                  Yüzölçümü
                  <div className="mt-2">
                    {renderFilterSelect('yuzolcumu', uniqueValues.yuzolcumu)}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border p-4 text-center dark:border-gray-700">
                    <Image
                      src={item.photo}
                      alt={item.ilce}
                      width={80}
                      height={60}
                      className="inline-block object-cover rounded"
                    />
                  </td>
                  <td className="border p-4 dark:border-gray-700">{item.ilce}</td>
                  <td className="border p-4 dark:border-gray-700">{item.mahalle}</td>
                  <td className="border p-4 dark:border-gray-700">{item.nufus.toLocaleString()}</td>
                  <td className="border p-4 dark:border-gray-700">{item.yuzolcumu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
} 