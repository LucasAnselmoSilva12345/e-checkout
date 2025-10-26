'use client';

import { useCheckout } from '@/lib/checkoutContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PIXQRCode from './components/pix-qrcode';
import { Smartphone } from '@geist-ui/icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PaymentStatus from './components/payment-status';

export default function PendingPayment() {
  const { checkoutData } = useCheckout();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (!checkoutData.customer || checkoutData.cart.length === 0) {
      router.push('/');
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push('/payment-failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [checkoutData, router]);

  if (!checkoutData.customer || checkoutData.cart.length === 0) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <section className="grid lg:grid-cols-2 items-center py-10 space-y-6">
      <div className="space-y-4">
        <h1 className="text-5xl text-neutral-950 font-bold">Quase lá...</h1>
        <p className="text-xl text-neutral-600">
          Pague seu Pix dentro de{' '}
          <span className="font-semibold text-purple-600">
            {formatTime(timeLeft)}
          </span>{' '}
          para garantir sua compra.
        </p>
        <PaymentStatus />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-neutral-800 text-base font-bold">
              Abra o aplicativo de pagamento do seu banco e escolha a opção{' '}
              <span className="font-semibold text-purple-600">Ler QR Code</span>
            </CardTitle>
            <CardDescription className="mt-6 text-center flex items-center justify-center gap-2">
              <Smartphone />
              Aponte a câmera do seu celular
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PIXQRCode value={Number(checkoutData.totals.total)} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
