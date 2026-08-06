import React from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import './template.css';

import App from './App';

// Leadfeeder Tracking
(function (ss, ex) {
  window.ldfdr =
    window.ldfdr ||
    function () {
      (window.ldfdr._q = window.ldfdr._q || []).push(
        [].slice.call(arguments)
      );
    };

  (function (d, s) {
    const fs = d.getElementsByTagName(s)[0];

    function ce(src) {
      const cs = d.createElement(s);
      cs.src = src;
      cs.async = true;
      fs.parentNode.insertBefore(cs, fs);
    }

    ce(
      'https://sc.lfeeder.com/lftracker_v1_' +
        ss +
        (ex ? '_' + ex : '') +
        '.js'
    );
  })(document, 'script');
})('Xbp1oaE0Bry4EdVj');

// Vercel Analytics
inject();
injectSpeedInsights();

// Render App
createRoot(document.getElementById('root')).render(<App />);