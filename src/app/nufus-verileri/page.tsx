import Container from "@/app/_components/container";
import { Location } from '@/types/location';
import Image from 'next/image';
import { BASE_URL } from '@/lib/constants';

async function getData(): Promise<Location[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/bodrum-data`, {
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function NufusVerileri() {
  const locationData = await getData();

  console.log('Location data:', locationData);

  return (
    <main>
      <Container>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Nüfus Verileri</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fotoğraf
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İlçe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mahalle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nüfus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yüzölçümü
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {locationData.map((item) => (
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
      </Container>
    </main>
  );
} 