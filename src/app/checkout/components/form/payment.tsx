'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentFormProps {
  onFinish: (method: 'pix' | 'card', cardData?: any) => void;
}

export function PaymentForm({ onFinish }: PaymentFormProps) {
  const [method, setMethod] = useState<'pix' | 'card'>('pix');
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    cpf: '',
    name: '',
    lastName: '',
    installments: 1,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          defaultValue="pix"
          onValueChange={(val) => setMethod(val as 'pix' | 'card')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Cartão de crédito</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix">Pix</Label>
          </div>
        </RadioGroup>

        {method === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Object.entries(card).map(([key, value]) =>
              key === 'installments' ? (
                <div key={key}>
                  <Label htmlFor={key}>Parcelas</Label>
                  <select
                    id={key}
                    className="border rounded p-2 w-full"
                    value={value}
                    onChange={(e) =>
                      setCard({ ...card, installments: Number(e.target.value) })
                    }
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}x sem juros
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    id={key}
                    value={value as string}
                    onChange={(e) =>
                      setCard((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                  />
                </div>
              )
            )}
          </div>
        )}

        <Button
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={() => onFinish(method, card)}
        >
          Finalizar compra
        </Button>
      </CardContent>
    </Card>
  );
}
