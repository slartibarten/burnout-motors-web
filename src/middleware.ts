import { NextRequest, NextResponse } from 'next/server';

const BYPASS_TOKEN = 'burnout-preview-2025';
const MAINTENANCE_PATH = '/maintenance';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Never redirect the maintenance page itself or static assets
  if (
    pathname === MAINTENANCE_PATH ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/logos') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Allow through if bypass cookie is set
  const bypass = req.cookies.get('bm_preview')?.value;
  if (bypass === BYPASS_TOKEN) {
    return NextResponse.next();
  }

  // Allow through if bypass token is in query string, and set cookie
  const token = req.nextUrl.searchParams.get('preview');
  if (token === BYPASS_TOKEN) {
    const res = NextResponse.redirect(new URL(pathname, req.url));
    res.cookies.set('bm_preview', BYPASS_TOKEN, { maxAge: 60 * 60 * 8 }); // 8 hours
    return res;
  }

  return NextResponse.redirect(new URL(MAINTENANCE_PATH, req.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
