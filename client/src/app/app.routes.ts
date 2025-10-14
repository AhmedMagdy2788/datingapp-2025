import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MembersResolver } from './core/resolvers/members.resolver';

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
        resolve: {members: MembersResolver},
    }
];
