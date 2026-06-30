'use client';
import { useState } from 'react';
import { Input, Button, Card } from './ui';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    const res = await fetch('/api/contact', {
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
            Message sent!
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--ink-300)', fontFamily: 'var(--font-text)' }}>
            We usually reply within a few days.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card stripe inverse padding="48px">
      <h3 style={{ fontSize: '24px', color: 'var(--ink-0)', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        Send a message
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--ink-300)', marginTop: 0, marginBottom: '24px', fontFamily: 'var(--font-text)' }}>
        We usually reply within a few days.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <Input label="Name" placeholder="Your name" name="name" />
        <Input label="Email" placeholder="you@company.no" type="email" name="email" />
        <Input label="Subject" placeholder="What is this about?" name="subject" />
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-400)',
          }}>Message</span>
          <textarea
            rows={6}
            name="message"
            required
            placeholder="Tell us more…"
            style={{
              fontFamily: 'var(--font-text)',
              fontSize: '15px',
              color: 'var(--ink-0)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--ink-700)',
              background: 'var(--ink-800)',
              resize: 'vertical',
              outline: 'none',
              width: '100%',
            }}
          />
        </label>

        {state === 'error' && (
          <p style={{ fontSize: '14px', color: 'var(--ember-500)', fontFamily: 'var(--font-text)', margin: 0 }}>
            {errorMsg}
          </p>
        )}

        <Button variant="accent" size="lg" fullWidth type="submit">
          {state === 'loading' ? 'Sending…' : 'Send message'}
        </Button>
      </form>
    </Card>
  );
}
