import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      // withInterceptors([
      //   httpRequestInterceptor
      // ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};

// StackBlitz (main.ts)
// bootstrapApplication(App, {
//   providers: [
//     provideHttpClient(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//   ],
// });

