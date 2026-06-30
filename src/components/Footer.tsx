import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink-1000)',
      color: 'var(--ink-300)',
      padding: '48px 32px',
      borderTop: '1px solid var(--ink-700)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Image src="/logos/burnout-tiger-white.png" alt="" width={40} height={40} style={{ height: '40px', width: 'auto' }} />
          <div>
            <Image src="/logos/burnout-wordmark-white.png" alt="Burnout Motors" width={120} height={14} style={{ height: '14px', width: 'auto', marginBottom: '6px', display: 'block' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.04em' }}>
              Universitetet i Oslo · GT3 · Racing NM
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.04em' }}>
          © Burnout Motors — Break · fix · retest
        </div>
      </div>
    </footer>
  );
}
