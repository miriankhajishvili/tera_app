import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData: string | null = localStorage.getItem('Role');

  if (localData != null) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
