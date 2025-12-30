import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import {
  sanitizeInput,
  escapeHtml,
  getUserEmailHTML,
  getUserEmailSubject,
  getAdminNotificationHTML,
  getPrimaryFocus
} from '@/lib/quiz-utils'
import { QuizAnswers } from '@/types/quiz'

// Fail fast if API key is missing
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { answers, company, email, honeypot, timestamp } = body

    // SECURITY: Honeypot check - if filled, it's a bot
    if (honeypot) {
      console.log('Bot detected via honeypot field')
      // Return success to not alert the bot
      return NextResponse.json(
        { success: true, message: 'Quiz skickad!' },
        { status: 200 }
      )
    }

    // SECURITY: Timestamp check - ensure minimum time has passed (3 seconds)
    if (timestamp) {
      const timeDiff = Date.now() - timestamp
      const minTimeMs = 3000 // 3 seconds
      if (timeDiff < minTimeMs) {
        console.log(`Bot suspected - submission too fast: ${timeDiff}ms (minimum: ${minTimeMs}ms)`)
        // Return success to not alert sophisticated bots
        return NextResponse.json(
          { success: true, message: 'Quiz skickad!' },
          { status: 200 }
        )
      }
    }

    // Validate required fields
    if (!answers || !company || !email) {
      return NextResponse.json(
        { error: 'Alla fält är obligatoriska' },
        { status: 400 }
      )
    }

    // Sanitize inputs (trim whitespace, limit length)
    const sanitizedCompany = sanitizeInput(company, 100)
    const sanitizedEmail = sanitizeInput(email, 100).toLowerCase()
    const sanitizedAnswers = answers as QuizAnswers

    // Validate minimum length for company
    if (sanitizedCompany.length < 2) {
      return NextResponse.json(
        { error: 'Företagsnamn måste vara minst 2 tecken' },
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

    // Prepare email data
    const emailData = {
      answers: sanitizedAnswers,
      company: sanitizedCompany,
      email: sanitizedEmail,
      timestamp: new Date().toISOString()
    }

    // Determine focus area for subject line
    const focus = getPrimaryFocus(sanitizedAnswers)

    // Send notification email to admin (jimmy@elivro.se)
    const adminEmail = await resend.emails.send({
      from: 'Elivro Quiz <notify@notify.elivro.se>',
      to: ['jimmy@elivro.se'],
      subject: `[QUIZ] Ny lead: ${escapeHtml(sanitizedCompany)} – ${focus}`,
      html: getAdminNotificationHTML(emailData),
    })

    // Send personalized confirmation email to user
    const userEmail = await resend.emails.send({
      from: 'Elivro <notify@notify.elivro.se>',
      to: [sanitizedEmail],
      subject: getUserEmailSubject(focus),
      html: getUserEmailHTML(sanitizedAnswers, sanitizedCompany),
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
        message: 'Din bedömning är på väg!',
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
