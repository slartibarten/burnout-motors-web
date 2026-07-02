import PageShell from '@/components/PageShell';
import Image from 'next/image';
import { Badge, Button } from '@/components/ui';
import { Reveal, Counter, TiltCard, ParallaxHero } from '@/components/motion';
import { getLocale, getT } from '@/lib/i18n';

const partnerLogos = [
  { name: 'Universitetet i Oslo', logo: '/logos/partners/uio.png' },
  { name: 'Sparebankstiftelsen DNB', logo: '/logos/partners/sparebankstiftelsen.png' },
  { name: 'Ignite', logo: '/logos/partners/ignite.png' },
];

export default function HomePage() {
  const locale = getLocale();
  const t = getT(locale);
  const h = t.home;

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-72px)] flex-col overflow-hidden bg-[var(--ink-1000)] text-[var(--ink-0)]">
        <div
          className="bm-glow-anim pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(58% 60% at 70% 44%, rgba(255,61,0,0.26) 0%, rgba(255,61,0,0.12) 32%, transparent 68%)' }}
        />

        {/* Bilbilde — parallax, kun desktop */}
        <ParallaxHero className="absolute right-[-72px] top-1/2 z-[1] hidden h-[70%] w-[56%] -translate-y-1/2 lg:block">
          <div
            className="relative h-full w-full overflow-hidden rounded-lg"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
            }}
          >
            <Image
              src="/images/car-frederikke.jpg"
              alt={locale === 'en' ? 'Burnout Motors GT3 car at Frederikke plass' : 'Burnout Motors GT3-bil på Frederikke plass'}
              fill
              priority
              sizes="56vw"
              className="object-cover"
            />
            {/* HUD-hjørner */}
            <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-[var(--ember-500)]" />
            <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-[var(--ember-500)]" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[var(--ember-500)]" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[var(--ember-500)]" />
            <span className="pointer-events-none absolute bottom-5 right-12 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] text-[var(--ink-200)]">
              BURNOUT&nbsp;//&nbsp;GT3
            </span>
          </div>
        </ParallaxHero>

        {/* Scrim bak tekstsonen */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
          style={{ background: 'linear-gradient(90deg, #000 30%, transparent 70%)' }}
        />

        {/* Tekst */}
        <div className="relative z-[3] flex flex-1 items-center">
          <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-14 sm:px-8">
            <div className="max-w-[600px]">
              <div className="mb-5 flex gap-2.5">
                <Badge tone="accent" variant="solid" shape="pill">{h.badge_gt3}</Badge>
                <Badge tone="neutral" variant="outline" shape="pill">{h.badge_uni}</Badge>
              </div>
              <h1 className="max-w-[15ch] font-[family-name:var(--font-display)] text-[clamp(40px,6vw,84px)] font-extrabold leading-[0.95] tracking-[-0.01em]">
                {h.hero_title.split('GT3')[0]}
                <span className="text-[var(--ember-500)]">GT3</span>
                {h.hero_title.split('GT3')[1]}
              </h1>
              <p className="mt-6 max-w-[46ch] font-[family-name:var(--font-text)] text-[17px] leading-[1.55] text-[var(--ink-200)] sm:text-[19px]">
                {h.hero_desc}
              </p>
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                <Button href="/partners" variant="accent" size="lg">{h.cta_partner}</Button>
                <Button href="/team#apply" variant="outline" size="lg">{h.cta_join}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bilbilde på mobil/tablet — under teksten */}
        <div className="relative z-[1] mx-5 mb-8 aspect-video overflow-hidden rounded-lg border border-[var(--ink-700)] sm:mx-8 lg:hidden">
          <Image
            src="/images/car-frederikke.jpg"
            alt={locale === 'en' ? 'Burnout Motors GT3 car at Frederikke plass' : 'Burnout Motors GT3-bil på Frederikke plass'}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* MOMENTUM */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-900)] px-5 py-16 sm:px-8">
        <Reveal className="mx-auto grid max-w-[var(--container-max)] grid-cols-2 gap-8 lg:grid-cols-4">
          {h.momentum.map(([value, label], i) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--ink-300)]">
                {label}
              </span>
              <span className="font-[family-name:var(--font-display)] text-[44px] font-extrabold leading-none text-[var(--ink-0)]">
                {i === 0 ? value : <Counter value={value} />}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* OPPDRAGET */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="mx-auto max-w-[var(--container-max)]">
          <Reveal>
            <span className="bm-eyebrow">{h.mission_eyebrow}</span>
            <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(30px,4vw,44px)] font-extrabold text-[var(--ink-0)]">
              {h.mission_title}
            </h2>
          </Reveal>
          <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {h.mission_cards.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 80}>
                <TiltCard className="h-full rounded-lg border border-[var(--ink-700)] border-l-[3px] border-l-[var(--ember-500)] bg-[var(--ink-900)] p-7">
                  <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-[20px] font-bold text-[var(--ink-0)]">{title}</h3>
                  <p className="m-0 font-[family-name:var(--font-text)] text-[15px] leading-[1.55] text-[var(--ink-300)]">{desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MASKINEN */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-900)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--ink-700)]">
              <Image
                src="/images/motor-test.jpg"
                alt={locale === 'en' ? 'Engine test on the Burnout Motors GT3 car' : 'Motortest på Burnout Motors GT3-bil'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="bm-eyebrow">{h.machine_eyebrow}</span>
            <h2 className="mt-3 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,40px)] font-extrabold text-[var(--ink-0)]">
              {h.machine_title}
            </h2>
            <p className="mt-4 max-w-[46ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.6] text-[var(--ink-300)]">
              {h.machine_desc}
            </p>
            <div className="mt-7">
              <Button href="/car" variant="accent" size="lg">{h.cta_car}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOLKENE */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--ink-700)]">
              <Image
                src="/images/team-jobber.jpg"
                alt={locale === 'en' ? 'The Burnout Motors team working in the workshop' : 'Burnout Motors-teamet jobber i verkstedet'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:order-1">
            <span className="bm-eyebrow">{h.folkene_eyebrow}</span>
            <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,40px)] font-extrabold text-[var(--ink-0)]">
              {h.folkene_title}
            </h2>
            <p className="mt-4 max-w-[46ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.6] text-[var(--ink-300)]">
              {h.folkene_desc}
            </p>
            <div className="mt-7">
              <Button href="/team#apply" variant="accent" size="lg">{h.folkene_cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNERLINJE */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 py-12 sm:px-8">
        <Reveal className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:justify-between">
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-300)]">
            {h.partners_label}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {partnerLogos.map((p) => (
              <Image
                key={p.name}
                src={p.logo}
                alt={p.name}
                width={140}
                height={32}
                className="h-8 w-auto opacity-55 grayscale invert transition-all duration-200 hover:opacity-100"
              />
            ))}
          </div>
          <a
            href="/partners"
            className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--ember-400)] no-underline hover:text-[var(--ember-300)]"
          >
            {h.partners_cta} →
          </a>
        </Reveal>
      </section>

      {/* AVSLUTNING */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 py-24 sm:px-8">
        <Reveal className="mx-auto flex max-w-[var(--container-max)] flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,46px)] font-extrabold text-[var(--ink-0)]">
            {h.closing_title}
          </h2>
          <div className="mt-8 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
            <Button href="/partners" variant="accent" size="lg">{h.cta_partner}</Button>
            <Button href="/team#apply" variant="outline" size="lg">{h.cta_join}</Button>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
