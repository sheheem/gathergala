import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iEvent } from 'src/app/model/event.interface';
import { iUserLogin } from 'src/app/model/user.model.interface';
import { iUserProfle } from 'src/app/model/userProfile.interface';
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

  profile() {
    return this._http.get<{profile: iUserProfle}>(`${environment.api}/user/userProfile`)
  }
 
  findAllEvents() {
    return this._http.get<{event: iEvent[]}>(`${environment.api}/event/all_event`)
  }

  findEventById(id) {
    return this._http.get<{eventDetail: iEvent}>(`${environment.api}/event/event-detail/${id}`, )
  }

  // checkOut(orderData): any {
  //   return this._http.post(`${environment.api}/order/checkOut`, orderData)
  // }

  orderProcess(orderData): any {
    return this._http.post(`${environment.api}/order/orderProcess`, orderData);
  }

  orderSuccess(sessionId) {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("session_id", `${sessionId}`)
    return this._http.get(`${environment.api}/order/success`, {params: queryParams})
  }
}