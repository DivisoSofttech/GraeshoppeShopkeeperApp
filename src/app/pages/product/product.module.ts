import { NotificationComponent } from './../../components/notification/notification.component';
import { CreateEditCategoryComponent } from './../../components/create-edit-category/create-edit-category.component';
import { CreateEditUomComponent } from './../../components/create-edit-uom/create-edit-uom.component';
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
    CreateEditProductComponent,
    CreateEditUomComponent,
    CreateEditCategoryComponent,
    NotificationComponent
  ]
})
export class ProductPageModule {}
