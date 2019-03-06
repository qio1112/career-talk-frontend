import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * a guard which protects routes for student users
 */
@Injectable()
export class AuthAsStudentGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuthenticated = this.authService.getAuthStatus();
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
      const userType = this.authService.getUserType();
      return isAuthenticated && userType === 'student';
  }
}
