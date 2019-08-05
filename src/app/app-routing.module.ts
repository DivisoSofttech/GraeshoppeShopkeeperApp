import { AuthGuardService } from './services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: './pages/product/product.module#ProductPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'category', loadChildren: './pages/category/category.module#CategoryPageModule', canActivate: [AuthGuardService] },
  { path: 'uom', loadChildren: './pages/uom/uom.module#UomPageModule', canActivate: [AuthGuardService]  },
  { path: 'login', loadChildren: './pages/login-signup/login-signup.module#LoginSignupPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuardService] },
  { path: 'edit-restaurant', loadChildren: './pages/edit-restaurant/edit-restaurant.module#EditRestaurantPageModule', canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
