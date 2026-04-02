import React from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import App from './App';

inject();
injectSpeedInsights();

createRoot(document.getElementById('root')).render(<App />);