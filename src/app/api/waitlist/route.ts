import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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
