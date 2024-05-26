import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const editPermissionGuard: CanActivateFn = (route, state) => {
  const localData: string | null = localStorage.getItem('Role');
  const ngToastService = inject(NgToastService);
  if (localData !== 'Admin') {
    ngToastService.error({
      detail: 'Warning Message',
      summary: 'Unfortunately, only Admin can edit user.',
    });
    return false;
  }

  return true;
};
