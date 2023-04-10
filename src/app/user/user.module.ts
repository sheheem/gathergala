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
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { SuccessComponent } from './pages/success/success.component';
import { TicketDetailComponent } from './pages/tickets/tickeDetail.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SplitPipe } from './components/pipes/split.pipe';


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
      { path: 'tickets/:id', component: TicketsComponent, canActivate: [AuthGuard] },
      { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
      { path: 'cancel', component: CancelComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}
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
    EventDetailComponent,
    TicketsComponent,
    SuccessComponent,
    TicketDetailComponent,
    CancelComponent,
    ProfileComponent,
    OrdersComponent,
    SplitPipe
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
