import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard # canActivate called');

    if (!this.authService.isTokenExpired()) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = state.url;

    console.log('AuthGuard # canActivate @ Access denied! Navigating to login...');
    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard # canActivateChild called');
    return this.canActivate(route, state);
  }
}
