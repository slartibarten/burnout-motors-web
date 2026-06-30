'use client';
import { useState } from 'react';
import { Input, Button, Card } from './ui';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ApplyForm() {
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
      setErrorMsg(json.error ?? 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <Card stripe inverse padding="48px">
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
          <h3 style={{ fontSize: '22px', color: 'var(--ink-0)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>
            Application received!
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--ink-300)', fontFamily: 'var(--font-text)' }}>
            We&apos;ll be in touch when recruitment opens next semester.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card stripe inverse padding="48px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <Input label="Full name" placeholder="Ola Nordmann" name="name" />
        <Input label="Email" placeholder="din@epost.no" type="email" name="email" />
        <Input label="Field of study" placeholder="e.g. Mechanical engineering" name="field" />

        {state === 'error' && (
          <p style={{ fontSize: '14px', color: 'var(--ember-500)', fontFamily: 'var(--font-text)', margin: 0 }}>
            {errorMsg}
          </p>
        )}

        <Button variant="accent" size="lg" fullWidth type="submit">
          {state === 'loading' ? 'Submitting…' : 'Submit application'}
        </Button>
      </form>
    </Card>
  );
}
