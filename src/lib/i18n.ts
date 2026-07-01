import { cookies } from 'next/headers';
import no from '@/locales/no';
import en from '@/locales/en';

export type Locale = 'no' | 'en';

export function getLocale(): Locale {
  const cookie = cookies().get('locale')?.value;
  return cookie === 'en' ? 'en' : 'no';
}

export function getT(locale: Locale) {
  return locale === 'en' ? en : no;
}
