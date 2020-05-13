import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { MemorySession } from './memorySession';
import * as CryptoJS from 'crypto-js';
import { common } from '../../shared/constants/commonConstants';
import { BehaviorSubject } from 'rxjs';
/**
 * @description used for transfer data from one component to another
*/
@Injectable({
  providedIn: 'root'
})
export class PersistDataService {

  private data: any = undefined;
  isSessionAvailable: boolean;
  isLocalStorageAvailable: boolean;
  isMessageShown: boolean;
  behaviorObj: BehaviorSubject<any>;

  constructor() {
    this.behaviorObj = new BehaviorSubject(this.behaviorObj);
    this.handleError = this.handleError.bind(this);
    try {
      this.isSessionAvailable = (window.sessionStorage && window.sessionStorage.length >= 0);
      this.isLocalStorageAvailable = (window.localStorage && window.localStorage.length >= 0);
    } catch (error) {
      this.isSessionAvailable = false;
      this.isLocalStorageAvailable = false;
    }
  }

  public setbehaviorObjData(data: any): void {
    this.behaviorObj.next(data);
  }
  /**
   * To encrypt data and store in local
   * @param key
   * @param value
   */
  public setLocalStorageEncryptItem(key, value) {

    var data = JSON.stringify(value);
    var encryptedData = CryptoJS.AES.encrypt(data, common.secretKey).toString();
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, encryptedData);
    } else {
      MemorySession.setItem(key, encryptedData);
    }

  }

  /**
   * To decrypt data and get from local storage based on key
   * @param key
   */
  public getLocalStorageDecryptItem(key) {

    var encryptedData;
    if (this.isLocalStorageAvailable) {
      encryptedData = localStorage.getItem(key);
    } else {
      encryptedData = MemorySession.getItem(key);
    }
    if (encryptedData != null) {
      var decryptedData = CryptoJS.AES.decrypt(encryptedData, common.secretKey).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } else
      return decryptedData;

  }

  /**
   * To store data in local storage without encryption
   * @param key
   * @param value
   */
  public setLocalStorageItem(key, value) {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      MemorySession.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * To get data from local storage based on key
   * @param key
   */
  public getLocalStorageItem(key) {
    if (this.isLocalStorageAvailable) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return JSON.parse(MemorySession.getItem(key));
    }
  }


  /**
* Remove particular item from localStorage
* @param key Key to be removed
*/
  public removeLocalStorageItem(key: any) {
    if (sessionStorage) {
      localStorage.removeItem(key);
    } else {
      MemorySession.removeItem(key);
    }
  }


  /**
* Remove all items from localStorage
* @param key Key to be removed
*/
  public removeAllLocalStorageItems() {
    if (sessionStorage) {
      localStorage.clear();
    } else {
      MemorySession.removeAll();
    }
  }


  /**
   * set data without storing to local storage
   * @param data
   */
  setData(data: any) {
    this.data = data;
  }

  /**
   *get data without local storage
   * */
  getData(): any {
    return this.data;
  }


  //localforage methods

  public setItem(key: any, value: any, serialise = data => data) {
    localforage
      .setItem(key, JSON.parse(JSON.stringify(serialise(value))))
      .catch(this.handleError);
  }

  public async getItem(key: any, deserialise = data => data) {
    const returningValue = await localforage
      .getItem(key)
      .catch(this.handleError);
    return deserialise(returningValue);
  }

  private handleError(error: any) {

    if (!this.isMessageShown) {
      alert('Not enough storage to store local data. Reload will erase all data.');
      this.isMessageShown = true;
    }

    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });

  }

  public async removeItem(key: any) {
    const data = this.getItem(key);
    if (data) {
      await localforage.removeItem(key);
    }
  }

  public async removeAll() {
    await localforage.clear();
  }




  /**
   * To encrypt data and store in local session
   * @param key
   * @param value
   */
  public setSessionEncryptItem(key, value) {
    var data = JSON.stringify(value);
    var encryptedData = CryptoJS.AES.encrypt(data, common.secretKey).toString();
    if (this.isSessionAvailable) {
      sessionStorage.setItem(key, encryptedData);
    } else {
      MemorySession.setItem(key, encryptedData);
    }

  }

  /**
   * To decrypt data and get from local session based on key
   * @param key
   */
  public getSessionDecryptItem(key) {

    var encryptedData;
    if (this.isSessionAvailable) {
      encryptedData = sessionStorage.getItem(key);
    } else {
      encryptedData = MemorySession.getItem(key);
    }
    if (encryptedData != null) {
      var decryptedData = CryptoJS.AES.decrypt(encryptedData, common.secretKey).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } else
      return decryptedData;

  }


  /**
 * This method sets the key value pairs in the session storage
 * @param key
 * @param value
 * @param serialise
 */
  public setSessionStorageItem(key: any, value: any, serialise = data => data) {
    if (this.isSessionAvailable) {
      sessionStorage.setItem(key, JSON.stringify(serialise(value)));
    } else {
      // create an instance of it, then use
      MemorySession.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * This method returns the value of the key from the session storage
   * @param key
   * @param deserialise
   */
  public getSessionStorageItem(key: any, deserialise = data => data) {
    if (this.isSessionAvailable) {
      let returningValue = sessionStorage.getItem(key);
      if (returningValue) {
        returningValue = JSON.parse(returningValue);
      }
      return deserialise(returningValue);
    } else {
      // create an instance of it then use
      return JSON.parse(MemorySession.getItem(key));
    }
  }

  /**
 * Remove particular item from session
 * @param key Key to be removed
 */
  public removeSessionStorageItem(key: any) {
    if (sessionStorage) {
      sessionStorage.removeItem(key);
    } else {
      MemorySession.removeItem(key);
    }
  }

  /**
* Remove all items from session
* @param key Key to be removed
*/
  public removeAllSessionStorageItems() {
    if (sessionStorage) {
      sessionStorage.clear();
    } else {
      MemorySession.removeAll();
    }
  }
}
