const RESEND_API = 'https://api.resend.com/emails';
const TO = 'adamvi@uio.no';
const FROM = 'Burnout Motors <onboarding@resend.dev>';

async function send(subject: string, html: string) {
  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: TO, subject, html }),
  });

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status}`);
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await send(
    `Ny kontaktmelding: ${data.subject || '(intet emne)'}`,
    `
      <h2>Ny melding via burnoutmotors.org</h2>
      <p><strong>Fra:</strong> ${data.name} (${data.email})</p>
      <p><strong>Emne:</strong> ${data.subject || '—'}</p>
      <hr />
      <p>${data.message.replace(/\n/g, '<br />')}</p>
    `
  );
}

export async function sendApplicationNotification(data: {
  name: string;
  email: string;
  field: string;
}) {
  await send(
    `Ny søknad: ${data.name}`,
    `
      <h2>Ny teamssøknad via burnoutmotors.org</h2>
      <p><strong>Navn:</strong> ${data.name}</p>
      <p><strong>E-post:</strong> ${data.email}</p>
      <p><strong>Studieretning:</strong> ${data.field}</p>
    `
  );
}
