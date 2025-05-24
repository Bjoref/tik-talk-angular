import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpService {
  private http = inject(HttpClient);
  private baseApiUrl:string = 'https://icherniakov.ru/yt-course/'

  constructor() { }

  getTestsAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
