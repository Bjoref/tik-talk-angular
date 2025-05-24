import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { AuthToken } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends HttpService {
  login(payload: { username: string, password: string }): Observable<AuthToken> {
    const fd: FormData = new FormData();

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post<AuthToken>(`${this.baseApiUrl}auth/token`, fd)
  }
}
