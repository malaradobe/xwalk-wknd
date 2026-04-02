import { getMetadata } from '../../scripts/aem.js';
import { resolveFragmentPath } from '../../scripts/locale-fragments.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (metadata overrides; else /{locale}/footer under paths.json locales)
  const footerPath = resolveFragmentPath(getMetadata('footer'), 'footer', '/footer');
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
