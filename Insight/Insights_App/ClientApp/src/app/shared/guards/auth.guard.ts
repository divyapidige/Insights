import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../login/services/auth.service';
import { PersistDataService } from '../../shared/services/persist-data.service';
import { common } from '../../shared/constants/commonConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private persist: PersistDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * To check user is Logged in or not
   * if not then redirect user to User screen
   */
  checkLogin(url: string): boolean {
    if (this.authService.isUserLoggedIn()) {
      this.persist.setLocalStorageItem(common.redirectUrl, url);
      this.authService.redirectUrl = url;
      return true;
    }

    this.persist.setLocalStorageItem(common.redirectUrl, url);
    this.authService.redirectUrl = url;
    return false;
  }
}
