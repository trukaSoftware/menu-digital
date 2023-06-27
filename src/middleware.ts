import { NextResponse } from 'next/server';

import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  beforeAuth(req) {
    if (req.nextUrl.pathname === `/` && !req.cookies.get(`__session`)) {
      return NextResponse.redirect(`${req.nextUrl.href}sign-in`);
    }

    // TODO: The configs page should be unique for each session, so we have to pass the sessionId or tenateId to do this.

    if (req.nextUrl.pathname === `/` && req.cookies.get(`__session`)) {
      return NextResponse.redirect(`${req.nextUrl.href}configs`); // ${req.nextUrl.href}tenantId/configs
    }
  },

  publicRoutes: [`/`],
});

export const config = {
  matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
