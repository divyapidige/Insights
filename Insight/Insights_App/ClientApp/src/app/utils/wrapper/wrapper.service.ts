/**
* @description wrapper component to make api calls 
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class WrapperService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Wrapper to get api response
   * @param apiUrl 
   * @param data 
   * @param params 
   */

  public async callApi(method: string, apiUrl: any, data?: any, params?: any, headers?: any, observe?: any, reportProgress?: boolean): Promise<any> {
    const reprtProgress = reportProgress ? reportProgress : false;
    const header = headers == undefined ? new HttpHeaders({ 'Content-Type': 'application/json' }) : headers;
    if (params) {
      if (header) {
        if (observe) {
          return await this.http.request(method, apiUrl, { body: data, params: params, headers: header, observe: observe, reportProgress: reprtProgress }).toPromise();
        } else {
          return await this.http.request(method, apiUrl, { body: data, params: params, headers: header, reportProgress: reprtProgress }).toPromise();
        }
      } else {
        if (observe) {
          return await this.http.request(method, apiUrl, { body: data, params: params, observe: observe, reportProgress: reprtProgress }).toPromise();
        } else
          return await this.http.request(method, apiUrl, { body: data, params: params, reportProgress: reprtProgress }).toPromise();
      }
    } else {
      if (header) {
        if (observe) {
          return await this.http.request(method, apiUrl, { body: data, headers: header, observe: observe, reportProgress: reprtProgress }).toPromise();
        } else {
          return await this.http.request(method, apiUrl, { body: data, headers: header, reportProgress: reprtProgress }).toPromise();
        }
      } else {
        if (observe) {
          return await this.http.request(method, apiUrl, { body: data, observe: observe, reportProgress: reprtProgress }).toPromise();
        } else {
          return await this.http.request(method, apiUrl, { body: data, reportProgress: reprtProgress }).toPromise();
        }
      }
    }
  }

}
