import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setGlobalDevModeChecks } from 'reselect';
import Root from './Root';

if (import.meta.env.DEV) {
  setGlobalDevModeChecks({ inputStabilityCheck: 'never' });
}

createRoot(document.getElementById('root')!).render(<StrictMode><Root /></StrictMode>);
