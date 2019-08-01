import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { CreateEditUomComponent } from './create-edit-uom/create-edit-uom.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({

  declarations: [ProductCardComponent,CreateEditProductComponent,CreateEditUomComponent,CreateEditCategoryComponent,CategoryCardComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [ProductCardComponent,CreateEditProductComponent,CreateEditUomComponent,CreateEditCategoryComponent,CategoryCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
