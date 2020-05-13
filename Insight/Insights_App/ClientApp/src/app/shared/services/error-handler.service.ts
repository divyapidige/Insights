import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor() {
  }
  handleError(error) {
    //console.error('An error occurred:', error.message);
    console.log('An error occurred:', error.message);
  }
}  
