import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.headers.get('skip')){

      return next.handle(request);
    }
    const token = this._jwtService.getUserToken();
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    };
    headersConfig.Authorization = `Bearer ${token}`;
    const authReq = request.clone({setHeaders: headersConfig});
    return next.handle(authReq);
  }
}
