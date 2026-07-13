import Image from 'next/image';
import Link from 'next/link';

type FooterT = { tagline: string; copyright: string; privacy?: string };

export default function Footer({ t }: { t: FooterT }) {
  return (
    <footer style={{
      background: 'var(--ink-1000)',
      color: 'var(--ink-300)',
      padding: '48px 32px',
      borderTop: '1px solid var(--ink-700)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Image src="/logos/burnout-tiger-white.png" alt="" width={40} height={40} style={{ height: '40px', width: 'auto' }} />
          <div>
            <Image src="/logos/burnout-wordmark-white.png" alt="Burnout Motors" width={120} height={14} style={{ height: '14px', width: 'auto', marginBottom: '6px', display: 'block' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.04em' }}>
              {t.tagline}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <a
            href="https://www.instagram.com/burnoutmotorsno/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Burnout Motors på Instagram"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ink-200)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.04em',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @burnoutmotorsno
          </a>
          <Link
            href="/personvern"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.04em',
              color: 'var(--ink-300)',
              textDecoration: 'none',
            }}
          >
            {t.privacy || 'Personvern'}
          </Link>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.04em' }}>
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
