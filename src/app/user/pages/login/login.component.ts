import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('info') loginForm?: NgForm;
  isError: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private _userService: UserService, private _jwtService: JwtService, private _router: Router) {}

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  // onSubmit(form: NgForm) {
  //   console.log(form);

  onSubmit() {
    this.isLoading = true
    this._userService.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: (response) => {
        this.isLoading = false
        this.shoot()
        this._jwtService.setUserToken(response.accessToken)
        this._router.navigate(['/'])
      },
      error: (err) => {
        this.isLoading = false
        this.isError = true;
        this.errorMessage = err.error.message;
      }
    })
    console.log(this.loginForm);
    this.loginForm?.reset();
  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(50, 120),
        spread: this.random(100, 150),
        particleCount: this.random(40, 50),
        origin: {
          y: 0.6
        }
      })
    } catch (err) {
      console.log(err);
      
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  confetti(args: any) {
    return window['confetti'].apply(this, arguments);
  }

}
