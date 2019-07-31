import { EditProductComponent } from './../../components/edit-product/edit-product.component';
import { CreateProductComponent } from './../../components/create-product/create-product.component';
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
    CreateProductComponent,
    EditProductComponent
  ]
})
export class ProductPageModule {}
