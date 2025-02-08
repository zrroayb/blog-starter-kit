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
    // MongoDB'den verileri çek
    fetch('/api/bodrum-data')
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          console.log('MongoDB data:', result.data);
          setData(result.data);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <main>
      <Container>
        <div style={{ margin: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>Nüfus Verileri</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left' }}>Fotoğraf</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>İlçe</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Mahalle</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Nüfus</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Yüzölçümü</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>
                    <Image
                      src={item.photo}
                      alt={item.ilce}
                      width={60}
                      height={40}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>{item.ilce}</td>
                  <td style={{ padding: '10px' }}>{item.mahalle}</td>
                  <td style={{ padding: '10px' }}>{item.nufus}</td>
                  <td style={{ padding: '10px' }}>{item.yuzolcumu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
} 