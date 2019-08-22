import { ComponentsModule } from './../../components/components.module';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderSummaryPage } from './order-summary.page';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: OrderSummaryPage
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
  declarations: [OrderSummaryPage],
  providers: [File,FileOpener],
  entryComponents: [NotificationComponent]
})
export class OrderSummaryPageModule {}
