import PageShell from '@/components/PageShell';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from '@/components/ui';
import { getLocale, getT } from '@/lib/i18n';

export default function PartnersPage() {
  const locale = getLocale();
  const t = getT(locale);
  const p = t.partners;

  return (
    <PageShell>
      {/* HERO */}
      <section style={{
        position: 'relative',
        background: 'var(--ink-1000)',
        color: 'var(--ink-0)',
        padding: '88px 32px 80px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(52% 72% at 78% 30%, rgba(255,61,0,0.18), transparent 64%)',
        }} />
        <Image
          src="/logos/burnout-tiger-white.png"
          alt=""
          width={420}
          height={420}
          style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', height: '420px', width: 'auto', opacity: 0.06, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
          <span className="bm-eyebrow">{p.eyebrow}</span>
          <h1 style={{
            fontSize: 'clamp(40px, 5.4vw, 64px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            maxWidth: '18ch',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
          }}>
            {p.hero_title}
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--ink-200)',
            maxWidth: '56ch',
            marginTop: '16px',
            lineHeight: 1.5,
            fontFamily: 'var(--font-text)',
          }}>
            {p.hero_desc}
          </p>
          <div style={{ marginTop: '28px' }}>
            <Link href="/contact"><Button variant="accent" size="lg">{p.cta_become}</Button></Link>
          </div>
        </div>
      </section>

      {/* CURRENT PARTNERS */}
      <section style={{ background: 'var(--ink-900)', borderTop: '1px solid var(--ink-700)', padding: '56px 32px' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow" style={{ color: 'var(--ink-200)' }}>{p.current_eyebrow}</span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
            marginTop: '20px',
          }}>
            {['PARTNER 01', 'PARTNER 02', 'PARTNER 03', 'PARTNER 04', 'PARTNER 05'].map((pl) => (
              <div key={pl} style={{
                height: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--ink-700)',
                borderRadius: 'var(--radius-md)',
                background: 'repeating-linear-gradient(135deg, var(--ink-900) 0 8px, var(--ink-1000) 8px 16px)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'var(--ink-400)',
              }}>{pl}</div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-500)', marginTop: '14px' }}>
            Drop partner logos here
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section style={{ padding: '80px 32px 32px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">{p.tiers_eyebrow}</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
            {p.tiers.map((tier, i) => (
              <Card key={tier.name} inverse padding="32px">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: i === 0 ? 'var(--ember-500)' : i === 1 ? 'var(--ink-200)' : 'var(--ink-400)',
                    display: 'inline-block', flexShrink: 0,
                  }} />
                  <h3 style={{ fontSize: '22px', color: 'var(--ink-0)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{tier.name}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tier.perks.map((perk) => (
                    <div key={perk} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--ember-500)', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.5, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: '14px', color: 'var(--ink-300)', lineHeight: 1.5, fontFamily: 'var(--font-text)' }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '32px 32px 88px', background: 'var(--ink-1000)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <Card stripe inverse padding="48px">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              <div>
                <h3 style={{ fontSize: '26px', color: 'var(--ink-0)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {p.cta_title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-300)', margin: '8px 0 0', fontFamily: 'var(--font-text)' }}>
                  {p.cta_desc}
                </p>
              </div>
              <Link href="/contact"><Button variant="accent" size="lg">{p.cta_btn}</Button></Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
