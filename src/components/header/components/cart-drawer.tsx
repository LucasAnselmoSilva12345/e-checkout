'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, XCircle } from '@geist-ui/icons';
import { CartItem } from './cart-item';
import { toast } from 'sonner';

type CartDrawerProps = {
  cart: any[];
  isOpen: boolean;
  closeCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

export function CartDrawer({
  cart,
  isOpen,
  closeCart,
  updateQuantity,
  removeFromCart,
}: CartDrawerProps) {
  const router = useRouter();
  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity * (1 - item.discount_percentage / 100),
    0
  );

  const handleCheckout = () => {
    const toastId = toast.loading('Redirecionando para o checkout...');

    setTimeout(() => {
      toast.success('Você está sendo redirecionado');
      closeCart();
      router.push('/checkout');
      toast.dismiss(toastId);
    }, 1500);
  };

  return (
    <Drawer
      direction="right"
      open={isOpen}
      onOpenChange={(open) => (open ? undefined : closeCart())}
    >
      <DrawerContent className="h-full w-80 ml-auto border-l bg-white shadow-lg flex flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div>
            <DrawerTitle className="text-neutral-800">Seu carrinho</DrawerTitle>
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

        <div
          className={`flex-1 p-4 overflow-y-auto ${
            cart.length === 0 ? 'flex items-center justify-center' : ''
          }`}
        >
          {cart.length === 0 ? (
            <div className="space-y-4 flex flex-col items-center">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShoppingCart />
                Seu carrinho está vazio
              </p>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => router.push('/collections')}
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        <DrawerFooter>
          {cart.length > 0 && (
            <div className="p-4 border-t text-sm">
              <div className="flex justify-between mb-3">
                <span className="font-medium text-sm">Subtotal:</span>
                <span className="font-semibold text-base text-green-600">
                  {subtotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleCheckout}
              >
                Finalizar compra
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
