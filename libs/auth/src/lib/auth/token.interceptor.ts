import {
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthHttpService } from '@tt/data-access';
import {
	BehaviorSubject,
	catchError,
	filter,
	switchMap,
	tap,
	throwError,
} from 'rxjs';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthHttpService);
	const token = authService.token;

	if (!token) return next(req);

	if (isRefreshing$.value) {
		return refreshAndPrcced(authService, req, next);
	}

	return next(addToken(req, token)).pipe(
		catchError((error) => {
			if (error.status === 403) {
				return refreshAndPrcced(authService, req, next);
			}

			return throwError(error);
		})
	);
};

const refreshAndPrcced = (
	authService: AuthHttpService,
	req: HttpRequest<any>,
	next: HttpHandlerFn
) => {
	if (!isRefreshing$.value) {
		isRefreshing$.next(true);
		return authService.refreshAuthToken().pipe(
			switchMap((res) => {
				return next(addToken(req, res.access_token)).pipe(
					tap(() => {
						isRefreshing$.next(false);
					})
				);
			})
		);
	}

	if (req.url.includes('refresh'))
		return next(addToken(req, authService.token()!));

	return isRefreshing$.pipe(
		filter((isRefreshing$) => !isRefreshing$),
		switchMap((res) => {
			return next(addToken(req, authService.token()!));
		})
	);
};

const addToken = (req: HttpRequest<any>, token: string | null) => {
	return req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
		},
	});
};
