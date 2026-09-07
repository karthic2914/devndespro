window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
window.gtag = gtag;

if (!document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-8V84P9DDYH"]')) {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-8V84P9DDYH';
  document.head.appendChild(script);
}

gtag('js', new Date());
gtag('config', 'G-8V84P9DDYH');
