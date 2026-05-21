// api/send-email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const defaultFrom = process.env.EMAIL_FROM || 'contact@site.sudipmahatara.com.np';

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, subject, html, from } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || defaultFrom,
      to: Array.isArray(to)
        ? to
        : String(to).split(',').map((email: string) => email.trim()),
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, result: data });
  } catch (err) {
    console.error('Resend exception:', err);
    return res.status(500).json({ error: 'Email sending failed' });
  }
}
