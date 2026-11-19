/* Tashrif statistikasi: Google Analytics (GA4) + Yandex Metrika.
   Hamma sahifada bitta shu fayl ulanadi: <script src="/stat.js" defer></script>
   Hisoblagich raqamlari faqat shu yerda. */
(function () {
  var GA_ID = 'G-X81227BGQG';
  var YM_ID = 114361342;

  /* Google Analytics */
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  var g = document.createElement('script');
  g.async = true;
  g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(g);
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  /* Yandex Metrika */
  var src = 'https://mc.yandex.ru/metrika/tag.js?id=' + YM_ID;
  window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = 1 * new Date();
  var y = document.createElement('script');
  y.async = true;
  y.src = src;
  document.head.appendChild(y);
  window.ym(YM_ID, 'init', {
    ssr: true, webvisor: true, clickmap: true, ecommerce: 'dataLayer',
    referrer: document.referrer, url: location.href,
    accurateTrackBounce: true, trackLinks: true
  });
})();
