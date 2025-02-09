'use client';

import { useState } from 'react';
import Container from '@/app/_components/container';
import Header from '@/app/_components/header';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error('Cloudinary cloud name is not configured');
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (!data.secure_url) {
        throw new Error('No secure URL in response');
      }

      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Görsel yüklenemedi');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';
      if (selectedFile) {
        try {
          imageUrl = await uploadToCloudinary(selectedFile);
        } catch (error) {
          setMessage('Görsel yükleme hatası: ' + error.message);
          setLoading(false);
          return;
        }
      }

      const postData = {
        ...formData,
        coverImage: imageUrl
      };

      console.log('Sending post data:', postData); // Debug için

      const response = await fetch('/api/blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setMessage('Blog yazısı başarıyla eklendi');
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          coverImage: '',
          author: ''
        });
        setSelectedFile(null);
        setPreviewUrl('');
        
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        setMessage('Hata: ' + (result.error || 'Bilinmeyen bir hata oluştu'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Hata: ' + (error.message || 'Bilinmeyen bir hata oluştu'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Yönetimi</h1>
          <button
            onClick={() => router.push('/admin')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Geri Dön
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded mb-6 ${
            message.includes('Hata') 
              ? 'bg-red-50 text-red-600' 
              : 'bg-green-50 text-green-600'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">
              Blog Başlığı
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Blog yazısının başlığını girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Özet
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              rows={3}
              placeholder="Blog yazısının kısa özetini girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              İçerik
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              rows={10}
              placeholder="Blog yazısının içeriğini girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Kapak Görseli
            </label>
            <div className="flex flex-col space-y-4">
              <input
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
              {previewUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Yazar
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Yazar adını girin"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Ekleniyor...' : 'Blog Yazısı Ekle'}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
} 