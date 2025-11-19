import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, source, guide } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // TODO: In production, you'll want to:
    // 1. Save to database
    // 2. Send email via Resend
    // 3. Add to email marketing list (ConvertKit, Mailchimp, etc.)

    // For now, log to console (replace with actual implementation)
    console.log('📧 New lead captured:', {
      email,
      source,
      guide,
      timestamp: new Date().toISOString(),
    })

    // Example Resend implementation (uncomment when you have API key):
    /*
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send guide to user
    await resend.emails.send({
      from: 'Elivro <noreply@elivro.se>',
      to: email,
      subject: `Din guide: ${guide}`,
      html: `
        <h1>Tack för ditt intresse!</h1>
        <p>Här är din guide om <strong>${guide}</strong>.</p>
        <p><a href="https://elivro.se/downloads/${guide}.pdf">Ladda ner PDF</a></p>
        <hr />
        <p>Vill du se hur Elivro kan förenkla er assistansverksamhet?</p>
        <p><a href="https://elivro.se/#cta-section">Boka en gratis demo</a></p>
        <br />
        <p style="color: #888; font-size: 12px;">
          Med vänlig hälsning,<br />
          Elivro-teamet<br />
          daniel@elivro.se
        </p>
      `,
    })

    // Notify internal team
    await resend.emails.send({
      from: 'Leads <leads@elivro.se>',
      to: 'daniel@elivro.se',
      subject: `🎯 Ny lead: ${email}`,
      html: `
        <h2>Ny lead från resurser</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Källa:</strong> ${source}</p>
        <p><strong>Guide:</strong> ${guide}</p>
        <p><strong>Tid:</strong> ${new Date().toLocaleString('sv-SE')}</p>
      `,
    })
    */

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
