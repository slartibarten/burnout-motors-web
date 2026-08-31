import { NextRequest, NextResponse } from 'next/server';
import { createDbConnection } from '@/lib/db';
import { sendContactNotification, type EnquiryType } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { cleanString, cleanOptionalString, isValidEmail } from '@/lib/validation';

// Må holdes i synk med <Select>-alternativene i src/components/ContactForm.tsx.
const ENQUIRY_TYPES = ['partner', 'rekruttering', 'presse', 'annet'] as const;

function parseEnquiryType(value: unknown): EnquiryType {
  return typeof value === 'string' && (ENQUIRY_TYPES as readonly string[]).includes(value)
    ? (value as EnquiryType)
    : 'annet';
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(getClientIp(req))) {
      return NextResponse.json(
        { code: 'rate_limit', error: 'For mange forsøk. Prøv igjen om litt.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot: the "website" field is hidden from real users. If it's filled,
    // it's a bot — pretend success so it doesn't retry, but do nothing.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const name = cleanString(body.name, 255);
    const email = cleanString(body.email, 254);
    const message = cleanString(body.message, 5000);
    const subject = cleanOptionalString(body.subject, 255);
    // Ukjente eller manglende verdier faller tilbake til 'annet' framfor å feile,
    // slik at en gammel cachet klientbundle aldri kan bryte en innsending.
    const type = parseEnquiryType(body.type);

    if (!name || !email || !message) {
      return NextResponse.json(
        { code: 'missing_fields', error: 'Navn, e-post og melding er påkrevd.' },
        { status: 400 }
      );
    }
    if (subject === null) {
      return NextResponse.json(
        { code: 'missing_fields', error: 'Ugyldig emne.' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { code: 'invalid_email', error: 'Ugyldig e-postadresse.' },
        { status: 400 }
      );
    }

    const db = await createDbConnection();

    try {
      await db.execute(
        'INSERT INTO contact_submissions (name, email, enquiry_type, subject, message) VALUES (?, ?, ?, ?, ?)',
        [name, email, type, subject, message]
      );
    } finally {
      await db.end();
    }

    sendContactNotification({ name, email, subject, message, type }).catch((err) =>
      console.error('Email notification failed:', err)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { code: 'server', error: 'Noe gikk galt. Prøv igjen.' },
      { status: 500 }
    );
  }
}
