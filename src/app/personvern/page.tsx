import { getLocale, getT } from '@/lib/i18n';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  const locale = getLocale();
  return {
    title: locale === 'en'
      ? 'Privacy Policy — Burnout Motors'
      : 'Personvernerklæring — Burnout Motors',
  };
}

const policyNO = {
  title: 'Personvernerklæring',
  updated: 'Sist oppdatert: 13. juli 2026',
  intro: 'Burnout Motors er et studentprosjekt ved Universitetet i Oslo. Vi tar personvern på alvor og behandler personopplysninger i samsvar med personopplysningsloven og EUs personvernforordning (GDPR).',
  sections: [
    {
      heading: '1. Behandlingsansvarlig',
      body: 'Burnout Motors v/ organisasjonens styre er behandlingsansvarlig for personopplysninger vi samler inn. Kontakt oss på kontakt@burnoutmotors.org ved spørsmål om personvern.',
    },
    {
      heading: '2. Hvilke opplysninger vi samler inn',
      body: null,
      list: [
        '<strong>Kontaktskjema:</strong> navn, e-postadresse, emne og melding.',
        '<strong>Søknadsskjema (bli med i teamet):</strong> navn, e-postadresse og studieretning.',
        '<strong>Cookies:</strong> én funksjonell informasjonskapsel (<code>locale</code>) som lagrer ditt språkvalg (norsk/engelsk). Denne er nødvendig for at nettsiden skal fungere riktig og krever ikke samtykke.',
      ],
    },
    {
      heading: '3. Formål og rettslig grunnlag',
      body: null,
      list: [
        '<strong>Kontaktskjema:</strong> Vi behandler meldingen din for å kunne svare på henvendelsen. Rettslig grunnlag: berettiget interesse (GDPR art. 6(1)(f)).',
        '<strong>Søknadsskjema:</strong> Vi behandler søknaden din for å vurdere opptak til teamet. Rettslig grunnlag: samtykke ved innsending (GDPR art. 6(1)(a)).',
        '<strong>E-postvarsling:</strong> Når du sender inn et skjema, sendes en varsling til teamet via Resend (e-posttjeneste) slik at vi kan følge opp. Dataene i e-posten er de samme som du oppga i skjemaet.',
      ],
    },
    {
      heading: '4. Lagring og sletting',
      body: 'Skjemadata lagres i en MySQL-database hos Hostinger (EU-basert). Kontaktmeldinger slettes innen 12 måneder etter at henvendelsen er besvart. Søknader slettes innen 12 måneder etter innsendt søknad, med mindre du blir tatt opp i teamet. Du kan når som helst be om sletting ved å kontakte oss.',
    },
    {
      heading: '5. Deling med tredjeparter',
      body: 'Vi selger aldri personopplysningene dine. Data deles kun med:',
      list: [
        '<strong>Hostinger</strong> — webhosting og database (databehandler, EU).',
        '<strong>Resend</strong> — e-postvarsling til teamet (databehandler).',
      ],
    },
    {
      heading: '6. Dine rettigheter',
      body: 'Du har rett til å:',
      list: [
        'Be om innsyn i opplysningene vi har om deg.',
        'Be om retting eller sletting av opplysningene.',
        'Trekke tilbake samtykke (for søknadsskjema).',
        'Klage til Datatilsynet (datatilsynet.no) dersom du mener vi behandler opplysningene dine i strid med regelverket.',
      ],
    },
    {
      heading: '7. Kontakt',
      body: 'Spørsmål om personvern kan rettes til kontakt@burnoutmotors.org.',
    },
  ],
};

