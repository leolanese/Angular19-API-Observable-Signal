import {ApplicationConfig,provideZoneChangeDetection} from '@angular/core';
import {provideRouter,withComponentInputBinding} from '@angular/router';

import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      // withInterceptors([
      //   httpRequestInterceptor
      // ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
  ]
};

// StackBlitz (main.ts)
// bootstrapApplication(App, {
//   providers: [
//     provideHttpClient(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//   ],
// });

