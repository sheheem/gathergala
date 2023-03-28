import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { UserComponent } from './user.component';
import { UserHomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


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
    UserComponent,
    NavbarComponent,
    FooterComponent,
  ],

  imports: [
   FormsModule,
   CommonModule,
   ReactiveFormsModule,
   RouterModule.forChild(routes),
  ]
})
export class UserModule { }
