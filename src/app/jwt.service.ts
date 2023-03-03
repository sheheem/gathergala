import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: string):void {
    window.localStorage.setItem('token', token);
  }

  getToken(): string|null {
    return window.localStorage.getItem('token');
  }

  destroyToken(): void{
    window.localStorage.removeItem('token');
  }

}
