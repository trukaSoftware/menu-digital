import { NextResponse } from 'next/server';

import { authMiddleware } from '@clerk/nextjs';

const publicRoutes =
  process.env.NODE_ENV === `development`
    ? [
        `/`,
        `/api/company/createCompany`,
        `/api/company/deleteCompany`,
        `/api/company/editCompany`,
        `/api/company/getCompanyById`,
        `/api/company/getCompanies`,
        `/api/complements/createComplement`,
        `/api/complements/deleteComplement`,
        `/api/complements/editComplement`,
        `/api/complements/getComplementById`,
        `/api/complements/getComplements`,
        `/api/items/createItem`,
        `/api/items/deleteItem`,
        `/api/items/editItem`,
        `/api/items/getItemById`,
        `/api/items/getItems`,
        `/api/categories/createCategory`,
        `/api/categories/deleteCategory`,
        `/api/categories/editCategory`,
        `/api/categories/getCategories`,
      ]
    : [`/`];

export default authMiddleware({
  beforeAuth(req) {
    if (req.nextUrl.pathname === `/` && !req.cookies.get(`__session`)) {
      return NextResponse.redirect(`${req.nextUrl.href}sign-in`);
    }

    // TODO: The configs page should be unique for each session, so we have to pass the sessionId or tenantId to do this.

    if (req.nextUrl.pathname === `/` && req.cookies.get(`__session`)) {
      return NextResponse.redirect(`${req.nextUrl.href}configs`); // ${req.nextUrl.href}tenantId/configs
    }
  },

  publicRoutes,
});

export const config = {
  matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
