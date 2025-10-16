import { AccountService } from './../../core/services/account.service';
import { Component, DestroyRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginCreds } from '../../types/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { ToastService } from '../../core/services/Toast.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})
export class Nav {
  protected cred: LoginCreds = { email: '', password: '' };
  constructor(
    private router: Router,
    protected accountService: AccountService,
    private toastService: ToastService,
    private destroyRef: DestroyRef
  ) {}
  login() {
    this.accountService
      .login(this.cred)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {this.router.navigateByUrl('/members'); this.toastService.success('Welcome back!')}),
        catchError((error) => { this.toastService.error(error.error); return [];}),
        finalize(() => (this.cred.password = ''))
      )
      .subscribe();
  }
  logout() {
    this.accountService
      .logout()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(()=> this.toastService.info('You have been logged out')),
        catchError((error) => {
          this.toastService.error('Error logging out');
          return [];
        }),
        finalize(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
