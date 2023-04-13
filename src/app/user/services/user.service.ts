import { query } from '@angular/animations';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iEvent } from 'src/app/model/event.interface';
import { iOrder } from 'src/app/model/order.interface';
import { iSignUpUser } from 'src/app/model/signUpUser.interface';
import { iUserLogin } from 'src/app/model/user.model.interface';
import { iUserProfle } from 'src/app/model/userProfile.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  signUpUser(email:string, password: string, name: string, phone: number) {
    const userSignUp: iSignUpUser = {name: name, email: email, password: password, phone: phone};
    return this._http.post(`${environment.api}/auth/signup`, userSignUp);
  }

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

  findOrder(userId){
    return this._http.get<{orders: iOrder[]}>(`${environment.api}/order/findTicket/${userId}`)
  }

  updateProfile(userId, data) {
    return this._http.put(`${environment.api}/user/updateUser/${userId}`, data)
  }

  getImageUrl() {
    return this._http.get<{url: string}>(`${environment.api}/s3url`);
  }


  upload_image(url: string, file: any) {
    const headerOption = {
      "Content-Type": "multipart/form-data",
      skip:"true"
    }
    return this._http.put(url, file, {headers: new HttpHeaders(headerOption) } )
  }
}