const policyEN = {
  title: 'Privacy Policy',
  updated: 'Last updated: July 13, 2026',
  intro: 'Burnout Motors is a student project at the University of Oslo. We take privacy seriously and process personal data in accordance with the Norwegian Personal Data Act and the EU General Data Protection Regulation (GDPR).',
  sections: [
    {
      heading: '1. Data controller',
      body: 'Burnout Motors, represented by the organization\'s board, is the data controller for the personal data we collect. Contact us at kontakt@burnoutmotors.org for privacy-related questions.',
    },
    {
      heading: '2. What data we collect',
      body: null,
      list: [
        '<strong>Contact form:</strong> name, email address, subject and message.',
        '<strong>Application form (join the team):</strong> name, email address and field of study.',
        '<strong>Cookies:</strong> one functional cookie (<code>locale</code>) that stores your language preference (Norwegian/English). This is necessary for the website to function correctly and does not require consent.',
      ],
    },
    {
      heading: '3. Purpose and legal basis',
      body: null,
      list: [
        '<strong>Contact form:</strong> We process your message to respond to your inquiry. Legal basis: legitimate interest (GDPR Art. 6(1)(f)).',
        '<strong>Application form:</strong> We process your application to evaluate team admission. Legal basis: consent upon submission (GDPR Art. 6(1)(a)).',
        '<strong>Email notification:</strong> When you submit a form, a notification is sent to the team via Resend (email service) so we can follow up. The data in the email is the same as you provided in the form.',
      ],
    },
    {
      heading: '4. Storage and deletion',
      body: 'Form data is stored in a MySQL database hosted by Hostinger (EU-based). Contact messages are deleted within 12 months after the inquiry has been answered. Applications are deleted within 12 months after submission, unless you are accepted to the team. You can request deletion at any time by contacting us.',
    },
    {
      heading: '5. Third-party sharing',
      body: 'We never sell your personal data. Data is shared only with:',
      list: [
        '<strong>Hostinger</strong> — web hosting and database (data processor, EU).',
        '<strong>Resend</strong> — email notification to the team (data processor).',
      ],
    },
    {
      heading: '6. Your rights',
      body: 'You have the right to:',
      list: [
        'Request access to the data we hold about you.',
        'Request correction or deletion of your data.',
        'Withdraw consent (for the application form).',
        'File a complaint with the Norwegian Data Protection Authority (datatilsynet.no) if you believe we process your data unlawfully.',
      ],
    },
    {
      heading: '7. Contact',
      body: 'Privacy-related questions can be directed to kontakt@burnoutmotors.org.',
    },
  ],
};

export default function PrivacyPage() {
  const locale = getLocale();
  const t = getT(locale);
  const policy = locale === 'en' ? policyEN : policyNO;

  return (
    <>
      <Nav labels={t.nav} locale={locale} />
      <main className="page-enter bg-[var(--ink-1000)] px-5 pb-24 pt-20 text-[var(--ink-0)] sm:px-8">
        <article className="mx-auto max-w-[720px]">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(32px,4vw,48px)] font-extrabold leading-tight">
            {policy.title}
          </h1>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] text-[var(--ink-400)]">
            {policy.updated}
          </p>
          <p className="mt-6 font-[family-name:var(--font-text)] text-[16px] leading-[1.65] text-[var(--ink-200)]">
            {policy.intro}
          </p>

          {policy.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-[family-name:var(--font-display)] text-[20px] font-bold text-[var(--ink-0)]">
                {s.heading}
              </h2>
              {s.body && (
                <p className="mt-3 font-[family-name:var(--font-text)] text-[15px] leading-[1.65] text-[var(--ink-300)]">
                  {s.body}
                </p>
              )}
              {'list' in s && s.list && (
                <ul className="mt-3 flex flex-col gap-2.5 pl-5">
                  {s.list.map((item, i) => (
                    <li
                      key={i}
                      className="font-[family-name:var(--font-text)] text-[15px] leading-[1.6] text-[var(--ink-300)] [&_strong]:text-[var(--ink-100)] [&_code]:rounded [&_code]:bg-[var(--ink-800)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-[family-name:var(--font-mono)] [&_code]:text-[13px]"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>
      <Footer t={t.footer} />
    </>
  );
}
