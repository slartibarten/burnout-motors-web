'use client';
import { useState } from 'react';
import { Input, Select, Button, Card } from './ui';

type State = 'idle' | 'loading' | 'success' | 'error';

type Labels = {
  title: string; subtitle: string;
  type_label: string;
  type_partner: string; type_rekruttering: string; type_presse: string; type_annet: string;
  name_label: string; name_placeholder: string;
  email_label: string; email_placeholder: string;
  subject_label: string; subject_placeholder: string;
  message_label: string; message_placeholder: string;
  submit: string; submitting: string;
  success_title: string; success_desc: string;
  error_generic: string;
  error_rate_limit: string;
  error_missing_fields: string;
  error_invalid_email: string;
  privacy_notice: string; privacy_link: string;
};

// Serveren svarer med en språknøytral kode; teksten hentes fra locale-fila
// slik at engelske besøkende ikke får norske feilmeldinger.
function messageForCode(code: unknown, labels: Labels) {
  switch (code) {
    case 'rate_limit': return labels.error_rate_limit;
    case 'missing_fields': return labels.error_missing_fields;
    case 'invalid_email': return labels.error_invalid_email;
    default: return labels.error_generic;
  }
}

export default function ContactForm({ labels }: { labels: Labels }) {
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');

    const form = e.currentTarget;
    const data = {
      type:    (form.elements.namedItem('type')    as HTMLSelectElement).value,
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState('success');
        form.reset();
        return;
      }

      // En 502 e.l. kan svare med HTML — da faller vi tilbake på generisk tekst.
      const json = await res.json().catch(() => null);
      setErrorMsg(messageForCode(json?.code, labels));
      setState('error');
    } catch {
      // Nettverksfeil, offline, avbrutt request. Uten dette ble knappen
      // stående på «Sender…» for alltid.
      setErrorMsg(labels.error_generic);
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <Card stripe inverse padding="48px">
        <div role="status" className="py-6 text-center">
          <div aria-hidden="true" className="mb-4 text-[32px]">✓</div>
          <h3 className="mb-2 font-[family-name:var(--font-display)] text-[22px] font-bold text-[var(--ink-0)]">
            {labels.success_title}
          </h3>
          <p className="font-[family-name:var(--font-text)] text-[15px] text-[var(--ink-300)]">
            {labels.success_desc}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card stripe inverse padding="48px">
      <h3 className="mb-1 font-[family-name:var(--font-display)] text-[24px] font-bold text-[var(--ink-0)]">
        {labels.title}
      </h3>
      <p className="mb-6 mt-0 font-[family-name:var(--font-text)] text-[14px] text-[var(--ink-300)]">
        {labels.subtitle}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        {/* Honeypot — hidden from users, catches bots. Do not remove. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Select
          label={labels.type_label}
          name="type"
          options={[
            { value: 'partner',      label: labels.type_partner },
            { value: 'rekruttering', label: labels.type_rekruttering },
            { value: 'presse',       label: labels.type_presse },
            { value: 'annet',        label: labels.type_annet },
          ]}
        />
        <Input label={labels.name_label} placeholder={labels.name_placeholder} name="name" required autoComplete="name" />
        <Input label={labels.email_label} placeholder={labels.email_placeholder} type="email" name="email" required autoComplete="email" />
        <Input label={labels.subject_label} placeholder={labels.subject_placeholder} name="subject" required autoComplete="off" />
        <label className="flex flex-col gap-1.5">
          <span className="font-[family-name:var(--font-display)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--ink-300)]">
            {labels.message_label}
          </span>
          <textarea
            rows={6}
            name="message"
            required
            placeholder={labels.message_placeholder}
            className="w-full resize-y rounded-[var(--radius-md)] border-2 border-[var(--ink-700)] bg-[var(--ink-800)] px-3.5 py-3 font-[family-name:var(--font-text)] text-[15px] text-[var(--ink-0)] transition-colors focus:border-[var(--ember-500)]"
          />
        </label>

        {/* Alltid montert: en live region må finnes i DOM-en før teksten
            settes inn, ellers annonserer ikke skjermlesere endringen. */}
        <p role="alert" className="m-0 font-[family-name:var(--font-text)] text-[14px] text-[var(--ember-400)]">
          {state === 'error' ? errorMsg : ''}
        </p>

        <Button variant="accent" size="lg" fullWidth type="submit" disabled={state === 'loading'}>
          {state === 'loading' ? labels.submitting : labels.submit}
        </Button>
        <p className="m-0 max-w-[58ch] font-[family-name:var(--font-text)] text-[12px] leading-[1.5] text-[var(--ink-400)]">
          {labels.privacy_notice}{' '}
          <a href="/personvern" className="text-[var(--ink-200)] underline">
            {labels.privacy_link}
          </a>
        </p>
      </form>
    </Card>
  );
}
