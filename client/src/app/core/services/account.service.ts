import { RegisterCreds } from './../../types/user';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginCreds, User } from '../../types/user';
import { filter, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:7053/api/';
  currentUser = signal<User | null>(null);
  constructor(private http: HttpClient) {}

  login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      filter((user) => !!user),
      tap((user) => this.setCurrentUser(user)),
    );
  }
  register(creds: RegisterCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      filter((user) => !!user),
      tap((user) => this.setCurrentUser(user))
    );
  }
  logout() {
    this.clearCurrentUser();
    return this.http.post(this.baseUrl + 'account/logout', {});
  }
  private setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.set(user);
  }
  private clearCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }
}
