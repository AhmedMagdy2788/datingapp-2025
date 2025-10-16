import { RegisterCreds } from './../../types/user';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginCreds, User } from '../../types/user';
import { catchError, filter, Observable, of, tap } from 'rxjs';

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
