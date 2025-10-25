'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type CustomerData } from '@/schemas/customer';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomerFormProps {
  user: {
    name?: string;
    email?: string;
  } | null;
}

export function CustomerForm({ user }: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors},
    watch,
    reset,
  } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      cpf: '',
      phone: '',
    },
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const cpfValue = watch('cpf');
  const phoneValue = watch('phone');

  const onSubmit = (data: CustomerData) => {
    console.log('Dados válidos:', data);
    reset();
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não é número
    .replace(/^(\d{2})(\d)/, '($1) $2') // Coloca os parênteses no DDD
    .replace(/(\d{5})(\d{4})$/, '$1-$2') // Adiciona o hífen antes dos últimos 4 dígitos
    .slice(0, 15); // Limita o tamanho máximo: (XX) XXXXX-XXXX
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
          <p className="text-sm text-muted-foreground">
            Utilizaremos seu e-mail para identificar seu perfil e histórico de compra.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={user?.name || ''}
              {...register('name')}
              className={`${
                nameValue && !errors.name
                  ? 'border-green-500'
                  : errors.name
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="meuemail@gmail.com"
              value={user?.email || ''}
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
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              {...register('cpf', {
                onChange: (e) => (e.target.value = formatCPF(e.target.value)),
              })}
              className={`${
                cpfValue && !errors.cpf
                  ? 'border-green-500'
                  : errors.cpf
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Celular / WhatsApp</Label>
            <Input
              id="phone"
              placeholder="(11) 90000-0000"
              {...register('phone', {
                onChange: (e) => (e.target.value = formatPhone(e.target.value)),
              })}
              className={`${
                phoneValue && !errors.phone
                  ? 'border-green-500'
                  : errors.phone
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
