'use client';

import { useCard } from '@/lib/cartContext';
import { useAuth } from '@/lib/useAuth';
import { useCheckout } from '@/lib/checkoutContext';
import { useRouter } from 'next/navigation';
import { CustomerForm } from './components/form/customer';
import { ShippingForm } from './components/form/shipping';
import { PaymentForm } from './components/form/payment';
import { OrderSummary } from './components/order-summary';
import { toast } from 'sonner';

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

  async function handleFinish(method: 'pix' | 'card', cardData?: any) {
    const toastMessage =
      method === 'pix'
        ? 'Gerando QR Code PIX...'
        : 'Processando pagamento com cartão...';
    const toastId = toast.loading(toastMessage);

    try {
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

      const discount = cart.reduce(
        (acc, item) =>
          acc + item.price * item.quantity * (item.discount_percentage / 100),
        0
      );

      const total = subtotal - discount;

      setCart(cart, { subtotal, discount, total });
      setPaymentMethod(method);
      if (method === 'card' && cardData) setCardData(cardData);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      finalizeCheckout();

      toast.success(
        method === 'pix'
          ? 'QR Code gerado com sucesso!'
          : 'Pagamento processado com sucesso!'
      );

      if (method === 'card') {
        router.push('/thank-you');
      } else if (method === 'pix') {
        router.push('/pending-payment');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao processar o pagamento.');
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <section className="min-h-screen py-10">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <CustomerForm user={user} />
          <ShippingForm onSave={(data) => setShipping(data)} />
        </div>
        <PaymentForm onFinish={handleFinish} />
        <OrderSummary />
      </div>
    </section>
  );
}
