import PageShell from '@/components/PageShell';
import { Card, Input, Button } from '@/components/ui';

export default function ContactPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section style={{
        position: 'relative',
        background: 'var(--ink-1000)',
        color: 'var(--ink-0)',
        padding: '88px 32px 72px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(50% 70% at 22% 30%, rgba(255,61,0,0.15), transparent 62%)',
        }} />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
          <span className="bm-eyebrow">Get in touch</span>
          <h1 style={{
            fontSize: 'clamp(44px, 6vw, 76px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
          }}>
            CONTACT
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--ink-200)',
            maxWidth: '54ch',
            marginTop: '16px',
            lineHeight: 1.55,
            fontFamily: 'var(--font-text)',
          }}>
            Recruiting, partnerships or press — send us a message and we&apos;ll route it to the right people.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={{ padding: '64px 32px 96px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Card stripe inverse padding="48px">
            <h3 style={{ fontSize: '24px', color: 'var(--ink-0)', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Send a message
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--ink-300)', marginTop: 0, marginBottom: '24px', fontFamily: 'var(--font-text)' }}>
              We usually reply within a few days.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
              <Button variant="accent" size="lg" fullWidth type="submit">Send message</Button>
            </form>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
