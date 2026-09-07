import { CONTACT_EMAIL } from '../config/siteConfig';

export async function submitLead(formName: 'contact' | 'appointment', fields: Record<string, string>) {
  const clean = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, String(value ?? '').trim()]),
  );

  const netlifyBody = new URLSearchParams({ 'form-name': formName, ...clean });

  try {
    const netlify = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: netlifyBody.toString(),
    });
    if (netlify.ok) return;
  } catch {
    // Local Vite/Express does not accept Netlify form posts — fall through to email.
  }

  const email = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...clean,
      _subject: `Digivate ${formName === 'appointment' ? 'appointment' : 'contact'} — ${clean.name || clean.fullName || 'New inquiry'}`,
      _template: 'table',
    }),
  });

  if (!email.ok) {
    throw new Error('Could not send the inquiry.');
  }
}
