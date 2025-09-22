import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { OnboardingWelcome } from '@/emails/OnboardingWelcome'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, role, experience, company, skills } = body

    // Validate required fields
    if (!email || !name || !role || !experience || !skills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert into Supabase using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('waitlist_signups')
      .insert([
        {
          email,
          name,
          role,
          experience,
          company: company || null,
          skills,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already exists in waitlist' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to save signup' },
        { status: 500 }
      )
    }

    // Fire-and-forget onboarding email (non-blocking)
    ;(async () => {
      try {
        await sendEmail({
          to: email,
          subject: `Welcome to ${process.env.APP_NAME || 'NextIntervu'} — You’re on the early access list 🎉`,
          react: OnboardingWelcome({ name, role, experience }),
          tags: [
            { name: 'type', value: 'Onboarding-NextIntervu' },
            { name: 'cohort', value: 'early-signup' },
          ],
        })
      } catch (err) {
        console.error('Onboarding email send failed:', err)
      }
    })()

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist!',
        data: data[0]
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
