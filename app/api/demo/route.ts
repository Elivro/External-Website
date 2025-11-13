import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

// Fail fast if API key is missing (not just at runtime)
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required')
}

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
function escapeHtml(str: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return str.replace(/[&<>"']/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Sanitizes user input by trimming whitespace and removing dangerous characters
 */
function sanitizeInput(input: string, maxLength: number = 200): string {
  return input.trim().slice(0, maxLength)
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { name, company, email, phone, honeypot, timestamp } = body

    // SECURITY: Honeypot check - if filled, it's a bot
    if (honeypot) {
      console.log('Bot detected via honeypot field')
      // Return success to not alert the bot
      return NextResponse.json(
        { success: true, message: 'Demo-förfrågan skickad!' },
        { status: 200 }
      )
    }

    // SECURITY: Timestamp check - ensure minimum time has passed (3 seconds)
    // Most humans take at least 3 seconds to fill a form, bots are instant
    if (timestamp) {
      const timeDiff = Date.now() - timestamp
      const minTimeMs = 3000 // 3 seconds - silent check, user won't notice
      if (timeDiff < minTimeMs) {
        console.log(`Bot suspected - submission too fast: ${timeDiff}ms (minimum: ${minTimeMs}ms)`)
        // Return success to not alert sophisticated bots
        return NextResponse.json(
          { success: true, message: 'Demo-förfrågan skickad!' },
          { status: 200 }
        )
      }
    }

    // Validate required fields
    if (!name || !company || !email || !phone) {
      return NextResponse.json(
        { error: 'Alla fält är obligatoriska' },
        { status: 400 }
      )
    }

    // Sanitize inputs (trim whitespace, limit length)
    const sanitizedName = sanitizeInput(name, 100)
    const sanitizedCompany = sanitizeInput(company, 100)
    const sanitizedEmail = sanitizeInput(email, 100).toLowerCase()
    const sanitizedPhone = sanitizeInput(phone, 20)

    // Validate minimum length for name and company
    if (sanitizedName.length < 2 || sanitizedCompany.length < 2) {
      return NextResponse.json(
        { error: 'Namn och företag måste vara minst 2 tecken' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress' },
        { status: 400 }
      )
    }

    // Validate phone format (flexible Swedish/international format)
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/
    if (!phoneRegex.test(sanitizedPhone)) {
      return NextResponse.json(
        { error: 'Ogiltigt telefonnummer' },
        { status: 400 }
      )
    }

    // Escape HTML for safe interpolation in email templates
    const safeName = escapeHtml(sanitizedName)
    const safeCompany = escapeHtml(sanitizedCompany)
    const safeEmail = escapeHtml(sanitizedEmail)
    const safePhone = escapeHtml(sanitizedPhone)

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'Elivro Demo <notify@notify.elivro.se>',
      to: ['daniel@elivro.se'],
      subject: `Ny demo-förfrågan från ${safeName}`,
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
                <div class="value">${safeName}</div>
              </div>

              <div class="info-row">
                <div class="label">Företag</div>
                <div class="value">${safeCompany}</div>
              </div>

              <div class="info-row">
                <div class="label">E-post</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #8b5cf6; text-decoration: none;">${safeEmail}</a></div>
              </div>

              <div class="info-row">
                <div class="label">Telefon</div>
                <div class="value"><a href="tel:${safePhone}" style="color: #8b5cf6; text-decoration: none;">${safePhone}</a></div>
              </div>

              <div class="footer">
                <p><strong>Nästa steg:</strong> Kontakta kunden för att boka ett personligt möte.</p>
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
      to: [sanitizedEmail],
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
              <h1>Tack för din förfrågan, ${safeName}! 🎉</h1>
              <p>Vi har mottagit din demo-förfrågan och uppskattar ditt intresse för Elivro.</p>

              <div class="highlight-box">
                <h2>⏰ Vi hör av oss snart</h2>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
                  Ett personligt möte kommer att bokas in så snart som möjligt.
                </p>
              </div>

              <p><strong>Dina uppgifter:</strong></p>
              <ul style="color: #4b5563;">
                <li>Namn: ${safeName}</li>
                <li>Företag: ${safeCompany}</li>
                <li>E-post: ${safeEmail}</li>
                <li>Telefon: ${safePhone}</li>
              </ul>

              <p>Under tiden kan du:</p>
              <ul style="color: #4b5563;">
                <li>Besöka vår hemsida för mer information</li>
                <li>Förbereda frågor du vill diskutera under demon</li>
                <li>Tänka på era specifika behov inom rekrytering, schemaläggning och rapportering</li>
              </ul>

              <div class="footer">
                <p><strong>Elivro</strong><br>
                Lättare rekrytering. Snabbare schemaläggning. Enklare rapportering.</p>
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
