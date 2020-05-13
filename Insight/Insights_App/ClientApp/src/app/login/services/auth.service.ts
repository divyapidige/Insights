import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { common } from '../../shared/constants/commonConstants';
import { Url } from '../../shared/constants/urlConstants';
import { PersistDataService } from '../../shared/services/persist-data.service';
import { UrlHelper } from '../../utils/configure-helpers/url';
import { WrapperService } from '../../utils/wrapper/wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private wrapperService: WrapperService, private router: Router, private persist: PersistDataService) {
  }


  private userKey = common.user;
  public redirectUrl;

  getLoginUser() {
    return this.persist.getLocalStorageDecryptItem(this.userKey);
  }

  isUserLoggedIn() {
    return (!!this.getLoginUser());
  }

  async msalAuthLogout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  async getSampleData() {
    const url = UrlHelper.joinPath(environment.virtualDirectoryName, Url.samplData);
    let marksData = await this.wrapperService.callApi('get', url);
    return marksData;
  }

}

