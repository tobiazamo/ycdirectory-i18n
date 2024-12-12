import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href={'/public'}>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  'use server';

                  await signOut();
                }}
              >
                <button type="submit">Sign out</button>
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
              <button type="submit">Login</button>
            </form>
          )}
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
