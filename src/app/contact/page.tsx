import PageShell from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';

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
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
