import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { CLIENT_CONTEXT_READ } from 'lib-contracts';

import { routes } from './app.routes';
import { ClientContextService } from './core/context/client-context/client-context.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: CLIENT_CONTEXT_READ,
      useExisting: ClientContextService,
    },
  ],
};
