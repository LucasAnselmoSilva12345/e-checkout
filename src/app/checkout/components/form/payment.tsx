'use client';

import { useState } from 'react';
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  Field,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';

interface PaymentFormProps {
  onFinish: (method: 'pix' | 'card', cardData?: any) => void;
}

export function PaymentForm({ onFinish }: PaymentFormProps) {
  const [method, setMethod] = useState<'pix' | 'card'>('card');
  const [card, setCard] = useState({
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    installments: 1,
  });

  return (
    <Card>
      <FieldGroup>
      <FieldSet>
        <FieldLegend>Método de Pagamento</FieldLegend>
        <FieldDescription>Transações seguras e criptografadas</FieldDescription>

        <RadioGroup defaultValue="card" onValueChange={(val) => setMethod(val as 'pix' | 'card')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <FieldLabel htmlFor="card" className="cursor-pointer">
              Cartão de crédito
            </FieldLabel>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pix" id="pix" />
            <FieldLabel htmlFor="pix" className="cursor-pointer">
              Pix
            </FieldLabel>
          </div>
        </RadioGroup>

        {method === 'card' && (
          <FieldGroup className="mt-4 space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Nome no Cartão</FieldLabel>
              <Input
                id="name"
                placeholder="Evil Rabbit"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="number">Número do Cartão</FieldLabel>
              <Input
                id="number"
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                required
              />
              <FieldDescription>Digite o número do seu cartão</FieldDescription>
            </Field>

            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="expiryMonth">Mês</FieldLabel>
                <Select
                  value={card.expiryMonth}
                  onValueChange={(val) => setCard({ ...card, expiryMonth: val })}
                >
                  <SelectTrigger id="expiryMonth">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                        {(i + 1).toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="expiryYear">Ano</FieldLabel>
                <Select
                  value={card.expiryYear}
                  onValueChange={(val) => setCard({ ...card, expiryYear: val })}
                >
                  <SelectTrigger id="expiryYear">
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
              </Field>

              <Field>
                <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="installments">Parcelas</FieldLabel>
              <Select
                value={card.installments.toString()}
                onValueChange={(val) => setCard({ ...card, installments: Number(val) })}
              >
                <SelectTrigger id="installments">
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
            </Field>
          </FieldGroup>
        )}
      </FieldSet>

      <FieldSeparator />

      <Field orientation="horizontal">
        <Button type="button" onClick={() => onFinish(method, card)}>
          Finalizar Compra
        </Button>
        <Button variant="outline" type="button">
          Cancelar
        </Button>
      </Field>
    </FieldGroup>
    </Card>
  );
}
