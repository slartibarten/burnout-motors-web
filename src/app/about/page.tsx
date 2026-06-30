import PageShell from '@/components/PageShell';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from '@/components/ui';

const values = [
  ['Learn by doing', 'Theory earns its place only when it touches metal. We build, break and rebuild until it works.'],
  ['Every faculty', 'Engineers, designers, economists, communicators. A race team needs all of them.'],
  ['Open to all', 'No prior motorsport experience required — only the will to put in the hours.'],
];

export default function AboutPage() {
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
          background: 'radial-gradient(50% 70% at 78% 30%, rgba(255,61,0,0.16), transparent 64%)',
        }} />
        <Image
          src="/logos/burnout-tiger-white.png"
          alt=""
          width={360}
          height={360}
          style={{ position: 'absolute', right: '-40px', bottom: '-60px', height: '360px', width: 'auto', opacity: 0.06, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
          <span className="bm-eyebrow">Who we are</span>
          <h1 style={{
            fontSize: 'clamp(40px, 5.4vw, 64px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            maxWidth: '18ch',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
          }}>
            A STUDENT TEAM BUILDING A REAL GT3 CAR
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--ink-200)',
            maxWidth: '58ch',
            marginTop: '18px',
            lineHeight: 1.55,
            fontFamily: 'var(--font-text)',
          }}>
            Burnout Motors is a student-run engineering project at the University of Oslo. We design, build, test and race a GT3-spec competition car — and develop the people who do it. The car is the goal; the engineers are the point.
          </p>
        </div>
      </section>

      {/* FOUNDED */}
      <section style={{ background: 'var(--ink-900)', borderTop: '1px solid var(--ink-700)', padding: '52px 32px' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">Founded</span>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(72px, 13vw, 168px)',
            lineHeight: 0.86,
            letterSpacing: '-0.02em',
            color: 'var(--ember-500)',
            marginTop: '6px',
          }}>2024</div>
        </div>
      </section>

      {/* STORY */}
      <section style={{ padding: '88px 32px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}>
          <div>
            <span className="bm-eyebrow">The story</span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.4vw, 38px)',
              marginTop: '12px',
              color: 'var(--ink-0)',
              maxWidth: '16ch',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
            }}>
              From a workshop idea to a race programme
            </h2>
            <div style={{ marginTop: '24px' }}>
              <div style={{
                width: '100%',
                aspectRatio: '16 / 10',
                border: '1px dashed var(--ink-700)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-500)', letterSpacing: '0.1em' }}>TEAM_WORKSHOP</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '16px', color: 'var(--ink-300)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-text)' }}>
              We started in 2024 with a simple conviction: students learn engineering fastest when they own a real, hard problem end to end. A GT3 car is exactly that — every discipline, real deadlines, no shortcuts.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
              <Link href="/team"><Button variant="accent">Meet the team</Button></Link>
              <Link href="/car"><Button variant="outline">See the car</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '0 32px 88px', background: 'var(--ink-1000)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">What we stand for</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '20px' }}>
            {values.map(([title, desc]) => (
              <Card key={title} stripe inverse interactive>
                <h3 style={{ fontSize: '19px', marginBottom: '8px', color: 'var(--ink-0)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--ink-300)', lineHeight: 1.55, fontFamily: 'var(--font-text)' }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
