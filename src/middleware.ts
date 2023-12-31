import { NextResponse } from 'next/server';

import { authMiddleware, clerkClient } from '@clerk/nextjs';

import { pathnames } from './utils/pathnames';

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
        `/api/categories/editManyProductsCategory`,
        `/api/categories/getCategoryById`,
        `/api/categories/getCategories`,
        `/api/products/createProduct`,
        `/api/products/deleteProduct`,
        `/api/products/editProduct`,
        `/api/products/getProductById`,
        `/api/products/getProducts`,
        `/api/images/addNewImage`,
        `/api/images/deleteImage`,
        `/api/requests/createRequest`,
      ]
    : [`/`, `/produtos/`];

export default authMiddleware({
  beforeAuth(req) {
    if (req.nextUrl.pathname === `/` && !req.cookies.get(`__session`)) {
      return NextResponse.redirect(`${req.nextUrl.href}sign-in`);
    }

    if (
      pathnames.some((pathname) => req.nextUrl.pathname.startsWith(pathname)) &&
      !req.cookies.get(`__session`)
    ) {
      req.nextUrl.pathname = `/`;
      return NextResponse.redirect(`${req.nextUrl.href}sign-in`);
    }
  },

  async afterAuth(auth, req) {
    try {
      if (req.nextUrl.pathname === `/` && req.cookies.get(`__session`)) {
        const user = await clerkClient.users.getUser(`${auth.userId}`);

        if (user.publicMetadata.slug) {
          return NextResponse.redirect(
            `${req.nextUrl.href}configuracoes/${user.publicMetadata.slug}/${auth.userId}`
          );
        }

        return NextResponse.redirect(`${req.nextUrl.href}criar-empresa`);
      }

      if (
        req.nextUrl.pathname === `/criar-empresa` &&
        req.cookies.get(`__session`)
      ) {
        const user = await clerkClient.users.getUser(`${auth.userId}`);

        if (user.publicMetadata.slug) {
          req.nextUrl.pathname = `/`;
          return NextResponse.redirect(
            `${req.nextUrl.href}configuracoes/${user.publicMetadata.slug}/${auth.userId}`
          );
        }
      }

      if (
        auth.userId &&
        pathnames.some((pathname) =>
          req.nextUrl.pathname.startsWith(pathname)
        ) &&
        !req.nextUrl.pathname.includes(`${auth.userId}`)
      ) {
        const user = await clerkClient.users.getUser(`${auth.userId}`);

        if (user.publicMetadata.slug) {
          req.nextUrl.pathname = `/`;
          return NextResponse.redirect(
            `${req.nextUrl.href}configuracoes/${user.publicMetadata.slug}/${auth.userId}`
          );
        }
      }
    } catch (error) {
      return NextResponse.redirect(`${req.nextUrl.href}sign-in`);
    }
  },

  publicRoutes,
  debug: process.env.NODE_ENV === `development`,
});

export const config = {
  matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
