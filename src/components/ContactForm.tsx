'use client';
import { useState } from 'react';
import { Input, Button, Card } from './ui';

type State = 'idle' | 'loading' | 'success' | 'error';

type Labels = {
  title: string; subtitle: string;
  name_label: string; name_placeholder: string;
  email_label: string; email_placeholder: string;
  subject_label: string; subject_placeholder: string;
  message_label: string; message_placeholder: string;
  submit: string; submitting: string;
  success_title: string; success_desc: string;
  error_generic: string;
  privacy_notice: string; privacy_link: string;
};

export default function ContactForm({ labels }: { labels: Labels }) {
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
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '',
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
      <h3 style={{ fontSize: '24px', color: 'var(--ink-0)', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        {labels.title}
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--ink-300)', marginTop: 0, marginBottom: '24px', fontFamily: 'var(--font-text)' }}>
        {labels.subtitle}
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Honeypot — hidden from users, catches bots. Do not remove. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Input label={labels.name_label} placeholder={labels.name_placeholder} name="name" />
        <Input label={labels.email_label} placeholder={labels.email_placeholder} type="email" name="email" />
        <Input label={labels.subject_label} placeholder={labels.subject_placeholder} name="subject" />
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-400)',
          }}>{labels.message_label}</span>
          <textarea
            rows={6}
            name="message"
            required
            placeholder={labels.message_placeholder}
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
          {state === 'loading' ? labels.submitting : labels.submit}
        </Button>
        <p style={{ fontSize: '12px', color: 'var(--ink-400)', fontFamily: 'var(--font-text)', margin: 0, lineHeight: 1.5 }}>
          {labels.privacy_notice}{' '}
          <a href="/personvern" style={{ color: 'var(--ink-200)', textDecoration: 'underline' }}>
            {labels.privacy_link}
          </a>
        </p>
      </form>
    </Card>
  );
}
