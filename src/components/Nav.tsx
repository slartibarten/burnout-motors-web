'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

type NavLabels = {
  home: string; about: string; team: string; car: string;
  partners: string; contact: string; join: string;
};

export default function Nav({ labels, locale }: { labels: NavLabels; locale: string }) {
  const pathname = usePathname();

  const items = [
    { label: labels.home, href: '/' },
    { label: labels.about, href: '/about' },
    { label: labels.team, href: '/team' },
    { label: labels.car, href: '/car' },
    { label: labels.partners, href: '/partners' },
    { label: labels.contact, href: '/contact' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      height: '72px',
      gap: '20px',
      background: 'rgba(5,5,6,0.82)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '2px solid var(--ember-500)',
      borderBottom: '1px solid var(--ink-700)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <Image src="/logos/burnout-tiger-white.png" alt="" width={34} height={34} style={{ height: '34px', width: 'auto' }} />
        <Image src="/logos/burnout-wordmark-white.png" alt="Burnout Motors" width={120} height={15} style={{ height: '15px', width: 'auto' }} />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                color: active ? 'var(--ember-500)' : 'var(--ink-200)',
                textDecoration: 'none',
                transition: 'color var(--dur-fast)',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <LanguageSwitcher current={locale} />
        <Link
          href="/team"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--ember-500)',
            color: 'var(--ink-0)',
            textDecoration: 'none',
            transition: 'background var(--dur-fast)',
            display: 'inline-block',
          }}
        >
          {labels.join}
        </Link>
      </div>
    </header>
  );
}
