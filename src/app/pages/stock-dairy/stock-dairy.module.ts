import { StockDairyViewComponent } from 'src/app/components/stock-dairy-view/stock-dairy-view.component';
import { CreateEditStockDairyComponent } from './../../components/create-edit-stock-dairy/create-edit-stock-dairy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockDairyPage } from './stock-dairy.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: StockDairyPage
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
  declarations: [StockDairyPage],
  entryComponents: [CreateEditStockDairyComponent,StockDairyViewComponent]
})
export class StockDairyPageModule {}
