'use client';

import { useAuth } from '@/lib/useAuth';
import { useCard } from '@/lib/cartContext';
import { useRouter } from 'next/navigation';
import { Logo } from './components/logo';
import { UserMenu } from './components/user-menu';
import { CartButton } from './components/cart-button';
import { CartDrawer } from './components/cart-drawer';

export function Header() {
  const { user, logoutUser } = useAuth();
  const { cart, removeFromCart, updateQuantity, isOpen, openCart, closeCart } =
    useCard();
  const router = useRouter();

  return (
    <header className="bg-neutral-100 px-4 lg:px-0 py-5">
      <div className="flex items-center justify-between lg:max-w-[1330px] lg:my-0 lg:mx-auto">
        <Logo />

        <div className="flex items-center gap-2">
          <UserMenu user={user} logoutUser={logoutUser} />
          {user && <CartButton cart={cart} openCart={openCart} />}
        </div>
      </div>

      <CartDrawer
        cart={cart}
        isOpen={isOpen}
        closeCart={closeCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </header>
  );
}
