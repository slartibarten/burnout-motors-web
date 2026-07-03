import { NextRequest, NextResponse } from 'next/server';
import { createDbConnection } from '@/lib/db';
import { sendApplicationNotification } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { cleanString, isValidEmail } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(getClientIp(req))) {
      return NextResponse.json({ error: 'For mange forsøk. Prøv igjen om litt.' }, { status: 429 });
    }

    const body = await req.json();

    // Honeypot: the "website" field is hidden from real users. If it's filled,
    // it's a bot — pretend success so it doesn't retry, but do nothing.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const name = cleanString(body.name, 255);
    const email = cleanString(body.email, 254);
    const field = cleanString(body.field, 255);

    if (!name || !email || !field) {
      return NextResponse.json({ error: 'Alle felt er påkrevd.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Ugyldig e-postadresse.' }, { status: 400 });
    }

    const db = await createDbConnection();

    try {
      await db.execute(
        'INSERT INTO team_applications (name, email, field_of_study) VALUES (?, ?, ?)',
        [name, email, field]
      );
    } finally {
      await db.end();
    }

    sendApplicationNotification({ name, email, field }).catch((err) =>
      console.error('Email notification failed:', err)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Application error:', err);
    return NextResponse.json({ error: 'Noe gikk galt. Prøv igjen.' }, { status: 500 });
  }
}
