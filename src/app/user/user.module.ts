import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { UserComponent } from './user.component';
import { UserHomeComponent } from '../user/home/home.component';
import { SignupComponent } from '../user/signup/signup.component';
import { LoginComponent } from '../user/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
]

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    UserHomeComponent,
    UserComponent
   
  ],
  imports: [
   FormsModule,
   CommonModule,
   ReactiveFormsModule,
   RouterModule.forChild(routes),
  ]
})
export class UserModule { }
