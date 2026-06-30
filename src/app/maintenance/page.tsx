import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burnout Motors — Coming Soon',
  description: "Norway's first GT3 student team. We're getting ready — check back soon.",
};

export default function MaintenancePage() {
  return (
    <html lang="no">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{
        margin: 0,
        background: '#000000',
        color: '#FFFFFF',
        fontFamily: "'Oxanium', sans-serif",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        boxSizing: 'border-box',
      }}>
        {/* Ember glow */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(50% 60% at 50% 50%, rgba(255,61,0,0.18) 0%, transparent 70%)',
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
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FF3D00',
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
          }}>
            NORWAY&apos;S FIRST <span style={{ color: '#FF3D00' }}>GT3</span><br />STUDENT TEAM
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#B6B6BE',
            lineHeight: 1.6,
            margin: '0 0 40px',
            fontFamily: "'Space Mono', monospace",
          }}>
            Vi bygger nettsiden — akkurat som vi bygger bilen.<br />
            Kom tilbake snart.
          </p>

          <a
            href="mailto:adamvi@uio.no"
            style={{
              display: 'inline-block',
              fontFamily: "'Oxanium', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '12px 24px',
              background: '#FF3D00',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            Ta kontakt
          </a>

          <div style={{
            marginTop: '64px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: '#3D3D45',
            letterSpacing: '0.04em',
          }}>
            © Burnout Motors · Universitetet i Oslo
          </div>
        </div>
      </body>
    </html>
  );
}
