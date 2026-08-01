import type React from 'react';

export const navigateTo = (href: string) => {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    window.location.href = href;
    return;
  }

  const [path, hash] = href.split('#');
  const nextPath = path || window.location.pathname;
  window.history.pushState({}, '', `${nextPath}${hash ? `#${hash}` : ''}`);
  window.dispatchEvent(new Event('gymsetu:navigate'));
};

export const linkHandler = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
  event.preventDefault();
  navigateTo(href);
};
