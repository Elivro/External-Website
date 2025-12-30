import { QuizQuestion, QuizAnswers, QuizEmailData } from '@/types/quiz'

/**
 * 6 Thoughtful Questions
 *
 * These questions demonstrate deep understanding of assistans care work
 * before asking for contact information. Tone: dignified, human-centered.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Q1: Organizational Scale (Context)
  {
    id: 'q1_scale',
    question: 'Hur många assistenter koordinerar ni?',
    description: 'Detta hjälper oss förstå er verksamhets komplexitet',
    options: [
      { text: 'Färre än 10', value: 'under_10' },
      { text: '10-30', value: '10_30' },
      { text: '30-100', value: '30_100' },
      { text: 'Fler än 100', value: 'over_100' }
    ]
  },

  // Q2: Current Reality (Pain Discovery)
  {
    id: 'q2_tools',
    question: 'Hur hanterar ni schemaläggning idag?',
    description: 'Utan att döma – vi vill förstå er nuläge',
    options: [
      { text: 'Excel eller Google Sheets', value: 'spreadsheets' },
      { text: 'Annan programvara (vi kan prata om vilken)', value: 'other_software' },
      { text: 'Papper och penna', value: 'paper' },
      { text: 'Vi har inget system än', value: 'no_system' }
    ]
  },

  // Q3: Recruitment Philosophy (Quality vs Speed)
  {
    id: 'q3_recruitment',
    question: 'Vad är svårast när ni rekryterar assistenter?',
    description: 'Välj det som känns mest utmanande',
    options: [
      { text: 'Att hitta personer som passar kunden – inte bara har rätt kompetens', value: 'finding_fit' },
      { text: 'Att rekrytera tillräckligt snabbt för att täcka behoven', value: 'recruitment_speed' },
      { text: 'Att veta om matchningen kommer fungera i praktiken', value: 'match_uncertainty' },
      { text: 'Att bygga ett team som håller över tid', value: 'team_continuity' }
    ]
  },

  // Q4: Quality Philosophy (Values Alignment)
  {
    id: 'q4_quality',
    question: 'Hur vill ni att kvalitet ska mätas?',
    description: 'Vad betyder "bra assistans" för er?',
    options: [
      { text: 'Kontinuitet och trygghet i relationer mellan kund och assistent', value: 'continuity' },
      { text: 'Dokumentation som faktiskt hjälper oss lära och förbättra', value: 'documentation_learning' },
      { text: 'Kundnöjdhet och regelbunden reflektion', value: 'satisfaction_reflection' },
      { text: 'Vi vill mäta kvalitet – inte bara hur många timmar som jobbas', value: 'struggling_metrics' }
    ]
  },

  // Q5: Decision Context (Sales Intelligence)
  {
    id: 'q5_decision',
    question: 'Vem behöver vara med i ett samtal om förändring?',
    description: 'Så vi vet vem vi ska prata med',
    options: [
      { text: 'Jag beslutar själv', value: 'solo_decision' },
      { text: 'Verksamhetschef och koordinatorer', value: 'management_coordinators' },
      { text: 'Styrelse eller ägare', value: 'board_owners' },
      { text: 'Jag vet inte riktigt än', value: 'unsure' }
    ]
  },

  // Q6: Timeline (Urgency Without Pressure)
  {
    id: 'q6_timeline',
    question: 'När hoppas ni kunna förbättra det här?',
    description: 'Ärligt svar – ingen press',
    options: [
      { text: 'Så snart som möjligt – det är brådskande', value: 'urgent' },
      { text: 'Inom 3-6 månader', value: 'three_to_six_months' },
      { text: 'Vi utforskar möjligheter, inget brådskande', value: 'exploring' },
      { text: 'Vi vet inte än', value: 'unknown' }
    ]
  }
]

/**
 * Sanitizes user input by trimming whitespace and limiting length
 */
