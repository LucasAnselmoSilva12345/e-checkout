'use client';

import { useCard } from '@/lib/cartContext';
import { useAuth } from '@/lib/useAuth';
import { useCheckout } from '@/lib/checkoutContext';
import { useRouter } from 'next/navigation';
import { CustomerForm } from './components/form/customer';
import { ShippingForm } from './components/form/shipping';
import { PaymentForm } from './components/form/payment';
import { OrderSummary } from './components/order-summary';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCard();
  const router = useRouter();
  const {
    setCustomer,
    setShipping,
    setPaymentMethod,
    setCardData,
    setCart,
    finalizeCheckout,
  } = useCheckout();

  function handleFinish(method: 'pix' | 'card', cardData?: any) {
    setCustomer({
      name: user?.name || '',
      email: user?.email || '',
      cpf: (document.getElementById('cpf') as HTMLInputElement)?.value || '',
      phone:
        (document.getElementById('phone') as HTMLInputElement)?.value || '',
    });

    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discount = 0.05 * subtotal;
    const total = subtotal - discount;

    setCart(cart, { subtotal, discount, total });
    setPaymentMethod(method);
    if (method === 'card' && cardData) setCardData(cardData);

    finalizeCheckout();
    router.push('/thank-you');
  }

  return (
    <div className="min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CustomerForm user={user} />
          <ShippingForm onSave={(data) => setShipping(data)} />
          <PaymentForm onFinish={handleFinish} />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
