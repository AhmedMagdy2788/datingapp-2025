import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private accountService: AccountService) { }
  init() : Observable<null> {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.accountService.currentUser.set(user);
    }
    return of(null);
  }
}
