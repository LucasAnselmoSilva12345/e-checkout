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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from './ui/button';
import { ShoppingCart } from '@geist-ui/icons';
import { LogOut } from '@geist-ui/icons';

export function Header() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  return (
    <header className="bg-neutral-100 px-4 lg:px-0 py-5">
      <div className="flex items-center justify-between lg:max-w-[1330px] lg:my-0 lg:mx-auto">
        <h1
          className="text-neutral-800 text-2xl font-bold"
          onClick={() => router.push('/')}
        >
          E-checkout
        </h1>

        <div className="flex items-center gap-2">
          <div>
            {user ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="px-2 text-sm font-normal">
                    Olá,
                    <span className="font-semibold">
                      {user?.name ?? user?.email}
                    </span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="font-semibold">
                      Usuário: <span className="font-light">{user?.name}</span>
                    </p>
                    <p className="font-semibold">
                      E-mail: <span className="font-light">{user?.email}</span>
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        logoutUser();
                        router.push('/login');
                      }}
                    >
                      <LogOut />
                      Sair
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <span className="text-gray-500">Bem-vindo(a)!</span>
            )}
          </div>

          <div>
            {user && (
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button className="bg-neutral-200 hover:bg-neutral-400">
                    <span className="sr-only">Carrinho</span>
                    <ShoppingCart color="#262626" />
                  </Button>
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
