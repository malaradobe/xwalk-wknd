/**
 * Locale roots for nav/footer fragments. Keep in sync with paths.json locale mappings.
 */
const LOCALE_PREFIXES = ['/us/en', '/ca/en', '/ca/fr'];

/**
 * @param {string} pathname
 * @returns {string} e.g. '/us/en' or '' if no match
 */
export function getLocalePrefix(pathname = window.location.pathname) {
  return LOCALE_PREFIXES
    .sort((a, b) => b.length - a.length)
    .find((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) || '';
}

/**
 * Resolves nav/footer fragment path: metadata wins, else locale-prefixed path, else root default.
 * @param {string} metaValue content of meta nav|footer
 * @param {string} fragmentSegment 'nav' | 'footer'
 * @param {string} rootFallback '/nav' | '/footer'
 * @returns {string} pathname for loadFragment
 */
export function resolveFragmentPath(metaValue, fragmentSegment, rootFallback) {
  if (metaValue) {
    return new URL(metaValue, window.location).pathname;
  }
  const prefix = getLocalePrefix();
  if (prefix) {
    return `${prefix}/${fragmentSegment}`;
  }
  return rootFallback;
}
