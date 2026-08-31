import Nav from './Nav';
import Footer from './Footer';
import { getLocale, getT } from '@/lib/i18n';

export default async function PageShell({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = getT(locale);

  return (
    <>
      {/* Synlig først ved tastaturfokus — uten denne må man tabbe gjennom
          hele navigasjonen på hver sidelasting. */}
      <a href="#innhold" className="bm-skip">{t.nav.skip}</a>
      <Nav labels={t.nav} locale={locale} />
      <main id="innhold" className="page-enter">{children}</main>
      <Footer t={t.footer} />
    </>
  );
}
