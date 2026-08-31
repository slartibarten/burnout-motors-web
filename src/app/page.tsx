import PageShell from '@/components/PageShell';
import Image from 'next/image';
import { Badge, Button } from '@/components/ui';
import { Reveal, Counter, TiltCard, ParallaxHero } from '@/components/motion';
import ApplyForm from '@/components/ApplyForm';
import ContactForm from '@/components/ContactForm';
import RaceStrip from '@/components/RaceStrip';
import { getLocale, getT } from '@/lib/i18n';

// Riktig sideforhold per logo — alle tre lå tidligere på 140×32, som er feil
// for to av dem. Målene er 2× visningsstørrelse, ikke kildeoppløsningen:
// med width={591} bygget Next en srcset på 1200px for en logo som vises i 56.
// UiO-seglet er rødt og beholder fargen; de to andre er svart strek og
// må inverteres for å synes mot mørk bakgrunn.
const partnerLogos = [
  { name: 'Universitetet i Oslo', logo: '/logos/partners/uio.png', width: 112, height: 112, boxClass: 'h-14', invert: false },
  { name: 'Sparebankstiftelsen DNB', logo: '/logos/partners/sparebankstiftelsen.png', width: 136, height: 112, boxClass: 'h-14', invert: true },
  { name: 'Ignite', logo: '/logos/partners/ignite.png', width: 352, height: 128, boxClass: 'h-16', invert: true },
  { name: 'Powertrain Europe AS', logo: '/logos/partners/powertrain.png', width: 206, height: 60, boxClass: 'h-10', invert: false },
];

// Samsvarer med footeren. MERK: adressen må opprettes hos domeneleverandøren før deploy.
const CONTACT_EMAIL = 'adamv@burnoutmotors.no';

