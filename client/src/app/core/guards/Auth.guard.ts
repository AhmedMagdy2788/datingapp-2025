import { inject } from '@angular/core';
import { AccountService } from './../services/account.service';
import type { CanActivateFn } from '@angular/router';
import { ToastService } from '../services/Toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService)
  if (!accountService.currentUser()) {
    toast.info('You must be logged in to access this page.');
    accountService.logout();
    return false;
  }
  return true;
};
