'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCard } from '@/lib/cartContext';
import { mockProducts, Product } from '@/lib/mockProducts';
import { useAuth } from '@/lib/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <section className="pt-5 space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl lg:text-2xl text-neutral-800">
          <span className="font-bold">Sofás em promoção:</span> modular, cama,
          poltrona e mais!
        </h2>
        <p className="text-sm text-neutral-700">
          Descubra ofertas imperdíveis em sofás, sofá-cama e poltronas. Escolha
          o modelo que combina com a sua decoração e aproveite descontos
          exclusivos.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
            <Card
              key={product.id}
              className="py-4 px-4 lg:p-6 flex flex-col gap-2"
            >
              <CardHeader className="p-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  layout="responsive"
                  className="relative"
                />
                {discount > 0 && (
                  <div className="absolute bg-green-500 text-white py-1 px-2 text-xs font-medium max-w-max rounded">
                    {discount}% OFF
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-0 flex flex-col gap-2">
                <CardTitle className="text-base font-semibold text-neutral-700 line-clamp-2 lg:line-clamp-1">
                  <h3>{product.title}</h3>
                </CardTitle>
                <div>
                  {product.compare_at_price && (
                    <p className="text-xs text-neutral-500 line-through">
                      {product.compare_at_price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  )}
                  <p className="text-base lg:text-xl text-green-500 font-semibold">
                    {(
                      product.price *
                      (1 - product.discount_percentage / 100)
                    ).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}{' '}
                    <span className="text-xs">à vista</span>
                  </p>
                  <p className="text-sm text-neutral-700">
                    ou em até 10x de{' '}
                    <span className="font-semibold">
                      {(product.price / 10).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>{' '}
                    no cartão
                  </p>
                </div>
                <Button
                  className="mt-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => addToCart(product)}
                >
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
