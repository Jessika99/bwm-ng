import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  private url: string;

  constructor(private auth: AuthService,
              private router: Router) {}

  private isLoginOrRegisterPage(): boolean {
    if (this.url.includes('login') || this.url.includes('register')) {
      return true;
    }

    return false;
  }

  private handleAuthUser(): boolean {
    if (this.isLoginOrRegisterPage()) {

      this.router.navigate(['/rentals']);
      return false;
    }

    return true;
  }

  private handleNotAuthUser(): boolean {
    if (this.isLoginOrRegisterPage()) {

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    this.url = state.url;

    if (this.auth.isAuthenticated()) {

      return this.handleAuthUser();
    } else {

      return this.handleNotAuthUser();
    }
  }
}