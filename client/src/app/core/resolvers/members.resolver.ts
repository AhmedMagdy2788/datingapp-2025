import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../../types/user';
import { catchError, of } from 'rxjs';

export const MembersResolver: ResolveFn<User[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const httpClient = inject(HttpClient);
  return httpClient.get<User[]>('https://localhost:7053/api/members').pipe(
    catchError((error) => {
      console.error('Failed to load members:', error);
      return of([]); // Return empty array as fallback
    })
  );
};
