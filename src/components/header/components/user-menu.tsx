'use client';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';
import { LogOut } from '@geist-ui/icons';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
  user: { name: string; email: string } | null;
  logoutUser: () => void;
};

export function UserMenu({ user, logoutUser }: UserMenuProps) {
  const router = useRouter();

  if (!user) return <span className="text-gray-500">Bem-vindo(a)!</span>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild className="hidden md:block">
        <Button variant="link" className="px-2 text-sm font-normal">
          Olá,{' '}
          <span className="font-semibold">{user?.name ?? user?.email}</span>
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
            <LogOut /> Sair
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
