import { OrderViewComponent } from './../../components/order-view/order-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { OrderCardComponent } from 'src/app/components/order-card/order-card.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderPage],
  entryComponents: [OrderCardComponent,OrderViewComponent,NotificationComponent]
})
export class OrderPageModule {}
