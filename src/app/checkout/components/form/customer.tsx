import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { User } from '@/lib/auth';

interface CustomerFormProps {
  user: User | null;
}

export function CustomerForm({ user }: CustomerFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
        <p>
          Utilizaremos seu e-mail para: Identificar seu perfil, histórico de
          compra, notificação de pedidos e carrinho de compras.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" placeholder="Seu nome" value={user?.name || ''} />
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
  );
}
