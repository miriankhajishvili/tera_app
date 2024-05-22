import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem('Users');

  if (localData) {
    router.navigate(['/users-list']);
    return false;
    
  } else {
 
    return true;
  }
};
