'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema, type ShippingData } from '@/schemas/shipping';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ShippingFormProps {
  onSave: (data: any) => void;
}

export function ShippingForm({ onSave }: ShippingFormProps) {
  const [calculated, setCalculated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    mode: 'onChange',
  });

  const zipValue = watch('zip');

  const formatZip = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  const onSubmit = (data: ShippingData) => {
    setCalculated(true);
    onSave({
      ...data,
      shippingInfo: 'Frete grátis - entrega em até 20 dias úteis 🚚',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-neutral-800 text-base font-semibold">
            Entrega
          </CardTitle>
          <p className="text-sm text-neutral-500">Cadastre um endereço</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label
              className="text-neutral-800 text-sm font-medium"
              htmlFor="zip"
            >
              CEP
            </Label>
            <Input
              id="zip"
              placeholder="00000-000"
              {...register('zip', {
                onChange: (e) => (e.target.value = formatZip(e.target.value)),
              })}
              className={`${
                zipValue && !errors.zip
                  ? 'border-green-500'
                  : errors.zip
                  ? 'border-red-500'
                  : ''
              }`}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div>

          <div>
            <Label
              className="text-neutral-800 text-sm font-medium"
              htmlFor="address"
            >
              Endereço
            </Label>
            <Input
              id="address"
              placeholder="Rua Exemplo"
              {...register('address')}
              className={`${
                errors.address
                  ? 'border-red-500'
                  : watch('address')
                  ? 'border-green-500'
                  : ''
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="number"
              >
                Número
              </Label>
              <Input
                id="number"
                placeholder="123"
                {...register('number')}
                className={`${
                  errors.number
                    ? 'border-red-500'
                    : watch('number')
                    ? 'border-green-500'
                    : ''
                }`}
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number.message}
                </p>
              )}
            </div>

            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="neighborhood"
              >
                Bairro
              </Label>
              <Input
                id="neighborhood"
                placeholder="Bairro"
                {...register('neighborhood')}
                className={`${
                  errors.neighborhood
                    ? 'border-red-500'
                    : watch('neighborhood')
                    ? 'border-green-500'
                    : ''
                }`}
              />
              {errors.neighborhood && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.neighborhood.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label
              className="text-neutral-800 text-sm font-medium"
              htmlFor="complement"
            >
              Complemento
            </Label>
            <Input
              id="complement"
              placeholder="Apto, bloco, etc."
              {...register('complement')}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="city"
              >
                Cidade
              </Label>
              <Input
                id="city"
                placeholder="Cidade"
                {...register('city')}
                className={`${
                  errors.city
                    ? 'border-red-500'
                    : watch('city')
                    ? 'border-green-500'
                    : ''
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="state"
              >
                Estado (UF)
              </Label>
              <Input
                id="state"
                placeholder="SP"
                maxLength={2}
                {...register('state')}
                className={`uppercase ${
                  errors.state
                    ? 'border-red-500'
                    : watch('state')
                    ? 'border-green-500'
                    : ''
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {!calculated ? (
            <Button
              type="submit"
              className={`${
                isValid
                  ? 'bg-green-500 hover:bg-green-700 text-white'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isValid}
            >
              Calcular frete
            </Button>
          ) : (
            <p className="text-sm text-green-600 font-medium mt-2">
              Frete grátis - entrega em até 20 dias úteis
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
