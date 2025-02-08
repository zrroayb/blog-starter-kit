import Container from "@/app/_components/container";
import { Location } from '@/types/location';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import LocationModel from '@/models/Location';
import { Types } from 'mongoose';

// MongoDB'den gelen veri tipi
interface MongoLocation {
  _id: Types.ObjectId;
  ilce: string;
  mahalle: string;
  nufus: number;
  yuzolcumu: string;
  photo: string;
}

async function getData(): Promise<Location[]> {
  try {
    await dbConnect();
    const locations = await LocationModel.find({}).lean() as MongoLocation[];
    
    // MongoDB _id'yi string'e çevir
    const data = locations.map(loc => ({
      _id: loc._id.toString(),
      ilce: loc.ilce,
      mahalle: loc.mahalle,
      nufus: loc.nufus,
      yuzolcumu: loc.yuzolcumu,
      photo: loc.photo
    }));

    console.log('Fetched data:', data);
    return data;
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