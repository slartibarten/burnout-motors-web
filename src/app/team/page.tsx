import PageShell from '@/components/PageShell';
import ApplyForm from '@/components/ApplyForm';

const members = [
  { name: 'Johar Khalid', role: '' },
  { name: 'Adam Dehli Villanger', role: '' },
  { name: 'Filip Wlodarczyk', role: '' },
  { name: 'Nikolai Handeland', role: 'Electronics' },
  { name: 'August Dehlin Høyden', role: 'Mechanical' },
  { name: 'Rokas Naudziunas', role: 'Mentor / Driver' },
  { name: 'Vladislav Foss', role: 'Mentor / Driver' },
  { name: 'Albert Synnerström', role: '' },
  { name: 'Ferdinand Fjeld Adade', role: '' },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

export default function TeamPage() {
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
          background: 'radial-gradient(50% 70% at 80% 25%, rgba(255,61,0,0.16), transparent 64%)',
        }} />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
          <span className="bm-eyebrow">Join Burnout Motors</span>
          <h1 style={{
            fontSize: 'clamp(40px, 5.4vw, 64px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            maxWidth: '16ch',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 0.95,
          }}>
            BUILD A RACE CAR. BECOME AN ENGINEER.
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--ink-200)',
            maxWidth: '54ch',
            marginTop: '16px',
            lineHeight: 1.5,
            fontFamily: 'var(--font-text)',
          }}>
            We recruit students from every faculty at UiO — not only mechanical engineers. If you want to learn by doing, there&apos;s a seat for you.
          </p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section style={{ padding: '64px 32px', background: 'var(--ink-900)', borderTop: '1px solid var(--ink-700)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <span className="bm-eyebrow">Meet the team</span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginTop: '20px',
          }}>
            {members.map((m) => (
              <div key={m.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: 'var(--ink-1000)',
                  border: '1px solid var(--ink-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '32px',
                    color: 'var(--ink-500)',
                    letterSpacing: '0.04em',
                  }}>{initials(m.name)}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: 'var(--ink-0)',
                  marginTop: '12px',
                }}>{m.name}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--ink-400)',
                  marginTop: '2px',
                  letterSpacing: '0.02em',
                }}>{m.role || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section style={{ padding: '72px 32px 96px', background: 'var(--ink-1000)', borderTop: '1px solid var(--ink-800)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span className="bm-eyebrow">Apply</span>
          <h2 style={{
            fontSize: 'clamp(30px, 4vw, 46px)',
            marginTop: '12px',
            color: 'var(--ink-0)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
          }}>
            Apply to join the team
          </h2>
          <p style={{
            fontSize: '17px',
            color: 'var(--ink-300)',
            marginTop: '14px',
            marginBottom: '32px',
            lineHeight: 1.6,
            maxWidth: '52ch',
            fontFamily: 'var(--font-text)',
          }}>
            Recruitment opens each semester. Tell us who you are and what you study — no prior motorsport experience required, only the will to put in the hours.
          </p>
          <ApplyForm />
        </div>
      </section>
    </PageShell>
  );
}
