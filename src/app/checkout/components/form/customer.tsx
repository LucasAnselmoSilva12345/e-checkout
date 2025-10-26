'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type CustomerData } from '@/schemas/customer';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCPF, formatPhone } from '@/utils/formatters';

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
    formState: { errors },
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-neutral-800 text-base font-semibold">
            Identificação
          </CardTitle>
          <p className="text-sm text-neutral-500">
            Utilizaremos seu e-mail para identificar seu perfil e histórico de
            compra.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="text-neutral-800 text-sm font-medium"
            >
              Nome completo
            </Label>
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
            <Label
              htmlFor="email"
              className="text-neutral-800 text-sm font-medium"
            >
              E-mail
            </Label>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="cpf"
              className="text-neutral-800 text-sm font-medium"
            >
              CPF
            </Label>
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
            <Label
              htmlFor="phone"
              className="text-neutral-800 text-sm font-medium"
            >
              Celular / WhatsApp
            </Label>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
