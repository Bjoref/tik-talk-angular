import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthHttpService } from '../services/auth-http.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing: boolean = false;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthHttpService);
  const token = authService.token;

  if(!token) return next(req);

  if(isRefreshing) {
    return refreshAndPrcced(authService, req, next)
  }

  return next(addToken(req, token))
    .pipe(
      catchError(error => {
        if(error.status === 403) {
          return refreshAndPrcced(authService, req, next)
        }

        return throwError(error)
      })
    );
};

const refreshAndPrcced = (authService: AuthHttpService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if(!isRefreshing) {
    isRefreshing = true;
    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefreshing = false;
          return next(addToken(req, res.access_token))
        })
      )
  }

  return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}