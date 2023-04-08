import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { UserComponent } from './user.component';
import { UserHomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventsComponent } from '../user/pages/events/events.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { SuccessComponent } from './pages/success/success.component';
import { TicketDetailComponent } from './pages/tickets/tickeDetail.component';
import { CancelComponent } from './pages/cancel/cancel.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'events', component: EventsComponent },
      { path: 'event-detail/:id', component: EventDetailComponent},
      { path: 'tickets/:id', component: TicketsComponent},
      { path: 'checkout', component: CheckOutComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'cancel', component: CancelComponent }
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
    EventsComponent,
    CheckOutComponent,
    EventDetailComponent,
    TicketsComponent,
    SuccessComponent,
    TicketDetailComponent,
    CancelComponent
  ],

  imports: [
   FormsModule,
   CommonModule,
   ReactiveFormsModule,
   RouterModule.forChild(routes),
   MatProgressSpinnerModule,
   MatProgressBarModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }]
})
export class UserModule { }
