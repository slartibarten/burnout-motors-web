import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

// TODO: point this at a shared team address, not one person's inbox, so leads
// don't stall when someone is on holiday. Set CONTACT_TO in .env.local.
const TO = process.env.CONTACT_TO ?? 'adamv@burnoutmotors.no';

// TODO: verify burnoutmotors.org in Resend (SPF/DKIM) and switch this to
// 'Burnout Motors <noreply@burnoutmotors.org>'. The resend.dev sandbox sender
// can only deliver to the Resend account owner and lands in spam elsewhere.
const FROM = process.env.CONTACT_FROM ?? 'Burnout Motors <onboarding@resend.dev>';

export type EnquiryType = 'partner' | 'rekruttering' | 'presse' | 'annet';

// Prefix makes sponsor leads filterable and visible in a crowded inbox.
const TYPE_PREFIX: Record<EnquiryType, string> = {
  partner: '[PARTNER]',
  rekruttering: '[REKRUTTERING]',
  presse: '[PRESSE]',
  annet: '[KONTAKT]',
};

const TYPE_LABEL: Record<EnquiryType, string> = {
  partner: 'Partnerskap / sponsing',
  rekruttering: 'Rekruttering',
  presse: 'Presse',
  annet: 'Annet',
};

// Escape user input before it goes into the HTML email body, so a submitter
// can't inject links, tracking pixels or markup into the owner's inbox.
function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return c;
    }
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  type?: EnquiryType;
}) {
  const type = data.type ?? 'annet';
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\n/g, '<br />');

  await getResend().emails.send({
    from: FROM,
    to: TO,
    // Hitting Reply now goes to the sender instead of the Resend sandbox address.
    // NOTE: snake_case `reply_to` is correct for resend v3 (see package.json).
    // If you upgrade to resend v4+, rename this to `replyTo`.
    reply_to: data.email,
    subject: `${TYPE_PREFIX[type]} ${data.subject || 'Ny melding'} — ${data.name}`,
    html: `
      <h2>Ny melding via burnoutmotors.org</h2>
      <p><strong>Type:</strong> ${TYPE_LABEL[type]}</p>
      <p><strong>Fra:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
      <p><strong>Emne:</strong> ${subject || '—'}</p>
      <hr />
      <p>${message}</p>
    `,
  });
}

export async function sendApplicationNotification(data: {
  name: string;
  email: string;
  field: string;
}) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const field = escapeHtml(data.field);

  await getResend().emails.send({
    from: FROM,
    to: TO,
    reply_to: data.email,
    subject: `[SØKNAD] ${data.name} — ${data.field}`,
    html: `
      <h2>Ny teamsøknad via burnoutmotors.org</h2>
      <p><strong>Navn:</strong> ${name}</p>
      <p><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Studieretning:</strong> ${field}</p>
    `,
  });
}
