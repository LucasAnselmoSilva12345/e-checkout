'use client';

import { useCheckout } from '@/lib/checkoutContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw } from '@geist-ui/icons';
import { Button } from '@/components/ui/button';

export default function PaymentFailed() {
  const { checkoutData } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!checkoutData.customer || checkoutData.cart.length === 0) {
      router.push('/');
    }
  }, [checkoutData, router]);

  if (!checkoutData.customer || checkoutData.cart.length === 0) {
    return null;
  }

  return (
    <section className="py-10 text-center">
      <div className="space-y-4 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-neutral-950 font-bold">
          Ops! Seu Pix expirou :(
        </h1>
        <p className="text-xl text-neutral-600">
          Sua compra não foi efetuada. Para garantir seus produtos, efetue uma
          nova compra, clicando no botão abaixo:
        </p>
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => {
            router.push('/collections');
          }}
        >
          <RotateCcw />
          Refazer compra
        </Button>
      </div>
    </section>
  );
}
