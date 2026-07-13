import { cookies } from 'next/headers';
import no from '@/locales/no';
import en from '@/locales/en';

export type Locale = 'no' | 'en';

export async function getLocale(): Promise<Locale> {
  const cookie = (await cookies()).get('locale')?.value;
  return cookie === 'en' ? 'en' : 'no';
}

export function getT(locale: Locale) {
  return locale === 'en' ? en : no;
}
