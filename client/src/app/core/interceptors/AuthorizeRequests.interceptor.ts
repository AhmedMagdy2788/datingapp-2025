import type { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../../types/user';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const authorizeRequestsInterceptor: HttpInterceptorFn = (req, next) => {
  let accountService = inject(AccountService);
  const currentUser = accountService.currentUser();
  if (!currentUser) {
    return next(req);
  }
  if (currentUser.token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};
