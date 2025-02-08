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
        const response = await fetch('/api/bodrum-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log('API Response:', result); // Debug için

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
    return <div>Yükleniyor...</div>;
  }

  return (
    <main>
      <Container>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Nüfus Verileri</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Fotoğraf</th>
                <th>İlçe</th>
                <th>Mahalle</th>
                <th>Nüfus</th>
                <th>Yüzölçümü</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Image
                      src={item.photo}
                      alt={item.ilce}
                      width={60}
                      height={40}
                    />
                  </td>
                  <td>{item.ilce}</td>
                  <td>{item.mahalle}</td>
                  <td>{item.nufus}</td>
                  <td>{item.yuzolcumu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
} 