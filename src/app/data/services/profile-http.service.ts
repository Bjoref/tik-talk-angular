import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpService extends HttpService {
  getTestsAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
