'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCard } from '@/lib/cartContext';
import Image from 'next/image';

export function OrderSummary() {
  const { cart } = useCard();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity * (item.discount_percentage / 100),
    0
  );

  const total = subtotal - discount;

  return (
    <Card className="h-max">
      <CardHeader>
        <CardTitle className="text-neutral-800 text-base font-semibold">
          Resumo do pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-6">
            <Image src={item.image} alt={item.title} width={75} height={75} />
            <div className="flex flex-col gap-2 text-xs font-medium text-neutral-600">
              <span className="text-sm">
                {item.title} × {item.quantity}
              </span>
              <span className="font-bold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Desconto</span>
          <span className="text-green-600">- R$ {discount.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-green-600">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
