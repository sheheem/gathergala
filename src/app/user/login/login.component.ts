import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('info') loginForm?: NgForm ;
 
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
    console.log(this.loginForm);
    this.loginForm?.reset()
  }
}
