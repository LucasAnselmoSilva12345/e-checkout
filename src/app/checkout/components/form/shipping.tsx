'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ShippingFormProps {
  onSave: (data: any) => void;
}

export function ShippingForm({ onSave }: ShippingFormProps) {
  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    number: '',
    neighborhood: '',
    zip: '',
    state: '',
    complement: '',
    destinatary: '',
  });

  const [calculated, setCalculated] = useState(false);

  function handleShipping() {
    setCalculated(true);
    onSave({
      ...shipping,
      shippingInfo: 'Frete grátis - entrega em até 20 dias úteis',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrega</CardTitle>
        <p>Cadastre um endereço</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(shipping).map(([key, value]) => (
          <div key={key}>
            <Label htmlFor={key}>{key}</Label>
            <Input
              id={key}
              placeholder={key}
              value={value}
              onChange={(e) =>
                setShipping((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </div>
        ))}

        {!calculated ? (
          <Button className="mt-2" onClick={handleShipping}>
            Calcular frete
          </Button>
        ) : (
          <p className="text-sm text-green-600 font-medium">
            Frete grátis - entrega em até 20 dias úteis 🚚
          </p>
        )}
      </CardContent>
    </Card>
  );
}
