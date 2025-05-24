import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['uk', 'en'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'uk',
  
  // Force the default locale to be used when visiting
  // the root path directly
  localeDetection: false,
  
  // Redirect to the default locale
  localePrefix: 'always'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'] 
};
