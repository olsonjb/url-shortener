import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  const urlSlug = request.nextUrl.pathname.substring(1);

  if (!urlSlug) {
    return NextResponse.next();
  }

  return NextResponse.redirect('https://example.com')
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}