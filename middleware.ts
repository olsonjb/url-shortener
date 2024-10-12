import { NextResponse, NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const requestOrigin = request.nextUrl.origin;
  const urlSlug = request.nextUrl.pathname.substring(1);

  // Allow routing to home page
  if (!urlSlug) {
    return NextResponse.next();
  }

  // Fetch the slug-to-url mapping from the API
  const response = await fetch(`${requestOrigin}/api/`);
  const urls = await response.json();

  // If a slug has not been created yet, redirect to the home page
  if (!urls[urlSlug]) {
    return NextResponse.redirect(requestOrigin);
  }

  return NextResponse.redirect(urls[urlSlug]);
}

// Ignore API routes and static assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}