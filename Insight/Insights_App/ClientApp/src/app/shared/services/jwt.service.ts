import { AuthService } from '../../login/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(public authService: AuthService) {
  }

  /**
   * It will call for every API request made from user and checkuser is logged in or not
   * and Check reuqested route present in whiteList Urls
   * if logged and url not present in whitelist then add token to outgoing request
   * if not logged or url present in whitelist then skips adding token to outgoing request
   * if token is expired then regenerate Token
   * if any exceptions while request like 404 , 500 then logged out user from session and delete user related data from local
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    /**
   * To check user is logged or not and  url present in whitelist or not
   *  based on return value it will add /skip adding token to outgoing request
   */

    if (this.authService.isUserLoggedIn()) {
      request = this.addAdminToken(request);
    }
    return next.handle(request);

  }

  /**
  * To Adding token and subscriptionKey to outgoing request
  * @param request
  * @param token
  * @param subscriptionKey
  */
  private addAdminToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
       // 'Authorization': `Bearer ${token}`,
       // 'Ocp-Apim-Subscription-Key': subscriptionKey,
      }
    });
  }

}
