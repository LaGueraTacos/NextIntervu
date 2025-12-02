import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Profile API received:', body)
    const { email, name, role, experience, company, skills } = body

    // Validate required fields
    if (!email) {
      console.log('Email validation failed:', email)
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Upsert the user's profile in Supabase (insert if doesn't exist, update if it does)
    const { data, error } = await supabaseAdmin
      .from('waitlist_signups')
      .upsert({
        email: email,
        name: name || null,
        role: role || null,
        experience: experience || null,
        company: company || null,
        skills: skills || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'email'
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Profile updated successfully!',
        data: data[0]
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
