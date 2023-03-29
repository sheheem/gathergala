import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUserLogin } from 'src/app/model/user.model.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  loginUser(email: string, password: string) {
    const userLogin: iUserLogin = {email: email, password: password};
    return this._http.post<{ accessToken: string }>(`${environment.api}/auth/signin`, userLogin)
  }
}
