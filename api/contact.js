export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const {
    name = '',
    email = '',
    company = '',
    service = '',
    message = '',
    website = ''
  } = req.body || {};

  // Basic bot trap via hidden field.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !service || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  const zeptoTokenRaw = process.env.ZOHO_ZEPTOMAIL_TOKEN;
  const fromAddress = process.env.ZOHO_FROM_EMAIL;
  const toAddress =
    process.env.ZOHO_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'hello@devndespro.com';
  const apiUrl = process.env.ZOHO_ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';

  if (!zeptoTokenRaw || !fromAddress || !toAddress) {
    return res.status(500).json({
      ok: false,
      error:
        'Server email is not configured. Set ZOHO_ZEPTOMAIL_TOKEN, ZOHO_FROM_EMAIL, and ZOHO_TO_EMAIL.'
    });
  }

  // Accept either a raw ZeptoMail key or an already prefixed value.
  const zeptoToken = String(zeptoTokenRaw).replace(/^Zoho-enczapikey\s+/i, '');

  const safe = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const subject = `New project inquiry: ${safe(name)}`;
  const htmlbody = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;">
      <h2 style="margin:0 0 12px;">New inquiry from devndespro.com</h2>
      <p><strong>Name:</strong> ${safe(name)}</p>
      <p><strong>Email:</strong> ${safe(email)}</p>
      <p><strong>Company:</strong> ${safe(company || 'N/A')}</p>
      <p><strong>Service:</strong> ${safe(service)}</p>
      <p><strong>Message:</strong><br>${safe(message).replace(/\n/g, '<br>')}</p>
    </div>
  `;

  const text = [
    'New inquiry from devndespro.com',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'N/A'}`,
    `Service: ${service}`,
    'Message:',
    message
  ].join('\n');

  try {
    const zohoResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Zoho-enczapikey ${zeptoToken}`
      },
      body: JSON.stringify({
        from: {
          address: fromAddress,
          name: 'devndespro Website'
        },
        to: [
          {
            email_address: {
              address: toAddress,
              name: 'devndespro'
            }
          }
        ],
        reply_to: [
          {
            address: email,
            name
          }
        ],
        subject,
        htmlbody,
        textcontent: text
      })
    });

    if (!zohoResponse.ok) {
      const details = await zohoResponse.text();
      return res.status(502).json({ ok: false, error: 'Zoho send failed', details });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }
}
