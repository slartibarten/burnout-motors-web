'use client';
import { useEffect, useState } from 'react';

// Sett ISO-dato her når NM-kalenderen for 2027 er klar (f.eks. '2027-06-05T12:00:00+02:00'),
// så bytter strip'en automatisk fra «dato annonseres» til live nedtelling.
const RACE_DATE: string | null = null;

type Labels = {
  next: string;
  title: string;
  tba: string;
  units: { days: string; hours: string; mins: string; secs: string };
};

function partsUntil(target: number) {
  const d = Math.max(0, target - Date.now());
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor(d / 3_600_000) % 24,
    mins: Math.floor(d / 60_000) % 60,
    secs: Math.floor(d / 1_000) % 60,
  };
}

export default function RaceStrip({ labels }: { labels: Labels }) {
  const target = RACE_DATE ? Date.parse(RACE_DATE) : null;
  const [parts, setParts] = useState<ReturnType<typeof partsUntil> | null>(null);

  useEffect(() => {
    if (!target) return;
    setParts(partsUntil(target));
    const id = setInterval(() => setParts(partsUntil(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section aria-label={labels.title} className="border-t border-[var(--ink-800)] bg-[var(--ink-900)] px-5 py-6 sm:px-8">
      {/* Tittel og status hører sammen og holdes samlet. Med justify-between
          på ytterste nivå ble de kastet ~700px fra hverandre på 1280px og
          leste som to urelaterte widgets. */}
      <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ember-500)] opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--ember-500)]" />
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-300)]">
            {labels.next}
          </span>
          <span className="font-[family-name:var(--font-display)] text-[clamp(20px,2.4vw,26px)] font-extrabold leading-none text-[var(--ink-0)]">
            {labels.title}
          </span>
        </div>
        {parts ? (
          <div className="flex items-center gap-5">
            {([['days', parts.days], ['hours', parts.hours], ['mins', parts.mins], ['secs', parts.secs]] as const).map(([k, v]) => (
              <div key={k} className="flex flex-col items-center gap-0.5">
                <span className="font-[family-name:var(--font-display)] text-[26px] font-extrabold leading-none tabular-nums text-[var(--ink-0)]">
                  {String(v).padStart(2, '0')}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--ink-400)]">
                  {labels.units[k]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <span className="rounded-[var(--radius-pill)] border border-[var(--ink-500)] px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--ink-300)]">
            {labels.tba}
          </span>
        )}
      </div>
    </section>
  );
}
