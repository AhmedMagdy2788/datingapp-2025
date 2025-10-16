import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MemberResolver, MembersResolver } from './core/resolvers/members.resolver';
import { MemberList } from './features/members/member-list/member-list';
import { MemberDetailed } from './features/members/member-detailed/member-detailed';
import { NotFound } from './shared/components/not-found/not-found';
import { Lists } from './features/lists/lists';
import { Messages } from './features/messages/messages';
import { authGuard } from './core/guards/Auth.guard';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'members',
    component: MemberList,
    title: 'Members',
    canActivate: [authGuard],
    resolve: { members: MembersResolver },
  },
  {
    path: 'members/:id',
    component: MemberDetailed,
    title: 'Member Details',
    canActivate: [authGuard],
    resolve: { member: MemberResolver },
  },
  {
    path: 'lists',
    component: Lists,
    canActivate: [authGuard],
    title: 'Lists',
  },
  {
    path: 'messages',
    component: Messages,
    canActivate: [authGuard],
    title: 'Messages',
  },
  {
    path: 'errors',
    component: TestErrorComponent,
    title: 'Errors',
  },
  {
    path: 'not-found',
    component: NotFound,
    title: 'Not Found',
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    title: 'Server Error',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
