'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function LoginPage() {
  const { user, loginUser, signupUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/collections');
    }
  }, [user, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLogin) {
      loginUser(email, password);
    } else {
      signupUser(email, password);
    }
    router.push('/collections');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 p-6 border rounded-lg"
      >
        <h2 className="text-xl font-bold text-center">
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          required
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-gray-500 hover:underline"
        >
          {isLogin ? 'Criar nova conta' : 'Já tenho uma conta'}
        </button>
      </form>
    </div>
  );
}
