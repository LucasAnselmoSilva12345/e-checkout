import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/useAuth';

import { CartProvider } from '@/lib/cartContext';
import { CheckoutProvider } from '@/lib/checkoutContext';
import { Header } from '@/components/header/header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'E-Checkout | Sofás, Sofás-Cama e Poltronas com o Melhor Preço',
    template: '%s | E-Checkout',
  },
  description:
    'Compre sofás, sofás-cama e poltronas com conforto, qualidade e o melhor preço. A E-Checkout é sua loja online de estofados, com entrega rápida e promoções exclusivas.',
  keywords: [
    'sofá',
    'sofá-cama',
    'poltrona',
    'ecommerce de sofás',
    'loja de móveis',
    'sofás confortáveis',
    'promoção de sofá',
    'E-Checkout',
  ],
  authors: [{ name: 'E-Checkout' }],
  openGraph: {
    title: 'E-Checkout | Sofás, Sofás-Cama e Poltronas com o Melhor Preço',
    description:
      'Descubra conforto e estilo com os sofás, sofás-cama e poltronas da E-Checkout. Encontre ofertas exclusivas e entrega rápida em todo o Brasil.',
    url: 'https://www.echeckout.com.br',
    siteName: 'E-Checkout',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://www.echeckout.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-Checkout - Sofás, Sofás-Cama e Poltronas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Checkout | Sofás, Sofás-Cama e Poltronas com o Melhor Preço',
    description:
      'Conforto e qualidade em sofás, sofás-cama e poltronas. Aproveite as ofertas exclusivas da E-Checkout.',
    images: ['https://www.echeckout.com.br/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.echeckout.com.br',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <CheckoutProvider>
              <Header />
              <main className="lg:max-w-[1330px] lg:my-0 lg:mx-auto px-4 lg:px-0">
                {children}
              </main>
            </CheckoutProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
