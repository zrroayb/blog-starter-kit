'use client';

import Container from "@/app/_components/container";
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Veri tipi tanımlaması
interface LocationData {
  _id: string;
  ilce: string;
  mahalle: string;
  nufus: number;
  yuzolcumu: string;
  photo: string;
}

export default function NufusVerileri() {
  const [data, setData] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/bodrum-data');
        const result = await response.json();
        console.log('API Response:', result); // Debug için
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

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Veriler Yükleniyor...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Bodrum Nüfus Verileri</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-4">Fotoğraf</th>
                <th className="border p-4">İlçe</th>
                <th className="border p-4">Mahalle</th>
                <th className="border p-4">Nüfus</th>
                <th className="border p-4">Yüzölçümü</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border p-4 text-center">
                    <Image
                      src={item.photo}
                      alt={item.ilce}
                      width={80}
                      height={60}
                      className="inline-block object-cover"
                    />
                  </td>
                  <td className="border p-4">{item.ilce}</td>
                  <td className="border p-4">{item.mahalle}</td>
                  <td className="border p-4">{item.nufus.toLocaleString()}</td>
                  <td className="border p-4">{item.yuzolcumu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
} 