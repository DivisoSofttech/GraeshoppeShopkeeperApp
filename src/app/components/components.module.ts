import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [ProductCardComponent, CreateProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [ProductCardComponent, CreateProductComponent, EditProductComponent]
})
export class ComponentsModule { }
