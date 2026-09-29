'use client';
import { useEffect, useState, type ComponentProps } from 'react';
import ApplyForm from './ApplyForm';
import ContactForm from './ContactForm';

// Én inngang for alle henvendelser. Tidligere lå søknadsskjemaet midt i
// team-seksjonen, partnerseksjonen hadde et eget CTA-kort, og kontaktskjemaet
// hadde i tillegg en nedtrekksliste for type — tre steder som spurte om det
// samme. Nå velger besøkende fane, og resten av siden lenker hit.

export type HubTab = 'join' | 'partner' | 'other';

// Ankere andre deler av siden (og nav-knappen «Bli med») lenker til.
const HASH_TO_TAB: Record<string, HubTab> = {
  '#apply': 'join',
  '#bli-partner': 'partner',
  '#kontakt': 'other',
};

type TabCopy = { tab: string; title: string; desc: string };

export default function ContactHub({ copy, applyLabels, contactLabels, partnerSubject, email, emailLabel }: {
  copy: Record<HubTab, TabCopy>;
  applyLabels: ComponentProps<typeof ApplyForm>['labels'];
  contactLabels: ComponentProps<typeof ContactForm>['labels'];
  partnerSubject: { label: string; placeholder: string };
  email: string;
  emailLabel: string;
}) {
  const [tab, setTab] = useState<HubTab>('join');

  useEffect(() => {
    const fromHash = () => {
      const next = HASH_TO_TAB[window.location.hash];
      if (next) setTab(next);
    };
    fromHash();
    // hashchange fyrer ikke når man klikker samme anker to ganger på rad,
    // så vi lytter også på klikk på lenker til ankrene.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      const hash = a?.getAttribute('href')?.replace(/^\/?/, '');
      if (hash && HASH_TO_TAB[hash]) setTab(HASH_TO_TAB[hash]);
    };
    window.addEventListener('hashchange', fromHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const tabs: HubTab[] = ['join', 'partner', 'other'];
  const current = copy[tab];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <div className="lg:pt-2">
        <h3 className="font-[family-name:var(--font-display)] text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.1] text-[var(--ink-0)]">
          {current.title}
        </h3>
        <p className="mt-3 max-w-[44ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.6] text-[var(--ink-300)]">
          {current.desc}
        </p>
        <p className="mt-8 font-[family-name:var(--font-text)] text-[14px] text-[var(--ink-400)]">
          {emailLabel}
          <br />
          <a
            href={`mailto:${email}`}
            className="font-[family-name:var(--font-mono)] text-[15px] text-[var(--ink-0)] underline decoration-[var(--ember-500)] decoration-2 underline-offset-4"
          >
            {email}
          </a>
        </p>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--ink-700)] bg-[var(--ink-900)]">
        <div role="tablist" aria-label={emailLabel} className="grid grid-cols-3 border-b border-[var(--ink-700)]">
          {tabs.map((id) => {
            const selected = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`hub-tab-${id}`}
                aria-selected={selected}
                aria-controls="hub-panel"
                onClick={() => setTab(id)}
                className={`-mb-px border-b-2 px-2 py-4 font-[family-name:var(--font-display)] text-[13px] font-bold uppercase tracking-[0.06em] transition-colors sm:text-[14px] ${
                  selected
                    ? 'border-[var(--ember-500)] text-[var(--ink-0)]'
                    : 'border-transparent text-[var(--ink-400)] hover:text-[var(--ink-200)]'
                }`}
              >
                {copy[id].tab}
              </button>
            );
          })}
        </div>
        <div id="hub-panel" role="tabpanel" aria-labelledby={`hub-tab-${tab}`} className="p-6 sm:p-10">
          {/* key tvinger nytt skjema per fane, så en halvfylt søknad ikke
              blir liggende i partnerskjemaet. */}
          {tab === 'join' && <ApplyForm key="join" labels={applyLabels} />}
          {tab === 'partner' && (
            <ContactForm
              key="partner"
              type="partner"
              labels={contactLabels}
              subjectLabel={partnerSubject.label}
              subjectPlaceholder={partnerSubject.placeholder}
            />
          )}
          {tab === 'other' && <ContactForm key="other" type="annet" labels={contactLabels} />}
        </div>
      </div>
    </div>
  );
}
