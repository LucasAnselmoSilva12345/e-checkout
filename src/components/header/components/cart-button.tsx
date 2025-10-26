'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from '@geist-ui/icons';

type CartButtonProps = {
  cart: { quantity: number }[];
  openCart: () => void;
};

export function CartButton({ cart, openCart }: CartButtonProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Button
      className="bg-neutral-200 hover:bg-neutral-400 relative"
      onClick={openCart}
    >
      <ShoppingCart color="#262626" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {cartCount}
        </span>
      )}
    </Button>
  );
}
