import express from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || '3001';
const resendApiKey = process.env.RESEND_API_KEY;
const defaultFrom = process.env.EMAIL_FROM || 'contact@site.sudipmahatara.com.np';
//  const defaultFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

console.log('EMAIL_FROM loaded as:', defaultFrom);

if (!resendApiKey) {
  console.warn('Warning: RESEND_API_KEY is not set. Email sending will fail until it is configured.');
}

const resend = new Resend(resendApiKey || '');

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, html, from } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || defaultFrom,
      to: Array.isArray(to)
        ? to
        : String(to).split(',').map((email) => email.trim()),
      subject,
      html
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, result: data });
  } catch (error) {
    console.error('Resend exception:', error);
    return res.status(500).json({ error: 'Email sending failed' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(Number(port), () => {
  console.log(`Resend email server running on http://localhost:${port}`);
});
