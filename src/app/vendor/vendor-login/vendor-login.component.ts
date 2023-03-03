import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css'],
})
export class VendorLoginComponent {
  constructor(private vendorService: VendorService, private router: Router, private jwtService: JwtService) {}

  @ViewChild('info') loginForm?: NgForm;
  errorTrue: boolean = false;
  errorMessage: string = '';


  //
  onSubmit() {
    this.vendorService
      .loginVendor(this.loginForm?.value.email, this.loginForm?.value.password)
      .subscribe({
        next: (response) => {
          this.jwtService.setToken(response.accessToken)
          this.router.navigate(['/vendor'])
        },
        error: (err) => {
          this.errorTrue = true;
          this.errorMessage = err.error.message;
        },
      });
    this.loginForm?.reset();

  }
}
