import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.apiUrl;

  private TOKEN_NAME = 'jwt_token';
  // Store the URL to redirect after logging in
  redirectUrl = '/pages';

  constructor(private http: HttpClient, private router: Router) { }

  private static getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private static buildAuthHeaders(authData) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic ' + btoa(authData.username + ':' + authData.password));
    return headers;
  }

  login(authData) {
    return this.http.get(this.baseUrl + '/login', {
      headers: AuthService.buildAuthHeaders(authData),
      withCredentials: true
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = AuthService.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

}
