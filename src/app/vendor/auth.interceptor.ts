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
    const token = this.jwtService.getToken()
    console.log(token);
    
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: '',
    };
    headersConfig.Authorization = `Bearer ${token}`;
    const authReq = request.clone({setHeaders: headersConfig});
    console.log(authReq);
    
    return next.handle(authReq);
  }
}
