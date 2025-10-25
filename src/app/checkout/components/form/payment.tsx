'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, type PaymentData } from '@/schemas/payment';

import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

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
      lastName: '',
      number: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cpf: '',
      installments: 1,
    },
  });

  const cpfValue = watch('cpf');
  const creditCardValue = watch('number')

  const onSubmit = (data: PaymentData) => {
    onFinish(method, data);
  };

  const handlePixConfirm = () => {
    setPixDialogOpen(false);
    onFinish('pix');
    router.push('/pending-payment');
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const formatCreditCard = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-4">
        <div>
          <Label>Método de Pagamento</Label>
          <RadioGroup 
            value={method} 
            onValueChange={(val) => {
              setMethod(val as 'pix' | 'card');
              if(val === 'pix') {
                setPixDialogOpen(true)
              }
            }}>
            <div className="flex gap-4 mt-2">
              <div>
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="cursor-pointer ml-1">Cartão de crédito</Label>
              </div>
              <div>
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="cursor-pointer ml-1">Pix</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {method === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register('name')}
                className={`${watch('name') && !errors.name ? 'border-green-500' : errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className={`${watch('lastName') && !errors.lastName ? 'border-green-500' : errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
              <Label htmlFor="number">Número do cartão</Label>
              <Input
                id="number"
                placeholder="1234 5678 9012 3456"
                {...register('number', {
                  onChange: (e) => (e.target.value = formatCreditCard(e.target.value)),
                })}
                className={`${
                creditCardValue && !errors.number
                    ? 'border-green-500'
                    : errors.number
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="expiryMonth">Mês</Label>
                <Select
                  value={watch('expiryMonth')}
                  onValueChange={(val) => setValue('expiryMonth', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i+1} value={(i+1).toString().padStart(2, '0')}>
                        {(i+1).toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryMonth && <p className="text-red-500 text-sm">{errors.expiryMonth.message}</p>}
              </div>

              <div>
                <Label htmlFor="expiryYear">Ano</Label>
                <Select
                  value={watch('expiryYear')}
                  onValueChange={(val) => setValue('expiryYear', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 6 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
                {errors.expiryYear && <p className="text-red-500 text-sm">{errors.expiryYear.message}</p>}
              </div>

              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  {...register('cvv')}
                  className={`${watch('cvv') && !errors.cvv ? 'border-green-500' : errors.cvv ? 'border-red-500' : ''}`}
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="cpf">CPF do titular</Label>
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
              {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
            </div>

            <div>
              <Label htmlFor="installments">Parcelas</Label>
              <Select
                value={watch('installments').toString()}
                onValueChange={(val) => setValue('installments', Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="1x" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i+1} value={(i+1).toString()}>
                      {i+1}x sem juros
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.installments && <p className="text-red-500 text-sm">{errors.installments.message}</p>}
            </div>

            <div className="mt-4 flex gap-2">
              <Button type="submit" disabled={method === 'card' && !isValid}>
                Finalizar Compra
              </Button>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </div>
          </div>
        )}

        <Dialog open={pixDialogOpen} onOpenChange={setPixDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>PIX - Pagamento</DialogTitle>
              <DialogDescription>
                Faça o pagamento via PIX usando o QR code abaixo. Depois clique em "Confirmei o PIX".
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center my-4">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                QR CODE DEMONSTRATIVO
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setPixDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handlePixConfirm}>Confirmei o PIX</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </form>
  );
}
