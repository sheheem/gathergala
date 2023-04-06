import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, skip } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { iVendorProfile } from '../model/profile.model';
import { VendorLogin } from '../model/vendor-login.interface';
import { VendorSignUp } from '../model/vendor-signup.interface';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  geometry: {
    coordinates: number[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class VendorService {


  constructor(private http: HttpClient) {}

  createVendor(name: string, email: string, phone: number, password: string) {
    const vendorSignUp: VendorSignUp = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    return this.http.post(`${environment.api}/auth/vendorsignup`, vendorSignUp);
  }

  loginVendor(email: string, password: string) {
    const vendorLogin: VendorLogin = { email: email, password: password };
    return this.http.post<{ accessToken: string }>(
      `${environment.api}/auth/vendorsignin`,
      vendorLogin
    );
  }

  profile() {
    return this.http.get<{profile: iVendorProfile}>(`${environment.api}/vendor/profile`);
  }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http
      .get(
        url + query + `.json?&access_token=${environment.mapbox.accessToken}`
      )
      .pipe(
        map((res: MapboxOutput) => {
          return res.features;
        })
      );
  }

  getImageUrl() {
    return this.http.get<{url: string}>(`${environment.api}/s3url`);
  }

  upload_image(url: string, file: any) {
    const headerOption = {
      "Content-Type": "multipart/form-data",
      skip:"true"
    }
    return this.http.put(url, file, {headers: new HttpHeaders(headerOption) } )
  }

  createEvent(data){
    return this.http.post(`${environment.api}/event/add_event`, data)
  }


}
