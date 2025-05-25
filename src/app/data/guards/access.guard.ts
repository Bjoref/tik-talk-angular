import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHttpService } from '../services/auth-http.service';

export const accessGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthHttpService).isAuth;

  if(isLoggedIn) return true;

  return inject(Router).createUrlTree(['/login'])
};
