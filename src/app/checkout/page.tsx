import ProtectedLayout from '../protected-layout';

export default function CheckoutPage() {
  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p>Bem-vindo! Você está autenticado e pode finalizar sua compra.</p>
      </div>
    </ProtectedLayout>
  );
}
