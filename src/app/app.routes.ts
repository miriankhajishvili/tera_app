import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { editPermissionGuard } from './core/guards/permission.guard';
import { HeaderComponent } from './layout/header/header.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [loginGuard],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.routes),
  },

  {
    path: '',
    component: HeaderComponent,
    children: [

      {
        path: '',
        redirectTo: '/users-list',
        pathMatch: 'full'
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
        canActivate: [editPermissionGuard],
      },
      {
        path: '**',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './shared/components/pagenotfound/pagenotfound.component'
          ).then((m) => m.PagenotfoundComponent),
      },
    ],
  },
];
