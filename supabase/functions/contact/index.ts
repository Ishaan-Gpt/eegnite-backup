// supabase/functions/contact/index.ts
import { serve } from 'std/server';

// Helper: Validate email
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { firstName, lastName, email, company, website, phone, service, budget, message, newsletter } = data;

  // Basic validation
  if (!firstName || !lastName || !email || !service || !budget || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }
  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
  }

  // Insert into DB
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  const { error: dbError } = await supabase.from('ContactSubmission').insert([
    {
      firstName,
      lastName,
      email,
      company: company || null,
      website: website || null,
      phone: phone || null,
      service,
      budget,
      message,
      newsletter: !!newsletter,
    },
  ]);
  if (dbError) {
    return new Response(JSON.stringify({ error: 'Failed to save submission' }), { status: 500 });
  }

  // Send notification email via Resend
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@eegnite.com',
          to: email, // or your admin email if you want notification to yourself
          subject: 'Thank you for contacting EEGNITE!',
          html: `<p>Hi ${firstName},<br/>Thank you for reaching out to EEGNITE!<br/>We have received your message and will get back to you within 24 hours.<br/><br/>Best regards,<br/>The EEGNITE Team</p>`
        }),
      });
    } catch (err) {
      // Log but do not block user
      console.error('Resend email error:', err);
    }
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}); 