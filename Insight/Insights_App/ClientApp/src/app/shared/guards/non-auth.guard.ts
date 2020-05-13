import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../login/services/auth.service';
import { PersistDataService } from '../../shared/services/persist-data.service';
import { common } from '../../shared/constants/commonConstants';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private persist: PersistDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate([this.persist.getLocalStorageItem(common.redirectUrl)]);
      this.persist.setLocalStorageItem(common.redirectUrl, null);
      this.authService.redirectUrl = null;
      return false;
    }
    return true;
  }
}
