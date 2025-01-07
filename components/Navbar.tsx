import React from 'react';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = async () => {
  const session = await auth();
  const t = await getTranslations('Navbar');

  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/logo.png" alt="logo" width={121} height={21} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span className="max-sm:hidden">{t('create')}</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  'use server';

                  await signOut();
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">{t('signOut')}</span>
                  <LogOut className="size-6 text-red-500 sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';

                await signIn('github');
              }}
            >
              <button type="submit">{t('login')}</button>
            </form>
          )}
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
