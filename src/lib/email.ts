import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = 'adamvi@uio.no';
const FROM = 'Burnout Motors <onboarding@resend.dev>';

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Ny kontaktmelding: ${data.subject || '(intet emne)'}`,
    html: `
      <h2>Ny melding via burnoutmotors.org</h2>
      <p><strong>Fra:</strong> ${data.name} (${data.email})</p>
      <p><strong>Emne:</strong> ${data.subject || '—'}</p>
      <hr />
      <p>${data.message.replace(/\n/g, '<br />')}</p>
    `,
  });
}

export async function sendApplicationNotification(data: {
  name: string;
  email: string;
  field: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Ny søknad: ${data.name}`,
    html: `
      <h2>Ny teamssøknad via burnoutmotors.org</h2>
      <p><strong>Navn:</strong> ${data.name}</p>
      <p><strong>E-post:</strong> ${data.email}</p>
      <p><strong>Studieretning:</strong> ${data.field}</p>
    `,
  });
}
