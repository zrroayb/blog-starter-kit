'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export function AdminDataForm() {
  const [formData, setFormData] = useState({
    ilce: '',
    mahalle: '',
    nufus: '',
    yuzolcumu: '',
    photo: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.photo) {
        alert('Lütfen bir fotoğraf seçin');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('ilce', formData.ilce);
      formDataToSend.append('mahalle', formData.mahalle);
      formDataToSend.append('nufus', formData.nufus);
      formDataToSend.append('yuzolcumu', formData.yuzolcumu);
      formDataToSend.append('photo', formData.photo);

      console.log('Sending data:', Object.fromEntries(formDataToSend));

      const response = await fetch('/api/bodrum-data', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (result.success) {
        // Form'u temizle
        setFormData({
          ilce: '',
          mahalle: '',
          nufus: '',
          yuzolcumu: '',
          photo: null
        });
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        alert('Veri başarıyla kaydedildi!');
        window.location.reload();
      } else {
        throw new Error(result.error || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Veri kaydedilirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Yeni Veri Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              İlçe
            </label>
            <input
              type="text"
              value={formData.ilce}
              onChange={(e) => setFormData({ ...formData, ilce: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Mahalle
            </label>
            <input
              type="text"
              value={formData.mahalle}
              onChange={(e) => setFormData({ ...formData, mahalle: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Nüfus
            </label>
            <input
              type="number"
              value={formData.nufus}
              onChange={(e) => setFormData({ ...formData, nufus: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Yüzölçümü
            </label>
            <input
              type="text"
              value={formData.yuzolcumu}
              onChange={(e) => setFormData({ ...formData, yuzolcumu: e.target.value })}
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Fotoğraf
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                      Fotoğraf Yükle
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setFormData({ ...formData, photo: null });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                >
                  Fotoğrafı Kaldır
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              PNG, JPG, GIF maksimum 5MB
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black hover:bg-white hover:text-black border border-black text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-bold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
} 