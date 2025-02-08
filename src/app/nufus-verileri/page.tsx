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

  useEffect(() => {
    // Direkt MongoDB verilerini getir
    fetch('/api/bodrum-data')
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          setData(result.data);
        }
      });
  }, []);

  return (
    <Container>
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Bodrum Nüfus Verileri</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Fotoğraf</th>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>İlçe</th>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Mahalle</th>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Nüfus</th>
              <th style={{ border: '1px solid #ddd', padding: '12px' }}>Yüzölçümü</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                  <Image
                    src={item.photo}
                    alt={item.ilce}
                    width={80}
                    height={60}
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.ilce}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.mahalle}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.nufus}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.yuzolcumu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
} 