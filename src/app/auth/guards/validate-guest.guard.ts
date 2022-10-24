import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateGuestGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/app']);
        return false;
      }
    return true;
  }
}
