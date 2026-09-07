const KEY = 'cookieConsent';
const GA_ID = 'G-8V84P9DDYH';

export function getConsent() {
  try {
    const value = localStorage.getItem(KEY);
    if (value === 'accepted' || value === 'rejected') return value;
  } catch {
    /* ignore */
  }
  return null;
}

export function setConsent(value) {
  const previous = getConsent();
  const next = value === 'accepted' ? 'accepted' : 'rejected';
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* ignore */
  }
  if (next === 'accepted') loadAnalytics();
  if (previous === 'accepted' && next === 'rejected' && typeof window !== 'undefined') {
    window.location.reload();
  }
  return next;
}

export function loadAnalytics() {
  if (typeof window === 'undefined' || window.__gaLoaded) return;
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

export function initAnalytics() {
  if (getConsent() === 'accepted') loadAnalytics();
}
