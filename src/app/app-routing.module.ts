import { AuthGuardService } from './services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: './pages/product/product.module#ProductPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'category',
    loadChildren: './pages/category/category.module#CategoryPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'uom',
    loadChildren: './pages/uom/uom.module#UomPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: './pages/login-signup/login-signup.module#LoginSignupPageModule',
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'edit-restaurant',
    loadChildren: './pages/edit-restaurant/edit-restaurant.module#EditRestaurantPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'order',
    loadChildren: './pages/order/order.module#OrderPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'reports',
    loadChildren: './pages/reports/reports.module#ReportsPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'view-edit-banner',
    loadChildren: './pages/view-edit-banner/view-edit-banner.module#ViewEditBannerPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'order-summary',
    loadChildren: './pages/order-summary/order-summary.module#OrderSummaryPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'restaurant-location',
    loadChildren: './pages/restaurant-location/restaurant-location.module#RestaurantLocationPageModule',
    canActivate: [AuthGuardService]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
