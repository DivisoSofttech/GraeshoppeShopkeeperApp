import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { CreateEditUomComponent } from './create-edit-uom/create-edit-uom.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-img-cropper';



@NgModule({

  declarations: [
    ImageSelectorComponent,
    ProductCardComponent,
    CreateEditProductComponent,
    CreateEditUomComponent,
    CreateEditCategoryComponent,
    CategoryCardComponent
  ],

  imports: [
    ImageCropperModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [ImageSelectorComponent,ProductCardComponent,CreateEditProductComponent,CreateEditUomComponent,CreateEditCategoryComponent,CategoryCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ImageSelectorComponent]
})
export class ComponentsModule { }
