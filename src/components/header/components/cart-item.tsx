'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from '@geist-ui/icons';
import Image from 'next/image';

type CartItemProps = {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    discount_percentage: number;
  };
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

export function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}: CartItemProps) {
  const totalPrice = (
    item.price *
    item.quantity *
    (1 - item.discount_percentage / 100)
  ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="border-b pb-2">
      <div className="flex items-center gap-2">
        <Image src={item.image} alt={item.title} width={50} height={50} />
        <p className="text-sm font-medium">{item.title}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm lg:text-base font-medium text-green-600">
          {totalPrice} no pix
        </p>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={12} />
          </Button>
          <span className="w-5 text-center">{item.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={12} />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}
