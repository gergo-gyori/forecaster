import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  activeUser: User;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));

    if (this.activeUser !== null) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}
