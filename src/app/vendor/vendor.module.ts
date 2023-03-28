import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorComponent } from './vendor.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { VendorSignupComponent } from './vendor-signup/vendor-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../vendor/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './home/navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { AddEventComponent } from './home/add_event/add-event.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EventManagementComponent } from './home/event-management/event-management.component';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
    children: [
      { path: '', component: HomeComponent, canActivate:[AuthGuard]},
      { path: 'signup', component: VendorSignupComponent },
      { path: 'login', component: VendorLoginComponent },
      { path: 'add_event', component: AddEventComponent,  canActivate:[AuthGuard] },
      { path: 'event_management', component: EventManagementComponent, canActivate:[AuthGuard] }
    ],
  },
];


@NgModule({
  declarations: [
    VendorComponent,
    VendorLoginComponent,
    VendorSignupComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    AddEventComponent,
    EventManagementComponent,
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  providers: [AuthGuard]
})
export class VendorModule { }
