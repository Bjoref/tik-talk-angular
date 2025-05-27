import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { HttpService } from './http.service';
import { Pageable } from '../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpService extends HttpService {

  me = signal<Profile | null>(null) ;
  filteredProfiles = signal<Profile[]>([]);

  getTestsAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(val => {
          this.me.set(val)
        })
      )
  }

  getSubscribersShortList(amount: number = 3) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, amount))
      )
  }

  getAccount(id: string | number) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile)
  }

  uploadAvatar(file: File) {
    const fd: FormData = new FormData();
    fd.append('image', file);

    return this.http.post(`${this.baseApiUrl}account/upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/accounts`, {params})
      .pipe(
        tap(res => this.filteredProfiles.set(res.items))
      );
  }
}
