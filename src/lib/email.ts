import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}
const TO = 'adamvi@uio.no';
const FROM = 'Burnout Motors <onboarding@resend.dev>';

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
}) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\n/g, '<br />');

  await getResend().emails.send({
    from: FROM,
    to: TO,
    subject: `Ny kontaktmelding: ${data.subject || '(intet emne)'}`,
    html: `
      <h2>Ny melding via burnoutmotors.org</h2>
      <p><strong>Fra:</strong> ${name} (${email})</p>
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
    subject: `Ny søknad: ${data.name}`,
    html: `
      <h2>Ny teamssøknad via burnoutmotors.org</h2>
      <p><strong>Navn:</strong> ${name}</p>
      <p><strong>E-post:</strong> ${email}</p>
      <p><strong>Studieretning:</strong> ${field}</p>
    `,
  });
}
