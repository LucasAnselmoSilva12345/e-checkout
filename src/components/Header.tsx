'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';

export function Header() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  return (
    <header>
      <h1 onClick={() => router.push('/')}>E-checkout</h1>

      {user && (
        <div className="flex items-center gap-4">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">Carrinho</Button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-80 ml-auto border-l bg-white shadow-lg">
              <DrawerHeader>
                <DrawerTitle>Seu carrinho</DrawerTitle>
                <DrawerDescription>
                  Itens adicionados ao carrinho aparecerão aqui.
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-sm text-muted-foreground">
                  Nenhum item no carrinho no momento.
                </p>
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="secondary">Fechar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <div>
        {user ? (
          <>
            <span className="text-gray-700">
              Olá, <strong>{user?.name ?? user?.email}</strong>
            </span>
            <button
              onClick={() => {
                logoutUser();
                router.push('/login');
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Sair
            </button>
          </>
        ) : (
          <span className="text-gray-500">Bem-vindo(a)!</span>
        )}
      </div>
    </header>
  );
}
