import { useUser } from '@clerk/nextjs';
import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/not-found'];
const protectedRoutes = ['/dashboard'];

const isPublicRoute = createRouteMatcher(publicRoutes);
const isProtectedRoute = createRouteMatcher(protectedRoutes);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;
  
  const isRedirecting = req.nextUrl.searchParams.has('redirect_url');
  
  if (isProtectedRoute(req)) {
    if (!userId) {
      if (!isRedirecting) {
        const signInUrl = new URL('/', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
      }
    }

    if (userId) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const email = user?.emailAddresses?.find(
          (email: { id: any }) => email.id === user.primaryEmailAddressId
        )?.emailAddress;

        if (!email || !email.endsWith('@goa.bits-pilani.ac.in')) {
          return NextResponse.redirect(new URL('/not-authorized', req.url));
        }
      } catch (error) {
        console.error("Error verifying user email:", error);
      }
    }
  }

  if (isPublicRoute(req) && userId && path !== '/not-authorized') {
    if (!isRedirecting) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
