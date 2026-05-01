// vercel-speed-insights.js
(function initVercelSpeedInsights() {
  // Инициализируем очередь до загрузки основного скрипта
  window.si = window.si || function () {
    (window.siq = window.siq || []).push(arguments);
  };

  // Подгружаем сам трекер
  const script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  document.head.appendChild(script);
})();
