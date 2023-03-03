import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorLoginComponent } from './vendor/vendor-login/vendor-login.component';
import { VendorSignupComponent } from './vendor/vendor-signup/vendor-signup.component';
import { VendorComponent } from './vendor/vendor.component';
import { HomeComponent } from './vendor/home/home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./vendor/vendor.module').then((m) => m.VendorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
