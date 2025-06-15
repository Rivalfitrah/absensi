import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const protectedPath = ["/dashboard", "/attendance", "/students"];
export const publicPath = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isProtected = protectedPath.some((protectedPath) =>
    path.startsWith(protectedPath)
  );
  const isPublic = publicPath.some((publicPath) => path.startsWith(publicPath));

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/attendance/:path*', '/students/:path*', '/login', '/register'],
};
