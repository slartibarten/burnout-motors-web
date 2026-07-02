import PageShell from '@/components/PageShell';
import Image from 'next/image';
import { getLocale, getT } from '@/lib/i18n';

export default function CarPage() {
  const locale = getLocale();
  const t = getT(locale);
  const c = t.car;

  return (
    <PageShell>
      {/* HERO */}
      <section style={{
        position: 'relative',
        background: 'var(--ink-1000)',
        color: 'var(--ink-0)',
        padding: '88px 32px 64px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(60% 70% at 50% 30%, rgba(255,61,0,0.18), transparent 64%)',
        }} />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
          <span className="bm-eyebrow">{c.eyebrow}</span>
          <h1 style={{
            fontSize: 'clamp(44px, 6vw, 76px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
          }}>
            {c.hero_title.split('GT3')[0]}
            <span style={{ color: 'var(--ember-500)' }}>GT3</span>
            {c.hero_title.split('GT3')[1]}
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--ink-200)',
            maxWidth: '54ch',
            marginTop: '16px',
            lineHeight: 1.55,
            fontFamily: 'var(--font-text)',
          }}>
            {c.hero_desc}
          </p>
          {/* Car hero image */}
          <div style={{
            position: 'relative',
            marginTop: '40px',
            width: '100%',
            aspectRatio: '21 / 9',
            border: '1px solid var(--ink-700)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}>
            <Image
              src="/images/car-frederikke.jpg"
              alt="Burnout Motors GT3-bil på Frederikke plass"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section style={{ padding: '64px 32px 88px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">{c.video_eyebrow}</span>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 34px)',
            marginTop: '12px',
            marginBottom: '24px',
            color: 'var(--ink-0)',
            maxWidth: '20ch',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
          }}>
            {c.video_title}
          </h2>
          <div style={{
            position: 'relative',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--ink-700)',
          }}>
            <video
              src="/images/bilen-starter.mp4"
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
