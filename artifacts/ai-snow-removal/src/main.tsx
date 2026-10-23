import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { initTracking } from '@/lib/tracking';

import './index.css';
import './pwa';

const container = document.getElementById('root')!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
const options = {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error: unknown, errorInfo: { componentStack?: string }) => {
    console.error(error, errorInfo.componentStack);
  },
};

// Pages are prerendered to static HTML at build time (scripts/prerender.mjs).
// Hydrate when the HTML matches this URL; otherwise (404 page, dev server) render fresh.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const prerenderedPath = container.dataset.prerenderPath;

if (container.hasChildNodes() && prerenderedPath === currentPath) {
  hydrateRoot(container, app, options);
} else {
  container.textContent = '';
  createRoot(container, options).render(app);
}

initTracking();
