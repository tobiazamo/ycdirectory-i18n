import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/Navbar';
import React from 'react';
import Footer from '@/components/Footer';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="font-work-sans">
        <Navbar />
        {children}
        <Footer />
      </main>
    </NextIntlClientProvider>
  );
}
