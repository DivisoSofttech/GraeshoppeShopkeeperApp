import { AuthGuardService } from './services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'category', loadChildren: './pages/category/category.module#CategoryPageModule', canActivate: [AuthGuardService] },
  { path: 'uom', loadChildren: './pages/uom/uom.module#UomPageModule', canActivate: [AuthGuardService]  },
  { path: 'login', loadChildren: './pages/login-signup/login-signup.module#LoginSignupPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuardService] },
  { path: 'password-reset', component: PasswordResetComponent, canActivate: [AuthGuardService] },
  { path: 'order', loadChildren: './pages/order/order.module#OrderPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
