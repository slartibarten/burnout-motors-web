import PageShell from '@/components/PageShell';

const specs = [
  ['Engine', '4.0 L twin-turbo V8'],
  ['Power', '565 hp @ 8 650 rpm'],
  ['Torque', '700 Nm'],
  ['Gearbox', '6-speed sequential'],
  ['Weight', '1 245 kg'],
  ['Aero', 'Adjustable rear wing'],
  ['Tyres', 'Slick · 310/710 R18'],
  ['Class', 'GT3'],
];

export default function CarPage() {
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
          <span className="bm-eyebrow">The machine</span>
          <h1 style={{
            fontSize: 'clamp(44px, 6vw, 76px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
          }}>
            THE <span style={{ color: 'var(--ember-500)' }}>GT3</span> CAR
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--ink-200)',
            maxWidth: '54ch',
            marginTop: '16px',
            lineHeight: 1.55,
            fontFamily: 'var(--font-text)',
          }}>
            A full GT3-spec competition car — homologated bodywork, race aero and a student-built drivetrain. The figures below are our targets — we&apos;ll publish real numbers once the car runs.
          </p>
          {/* Car image placeholder */}
          <div style={{
            marginTop: '40px',
            width: '100%',
            aspectRatio: '21 / 9',
            border: '1px dashed var(--ink-700)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-500)', letterSpacing: '0.1em' }}>GT3_CAR_HERO — 21:9 hero shot</span>
          </div>
        </div>
      </section>

      {/* SPEC SHEET */}
      <section style={{ padding: '64px 32px 88px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">Specifications</span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 0,
            marginTop: '20px',
            border: '1px solid var(--ink-700)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}>
            {specs.map(([key, value], i) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '22px 26px',
                  borderBottom: i < specs.length - 2 ? '1px solid var(--ink-700)' : undefined,
                  borderRight: i % 2 === 0 ? '1px solid var(--ink-700)' : undefined,
                  background: 'var(--ink-900)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-400)',
                }}>{key}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  color: 'var(--ink-0)',
                  fontWeight: 700,
                }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
