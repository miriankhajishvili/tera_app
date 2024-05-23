import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { editPermissionGuard,  } from './core/guards/permission.guard';

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
  {
    path: 'edit-user/:id',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
      canActivate: [editPermissionGuard]
  },
  { path: '**', pathMatch: 'full',    loadComponent: () =>
    import('./shared/components/pagenotfound/pagenotfound.component').then(
      (m) => m.PagenotfoundComponent
    ), },
];
