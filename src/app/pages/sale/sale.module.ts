import { ComponentsModule } from './../../components/components.module';
import { CreateSelectCustomerComponent } from 'src/app/components/create-select-customer/create-select-customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalePage } from './sale.page';

const routes: Routes = [
  {
    path: '',
    component: SalePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [SalePage],
  entryComponents: [CreateSelectCustomerComponent]
})
export class SalePageModule {}
