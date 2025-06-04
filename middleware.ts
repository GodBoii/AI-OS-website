import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  
  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );
  
  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Protected routes
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Authentication routes
  const authRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // If user is signed in and trying to access auth pages, redirect to dashboard
  if (isAuthRoute && session) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If user is not signed in and trying to access protected routes, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return res;
}

// Add route matching configuration
export const config = {
  matcher: ['/dashboard', '/auth/login', '/auth/signup', '/auth/forgot-password'],
}; 