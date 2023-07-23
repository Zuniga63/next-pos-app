import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const isLoginPage = request.nextUrl.pathname === '/';

  if (!token && isLoginPage) return NextResponse.next();

  const baseUrl = process.env.NEXT_PUBLIC_URL_API;
  const url = `${baseUrl}/auth/local/profile`;
  const headers = { Authorization: `Bearer ${token?.value}` };
  let isAuthenticated = false;

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    isAuthenticated = data && data.isActive && data.isAdmin;
  } catch (error) {
    console.log(error);
  }

  if (isAuthenticated) {
    if (isLoginPage) return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.next();
  } else {
    if (isLoginPage) return NextResponse.next();
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  /**
   * Match all request paths execpt for the ones starting with:
   * - api (API routes)
   * - _next/static (stactic files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - image on public folder
   */
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
