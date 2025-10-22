'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCard } from '@/lib/cartContext';
import { mockProducts, Product } from '@/lib/mockProducts';
import { useAuth } from '@/lib/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CollectionPage() {
  const { user } = useAuth();
  const { addToCart } = useCard();
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
              <CardHeader>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </CardHeader>
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
    </div>
  );
}
