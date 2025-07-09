import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'sefer/themes';
import { LanguageProvider } from 'sefer/components/LanguageProvider';
import App from './App';
import './index.css';
import { NavigationProvider } from 'components';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <LanguageProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
