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
  const [selectedItem, setSelectedItem] = useState<LocationData | null>(null);
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

  // Popup kapatma fonksiyonu
  const closePopup = () => {
    setSelectedItem(null);
  };

  // Popup komponenti
  const DetailPopup = ({ item }: { item: LocationData }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full mx-auto p-6 relative">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center">
          <Image
            src={item.photo}
            alt={item.ilce}
            width={300}
            height={200}
            className="rounded-lg object-cover mb-4"
          />
          <h3 className="text-xl font-bold mb-4 dark:text-white">{item.ilce}</h3>
          <div className="w-full space-y-2 text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span className="font-medium">Mahalle:</span>
              <span>{item.mahalle}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Nüfus:</span>
              <span>{item.nufus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Yüzölçümü:</span>
              <span>{item.yuzolcumu}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                <tr 
                  key={item._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
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

        {/* Popup */}
        {selectedItem && <DetailPopup item={selectedItem} />}
      </div>
    </Container>
  );
} 