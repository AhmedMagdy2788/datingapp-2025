import { AccountService } from './../../core/services/account.service';
import { Component, DestroyRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginCreds, User } from '../../types/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})
export class Nav {
  protected cred: LoginCreds = { email: '', password: '' };
  constructor(protected accountService: AccountService, private destroyRef: DestroyRef) {}
  login() {
    this.accountService
      .login(this.cred)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: (error) => alert(error.error) });
  }
  logout() {
    this.accountService.logout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
