import * as React from 'react'

export function OnboardingWelcome({
  name,
  role,
  experience,
  appName = process.env.APP_NAME || 'NextIntervu',
}: {
  name: string
  role: string
  experience: string
  appName?: string
}) {
  const firstName = name?.split(' ')?.[0] || 'there'
  return (
    <div
      style={{
        backgroundColor: '#f6f7fb',
        padding: '24px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#0f172a',
        lineHeight: 1.6,
      }}
   >
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: 12,
          boxShadow: '0 6px 24px rgba(2, 6, 23, 0.08)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%)',
            color: '#ffffff',
            padding: '20px 24px',
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.9, letterSpacing: 0.3 }}>Welcome</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 22, lineHeight: 1.4 }}>
            {appName}
          </h1>
        </div>

        <div style={{ padding: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>
            Hi {firstName}, you’re on the early access list 🎉
          </h2>
          <p style={{ margin: '0 0 12px' }}>
            Thanks for signing up! We’ve saved your profile as a <b>{role}</b> with
            <b> {experience}</b> experience.
          </p>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 10,
              padding: 16,
              margin: '16px 0',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>What’s next</div>
            <ol style={{ paddingLeft: 18, margin: 0 }}>
              <li>Early access invite as we open cohorts</li>
              <li>Role‑tailored mock interviews with instant feedback</li>
              <li>Warmups and tips before your real interviews</li>
            </ol>
          </div>

          <p style={{ margin: '0 0 16px' }}>
            Help us tailor your experience: reply with your top target company and any
            specific interview goals.
          </p>

          <div style={{ margin: '20px 0 4px' }}>
            <a
              href="https://nextintervu.com"
              style={{
                display: 'inline-block',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: 10,
                fontWeight: 600,
              }}
            >
              Explore what’s coming
            </a>
          </div>

          <p style={{ margin: '16px 0 0', fontSize: 12, color: '#475569' }}>
            — The {appName} Team
          </p>
        </div>

        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: 16,
            backgroundColor: '#f9fafb',
            color: '#64748b',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          If you didn’t request this, you can safely ignore this email.
        </div>
      </div>
    </div>
  )
}


