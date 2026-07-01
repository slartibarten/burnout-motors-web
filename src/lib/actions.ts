'use server';
import { cookies } from 'next/headers';

export async function setLocale(locale: string) {
  cookies().set('locale', locale, { maxAge: 60 * 60 * 24 * 365, path: '/' });
}
