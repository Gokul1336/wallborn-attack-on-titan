import nodemailer from 'nodemailer';

// Gmail SMTP via an app password (not your normal Gmail password).
// Generate one at https://myaccount.google.com/apppasswords
// (requires 2-Step Verification to be turned on for the Google account).
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const COPY = {
  'verify-email': {
    subject: 'Verify your Wallborn account',
    heading: 'Confirm your email',
    body: 'Enter this code in the app to verify your email address.',
  },
  'reset-password': {
    subject: 'Reset your Wallborn password',
    heading: 'Reset your password',
    body: 'Enter this code to set a new password. If you did not request this, you can ignore this email.',
  },
};

function otpEmailHtml({ heading, body, code, username }) {
  return `
  <div style="background:#0d0f14;padding:32px;font-family:'Source Sans 3',Arial,sans-serif;">
    <div style="max-width:420px;margin:0 auto;background:#1a1d24;border:1px solid rgba(232,220,196,0.12);border-radius:4px;padding:32px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a89e88;margin:0 0 8px;">Wallborn Archive</p>
      <h1 style="color:#e8dcc4;font-size:22px;margin:0 0 16px;">${heading}</h1>
      <p style="color:#a89e88;font-size:14px;line-height:1.6;margin:0 0 24px;">Hi ${username || 'there'}, ${body}</p>
      <div style="background:#0d0f14;border:1px solid rgba(232,220,196,0.12);border-radius:4px;padding:18px;text-align:center;margin-bottom:20px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:32px;letter-spacing:0.2em;color:#c9a24b;">${code}</span>
      </div>
      <p style="color:#a89e88;font-size:12px;margin:0;">This code expires in 10 minutes.</p>
    </div>
  </div>`;
}

export async function sendOtpEmail({ to, username, code, purpose }) {
  const copy = COPY[purpose];
  if (!copy) throw new Error(`Unknown OTP purpose: ${purpose}`);

  await transporter.sendMail({
    from: `"Wallborn Archive" <${process.env.GMAIL_USER}>`,
    to,
    subject: copy.subject,
    html: otpEmailHtml({ heading: copy.heading, body: copy.body, code, username }),
  });
}
