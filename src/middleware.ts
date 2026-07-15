import { NextRequest, NextResponse } from 'next/server';

const MAINTENANCE = process.env.MAINTENANCE_MODE === 'true';
const BYPASS_TOKEN = process.env.PREVIEW_TOKEN;
const MAINTENANCE_PATH = '/maintenance';

export function middleware(req: NextRequest) {
  if (!MAINTENANCE) return NextResponse.next();

  const { pathname } = req.nextUrl;

  if (
    pathname === MAINTENANCE_PATH ||
    pathname === '/personvern' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/logos') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const bypass = req.cookies.get('bm_preview')?.value;
  if (BYPASS_TOKEN && bypass === BYPASS_TOKEN) {
    return NextResponse.next();
  }

  const token = req.nextUrl.searchParams.get('preview');
  if (BYPASS_TOKEN && token === BYPASS_TOKEN) {
    const res = NextResponse.redirect(new URL(pathname, req.url));
    res.cookies.set('bm_preview', BYPASS_TOKEN, { maxAge: 60 * 60 * 8 });
    return res;
  }

  return NextResponse.redirect(new URL(MAINTENANCE_PATH, req.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
