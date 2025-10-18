import { AccountService } from './../../core/services/account.service';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginCreds } from '../../types/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { ToastService } from '../../core/services/Toast.service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})
export class Nav implements OnInit {
  protected cred: LoginCreds = { email: '', password: '' };
  protected selectedTheme = signal<string>(localStorage.getItem('theme') ?? 'light');
  protected themes = themes;

  constructor(
    private router: Router,
    protected accountService: AccountService,
    private toastService: ToastService,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectedTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if(elem) elem.blur();
  }

  login() {
    this.accountService
      .login(this.cred)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          this.router.navigateByUrl('/members');
          this.toastService.success('Welcome back!');
        }),
        catchError((error) => {
          this.toastService.error(error.error);
          return [];
        }),
        finalize(() => (this.cred.password = ''))
      )
      .subscribe();
  }

  logout() {
    this.accountService
      .logout()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.toastService.info('You have been logged out')),
        catchError((error) => {
          this.toastService.error('Error logging out');
          return [];
        }),
        finalize(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
