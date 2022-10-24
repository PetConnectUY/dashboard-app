import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string) {
    const url = `${this.baseUrl}auth/login`;
    const body = { username, password };
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(res => {
          this.setAuthData(res.access_token, res.user);
        }),
        map( valid => valid),
        catchError( err => {
          return of(err);
        })
      );
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    return sessionStorage.removeItem('token');
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User|null {
    const jsonUser = localStorage.getItem('user');
    if(jsonUser) {
      return JSON.parse(jsonUser);
    }
    return null;
  }

  isAuthenticated():boolean {
    return Boolean(this.getToken());
  }

  tokenExpired() {
    const token = this.getToken();
    const payload = atob(token!.split('.')[1]);
    const parsedPayLoad = JSON.parse(payload);

    return parsedPayLoad.exp > Date.now() / 1000;
  }

  refreshToken(): Observable<boolean> {
    const url = `${this.baseUrl}auth/refresh`;
    return this.http.post<AuthResponse>(url, {})
      .pipe(
        tap( res => {
          this.setAuthData(res.access_token, res.user);
        }),
        map( valid => valid ),
          catchError(err => {
            return of(err)
          })
      );
  }

  private setAuthData(token: string, user: User) {
    this.setToken(token);
    this.setUser(user);
  }

  getTokenHeaders() {
    return {Authorizathion: `Bearer ${this.getToken() || ''}`};
  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

  logout() {
    this.removeToken();
  }
}
