import { CreateEditProductComponent } from './../../components/create-edit-product/create-edit-product.component';
import { ProductCardComponent } from './../../components/product-card/product-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductPage } from './product.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
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
  declarations: [ProductPage],
  entryComponents: [
    ProductCardComponent,
    CreateEditProductComponent
  ]
})
export class ProductPageModule {}
