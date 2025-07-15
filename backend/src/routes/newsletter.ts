import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();

const RESEND_API_KEY = process.env.RESEND_API_KEY;

router.post('/', async (req, res) => {
  const { email, firstName, lastName } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  try {
    await prisma.newsletterSignup.create({
      data: {
        email,
        firstName: firstName || null,
        lastName: lastName || null,
      },
    });
    // Send welcome email via Resend
    if (RESEND_API_KEY) {
      try {
        await axios.post(
          'https://api.resend.com/emails',
          {
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Welcome to the EEGNITE Newsletter!',
            html: `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f6f8fa;font-family:Segoe UI,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f8fa;padding:32px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.04);overflow:hidden;">
            <tr>
              <td style="background:#1a2236;padding:24px 0;text-align:center;">
                <span style="color:#fff;font-size:28px;font-weight:700;letter-spacing:1px;">EEGNITE</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 16px 32px;">
                <h1 style="margin:0 0 12px 0;font-size:22px;color:#1a2236;font-weight:600;">Welcome to the EEGNITE Newsletter!</h1>
                <p style="margin:0 0 18px 0;font-size:16px;color:#333;">Hi${firstName ? ' ' + firstName : ''},</p>
                <p style="margin:0 0 18px 0;font-size:16px;color:#333;">Thank you for subscribing to <b>EEGNITE's</b> newsletter! 🚀<br/>You're now part of a community passionate about growth, marketing, and innovation.</p>
                <p style="margin:0 0 24px 0;font-size:16px;color:#333;">Expect actionable tips, exclusive resources, and the latest insights delivered straight to your inbox.</p>
                <div style="text-align:center;margin:32px 0;">
                  <a href="https://eegnite.com" style="display:inline-block;padding:12px 28px;background:#1a2236;color:#fff;font-size:16px;font-weight:600;border-radius:6px;text-decoration:none;">Visit EEGNITE</a>
                </div>
                <p style="margin:0 0 0 0;font-size:14px;color:#888;">If you have any questions, just reply to this email—we're here to help!</p>
              </td>
            </tr>
            <tr>
              <td style="background:#f6f8fa;padding:18px 32px;text-align:center;font-size:12px;color:#999;">
                © ${new Date().getFullYear()} EEGNITE. All rights reserved.<br/>
                You’re receiving this email because you subscribed to EEGNITE’s newsletter.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
          },
          {
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (err) {
        // Log but do not block signup if email fails
        const error = err as any;
        console.error('Resend email error:', error?.response?.data || error?.message || error);
      }
    }
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === 'P2002') {
      // Unique constraint failed (already subscribed)
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }
    res.status(500).json({ success: false, error: 'Failed to save newsletter signup' });
  }
});

export default router;
