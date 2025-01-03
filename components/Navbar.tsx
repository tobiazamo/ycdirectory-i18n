import React from 'react';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

const Navbar = async () => {
  const session = await auth();
  const t = await getTranslations('Navbar');

  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span>{t('create')}</span>
              </Link>

              <form
                action={async () => {
                  'use server';

                  await signOut();
                }}
              >
                <button type="submit">{t('signOut')}</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
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
