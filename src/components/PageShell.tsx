import Nav from './Nav';
import Footer from './Footer';
import { getLocale, getT } from '@/lib/i18n';

export default async function PageShell({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = getT(locale);

  return (
    <>
      <Nav labels={t.nav} locale={locale} />
      <main className="page-enter">{children}</main>
      <Footer t={t.footer} />
    </>
  );
}
