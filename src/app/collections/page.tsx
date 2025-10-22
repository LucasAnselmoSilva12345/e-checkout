'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CollectionPage() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Coleções</h1>
      <p>Bem-vindo, {user.email}!</p>
      <button
        onClick={() => {
          logoutUser();
          router.push('/login');
        }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}
