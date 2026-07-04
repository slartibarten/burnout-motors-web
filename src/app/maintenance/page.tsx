import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burnout Motors — Coming Soon',
  description: "Norway's first GT3 student team. We're getting ready — check back soon.",
};

export default function MaintenancePage() {
  return (
    <div style={{
      margin: 0,
      background: '#000000',
      color: '#FFFFFF',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      {/* Ember glow */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(50% 60% at 50% 50%, rgba(225,6,0,0.18) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: '560px' }}>
        <Image
          src="/logos/burnout-tiger-white.png"
          alt=""
          width={72}
          height={72}
          style={{ height: '72px', width: 'auto', marginBottom: '28px', opacity: 0.9 }}
        />
        <Image
          src="/logos/burnout-wordmark-white.png"
          alt="Burnout Motors"
          width={180}
          height={22}
          style={{ height: '22px', width: 'auto', display: 'block', margin: '0 auto 40px' }}
        />

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ember-500)',
          marginBottom: '16px',
        }}>
          Under konstruksjon
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 64px)',
          lineHeight: 0.95,
          fontWeight: 800,
          letterSpacing: '-0.01em',
          margin: '0 0 24px',
          color: '#FFFFFF',
          fontFamily: 'var(--font-display)',
        }}>
          NORGES FØRSTE <span style={{ color: 'var(--ember-500)' }}>GT3</span><br />STUDENTTEAM
        </h1>

        <p style={{
          fontSize: '17px',
          color: '#B6B6BE',
          lineHeight: 1.6,
          margin: '0 0 40px',
          fontFamily: 'var(--font-mono)',
        }}>
          Vi bygger nettsiden — akkurat som vi bygger bilen.<br />
          Kom tilbake snart.
        </p>

        <a
          href="mailto:adamvi@uio.no"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '12px 24px',
            background: 'var(--ember-500)',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Ta kontakt
        </a>

        <div style={{
          marginTop: '64px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#3D3D45',
          letterSpacing: '0.04em',
        }}>
          © Burnout Motors · Universitetet i Oslo
        </div>
      </div>
    </div>
  );
}
