import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Title } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css'],
})
export class VendorSignupComponent implements OnInit {
  constructor(private vendorService: VendorService, private router: Router, private _title: Title) {}

  @ViewChild('info') signupForm?: NgForm;
  errorTrue: boolean = false;
  errorMessage: string = ''

  isError = false;

  isLoading = false;

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  ngOnInit(): void {
      this._title.setTitle('Sign Up')
  }


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
          this.isLoading = true;
          console.log(response);
          this.router.navigate(['vendor/login'])
        },
        error: (err) => {
          // alert(err.error.message)
          this.isLoading = false;
          this.errorTrue = true;
          this.errorMessage = err.error.message;
        },
      });

    this.signupForm?.reset();
  };
}
