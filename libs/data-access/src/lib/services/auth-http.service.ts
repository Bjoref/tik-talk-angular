import { inject, Injectable, Signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthToken } from '../interfaces/auth.interface';
import { HttpService } from './http.service';
import { Store } from '@ngrx/store';
import { selectToken, tokenActions } from '../store/tokenStore';

@Injectable({
	providedIn: 'root',
})
export class AuthHttpService extends HttpService {
	store = inject(Store);
	router = inject(Router);
	cookieService = inject(CookieService);

	private direction: string = `${this.baseApiUrl}auth/`;

	public token: Signal<string | null> = this.store.selectSignal(selectToken);

	public refreshToken: string | null = null;

	get isAuth(): boolean {
		if (!this.token) {
			this.store.dispatch(
				tokenActions.refreshToken({
					token: this.cookieService.get('token'),
				})
			);
			this.refreshToken = this.cookieService.get('refreshToken');
		}

		return !!this.token;
	}

	login(payload: {
		username: string;
		password: string;
	}): Observable<AuthToken> {
		const fd: FormData = new FormData();

		fd.append('username', payload.username);
		fd.append('password', payload.password);

		return this.http.post<AuthToken>(`${this.direction}token`, fd).pipe(
			tap((val) => {
				this.saveToken(val);
			})
		);
	}

	refreshAuthToken() {
		return this.http
			.post<AuthToken>(`${this.direction}refresh`, {
				refresh_token: this.refreshToken,
			})
			.pipe(
				tap((res) => {
					this.saveToken(res);
				}),
				catchError((error) => {
					this.logout();
					return throwError(error);
				})
			);
	}

	logout() {
		return this.http.post<any>(`${this.direction}logout`, {}).subscribe(
			() => {},
			() => {},
			() => {
				this.cookieService.deleteAll();
				this.store.dispatch(tokenActions.refreshToken({ token: null }));
				this.refreshToken = null;
				this.router.navigate(['/login']);
			}
		);
	}

	saveToken(val: AuthToken) {
		const token = val.access_token;
		this.store.dispatch(tokenActions.refreshToken({ token }));

		this.refreshToken = val.refresh_token;

		this.cookieService.set('token', token);
		this.cookieService.set('refreshToken', this.refreshToken);
	}
}
