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
  const listRef = useRef<HTMLDivElement>(null);

  const active = options.find((o) => o.value === current) ?? options[0];

  useEffect(() => {
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    // Uten denne ble menyen stående åpen når man tabbet videre.
    function onFocusIn(e: FocusEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Flytt fokus inn i lista når den åpnes, så tastaturbrukere lander riktig.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>('[role="option"]')?.focus();
  }, [open]);

  function select(value: string) {
    setOpen(false);
    startTransition(async () => {
      await setLocale(value);
      router.refresh();
    });
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Språk: ${active.label}`}
        className="flex h-11 items-center gap-1.5 rounded border border-[var(--ink-700)] bg-transparent px-3 font-[family-name:var(--font-display)] text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--ink-200)] transition-colors hover:text-[var(--ink-0)]"
      >
        <span aria-hidden="true" className="text-[16px] leading-none">{active.flag}</span>
        <span>{active.value.toUpperCase()}</span>
        <span aria-hidden="true" className="text-[9px] opacity-60">▾</span>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label="Velg språk"
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[150px] overflow-hidden rounded border border-[var(--ink-700)] bg-[var(--ink-900)]"
        >
          {options.map((opt) => {
            const isCurrent = opt.value === current;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isCurrent}
                onClick={() => select(opt.value)}
                className={`flex h-11 w-full items-center gap-2.5 px-4 text-left font-[family-name:var(--font-display)] text-[13px] font-bold transition-colors ${
                  isCurrent
                    ? 'bg-[var(--ink-800)] text-[var(--ink-0)]'
                    : 'text-[var(--ink-300)] hover:bg-[var(--ink-800)] hover:text-[var(--ink-0)]'
                }`}
              >
                <span aria-hidden="true" className="text-[16px] leading-none">{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
