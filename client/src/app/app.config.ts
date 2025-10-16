import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authorizeRequestsInterceptor } from './core/interceptors/AuthorizeRequests.interceptor';
import { InitService } from './core/services/Init.service';
import { lastValueFrom } from 'rxjs';
import { errorsInterceptor } from './core/interceptors/Errors.interceptor';

// Unfortunately, `withFetch()` uses the Fetch API under the hood, which does not natively support tracking upload progress in the same way as XMLHttpRequest.
// If you need to track upload or download progress, you should avoid using `withFetch()` and rely on the default Angular HttpClient (which uses XMLHttpRequest).
// Here's how you can configure it without `withFetch()` to enable progress tracking:

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(
      withInterceptors([authorizeRequestsInterceptor, errorsInterceptor])
      // Do NOT use withFetch() if you need progress tracking
    ),
    provideAppInitializer(async () => {
      // Any app initialization logic can go here
      const initService = inject(InitService); // Example service
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          try {
            return lastValueFrom(initService.init());
          } finally {
            const splash = document.getElementById('splash-screen');
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 1000); // Simulate some delay for initialization
      });
    }),
  ],
};

// If you use withFetch(), you lose the ability to track upload progress.
// To track progress, use HttpClient's { reportProgress: true, observe: 'events' } options in your requests.
