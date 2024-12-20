import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import { getLocale } from 'next-intl/server';

const workSans = localFont({
  src: [
    {
      path: './fonts/WorkSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Thin.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Light.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: 'YC Directory',
  description: 'Pitch, Vote and Grow',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const locale = await getLocale();

  return (
    <html className="h-full" lang={locale}>
      <body className={workSans.variable}>{children}</body>
    </html>
  );
}