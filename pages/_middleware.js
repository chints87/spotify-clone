import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Intercept request from
async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // Allow if token exists and path api/auth? Does it work like axios interceptor
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to login if no token AND requesting a protected route

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }

  return null;
}

export default middleware;
