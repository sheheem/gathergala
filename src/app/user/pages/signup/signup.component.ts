import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('info') signupForm?: NgForm

  constructor(private _title: Title, private _userService: UserService, private _router: Router){}

  ngOnInit(): void {
      this._title.setTitle('Sign Up')
  }

  onSubmit = () => {
    console.log(this.signupForm);
    
    this._userService.signUpUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username, this.signupForm.value.phone).subscribe({
      next: (response) => {
        this.signupForm?.reset()
        this._router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
        
      }
    })

   
  }

}
