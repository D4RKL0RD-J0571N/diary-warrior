import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/types/database';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  // Match localized paths and exclude static files or API routes
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
