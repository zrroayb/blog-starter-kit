'use client';

import { useState } from 'react';
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { AdminDataForm } from "@/app/_components/admin/admin-data-form";
import { AdminDataTable } from "@/app/_components/admin/admin-data-table";
import { AdminAuth } from "@/app/_components/admin/admin-auth";

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
        </div>
      </Container>
    </main>
  );
} 