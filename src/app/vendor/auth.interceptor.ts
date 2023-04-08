import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  //Avoid any
  constructor(private jwtService: JwtService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.headers.get('skip')){
      return next.handle(request)
    }
    const token = this.jwtService.getToken();
    const userToken = this.jwtService.getUserToken()
    console.log(userToken);
    
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: '',
    };
    if(token) {
      headersConfig.Authorization = `Bearer ${token}`;
    } else {
      headersConfig.Authorization = `Bearer ${userToken}`;
    }
    const authReq = request.clone({setHeaders: headersConfig});
    console.log(authReq);
    return next.handle(authReq);
  }
}
