import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';

initializeApp({
  apiKey: "AIzaSyBXnz-zWuZ6XTL3IKnWfIedXgG8sSEvpkA",
  authDomain: "portfolio-project-500120.firebaseapp.com",
  projectId: "portfolio-project-500120",
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()), provideClientHydration(withEventReplay()),

    
  ]
};
