import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder_key_for_build')

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder_key_for_build') {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 503 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, company, email } = body

    // Validate required fields
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: 'Alla fält är obligatoriska' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress' },
        { status: 400 }
      )
    }

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'Elivro Demo <notify@notify.elivro.se>',
      to: ['daniel@elivro.se'],
      subject: `Ny demo-förfrågan från ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background: white;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              h1 {
                color: #8b5cf6;
                margin-top: 0;
                font-size: 24px;
              }
              .info-row {
                margin: 15px 0;
                padding: 15px;
                background-color: #f9fafb;
                border-left: 4px solid #8b5cf6;
                border-radius: 4px;
              }
              .label {
                font-weight: 600;
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #1f2937;
                font-size: 16px;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🎯 Ny demo-förfrågan</h1>
              <p>En ny demo-förfrågan har kommit in via hemsidan:</p>

              <div class="info-row">
                <div class="label">Namn</div>
                <div class="value">${name}</div>
              </div>

              <div class="info-row">
                <div class="label">Företag</div>
                <div class="value">${company}</div>
              </div>

              <div class="info-row">
                <div class="label">E-post</div>
                <div class="value"><a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></div>
              </div>

              <div class="footer">
                <p><strong>Nästa steg:</strong> Kontakta kunden inom 24 timmar för att boka ett personligt möte.</p>
                <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                  Detta meddelande skickades automatiskt från Elivro's landing page.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: 'Elivro <notify@notify.elivro.se>',
      to: [email],
      subject: 'Tack för din demo-förfrågan!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background: white;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              h1 {
                color: #8b5cf6;
                margin-top: 0;
                font-size: 24px;
              }
              .highlight-box {
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
              }
              .highlight-box h2 {
                margin: 0;
                font-size: 20px;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Tack för din förfrågan, ${name}! 🎉</h1>
              <p>Vi har mottagit din demo-förfrågan och uppskattar ditt intresse för Elivro.</p>

              <div class="highlight-box">
                <h2>⏰ Vi hör av oss inom 24 timmar</h2>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
                  Ett personligt möte kommer att bokas in så snart som möjligt.
                </p>
              </div>

              <p><strong>Dina uppgifter:</strong></p>
              <ul style="color: #4b5563;">
                <li>Namn: ${name}</li>
                <li>Företag: ${company}</li>
                <li>E-post: ${email}</li>
              </ul>

              <p>Under tiden kan du:</p>
              <ul style="color: #4b5563;">
                <li>Besöka vår hemsida för mer information</li>
                <li>Förbereda frågor du vill diskutera under demon</li>
                <li>Tänka på era specifika rekryteringsbehov</li>
              </ul>

              <div class="footer">
                <p><strong>Elivro</strong><br>
                Det bästa rekryteringsverktyget i assistansbranschen</p>
                <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                  Om du har några direkta frågor, tveka inte att svara på detta mail.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // Check if emails were sent successfully
    if (adminEmail.error || userEmail.error) {
      console.error('Email sending error:', adminEmail.error || userEmail.error)
      return NextResponse.json(
        { error: 'Ett fel uppstod vid skickning av e-post' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Demo-förfrågan skickad!',
        adminEmailId: adminEmail.data?.id,
        userEmailId: userEmail.data?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Serverfel. Försök igen senare.' },
      { status: 500 }
    )
  }
}
