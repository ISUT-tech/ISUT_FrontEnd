import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) { }

  canActivate(): boolean {
    if (!this.loginService.isAuthenticated()) {
      this.router.navigateByUrl('/external/login');
      return false;
    }
    return true;
  }
}