export const sanitizeInput = (input: string, maxLength: number = 200): string => {
  return input.trim().slice(0, maxLength)
}

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
export const escapeHtml = (str: string): string => {
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
 * Generates a personalized assessment based on quiz answers
 */
export const generatePersonalizedAssessment = (answers: QuizAnswers): string => {
  const insights: string[] = []

  // Scale insight
  if (answers.q1_scale === 'over_100') {
    insights.push('Med över 100 assistenter att koordinera hanterar ni en verkligt komplex verksamhet.')
  } else if (answers.q1_scale === '30_100') {
    insights.push('Med 30-100 assistenter befinner ni er i en tillväxtfas där rätt verktyg kan göra stor skillnad.')
  }

  // Recruitment insight
  if (answers.q3_recruitment === 'finding_fit') {
    insights.push('Att prioritera personlig passform över enbart kompetens visar att ni förstår assistansarbetets relationella natur.')
  } else if (answers.q3_recruitment === 'team_continuity') {
    insights.push('Kontinuitet i teamet är avgörande för trygg assistans – något vårt system är byggt för att stödja.')
  } else if (answers.q3_recruitment === 'match_uncertainty') {
    insights.push('Att förutse om en matchning fungerar är svårt – strukturerade verktyg kan minska osäkerheten.')
  }

  // Quality insight
  if (answers.q4_quality === 'continuity') {
    insights.push('Kontinuitet i relationer är grunden för trygg assistans – något vårt system är byggt för.')
  } else if (answers.q4_quality === 'struggling_metrics') {
    insights.push('Att mäta det rätta – inte bara det enkla – är en av omsorgsarbetets stora utmaningar.')
  }

  // Timeline insight
  if (answers.q6_timeline === 'urgent') {
    insights.push('Vi respekterar att läget är brådskande och kan anpassa vår process därefter.')
  }

  return insights.join(' ')
}

/**
 * Determines primary focus area based on answers
 */
export const getPrimaryFocus = (answers: QuizAnswers): 'REKRYTERING' | 'SCHEMALÄGGNING' | 'KVALITETSLEDNING' | 'HELHET' => {
  // If they struggle with quality metrics or want continuity → Quality focus
  if (answers.q4_quality === 'continuity' || answers.q4_quality === 'struggling_metrics') {
    return 'KVALITETSLEDNING'
  }

  // If they struggle with finding fit or match uncertainty → Recruitment focus
  if (answers.q3_recruitment === 'finding_fit' || answers.q3_recruitment === 'match_uncertainty' || answers.q3_recruitment === 'team_continuity') {
    return 'REKRYTERING'
  }

  // If they use spreadsheets or no system → Scheduling focus
  if (answers.q2_tools === 'spreadsheets' || answers.q2_tools === 'no_system') {
    return 'SCHEMALÄGGNING'
  }

  // If they need recruitment speed → Holistic approach (need all systems)
  if (answers.q3_recruitment === 'recruitment_speed') {
    return 'HELHET'
  }

  // Default to holistic
  return 'HELHET'
}

/**
 * Returns the appropriate email subject based on focus area
 */
export const getUserEmailSubject = (focus: string): string => {
  switch (focus) {
    case 'REKRYTERING':
      return 'När rätt person möter rätt uppdrag'
    case 'SCHEMALÄGGNING':
      return 'Schema som faktiskt fungerar i verkligheten'
    case 'KVALITETSLEDNING':
      return 'Kvalitet som syns – och känns'
    case 'HELHET':
      return 'När alla delar hänger ihop'
    default:
      return 'Er personliga bedömning från Elivro'
  }
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

/**
 * Generates personalized user email HTML
 */
export function getUserEmailHTML(answers: QuizAnswers, company: string): string {
  const assessment = generatePersonalizedAssessment(answers)
  const focus = getPrimaryFocus(answers)

  let focusContent = ''

  if (focus === 'REKRYTERING') {
    focusContent = `
      <p>Baserat på era svar ser vi att ni värdesätter <strong>relationer och kontinuitet</strong>. Det är grunden för trygg assistans.</p>

      <div class="highlight">
        <p><strong>Personkemimatchning</strong> – System som förstår att kompetens är mer än CV-rader</p>
        <p><strong>Kontinuitetsplanering</strong> – Verktyg för att bygga relationer som håller över tid</p>
        <p style="margin-bottom: 0;"><strong>Transparent kommunikation</strong> – Alla ser vem som passar varför</p>
      </div>
    `
  } else if (focus === 'SCHEMALÄGGNING') {
    focusContent = `
      <p>Baserat på era svar ser vi att ni behöver <strong>bättre verktyg för schemaläggning</strong>. Excel och papper når sin gräns när komplexiteten växer.</p>

      <div class="highlight">
        <p><strong>Budget i realtid</strong> – Se direkt när timmar närmar sig taket (avtal, ATL, beslut)</p>
        <p><strong>Kontinuitet först</strong> – Systemet prioriterar regelbundna ansikten och relationer</p>
        <p style="margin-bottom: 0;"><strong>Transparent översikt</strong> – Kund, assistent och koordinator ser samma bild</p>
      </div>
    `
  } else if (focus === 'KVALITETSLEDNING') {
    focusContent = `
      <p>Baserat på era svar ser vi att ni kämpar med att <strong>mäta det rätta – inte bara det enkla</strong>. Det är en utmaning många delar.</p>

      <div class="highlight">
        <p><strong>Dokumentation som lärande</strong> – Verktyg som hjälper assistenter reflektera, inte bara bocka av</p>
        <p><strong>Värdighet i detaljer</strong> – Insikter som faktiskt informerar kvalitetsarbetet</p>
        <p style="margin-bottom: 0;"><strong>Meningsfull administration</strong> – Rapportering som känns relevant, inte mekanisk</p>
      </div>
    `
  } else {
    focusContent = `
      <p>Baserat på era svar ser vi att ni behöver <strong>helhetslösning</strong> – något som kopplar ihop rekrytering, schema och kvalitet.</p>

      <div class="highlight">
        <p><strong>Personkemi först</strong> – Matchning som bygger på relationer, inte bara tillgänglighet</p>
        <p><strong>Budget i realtid</strong> – Schema som håller ekonomiska ramar med transparent översikt</p>
        <p style="margin-bottom: 0;"><strong>Kvalitet som stödjer</strong> – Dokumentation som hjälper lärande, inte belastar</p>
      </div>
    `
  }

  return `
    <!DOCTYPE html>
    <html lang="sv">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.7;
            color: #2D2D2D;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #F5F2ED;
          }
          .container {
            background: #FFFFFF;
            padding: 40px 30px;
            border-radius: 2px;
          }
          .accent-line {
            width: 40px;
            height: 2px;
            background: #D4866A;
            margin-bottom: 24px;
          }
          h1 {
            font-family: 'Georgia', serif;
            color: #2D2D2D;
            font-size: 24px;
            font-weight: 400;
            margin: 0 0 24px 0;
            line-height: 1.3;
          }
          p {
            margin: 0 0 20px 0;
            font-size: 16px;
          }
          .assessment {
            background-color: #F5F2ED;
            padding: 20px;
            border-left: 2px solid #8FA387;
            margin: 24px 0;
            font-style: italic;
          }
          .highlight {
            background-color: #F5F2ED;
            padding: 20px;
            border-left: 2px solid #D4866A;
            margin: 24px 0;
          }
          .highlight strong {
            color: #D4866A;
            font-weight: 600;
          }
          .highlight p {
            margin-bottom: 16px;
          }
          .cta-button {
            display: inline-block;
            background: #D4866A;
            color: white;
            padding: 14px 28px;
            border-radius: 2px;
            text-decoration: none;
            font-weight: 500;
            margin: 24px 0;
            font-size: 15px;
          }
          .cta-button:hover {
            background: #C27558;
          }
          .footer {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #E5E5E5;
            font-size: 14px;
            color: #6B6B6B;
          }
          .signature {
            margin-top: 32px;
            font-size: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="accent-line"></div>

          <h1>Hej från Elivro!</h1>

          <p>Tack för att ni tog er tid att svara på våra frågor. Här är vår bedömning baserat på vad ni berättade:</p>

          ${assessment ? `<div class="assessment">${assessment}</div>` : ''}

          ${focusContent}

          <p>Vi skulle gärna visa hur det fungerar i praktiken. Boka ett 30-minuters samtal så skräddarsyr vi en genomgång efter er verksamhet.</p>

          <a href="https://elivro.se/#cta-section" class="cta-button">Boka ett samtal</a>

          <div class="signature">
            <p style="margin-bottom: 4px;">Med vänliga hälsningar,<br>
            <strong>Jimmy</strong><br>
            Grundare, Elivro</p>
          </div>

          <div class="footer">
            <p style="margin-bottom: 8px; font-size: 13px; font-style: italic;">P.S. Assistans är komplext. System behöver inte vara det.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Admin notification email template
 */
export function getAdminNotificationHTML(data: QuizEmailData): string {
  const focus = getPrimaryFocus(data.answers)
  const focusColors: Record<string, string> = {
    REKRYTERING: '#D4866A',
    SCHEMALÄGGNING: '#2D2D2D',
    KVALITETSLEDNING: '#8FA387',
    HELHET: '#D4866A'
  }

  const focusColor = focusColors[focus]

  // Format answers for display
  const answersHtml = Object.entries(data.answers)
    .map(([key, value]) => {
      const question = QUIZ_QUESTIONS.find(q => q.id === key)
      const option = question?.options.find(opt => opt.value === value)

      return `
        <div class="answer-row">
          <div class="question-label">${question?.question || key}</div>
          <div class="answer-value">${option?.text || value}</div>
        </div>
      `
    })
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="sv">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
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
            color: ${focusColor};
            margin-top: 0;
            font-size: 24px;
          }
          .focus-badge {
            display: inline-block;
            background-color: ${focusColor};
            color: white;
            padding: 6px 14px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
          }
          .info-row {
            margin: 15px 0;
            padding: 15px;
            background-color: #f9fafb;
            border-left: 4px solid ${focusColor};
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
          .answer-row {
            margin: 12px 0;
            padding: 12px;
            background-color: #fefefe;
            border-left: 3px solid #e5e7eb;
          }
          .question-label {
            font-weight: 600;
            color: #4b5563;
            font-size: 13px;
            margin-bottom: 4px;
          }
          .answer-value {
            color: #1f2937;
            font-size: 15px;
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
          <h1>🎯 Ny quiz-lead: ${escapeHtml(data.company)}</h1>

          <div class="focus-badge">${focus}</div>

          <div class="info-row">
            <div class="label">Företag</div>
            <div class="value">${escapeHtml(data.company)}</div>
          </div>

          <div class="info-row">
            <div class="label">E-post</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: ${focusColor}; text-decoration: none;">${escapeHtml(data.email)}</a></div>
          </div>

          <div class="info-row">
            <div class="label">Quiz-svar (6 frågor)</div>
            ${answersHtml}
          </div>

          <div class="info-row">
            <div class="label">Tidsstämpel</div>
            <div class="value">${escapeHtml(data.timestamp)}</div>
          </div>

          <div class="footer">
            <p><strong>Nästa steg:</strong> Kontakta inom 24h. Referera till deras specifika svar i samtalet.</p>
            <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
              Detta meddelande skickades automatiskt från Elivro's kvalificeringsquiz.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}
