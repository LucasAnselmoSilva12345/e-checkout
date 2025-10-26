'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, type PaymentData } from '@/schemas/payment';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { formatCPF, formatCreditCard } from '@/utils/formatters';

interface PaymentFormProps {
  onFinish: (method: 'pix' | 'card', cardData?: PaymentData) => void;
}

export function PaymentForm({ onFinish }: PaymentFormProps) {
  const [method, setMethod] = useState<'pix' | 'card'>('card');
  const [pixDialogOpen, setPixDialogOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      number: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cpf: '',
      installments: 1,
    },
  });

  const cpfValue = watch('cpf');
  const creditCardValue = watch('number');

  const onSubmit = (data: PaymentData) => {
    onFinish(method, data);
  };

  const handlePixConfirm = () => {
    setPixDialogOpen(false);
    onFinish('pix');
    router.push('/pending-payment');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-4">
        <div>
          <Label className="text-neutral-800 text-sm font-medium">
            Método de Pagamento
          </Label>
          <RadioGroup
            value={method}
            onValueChange={(val) => {
              setMethod(val as 'pix' | 'card');
              if (val === 'pix') {
                setPixDialogOpen(true);
              }
            }}
          >
            <div className="flex gap-4 mt-2">
              <div className="flex items-center">
                <RadioGroupItem value="card" id="card" />
                <Label
                  className="text-neutral-800 text-sm font-medium cursor-pointer ml-1"
                  htmlFor="card"
                >
                  Cartão de crédito
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="pix" id="pix" />
                <Label
                  className="text-neutral-800 text-sm font-medium cursor-pointer ml-1"
                  htmlFor="pix"
                >
                  Pix
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {method === 'card' && (
          <div className="grid gap-4">
            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="number"
              >
                Número do cartão
              </Label>
              <Input
                id="number"
                placeholder="1234 5678 9012 3456"
                {...register('number', {
                  onChange: (e) =>
                    (e.target.value = formatCreditCard(e.target.value)),
                })}
                className={`${
                  creditCardValue && !errors.number
                    ? 'border-green-500'
                    : errors.number
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label
                  className="text-neutral-800 text-sm font-medium"
                  htmlFor="expiryMonth"
                >
                  Mês
                </Label>
                <Select
                  value={watch('expiryMonth')}
                  onValueChange={(val) => setValue('expiryMonth', val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString().padStart(2, '0')}
                      >
                        {(i + 1).toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryMonth && (
                  <p className="text-red-500 text-sm">
                    {errors.expiryMonth.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  className="text-neutral-800 text-sm font-medium"
                  htmlFor="expiryYear"
                >
                  Ano
                </Label>
                <Select
                  value={watch('expiryYear')}
                  onValueChange={(val) => setValue('expiryYear', val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 6 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.expiryYear && (
                  <p className="text-red-500 text-sm">
                    {errors.expiryYear.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  className="text-neutral-800 text-sm font-medium"
                  htmlFor="cvv"
                >
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  {...register('cvv')}
                  className={`${
                    watch('cvv') && !errors.cvv
                      ? 'border-green-500'
                      : errors.cvv
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="name"
              >
                Nome do titular
              </Label>
              <Input
                id="name"
                {...register('name')}
                className={`${
                  watch('name') && !errors.name
                    ? 'border-green-500'
                    : errors.name
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="cpf"
              >
                CPF do titular
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
                <p className="text-red-500 text-sm">{errors.cpf.message}</p>
              )}
            </div>

            <div>
              <Label
                className="text-neutral-800 text-sm font-medium"
                htmlFor="installments"
              >
                Parcelas
              </Label>
              <Select
                value={watch('installments').toString()}
                onValueChange={(val) => setValue('installments', Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="1x" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}x sem juros
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.installments && (
                <p className="text-red-500 text-sm">
                  {errors.installments.message}
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-700 font-semibold w-full"
                disabled={method === 'card' && !isValid}
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        )}

        <Dialog open={pixDialogOpen} onOpenChange={setPixDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-neutral-800 text-lg">
                Pagamento via PIX usando o QRCode
              </DialogTitle>
              <DialogDescription>
                Clique no botão abaixo para realizar o pagamento via PIX e
                visualizar o QR Code.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col lg:flex-col justify-center lg:justify-center">
              <Button
                onClick={handlePixConfirm}
                className="bg-green-500 hover:bg-green-700 font-semibold"
              >
                Pagar com PIX
              </Button>
              <Button variant="outline" onClick={() => setPixDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </form>
  );
}
