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
};

export default function ApplyForm({ labels }: { labels: Labels }) {
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');

    const form = e.currentTarget;
    const data = {
      name:  (form.elements.namedItem('name')  as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      field: (form.elements.namedItem('field') as HTMLInputElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '',
    };

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setState('success');
      form.reset();
    } else {
      const json = await res.json();
      setErrorMsg(json.error ?? labels.error_generic);
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <Card stripe inverse padding="48px">
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
          <h3 style={{ fontSize: '22px', color: 'var(--ink-0)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>
            {labels.success_title}
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--ink-300)', fontFamily: 'var(--font-text)' }}>
            {labels.success_desc}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card stripe inverse padding="48px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Honeypot — hidden from users, catches bots. Do not remove. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Input label={labels.name_label} placeholder={labels.name_placeholder} name="name" />
        <Input label={labels.email_label} placeholder={labels.email_placeholder} type="email" name="email" />
        <Input label={labels.field_label} placeholder={labels.field_placeholder} name="field" />

        {state === 'error' && (
          <p style={{ fontSize: '14px', color: 'var(--ember-500)', fontFamily: 'var(--font-text)', margin: 0 }}>
            {errorMsg}
          </p>
        )}

        <Button variant="accent" size="lg" fullWidth type="submit">
          {state === 'loading' ? labels.submitting : labels.submit}
        </Button>
      </form>
    </Card>
  );
}
