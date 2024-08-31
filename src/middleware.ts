import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  // const pathValue =  request.nextUrl.searchParams
// const ip =   request.ip;
// console.log("Path access......");
//   console.log(path);
//   console.log("Path value access......");
//   console.log(pathValue);
//   console.log("IP value access......");
//   console.log(ip);

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''
  // console.log("token processing .....")
  // console.log(token);

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}