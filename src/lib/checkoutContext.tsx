'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CartItem } from './cartContext';

type CustomerData = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

type ShippingData = {
  address: string;
  city: string;
  number: string;
  neighborhood: string;
  zip: string;
  state: string;
  complement?: string;
  destinatary: string;
  shippingInfo?: string;
};

type CardData = {
  number: string;
  name: string;
  lastName: string;
  cpf: string;
  expiry: string;
  cvv: string;
  installments: number;
};

type PaymentMethod = 'pix' | 'card';

type CheckoutData = {
  customer: CustomerData | null;
  shipping: ShippingData | null;
  paymentMethod: PaymentMethod | null;
  cardData?: CardData | null;
  cart: CartItem[];
  totals: {
    subtotal: number;
    discount: number;
    total: number;
  };
};

type CheckoutContextType = {
  checkoutData: CheckoutData;
  setCustomer: (data: CustomerData) => void;
  setShipping: (data: ShippingData) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCardData: (data: CardData) => void;
  setCart: (
    items: CartItem[],
    totals: { subtotal: number; discount: number; total: number }
  ) => void;
  finalizeCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customer: null,
    shipping: null,
    paymentMethod: null,
    cardData: null,
    cart: [],
    totals: { subtotal: 0, discount: 0, total: 0 },
  });

  function setCustomer(data: CustomerData) {
    setCheckoutData((prev) => ({ ...prev, customer: data }));
  }

  function setShipping(data: ShippingData) {
    setCheckoutData((prev) => ({
      ...prev,
      shipping: {
        ...data,
        shippingInfo: 'Frete grátis - entrega em até 20 dias úteis 🚚',
      },
    }));
  }

  function setPaymentMethod(method: PaymentMethod) {
    setCheckoutData((prev) => ({ ...prev, paymentMethod: method }));
  }

  function setCardData(data: CardData) {
    setCheckoutData((prev) => ({ ...prev, cardData: data }));
  }

  function setCart(
    items: CartItem[],
    totals: { subtotal: number; discount: number; total: number }
  ) {
    setCheckoutData((prev) => ({ ...prev, cart: items, totals }));
  }

  function finalizeCheckout() {
    router.push('/thank-you');
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData,
        setCustomer,
        setShipping,
        setPaymentMethod,
        setCardData,
        setCart,
        finalizeCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error('useCheckout deve ser usado dentro de CheckoutProvider');
  return context;
}
