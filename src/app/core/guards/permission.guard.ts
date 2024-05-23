import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const editPermissionGuard: CanActivateFn = (route, state) => {
  const localData = localStorage.getItem('Role');
  const ngToastService = inject(NgToastService);
  if (localData !== 'Admin') {
    ngToastService.warning({
      detail: 'Warning Message',
      summary: 'Unfortunately, the user does not have editing rights',
    });
    return false;
  }

  return true;
};

export const deletePermissionGuard: CanActivateFn = (route, state) => {
  const localData = localStorage.getItem('Role');
  const ngToastService = inject(NgToastService);
  if (localData !== 'Admin') {
    ngToastService.warning({
      detail: 'Warning Message',
      summary: 'Unfortunately, the user does not have delete rights',
    });
    return false;
  }

  return true;
};
