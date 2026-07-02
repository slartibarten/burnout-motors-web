'use client';
import { useEffect, useRef, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: labels.home, href: '/' },
    { label: labels.about, href: '/about' },
    { label: labels.team, href: '/team' },
    { label: labels.car, href: '/car' },
    { label: labels.partners, href: '/partners' },
    { label: labels.contact, href: '/contact' },
  ];

  // Lukk ved rutebytte
  useEffect(() => { setOpen(false); }, [pathname]);

  // Escape, scroll-lås og fokus inn i menyen
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    overlayRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>('a, button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkClass = (active: boolean) =>
    `font-[family-name:var(--font-display)] font-bold text-[13px] tracking-[0.07em] uppercase whitespace-nowrap px-3 py-2.5 rounded transition-colors duration-150 no-underline ${
      active ? 'text-[var(--ember-400)]' : 'text-[var(--ink-200)] hover:text-[var(--ink-0)]'
    }`;

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-5 border-b border-[var(--ink-700)] border-t-2 border-t-[var(--ember-500)] bg-[rgba(5,5,6,0.82)] px-5 backdrop-blur-md lg:px-7">
      <Link href="/" className="flex shrink-0 items-center">
        <Image src="/logos/burnout-lockup-white.png" alt="Burnout Motors" width={210} height={44} className="h-[38px] w-auto" />
      </Link>

      {/* Desktop */}
      <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Hovedmeny">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={linkClass(pathname === item.href)}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
        <LanguageSwitcher current={locale} />
        <Link
          href="/team#apply"
          className="inline-block rounded bg-[var(--ember-500)] px-4 py-2 font-[family-name:var(--font-display)] text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--ink-0)] no-underline transition-colors duration-150 hover:bg-[var(--ember-400)]"
        >
          {labels.join}
        </Link>
      </div>

      {/* Hamburger */}
      <button
        type="button"
        className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded border border-[var(--ink-700)] bg-transparent lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Lukk meny' : 'Åpne meny'}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`block h-[2px] w-5 bg-[var(--ink-0)] transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`block h-[2px] w-5 bg-[var(--ink-0)] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-[2px] w-5 bg-[var(--ink-0)] transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {/* Mobilmeny-overlay */}
      {open && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          className="fixed left-0 right-0 top-[72px] z-30 flex h-[calc(100vh-72px)] flex-col overflow-y-auto bg-black px-8 pb-10 pt-8 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobilmeny">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`bm-menu-item border-b border-[var(--ink-800)] py-4 font-[family-name:var(--font-display)] text-[22px] font-bold uppercase tracking-[0.06em] no-underline ${
                  pathname === item.href ? 'text-[var(--ember-400)]' : 'text-[var(--ink-0)]'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div
            className="bm-menu-item mt-8 flex items-center justify-between gap-4"
            style={{ animationDelay: `${items.length * 60}ms` }}
          >
            <LanguageSwitcher current={locale} />
            <Link
              href="/team#apply"
              className="inline-block rounded bg-[var(--ember-500)] px-6 py-3.5 font-[family-name:var(--font-display)] text-[14px] font-bold uppercase tracking-[0.06em] text-[var(--ink-0)] no-underline"
            >
              {labels.join}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
