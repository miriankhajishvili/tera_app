import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/auth/log-in/log-in.component').then(
        (m) => m.LogInComponent
      ),
  },
  {
    path: 'register',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./pages/users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'users-detail/:id',
    loadComponent: () =>
      import('./pages/users-detail/users-detail.component').then(
        (m) => m.UsersDetailComponent
      ),
    canActivate: [authGuard],
  },
];
