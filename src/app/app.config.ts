import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { initializeAnalytics, isSupported } from 'firebase/analytics';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { provideHttpClient, withFetch } from '@angular/common/http';

const fbapp = initializeApp({
  apiKey: "AIzaSyBXnz-zWuZ6XTL3IKnWfIedXgG8sSEvpkA",
  authDomain: "portfolio-project-500120.firebaseapp.com",
  projectId: "portfolio-project-500120",
  storageBucket: "portfolio-project-500120.firebasestorage.app",
  messagingSenderId: "627392119020",
  appId: "1:627392119020:web:c257faf77aa64b4f2165c9",
  measurementId: "G-LSDYZQH824",
});

// due to ssr - check if analytics is supported
isSupported().then(v => {
  if (!v) return;
  initializeAnalytics(fbapp, { config: {} });
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
    
  ]
};