// Sortert etter ansvarsområde: ledelse → drift → mekanikk → elektronikk → mentor/fører.
const members: { name: string; role: string; photo?: string }[] = [
  { name: 'Adam Dehli Villanger', role: 'Co-Project Lead', photo: '/images/team/adam.png' },
  { name: 'Filip Wlodarczyk', role: 'Co-Project Lead', photo: '/images/team/filip.png' },
  { name: 'Johar Khalid', role: 'Operations', photo: '/images/team/johar.png' },
  { name: 'August Dehlin Høyden', role: 'Mechanical', photo: '/images/team/august.png' },
  { name: 'Albert Synnerström', role: 'Mechanical', photo: '/images/team/albert.png' },
  { name: 'Ådne Leraan', role: 'Mechanical', photo: '/images/team/adne.png' },
  { name: 'Oskar Aanonsen', role: 'Mechanical', photo: '/images/team/oskar.png' },
  { name: 'Ferdinand Fjeld Adade', role: 'Mechanical / Marketing', photo: '/images/team/ferdinand.png' },
  { name: 'Nikolai Handeland', role: 'Electronics', photo: '/images/team/nikolai.png' },
  { name: 'Rokas Naudziunas', role: 'Mentor / Driver' },
  { name: 'Vladislav Foss', role: 'Mentor / Driver' },
  { name: 'Fadhil Khan', role: 'Mentor' },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = getT(locale);
  const h = t.home;
  const currentYear = new Date().getFullYear();

  return (
    <PageShell>
      {/* HJEM / HERO */}
      {/* svh, ikke vh: på mobil regner vh med adresselinjen og gir et hero
          høyere enn det synlige vinduet. */}
      <section id="hjem" className="relative flex min-h-[calc(100svh-72px)] flex-col overflow-hidden bg-[var(--ink-1000)] text-[var(--ink-0)]">
        <div
          className="bm-glow-anim pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(58% 60% at 70% 44%, rgba(225,6,0,0.26) 0%, rgba(225,6,0,0.12) 32%, transparent 68%)' }}
        />

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
              sizes="(min-width: 1024px) 56vw, 0px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-[var(--ember-500)]" />
            <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-[var(--ember-500)]" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[var(--ember-500)]" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[var(--ember-500)]" />
            <span className="pointer-events-none absolute bottom-5 right-12 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--ink-200)]">
              BURNOUT&nbsp;//&nbsp;GT3
            </span>
          </div>
        </ParallaxHero>

        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
          style={{ background: 'linear-gradient(90deg, #000 30%, transparent 70%)' }}
        />

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
                <Button href="#partnere" variant="accent" size="lg">{h.cta_partner}</Button>
                <Button href="#apply" variant="outline" size="lg">{h.cta_join}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Ingen `priority` her: den ligger under tekstblokka på mobil, så den
            er ikke LCP. Med priority forhåndslastet desktop et 1280px-bilde
            som aldri vises. */}
        <div className="relative z-[1] mx-5 mb-8 aspect-video overflow-hidden rounded-lg border border-[var(--ink-700)] sm:mx-8 lg:hidden">
          <Image
            src="/images/car-frederikke.jpg"
            alt={locale === 'en' ? 'Burnout Motors GT3 car at Frederikke plass' : 'Burnout Motors GT3-bil på Frederikke plass'}
            fill
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-cover"
          />
        </div>
      </section>

      {/* RACE-STRIP */}
      <RaceStrip labels={h.race} />

      {/* MOMENTUM */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-900)] px-5 py-16 sm:px-8">
        <Reveal className="mx-auto grid max-w-[var(--container-max)] grid-cols-2 gap-8 lg:grid-cols-3">
          {h.momentum.map(([value, label]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--ink-300)]">
                {label}
              </span>
              <span className="font-[family-name:var(--font-display)] text-[44px] font-extrabold leading-none text-[var(--ink-0)]">
                <Counter value={value} />
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* OM OSS */}
      <section id="om-oss" className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="mx-auto max-w-[var(--container-max)]">
          <Reveal>
            <span className="bm-eyebrow">{h.mission_eyebrow}</span>
            <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(30px,4vw,44px)] font-extrabold leading-[0.98] text-[var(--ink-0)]">
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

          {/* Historien */}
          <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="bm-eyebrow">{t.about.story_eyebrow}</span>
              <h3 className="mt-3 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.05] text-[var(--ink-0)]">
                {t.about.story_title}
              </h3>
              {/* «Grunnlagt 2024» stod her i 56px i tillegg til i momentum-
                  stripa og i avsnittet rett over. Tre ganger på to skjermer. */}
              <p className="mt-4 max-w-[52ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.65] text-[var(--ink-300)]">
                {t.about.story_p}
              </p>
            </Reveal>
            <Reveal delay={100}>
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
          </div>

          {/* Veien til NM */}
          <div className="mt-20">
            <Reveal>
              <span className="bm-eyebrow">{h.roadmap_eyebrow}</span>
              <h3 className="mt-3 max-w-[24ch] font-[family-name:var(--font-display)] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.05] text-[var(--ink-0)]">
                {h.roadmap_title}
              </h3>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {h.roadmap.map(([year, title, desc], i) => {
                // Fylt prikk = nådd, hul prikk = ikke nådd ennå. Uten dette
                // leste 2027 som «nå», siden rødt er konvensjonen for nåtid.
                const y = Number(year);
                const state = y < currentYear ? 'done' : y === currentYear ? 'now' : 'goal';
                const reached = state !== 'goal';
                return (
                  <Reveal key={year} delay={i * 80}>
                    <div className={`relative border-t-2 pt-5 ${state === 'now' ? 'border-[var(--ember-500)]' : 'border-[var(--ink-700)]'}`}>
                      <span
                        className={`absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full ${
                          state === 'now'
                            ? 'bg-[var(--ember-500)]'
                            : reached
                              ? 'bg-[var(--ink-400)]'
                              : 'border-2 border-[var(--ember-500)] bg-[var(--ink-1000)]'
                        }`}
                      />
                      <div className="flex items-center gap-2.5">
                        <span className={`font-[family-name:var(--font-mono)] text-[12px] tracking-[0.18em] ${state === 'done' ? 'text-[var(--ink-400)]' : 'text-[var(--ember-400)]'}`}>
                          {year}
                        </span>
                        {state !== 'done' && (
                          <span
                            className={`rounded-[var(--radius-pill)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] ${
                              state === 'now'
                                ? 'bg-[var(--ember-500)] text-[var(--ink-0)]'
                                : 'border border-[var(--ember-500)] text-[var(--ember-400)]'
                            }`}
                          >
                            {state === 'now' ? h.roadmap_now : h.roadmap_goal}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-2 font-[family-name:var(--font-display)] text-[18px] font-bold text-[var(--ink-0)]">{title}</h4>
                      <p className="m-0 mt-2 font-[family-name:var(--font-text)] text-[14px] leading-[1.55] text-[var(--ink-300)]">{desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BILEN */}
      <section id="bilen" className="border-t border-[var(--ink-800)] bg-[var(--ink-900)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
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
              <h2 className="mt-3 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[0.98] text-[var(--ink-0)]">
                {h.machine_title}
              </h2>
              <p className="mt-4 max-w-[46ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.6] text-[var(--ink-300)]">
                {h.machine_desc}
              </p>
            </Reveal>
          </div>

          {/* Video */}
          <Reveal className="mt-20">
            <span className="bm-eyebrow">{t.car.video_eyebrow}</span>
            <h3 className="mt-3 mb-6 max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.05] text-[var(--ink-0)]">
              {t.car.video_title}
            </h3>
            {/* Venstrestilt som resten av siden. Videoen lå sentrert mens
                overskriften var venstrestilt, ~400px fra hverandre på 1280px. */}
            <div className="relative w-full max-w-[380px] overflow-hidden rounded-lg border border-[var(--ink-700)] bg-[var(--ink-1000)]">
              <video
                src="/images/bilen-starter.mp4"
                poster="/images/bilen-starter-poster.jpg"
                controls
                playsInline
                preload="metadata"
                aria-label={t.car.video_title}
                className="block w-full max-h-[70vh]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative overflow-hidden border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="relative z-10 mx-auto max-w-[var(--container-max)]">
          <Reveal>
            <span className="bm-eyebrow">{t.team.eyebrow}</span>
            <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[0.98] text-[var(--ink-0)]">
              {t.team.hero_title}
            </h2>
            <p className="mt-4 max-w-[54ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.55] text-[var(--ink-200)]">
              {t.team.hero_desc}
            </p>
          </Reveal>

          {/* Rutenettet stod uten overskrift, så man scrollet rett fra
              rekrutteringspitchen inn i ti navnløse ruter. Teksten fantes
              allerede i locale-fila, den var bare aldri koblet på. */}
          <Reveal className="mt-14">
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(20px,2.2vw,26px)] font-extrabold leading-[1.05] text-[var(--ink-0)]">
              {t.team.grid_eyebrow}
            </h3>
          </Reveal>

          <div className="relative mt-7">
            {/* Stor hvit tiger-logo bak team-rutenettet — vises i mellomrom og marg. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.11]"
              style={{
                width: 'min(1400px, 132%)',
                aspectRatio: '1 / 1',
                backgroundImage: 'url(/logos/burnout-tiger-all-white.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          <div className="relative z-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 60}>
                <div className="flex flex-col">
                  <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded border border-[var(--ink-700)] bg-[var(--ink-900)]">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                      />
                    ) : (
                      <span aria-hidden="true" className="font-[family-name:var(--font-display)] text-[32px] font-bold tracking-[0.04em] text-[var(--ink-300)]">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 font-[family-name:var(--font-display)] text-[15px] font-bold text-[var(--ink-0)] sm:text-[16px]">{m.name}</div>
                  <div className="mt-0.5 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.02em] text-[var(--ink-300)]">{m.role || '—'}</div>
                </div>
              </Reveal>
            ))}
          </div>
          </div>

          {/* Søknad */}
          <div id="apply" className="mx-auto mt-20 max-w-[720px]">
            <Reveal>
              <span className="bm-eyebrow">{t.team.apply_eyebrow}</span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.05] text-[var(--ink-0)]">
                {t.team.apply_title}
              </h3>
              <p className="mb-8 mt-3.5 max-w-[52ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.6] text-[var(--ink-300)]">
                {t.team.apply_desc}
              </p>
              <ApplyForm labels={t.team.form} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNERE */}
      <section id="partnere" className="border-t border-[var(--ink-800)] bg-[var(--ink-900)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
        <div className="mx-auto max-w-[var(--container-max)]">
          <Reveal>
            <span className="bm-eyebrow">{t.partners.eyebrow}</span>
            <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[0.98] text-[var(--ink-0)]">
              {t.partners.hero_title}
            </h2>
            <p className="mt-4 max-w-[56ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.55] text-[var(--ink-200)]">
              {t.partners.hero_desc}
            </p>
          </Reveal>

          <Reveal className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-300)]">
              {h.partners_label}
            </span>
            <div className="flex flex-wrap items-center gap-10">
              {partnerLogos.map((p) => (
                <Image
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  className={`${p.boxClass} w-auto ${p.invert ? 'invert' : ''}`}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(20px,2.2vw,26px)] font-extrabold leading-[1.05] text-[var(--ink-0)]">
              {t.partners.tiers_eyebrow}
            </h3>
          </Reveal>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.partners.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80}>
                <TiltCard className="h-full rounded-lg border border-[var(--ink-700)] bg-[var(--ink-1000)] p-8">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: i === 0 ? 'var(--ember-500)' : i === 1 ? 'var(--ink-200)' : 'var(--ink-400)' }}
                    />
                    <h3 className="m-0 font-[family-name:var(--font-display)] text-[22px] font-bold text-[var(--ink-0)]">{tier.name}</h3>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {tier.perks.map((perk) => (
                      <div key={perk} className="flex items-start gap-2.5">
                        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[13px] leading-[1.5] text-[var(--ember-400)]">→</span>
                        <span className="font-[family-name:var(--font-text)] text-[14px] leading-[1.5] text-[var(--ink-300)]">{perk}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-[var(--ink-700)] border-l-[3px] border-l-[var(--ember-500)] bg-[var(--ink-1000)] p-8">
            <div>
              <h3 className="m-0 font-[family-name:var(--font-display)] text-[24px] font-bold text-[var(--ink-0)]">{t.partners.cta_title}</h3>
              <p className="mb-0 mt-2 font-[family-name:var(--font-text)] text-[15px] text-[var(--ink-300)]">{t.partners.cta_desc}</p>
            </div>
            <Button href="#kontakt" variant="accent" size="lg">{t.partners.cta_btn}</Button>
          </Reveal>
        </div>
      </section>

      {/* FØLG REISEN — bevisst nedtonet: dette lå tidligere i nøyaktig samme
          stripe-kort som sponsor-CTA-en rett over, så en Instagram-følging
          leste som like viktig som sidens fremste kommersielle spørsmål. */}
      <section className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 sm:px-8" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="mx-auto max-w-[var(--container-max)]">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <div className="max-w-[560px]">
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-bold leading-[1.15] text-[var(--ink-0)]">
                {h.follow_title}
              </h3>
              <p className="mb-0 mt-1.5 font-[family-name:var(--font-text)] text-[14px] leading-[1.6] text-[var(--ink-300)]">
                {h.follow_desc}
              </p>
            </div>
            <a
              href="https://www.instagram.com/burnoutmotorsno/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.06em] text-[var(--ink-0)] underline decoration-[var(--ember-500)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--ember-400)]"
            >
              {h.follow_cta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="border-t border-[var(--ink-800)] bg-[var(--ink-1000)] px-5 sm:px-8" style={{ paddingTop: '88px', paddingBottom: '96px' }}>
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <span className="bm-eyebrow">{t.contact.eyebrow}</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[0.98] text-[var(--ink-0)]">
              {t.contact.hero_title}
            </h2>
            <p className="mb-8 mt-3.5 max-w-[54ch] font-[family-name:var(--font-text)] text-[16px] leading-[1.55] text-[var(--ink-200)]">
              {t.contact.hero_desc}
            </p>
            <ContactForm labels={t.contact.form} />
            <p className="mt-6 text-center font-[family-name:var(--font-text)] text-[15px] text-[var(--ink-300)]">
              {t.contact.email_label}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-[family-name:var(--font-mono)] text-[var(--ink-0)] underline decoration-[var(--ember-500)] decoration-2 underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
