'use client';

import Container from "@/app/_components/container";
import { Location } from '@/types/location';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function NufusVerileri() {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Relative URL kullan
        const response = await fetch('/api/bodrum-data', {
          // Cache'i devre dışı bırak
          cache: 'no-store',
          next: { revalidate: 0 }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Fetched data:', result); // Debug için

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="mt-10 flex justify-center">
          <div className="text-lg">Veriler Yükleniyor...</div>
        </div>
      </Container>
    );
  }

  if (data.length === 0) {
    return (
      <Container>
        <div className="mt-10 flex justify-center">
          <div className="text-lg">Henüz veri bulunmamaktadır.</div>
        </div>
      </Container>
    );
  }

  return (
    <main>
      <Container>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Nüfus Verileri</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fotoğraf
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    İlçe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Mahalle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nüfus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Yüzölçümü
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Image
                        src={item.photo}
                        alt={item.ilce}
                        width={60}
                        height={40}
                        className="rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {item.ilce}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {item.mahalle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {item.nufus.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {item.yuzolcumu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </main>
  );
} 