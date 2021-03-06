import { CreateOfferComponent } from './create-offer/create-offer.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { FilterOrderComponent } from './filter-order/filter-order.component';
import { ExpectedDeliveryComponent } from './expected-delivery/expected-delivery.component';
import { OrderProductCardComponent } from './order-product-card/order-product-card.component';
import { MaterialModule } from './material.module';
import { SaleHistoryComponent } from './sale-history/sale-history.component';
import { CreateSelectCustomerComponent } from './create-select-customer/create-select-customer.component';
import { CreateEditStockDairyComponent } from './create-edit-stock-dairy/create-edit-stock-dairy.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { MapComponent } from './map/map.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AddCuisineComponent } from './add-cuisine/add-cuisine.component';
import { IonicModule } from '@ionic/angular';
import { SettingsOptionComponent } from 'src/app/components/settings-option/settings-option.component';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { CreateEditUomComponent } from './create-edit-uom/create-edit-uom.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UomCardComponent } from './uom-card/uom-card.component';
import { AddComponent } from './add/add.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RouterModule } from '@angular/router';
import { OrderCardComponent } from './order-card/order-card.component';
import { NotificationComponent } from './notification/notification.component';
import { StockDairyCardComponent } from './stock-dairy-card/stock-dairy-card.component';
import { StockDairyViewComponent } from './stock-dairy-view/stock-dairy-view.component';
import { ImageCropperModule } from 'ngx-img-cropper';


@NgModule({
  declarations: [
    ProductCardComponent,
    CreateEditProductComponent,
    CategoryCardComponent,
    UomCardComponent,
    SettingsOptionComponent,
    ImageSelectorComponent,
    ProductCardComponent,
    CreateEditProductComponent,
    CreateEditUomComponent,
    CreateEditCategoryComponent,
    CategoryCardComponent,
    OrderCardComponent,
    AddCuisineComponent,
    PasswordResetComponent,
    AddComponent,
    ProductViewComponent,
    CategoryViewComponent,
    OrderViewComponent,
    MapComponent,
    NotificationComponent,
    CreateEditStockDairyComponent,
    StockDairyCardComponent,
    StockDairyViewComponent,
    CreateSelectCustomerComponent,
    SaleHistoryComponent,
    OrderProductCardComponent,
    ExpectedDeliveryComponent,
    FilterOrderComponent,
    CategoryProductComponent,
    CreateOfferComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  exports: [
    ProductCardComponent,
    CreateEditProductComponent,
    CategoryCardComponent,
    UomCardComponent,
    SettingsOptionComponent,
    ImageSelectorComponent,
    ProductCardComponent,
    CreateEditProductComponent,
    CreateEditUomComponent,
    CreateEditCategoryComponent,
    OrderCardComponent,
    CategoryCardComponent,
    AddCuisineComponent,
    PasswordResetComponent,
    AddComponent,
    ProductViewComponent,
    MapComponent,
    CategoryViewComponent,
    OrderViewComponent,
    NotificationComponent,
    CreateEditStockDairyComponent,
    StockDairyCardComponent,
    StockDairyViewComponent,
    CreateSelectCustomerComponent,
    SaleHistoryComponent,
    OrderProductCardComponent,
    ExpectedDeliveryComponent,
    FilterOrderComponent,
    CategoryProductComponent,
    CreateOfferComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ImageSelectorComponent,
    ProductCardComponent,
    CreateEditProductComponent,
    CreateEditUomComponent,
    CreateEditCategoryComponent,
    ProductViewComponent,
    CategoryViewComponent,
    ExpectedDeliveryComponent
  ]
})
export class ComponentsModule { }
