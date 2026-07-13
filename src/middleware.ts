import { NextRequest, NextResponse } from 'next/server';

// Set PREVIEW_TOKEN in the environment (Hostinger + .env.local). If unset, no
// bypass is possible and maintenance mode stays on for everyone (fail-closed).
const BYPASS_TOKEN = process.env.PREVIEW_TOKEN;
const MAINTENANCE_PATH = '/maintenance';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Never redirect the maintenance page itself or static assets
  if (
    pathname === MAINTENANCE_PATH ||
    pathname === '/personvern' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/logos') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Allow through if bypass cookie is set
  const bypass = req.cookies.get('bm_preview')?.value;
  if (BYPASS_TOKEN && bypass === BYPASS_TOKEN) {
    return NextResponse.next();
  }

  // Allow through if bypass token is in query string, and set cookie
  const token = req.nextUrl.searchParams.get('preview');
  if (BYPASS_TOKEN && token === BYPASS_TOKEN) {
    const res = NextResponse.redirect(new URL(pathname, req.url));
    res.cookies.set('bm_preview', BYPASS_TOKEN, { maxAge: 60 * 60 * 8 }); // 8 hours
    return res;
  }

  return NextResponse.redirect(new URL(MAINTENANCE_PATH, req.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
