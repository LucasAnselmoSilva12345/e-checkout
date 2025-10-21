'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  return (
    <header>
      <h1 onClick={() => router.push('/')}>E-checkout</h1>
      <div>
        {user ? (
          <>
            <span className="text-gray-700">
              Olá, <strong>{user?.name ?? user?.email}</strong>
            </span>
            <button
              onClick={() => {
                logoutUser();
                router.push('/login');
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Sair
            </button>
          </>
        ) : (
          <span className="text-gray-500">Bem-vindo(a)!</span>
        )}
      </div>
    </header>
  );
}
