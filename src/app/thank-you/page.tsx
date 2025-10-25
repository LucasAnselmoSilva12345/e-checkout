'use client';

import { useCheckout } from '@/lib/checkoutContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OrderSummary } from '../checkout/components/order-summary';
import { ContactInfo } from './components/contact-info';
import { PaymentInfo } from './components/payment-info';
import { AddressInfo } from './components/address-info';

export default function ThankYouPage() {
  const { checkoutData } = useCheckout();
  const router = useRouter();

  const whatsappLink =
    'https://wa.me/5511986854687?text=Olá!%20Preciso%20de%20ajuda%20com%20meu%20pedido.';

  useEffect(() => {
    if (!checkoutData.customer || checkoutData.cart.length === 0) {
      router.push('/');
    }
  }, [checkoutData, router]);

  if (!checkoutData.customer || checkoutData.cart.length === 0) {
    return null;
  }

  const { customer, shipping, paymentMethod, cardData, cart } = checkoutData;

  return (
    <section className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Pedido criado!</h1>
          <p className="text-neutral-800 font-normal text-base">
            Obrigado por comprar conosco,{' '}
            <span className="font-semibold">{customer.name}</span>! Em breve
            você receberá um email com mais informações do seu pedido.
          </p>
          <p className="text-neutral-800 font-normal italic text-base">
            Em caso de algum problema, entre em contato conosco através do nosso
            canal de atendimento no{' '}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/collections')}>
          Voltar à loja
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 shadow-sm space-y-4">
          <ContactInfo customer={customer} />
          <AddressInfo shipping={shipping} />
          <PaymentInfo paymentMethod={paymentMethod} cardData={cardData} />
        </div>

        <OrderSummary />
      </div>
    </section>
  );
}
