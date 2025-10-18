import { RegisterCreds } from './../../types/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, User } from '../../types/user';
import { catchError, filter, Observable, of, tap } from 'rxjs';
import { BASE_API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = inject(BASE_API_URL);
  currentUser = signal<User | null>(null);
  constructor(private http: HttpClient) {}

  login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      filter((user) => !!user),
      tap((user) => this.setCurrentUser(user))
    );
  }
  register(creds: RegisterCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      filter((user) => !!user),
      tap((user) => this.setCurrentUser(user))
    );
  }
  logout(): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'account/logout', {}).pipe(
      filter((res) => res === true),
      tap(() => this.clearCurrentUser()),
      catchError(() => {
        this.clearCurrentUser();
        return of(false);
      })
    );
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
