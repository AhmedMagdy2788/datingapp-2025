import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../../types/user';
import { catchError, of } from 'rxjs';
import { MemberService } from '../services/member.service';
import { MemberEntity } from '../../types/member';
import { ToastService } from '../services/Toast.service';

export const MembersResolver: ResolveFn<MemberEntity[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const membersService = inject(MemberService);
  const toaster = inject(ToastService);
  return membersService.getMembers().pipe(
    catchError((error) => {
      console.error('Failed to load members:', error);
      toaster.error('Failed to load members:'+ JSON.stringify(error))
      return of([]); // Return empty array as fallback
    })
  );
};

export const MemberResolver: ResolveFn<MemberEntity> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const membersService = inject(MemberService);
  const toaster = inject(ToastService);
  const id = route.paramMap.get('id');
  return membersService.getMember(id??'').pipe(
    catchError((error) => {
      console.error(`Failed to load member with id ${id}:`, error);
      toaster.error(`Failed to load member with id ${id}:`+ JSON.stringify(error))
      // Redirect to a not-found page or similar
      return of({ redirectTo: '/not-found' } as any);
    })
  );
}