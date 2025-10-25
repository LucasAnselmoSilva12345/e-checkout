"use client";

import { useCheckout } from "@/lib/checkoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PendingPayment() {
  const { checkoutData } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!checkoutData.customer || checkoutData.cart.length === 0) {
      router.push("/");
      return;
    }

    const timeoutId = setTimeout(() => {
      router.push("/payment-failed");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [checkoutData, router]);

  if (!checkoutData.customer || checkoutData.cart.length === 0) {
    return null;
  }

  const { customer, shipping, paymentMethod, cardData, cart } = checkoutData;

  return (
    <section>
      <h1>Pagamento pendente</h1>

      <section className="mb-8 border rounded-xl p-5 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">
          👤 Dados do Cliente
        </h2>
        <div className="space-y-1 text-sm">
          <p>
            <strong>Nome:</strong> {customer.name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>CPF:</strong> {customer.cpf}
          </p>
          <p>
            <strong>Celular:</strong> {customer.phone}
          </p>
        </div>
      </section>

      <section className="mb-8 border rounded-xl p-5 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">📦 Entrega</h2>
        <div className="space-y-1 text-sm">
          <p>
            <strong>Endereço:</strong> {shipping?.address}, {shipping?.city} -{" "}
            {shipping?.state}
          </p>
          <p>
            <strong>CEP:</strong> {shipping?.zip}
          </p>
          <p>
            <strong>Frete:</strong> {shipping?.shippingInfo}
          </p>
        </div>
      </section>

      <section className="mb-8 border rounded-xl p-5 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">
          💳 Pagamento
        </h2>
        <div className="space-y-1 text-sm">
          <p>
            <strong>Método:</strong>{" "}
            {paymentMethod === "card" ? "Cartão de Crédito" : "PIX"}
          </p>

          {paymentMethod === "card" && cardData && (
            <>
              <p>
                <strong>Número do Cartão:</strong> **** **** ****{" "}
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
        </div>
      </section>

      <section className="mb-8 border rounded-xl p-5 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">
          🛒 Itens do Pedido
        </h2>
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2 text-sm"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500">
                  Quantidade: {item.quantity} — R${" "}
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm border-t pt-3">
          <p>
            <strong>Subtotal:</strong> R${" "}
            {checkoutData.totals.subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Desconto:</strong> R${" "}
            {checkoutData.totals.discount.toFixed(2)}
          </p>
          <p className="text-lg font-semibold mt-1">
            Total: R$ {checkoutData.totals.total.toFixed(2)}
          </p>
        </div>
      </section>
    </section>
  );
}
