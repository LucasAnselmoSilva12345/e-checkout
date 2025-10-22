'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCard } from '@/lib/cartContext';
import { mockProducts, Product } from '@/lib/mockProducts';
import { useAuth } from '@/lib/useAuth';
import { Minus, Plus, ShoppingCart, Trash2 } from '@geist-ui/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CollectionPage() {
  const { user, logoutUser } = useAuth();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCard();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Coleções</h1>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Carrinho ({cart.length})
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => {
          const discount =
            product.compare_at_price && product.compare_at_price > product.price
              ? Math.round(
                  ((product.compare_at_price - product.price) /
                    product.compare_at_price) *
                    100
                )
              : 0;

          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader></CardHeader>
              <CardContent className="flex flex-col gap-2">
                <CardTitle>{product.title}</CardTitle>
                <div>
                  {product.compare_at_price && (
                    <p className="text-sm text-gray-500 line-through">
                      R$ {product.compare_at_price.toFixed(2)}
                    </p>
                  )}
                  <p className="text-lg font-semibold text-blue-600">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600">
                    no cartão R$ {product.price.toFixed(2)}
                  </p>
                  {discount > 0 && (
                    <p className="text-xs text-red-500">{discount}% OFF</p>
                  )}
                </div>
                <Button className="mt-2" onClick={() => addToCart(product)}>
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="p-6">
          <DrawerHeader>
            <DrawerTitle>Carrinho</DrawerTitle>
          </DrawerHeader>
          {cart.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
