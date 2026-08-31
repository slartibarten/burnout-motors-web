'use client';
import { useState } from 'react';
import { Input, Button, Card } from './ui';

type State = 'idle' | 'loading' | 'success' | 'error';

type Labels = {
  name_label: string; name_placeholder: string;
  email_label: string; email_placeholder: string;
  field_label: string; field_placeholder: string;
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

export default function ApplyForm({ labels }: { labels: Labels }) {
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');

    const form = e.currentTarget;
    const data = {
      name:  (form.elements.namedItem('name')  as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      field: (form.elements.namedItem('field') as HTMLInputElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '',
    };

    try {
      const res = await fetch('/api/apply', {
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        {/* Honeypot — hidden from users, catches bots. Do not remove. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Input label={labels.name_label} placeholder={labels.name_placeholder} name="name" required autoComplete="name" />
        <Input label={labels.email_label} placeholder={labels.email_placeholder} type="email" name="email" required autoComplete="email" />
        <Input label={labels.field_label} placeholder={labels.field_placeholder} name="field" required autoComplete="organization-title" />

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
