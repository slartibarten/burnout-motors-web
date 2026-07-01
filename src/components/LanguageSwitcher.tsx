'use client';
import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/lib/actions';

const options = [
  { value: 'no', label: 'Norsk', flag: '🇳🇴' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
] as const;

export default function LanguageSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const active = options.find((o) => o.value === current) ?? options[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function select(value: string) {
    setOpen(false);
    startTransition(async () => {
      await setLocale(value);
      router.refresh();
    });
  }

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--ink-700)',
          background: 'transparent',
          color: 'var(--ink-200)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '12px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '16px', lineHeight: 1 }}>{active.flag}</span>
        <span>{active.value.toUpperCase()}</span>
        <span style={{ fontSize: '9px', opacity: 0.6 }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: 'var(--ink-900)',
          border: '1px solid var(--ink-700)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          zIndex: 50,
          minWidth: '130px',
        }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: opt.value === current ? 'var(--ink-800)' : 'transparent',
                border: 'none',
                color: opt.value === current ? 'var(--ink-0)' : 'var(--ink-300)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '16px' }}>{opt.flag}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
