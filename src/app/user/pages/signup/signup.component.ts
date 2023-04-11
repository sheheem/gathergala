import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('info') signupForm?: NgForm

  constructor(private _title: Title){}

  ngOnInit(): void {
      this._title.setTitle('Sign Up')
  }

  onSubmit = () => {
    this.signupForm?.reset()
  }

}
