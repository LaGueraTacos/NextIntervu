import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Convert Supabase CookieOptions to Next.js cookie format
            const nextCookieOptions: Parameters<typeof cookieStore.set>[0] = {
              name,
              value,
              ...(options.httpOnly !== undefined && { httpOnly: options.httpOnly }),
              ...(options.secure !== undefined && { secure: options.secure }),
              ...(options.sameSite !== undefined && typeof options.sameSite === 'string' && { sameSite: options.sameSite }),
              ...(options.maxAge !== undefined && { maxAge: options.maxAge }),
              ...(options.path !== undefined && { path: options.path }),
              ...(options.domain !== undefined && { domain: options.domain }),
            }
            cookieStore.set(nextCookieOptions)
          },
          remove(name: string, options: CookieOptions) {
            // Convert Supabase CookieOptions to Next.js cookie format
            const nextCookieOptions: Parameters<typeof cookieStore.set>[0] = {
              name,
              value: '',
              ...(options.httpOnly !== undefined && { httpOnly: options.httpOnly }),
              ...(options.secure !== undefined && { secure: options.secure }),
              ...(options.sameSite !== undefined && typeof options.sameSite === 'string' && { sameSite: options.sameSite }),
              ...(options.maxAge !== undefined && { maxAge: options.maxAge }),
              ...(options.path !== undefined && { path: options.path }),
              ...(options.domain !== undefined && { domain: options.domain }),
            }
            cookieStore.set(nextCookieOptions)
          },
        },
      }
    )
    
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to profile setup after successful OAuth
  return NextResponse.redirect(`${requestUrl.origin}/profile-setup`)
}
