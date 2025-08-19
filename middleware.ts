// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isSignInRoute = createRouteMatcher(["/sign-in(.*)"]);
const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"]);
const isSubscriptionRoute = createRouteMatcher(["/subscription(.*)"]);

export default clerkMiddleware({
  publicRoutes: (req) => isSignInRoute(req) || isSignUpRoute(req) || isSubscriptionRoute(req)
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};