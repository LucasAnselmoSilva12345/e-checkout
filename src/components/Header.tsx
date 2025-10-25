'use client';

import { useAuth } from '@/lib/useAuth';
import { useCard } from '@/lib/cartContext';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from './ui/button';
import {
  ShoppingCart,
  LogOut,
  Minus,
  Plus,
  Trash2,
  XCircle,
} from '@geist-ui/icons';
import { Separator } from './ui/separator';
import Image from 'next/image';

export function Header() {
  const { user, logoutUser } = useAuth();

  const { cart, removeFromCart, updateQuantity, isOpen, openCart, closeCart } =
    useCard();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity * (1 - item.discount_percentage / 100),
    0
  );

  const router = useRouter();

  return (
    <header className="bg-neutral-100 px-4 lg:px-0 py-5">
      <div className="flex items-center justify-between lg:max-w-[1330px] lg:my-0 lg:mx-auto">
        <h1
          className="text-neutral-800 text-2xl font-bold"
          onClick={() => router.push('/')}
        >
          E-checkout
        </h1>

        <div className="flex items-center gap-2">
          <div>
            {user ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="px-2 text-sm font-normal">
                    Olá,
                    <span className="font-semibold">
                      {user?.name ?? user?.email}
                    </span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold">
                      Usuário: <span className="font-light">{user?.name}</span>
                    </p>
                    <p className="font-semibold">
                      E-mail: <span className="font-light">{user?.email}</span>
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        logoutUser();
                        router.push('/login');
                      }}
                    >
                      <LogOut />
                      Sair
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <span className="text-gray-500">Bem-vindo(a)!</span>
            )}
          </div>

          {user && (
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
          )}
        </div>
      </div>

      <Drawer
        direction="right"
        open={isOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
      >
        <DrawerContent className="h-full w-80 ml-auto border-l bg-white shadow-lg flex flex-col">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <div>
              <DrawerTitle>Seu carrinho</DrawerTitle>
              <DrawerDescription>
                Itens adicionados ao carrinho:
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button
                className="bg-neutral-200 hover:bg-neutral-400"
                onClick={closeCart}
              >
                <span className="sr-only">Fechar carrinho</span>
                <XCircle color="#262626" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <Separator />

          <div className="flex-1 p-4 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="space-y-4 flex flex-col items-center justify-center">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShoppingCart />
                  Seu carrinho está vazio
                </p>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    router.push('/collections');
                  }}
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.id} className="border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                      />

                      <p className="text-sm font-medium">{item.title}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-green-600">
                        R$
                        {(
                          item.price *
                          item.quantity *
                          (1 - item.discount_percentage / 100)
                        ).toFixed(2)}{' '}
                        no pix
                      </p>

                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="w-5 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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
                ))}
              </div>
            )}
          </div>

          <DrawerFooter>
            {cart.length > 0 && (
              <div className="p-4 border-t text-sm">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold text-green-600">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                >
                  Ir para o checkout
                </Button>
              </div>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
