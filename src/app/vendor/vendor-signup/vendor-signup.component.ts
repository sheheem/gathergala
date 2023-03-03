import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css'],
})
export class VendorSignupComponent {
  constructor(private vendorService: VendorService, private router: Router) {}

  @ViewChild('info') signupForm?: NgForm;
  errorTrue: boolean = false;
  errorMessage: string = ''


  onSubmit = () => {
    // console.log(this.signupForm?.value);
    this.vendorService
      .createVendor(
        this.signupForm?.value.username,
        this.signupForm?.value.email,
        this.signupForm?.value.phone,
        this.signupForm?.value.password
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['vendor/login'])
        },
        error: (err) => {
          // alert(err.error.message)
          this.errorTrue = true;
          this.errorMessage = err.error.message;
        },
      });

    this.signupForm?.reset();
  };
}
