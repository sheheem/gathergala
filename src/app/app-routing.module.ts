import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./vendor/vendor.module').then((m) => m.VendorModule),
  },
  {
    path: ' ',
    loadChildren: () => 
      import('./user/user.module').then((m) => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
