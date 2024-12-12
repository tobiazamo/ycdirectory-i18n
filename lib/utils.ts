import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getLocale } from 'next-intl/server';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function formatDate(date: string) {
  const locale = await getLocale();
  return new Date(date).toLocaleDateString(locale ? locale : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
