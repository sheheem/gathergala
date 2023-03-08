import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { VendorLogin } from '../model/vendor-login.interface';
import { VendorSignUp } from '../model/vendor-signup.interface';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient ) {}

  createVendor(name: string, email: string, phone: number, password: string) {
    const vendorSignUp: VendorSignUp = { name: name, email: email,phone: phone, password: password };
   return this.http.post(`${environment.api}/auth/vendorsignup`, vendorSignUp)
  }

  loginVendor(email: string, password: string) {
    const vendorLogin: VendorLogin = {email: email, password: password};
    return this.http.post<{accessToken: string}>(`${environment.api}/auth/vendorsignin`, vendorLogin)
  }

  profile() {
    return this.http.get(`${environment.api}/vendor/profile`)
  }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    return this.http.get(url + query + `.json?types=address&access_token=${environment.mapbox.accessToken}`).pipe(map((res) => {
      return res;
    }))
  }

  
}
