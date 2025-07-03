import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Pageable, Profile } from '../interfaces';

@Injectable({
	providedIn: 'root',
})
export class ProfileHttpService extends HttpService {
	private direction: string = `${this.baseApiUrl}account/`;

	me = signal<Profile | null>(null);

	getMe(): Observable<Profile> {
		return this.http.get<Profile>(`${this.direction}me`).pipe(
			tap((val) => {
				this.me.set(val);
			})
		);
	}

	getSubscribersShortList(amount: number = 3, id?: string | number) {
		if(id && id !== 'me') {
		return this.http
			.get<Pageable<Profile>>(`${this.direction}subscribers/${id}`)
			.pipe(map((res) => res.items.slice(0, amount)));
		}
		return this.http
			.get<Pageable<Profile>>(`${this.direction}subscribers/`)
			.pipe(map((res) => res.items.slice(0, amount)));
	}

	getAccount(id: string | number) {
		return this.http.get<Profile>(`${this.direction}${id}`);
	}

	patchProfile(profile: Partial<Profile>) {
		return this.http.patch<Profile>(`${this.direction}me`, profile);
	}

	uploadAvatar(file: File) {
		const fd: FormData = new FormData();
		fd.append('image', file);

		return this.http.post(`${this.direction}upload_image`, fd);
	}

	filterProfiles(params: Record<string, any>) {
		return this.http
			.get<Pageable<Profile>>(`${this.direction}accounts`, { params })
	}
}
