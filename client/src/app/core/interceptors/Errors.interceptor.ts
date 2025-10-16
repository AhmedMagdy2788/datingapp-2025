import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/Toast.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toaster = inject(ToastService);
  return next(req).pipe(
    catchError((response) => {
      if (response) {
        console.log(response);
        switch (response.status) {
          case 400: {
            if (response.error.errors) {
              const modalStateErrors = [];
              for (const key in response.error.errors) {
                // toaster.error(response.error.errors[key]);
                if (response.error.errors[key]) {
                  modalStateErrors.push(response.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              toaster.error(response.error);
              // console.log(error.statusText);
            }
            break;
          }
          case 401: {
            toaster.error(response.error);
            // console.log(error.statusText);
            break;
          }
          case 404: {
            // toaster.error(response.error.title);
            const navigationExtras: NavigationExtras = { state: { error: response.error } };
            router.navigateByUrl('/not-found', navigationExtras);
            // console.log(error.statusText);
            break;
          }
          case 500:
            {
              // toaster.error(response.error.message);
              const navigationExtras: NavigationExtras = { state: { error: response.error } };
              router.navigateByUrl('/server-error', navigationExtras);
            }
            break;
          default: {
            toaster.error('Something unexpected went wrong');
            console.log(response);
            break;
          }
        }
      }

      return throwError(() => response);
    })
  );
};
