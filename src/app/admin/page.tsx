'use client';

import { useState } from 'react';
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { AdminDataForm } from "@/app/_components/admin/admin-data-form";
import { AdminDataTable } from "@/app/_components/admin/admin-data-table";
import { AdminAuth } from "@/app/_components/admin/admin-auth";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <main>
        <Container>
          <Header />
          <AdminAuth onAuth={() => setIsAuthenticated(true)} />
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <Header />
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Yönetim Paneli
          </h1>
          <div className="space-y-8">
            <AdminDataForm />
            <AdminDataTable />
          </div>
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Nüfus Verileri Yönetimi</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Bodrum ilçelerine ait nüfus verilerini ekleyin ve düzenleyin.
                </p>
                <Link
                  href="/admin/locations"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Verileri Yönet
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Blog Yazıları Yönetimi</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Blog yazılarını ekleyin, düzenleyin ve yönetin.
                </p>
                <Link
                  href="/admin/blog"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Blog Yönet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
} 