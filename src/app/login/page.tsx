'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? 'Entrar' : 'Criar Conta'}</CardTitle>
          <CardDescription>Entre com o seu melhor e-mail</CardDescription>
          <CardAction>
            <Button
              variant="link"
              type="submit"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Criar conta' : 'Login'}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-80 p-6 border rounded-lg"
          >
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="meuemail@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="*********"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
