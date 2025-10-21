'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(16, 'A senha deve ter no máximo 16 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número')
    .regex(/[!?#!]/, 'A senha deve conter pelo menos um dos caracteres: ! ? #'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { user, loginUser, signupUser } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      router.replace('/collections');
    }
  }, [user, router]);

  const onSubmit = (data: LoginFormData) => {
    if (isLogin) {
      loginUser(data.email, data.password);
    } else {
      signupUser(data.email, data.password);
    }
    reset();
    router.push('/collections');
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');

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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-80 p-6 border rounded-lg"
          >
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="meuemail@gmail.com"
              {...register('email')}
              className={`${
                emailValue && !errors.email
                  ? 'border-green-500'
                  : errors.email
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="*********"
              {...register('password')}
              className={`${
                passwordValue && !errors.password
                  ? 'border-green-500'
                  : errors.password
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={!isValid}
              className={`${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-400 cursor-not-allowed'
              } py-2 rounded`}
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
