'use client';

import { useRouter } from 'next/navigation';

export function Logo() {
  const router = useRouter();
  return (
    <h1
      className="text-neutral-800 text-2xl font-bold"
      onClick={() => router.push('/')}
    >
      E-checkout
    </h1>
  );
}
