import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: string):void {
    window.localStorage.setItem('vendorToken', token);
  }

  getToken(): string|null {
    return window.localStorage.getItem('vendorToken');
  }

  destroyToken(): void{
    window.localStorage.removeItem('vendorToken');
  }

  setUserToken(token: string): void {
    window.localStorage.setItem('userToken', token);
  }

  getUserToken(): string|null {
    return window.localStorage.getItem('userToken')
  }

  destroyUserToken(): void {
    window.localStorage.removeItem('userToken')
  }

}
