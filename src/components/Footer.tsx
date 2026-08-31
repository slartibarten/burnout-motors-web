import Image from 'next/image';
import Link from 'next/link';

type FooterT = { tagline: string; copyright: string; privacy?: string; contact_role?: string; org_label?: string };

// Navngitt kontakt gir sponsorer noen å henvende seg til.
const CONTACT_NAME = 'Adam Dehli Villanger';
// Adressen må opprettes hos domeneleverandøren før deploy.
const CONTACT_EMAIL = 'adamv@burnoutmotors.no';
// Tom streng skjuler org.nr-linja. Fyll inn når teamet er registrert.
const ORG_NUMBER = '';

const linkClass =
  'font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--ink-200)] no-underline transition-colors hover:text-[var(--ink-0)]';

export default function Footer({ t }: { t: FooterT }) {
  return (
    <footer className="border-t border-[var(--ink-700)] bg-[var(--ink-1000)] px-8 py-12 text-[var(--ink-300)]">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <Image src="/logos/burnout-tiger-white.png" alt="" width={40} height={40} className="h-10 w-auto" />
          <div>
            <Image
              src="/logos/burnout-wordmark-white.png"
              alt="Burnout Motors"
              width={120}
              height={14}
              className="mb-1.5 block h-3.5 w-auto"
            />
            <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em]">{t.tagline}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="https://www.instagram.com/burnoutmotorsno/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Burnout Motors på Instagram"
            className={`inline-flex items-center gap-2 ${linkClass}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @burnoutmotorsno
          </a>

          <div className="flex flex-col gap-0.5">
            <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--ink-100)]">
              {CONTACT_NAME}
              {t.contact_role ? <span className="text-[var(--ink-400)]"> · {t.contact_role}</span> : null}
            </span>
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            {ORG_NUMBER ? (
              <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--ink-400)]">
                {t.org_label || 'Org.nr'} {ORG_NUMBER}
              </span>
            ) : null}
          </div>

          <Link href="/personvern" className={`${linkClass} underline underline-offset-[3px]`}>
            {t.privacy || 'Personvern'}
          </Link>

          <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em]">{t.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
