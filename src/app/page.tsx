import PageShell from '@/components/PageShell';
import Link from 'next/link';
import { Badge, Button, StatChip, Card } from '@/components/ui';

const navCats = [
  ['01', 'THE CAR', '/car'],
  ['02', 'THE TEAM', '/team'],
  ['03', 'PARTNERS', '/partners'],
  ['04', 'CONTACT', '/contact'],
];

const missionCards = [
  ['Design', 'Every subsystem is engineered from first principles — then drawn, simulated and reviewed before a single part is cut.'],
  ['Build', 'We fabricate, assemble and wire the car ourselves. Hands on metal, not just theory on slides.'],
  ['Break · fix · retest', 'Test, find the fault, fix it, retest, document. The loop that turns a student into an engineer.'],
];

export default function HomePage() {
  return (
    <PageShell>
      {/* SPLIT HERO */}
      <section style={{
        position: 'relative',
        background: 'var(--ink-1000)',
        color: 'var(--ink-0)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 72px)',
      }}>
        {/* Ember glow */}
        <div className="bm-glow-anim" style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(58% 60% at 70% 44%, rgba(255,61,0,0.26) 0%, rgba(255,61,0,0.12) 32%, transparent 68%)',
        }} />

        {/* Car image placeholder */}
        <div style={{
          position: 'absolute',
          right: '-72px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '56%',
          height: '70%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed var(--ink-700)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-500)', letterSpacing: '0.1em' }}>GT3_CAR_HERO</span>
        </div>

        {/* Hero content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            width: '100%',
            padding: '56px 32px',
            position: 'relative',
            zIndex: 3,
          }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
                <Badge tone="accent" variant="solid" shape="pill">GT3</Badge>
                <Badge tone="neutral" variant="outline" shape="pill">Universitetet i Oslo</Badge>
              </div>
              <h1 style={{
                fontSize: 'clamp(48px, 6vw, 84px)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: 'var(--ink-0)',
                maxWidth: '15ch',
              }}>
                NORWAY&apos;S FIRST <span style={{ color: 'var(--ember-500)' }}>GT3</span> STUDENT TEAM
              </h1>
              <p style={{
                fontSize: '19px',
                color: 'var(--ink-200)',
                maxWidth: '46ch',
                marginTop: '24px',
                lineHeight: 1.55,
                fontFamily: 'var(--font-text)',
              }}>
                We turn theory into real engineering — designing, building, testing and racing a GT3 competition car, and developing the people who do it.
              </p>
              <div style={{ display: 'flex', gap: '14px', marginTop: '34px', flexWrap: 'wrap' }}>
                <Link href="/car">
                  <Button variant="accent" size="lg">See the car</Button>
                </Link>
                <Link href="/team">
                  <Button variant="outline" size="lg">Join the team</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero strip */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          borderTop: '1px solid var(--ink-800)',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
        }}>
          <div style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '28px',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', color: 'var(--ink-500)' }}>BURNOUT // GT3</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '30px', lineHeight: 1, color: 'var(--ember-500)' }}>01</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-400)' }}>/ 05</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '26px', flexWrap: 'wrap' }}>
              {navCats.map(([n, label, href]) => (
                <Link key={n} href={href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--ink-500)' }}>{n} / 04</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', color: 'var(--ink-150)' }}>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ padding: '88px 32px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">The mission</span>
          <h2 style={{
            fontSize: 'clamp(30px, 4vw, 44px)',
            marginTop: '12px',
            maxWidth: '20ch',
            color: 'var(--ink-0)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
          }}>
            A real GT3 car. Built by students. Validated gate by gate.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '44px' }}>
            {missionCards.map(([title, desc]) => (
              <Card key={title} stripe inverse interactive>
                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--ink-0)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--ink-300)', lineHeight: 1.55, fontFamily: 'var(--font-text)' }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CAR TEASER */}
      <section style={{ background: 'var(--ink-900)', borderTop: '1px solid var(--ink-800)', padding: '88px 32px' }}>
        <div style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
        }}>
          {/* Car image placeholder */}
          <div style={{
            width: '100%',
            aspectRatio: '4 / 3',
            border: '1px dashed var(--ink-700)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-500)', letterSpacing: '0.1em' }}>GT3_CAR_3Q</span>
          </div>
          <div>
            <span className="bm-eyebrow">The machine</span>
            <h2 style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              marginTop: '12px',
              color: 'var(--ink-0)',
              maxWidth: '16ch',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
            }}>
              565 hp of student-built engineering
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-300)', lineHeight: 1.6, marginTop: '16px', maxWidth: '46ch', fontFamily: 'var(--font-text)' }}>
              Homologated bodywork, race aero and a student-built drivetrain. These are our targets — real numbers land once the car runs.
            </p>
            <div style={{ display: 'flex', gap: '44px', flexWrap: 'wrap', marginTop: '28px' }}>
              <StatChip label="Power" value="565" unit="hp" inverse accent />
              <StatChip label="Weight" value="1245" unit="kg" inverse />
              <StatChip label="Gearbox" value="6" unit="seq" inverse />
            </div>
            <div style={{ marginTop: '30px' }}>
              <Link href="/car">
                <Button variant="accent" size="lg">Full spec sheet</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
