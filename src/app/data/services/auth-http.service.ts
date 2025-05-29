import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthToken } from '../interfaces/auth.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthHttpService extends HttpService {
	private direction: string = 'auth/';

	public token: string | null = null;
	public refreshToken: string | null = null;

	router = inject(Router);
	cookieService = inject(CookieService);

	get isAuth(): boolean {
		if (!this.token) {
			this.token = this.cookieService.get('token');
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

		return this.http
			.post<AuthToken>(`${this.baseApiUrl}${this.direction}token`, fd)
			.pipe(
				tap((val) => {
					this.saveToken(val);
				})
			);
	}

	refreshAuthToken() {
		return this.http
			.post<AuthToken>(`${this.baseApiUrl}${this.direction}refresh`, {
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
		this.cookieService.deleteAll();
		this.token = null;
		this.refreshToken = null;
		this.router.navigate(['/login']);
	}

	saveToken(val: AuthToken) {
		this.token = val.access_token;
		this.refreshToken = val.refresh_token;

		this.cookieService.set('token', this.token);
		this.cookieService.set('refreshToken', this.refreshToken);
	}
}
