'use client';

import { useCard } from '@/lib/cartContext';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export default function CheckoutPage() {
  const { cart } = useCard();
  const { user } = useAuth();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    number: '',
    neighborhood: '',
    zip: '',
    state: '',
    complement: '',
    destinatary: '',
  });

  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    lastName: '',
    cpf: '',
    expiry: '',
    cvv: '',
    installments: 1,
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0.05 * subtotal;
  const total = subtotal - discount;

  function handleShipping() {
    setShippingCalculated(true);
  }

  function handleFinishPurchase() {
    alert('Compra finalizada com sucesso');
    router.push('/');
  }

  return (
    <div className="min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          {/* Dados do cliente - Etapa 01 */}
          <Card>
            <CardHeader>
              <CardTitle>Identificação</CardTitle>
              <p>
                Utilizaremos seu e-mail para: Identificar seu perfil, histórico
                de compra, notificação de pedidos e carrinho de compras.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={user?.name || ''}
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" value={user?.email || ''} />
                </div>

                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>

                <div>
                  <Label htmlFor="phone">Celular / WhatsApp</Label>
                  <Input id="phone" placeholder="(11) 90000-0000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entrega - Etapa 02 */}
          <Card>
            <CardHeader>
              <CardTitle>Entrega</CardTitle>
              <p>Cadastre um endereço</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="zip">CEP</Label>
                  <Input
                    id="zip"
                    placeholder="00000-000"
                    value={shippingInfo.zip}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        zip: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    placeholder="Rua, número..."
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    placeholder="Rua, número..."
                    value={shippingInfo.number}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        number: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Rua, número..."
                    value={shippingInfo.neighborhood}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        neighborhood: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="Cidade"
                    value={shippingInfo.city}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    placeholder="UF"
                    value={shippingInfo.state}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        state: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="complement">Complemento (opicional)</Label>
                  <Input
                    id="complement"
                    placeholder="UF"
                    value={shippingInfo.complement}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        complement: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="destinatary">destinataryo</Label>
                  <Input
                    id="destinatary"
                    placeholder="UF"
                    value={user?.name}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        destinatary: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {!shippingCalculated ? (
                <Button className="mt-2" onClick={handleShipping}>
                  Calcular frete
                </Button>
              ) : (
                <p className="text-sm text-green-600 font-medium">
                  Frete grátis - entrega em até 20 dias úteis 🚚
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Pagamento - Etapa 03 */}
        <Card>
          <CardHeader>
            <CardTitle>Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue="pix"
              onValueChange={(val) => setPaymentMethod(val as 'pix' | 'card')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Cartão de crédito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix">Pix</Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="number">Número do cartão</Label>
                  <Input
                    id="number"
                    placeholder="0000 0000 0000 0000"
                    value={cardInfo.number}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, number: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="expiry">Validade</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    value={cardInfo.expiry}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, expiry: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardInfo.cvv}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cvv: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF do titular</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={cardInfo.cpf}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cpf: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nome no cartão</Label>
                  <Input
                    id="name"
                    placeholder="Nome"
                    value={cardInfo.name}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Sobrenome"
                    value={cardInfo.lastName}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, lastName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="installments">Parcelas</Label>
                  <select
                    id="installments"
                    className="border rounded p-2 w-full"
                    value={cardInfo.installments}
                    onChange={(e) =>
                      setCardInfo({
                        ...cardInfo,
                        installments: Number(e.target.value),
                      })
                    }
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}x sem juros
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <Button
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleFinishPurchase}
            >
              Finalizar compra
            </Button>
          </CardContent>
        </Card>

        {/* Resumo do pedido */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum produto no carrinho.
                </p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm border-b pb-2"
                    >
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
