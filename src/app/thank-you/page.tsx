'use client';

import { useCheckout } from '@/lib/checkoutContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OrderSummary } from '../checkout/components/order-summary';

export default function ThankYouPage() {
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

  const { customer, shipping, paymentMethod, cardData, cart } = checkoutData;

  return (
    <section className="py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-6">Pedido #456456 criado!</h1>
          <p className=" text-gray-600 mb-10">
            Obrigado por comprar conosco, <strong>{customer.name}</strong>!
            Segue abaixo as informações do seu pedido
          </p>
        </div>
        <Button
          className="bg-neutral-800 hover:bg-neutral-700 text-white"
          onClick={() => router.push('/')}
        >
          Voltar à loja
        </Button>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="mb-8 border rounded-xl p-5 shadow-sm bg-white">
          <div>
            <h3>Informações de contato</h3>
            <p>
              <strong>Nome:</strong> {customer.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Celular:</strong> {customer.phone}
            </p>
          </div>
          <div>
            <p>
              <strong>Método:</strong>{' '}
              {paymentMethod === 'card' ? 'Cartão de Crédito' : 'PIX'}
            </p>

            {paymentMethod === 'card' && cardData && (
              <>
                <p>
                  <strong>Número do Cartão:</strong> **** **** ****{' '}
                  {cardData.number.slice(-4)}
                </p>
                <p>
                  <strong>Nome no Cartão:</strong> {cardData.name}
                </p>
                <p>
                  <strong>CPF:</strong> {cardData.cpf}
                </p>
                <p>
                  <strong>Validade:</strong> {cardData.expiry}
                </p>
                <p>
                  <strong>Parcelas:</strong> {cardData.installments}x
                </p>
              </>
            )}

            {paymentMethod === 'pix' && (
              <p className="text-green-700 font-medium">
                Pagamento via PIX — confirmado ✅
              </p>
            )}
          </div>
          <div>
            <p>
              <strong>Endereço:</strong> {shipping?.address}, {shipping?.city} -{' '}
              {shipping?.state}
            </p>
            <p>
              <strong>CEP:</strong> {shipping?.zip}
            </p>
            <p>
              <strong>Frete:</strong> {shipping?.shippingInfo}
            </p>
          </div>
        </div>

        <OrderSummary />
      </div>
    </section>
  );
}
