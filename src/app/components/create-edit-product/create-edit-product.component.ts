import { AuxilaryLineItemDTO } from './../../api/models/auxilary-line-item-dto';
import { CreateEditCategoryComponent } from './../create-edit-category/create-edit-category.component';
import { UOMDTO } from './../../api/models/uomdto';
import { CategoryDTO } from './../../api/models/category-dto';
import { ProductDTO } from './../../api/models/product-dto';
import { ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  QueryResourceService,
  CommandResourceService
} from 'src/app/api/services';
import { Product } from 'src/app/api/models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit {
  product: Product = {};
  productDTO: ProductDTO = {
    isAuxilaryItem: false
  };
  products: Product[] = [];
  categories: CategoryDTO[] = [];
  uom: UOMDTO[] = [];
  auxilary: AuxilaryLineItemDTO = {};
  auxilaries: AuxilaryLineItemDTO[] = [];
  mode = 'create';
  value = '';
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modalController: ModalController,
    private query: QueryResourceService,
    private popoverController: PopoverController,
    private storage: Storage,
    private commandResource: CommandResourceService
  ) {}

  ngOnInit() {
    console.log('Mode = ', this.mode);
    if (this.mode === 'update') {
      this.getProductDtoUsingProduct();
    }
    this.getCategories();
    this.getUOM();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  slide(value: string) {
    this.value = value;
    if (this.value === 'category') {
      this.slides.slideTo(1);
    } else if (this.value === 'uom') {
      this.slides.slideTo(2);
    } else {
      this.slides.slideTo(0);
      this.value = '';
    }
  }

  async addCategoryPopoverModal(ev: any) {
    const popover = await this.popoverController.create({
      component: CreateEditCategoryComponent,
      event: ev,
      componentProps: { mode: 'create', pop: true },
      translucent: true
    });
    return await popover.present();
  }

  getProductDtoUsingProduct() {
    this.query
      .findProductUsingGET(this.product.id)
      .subscribe(
        productDto => (this.productDTO = productDto),
        err => console.log('Error Getting ProductDTO Using Product', err)
      );
  }
  getCategories() {
    this.storage.get('user').then(user => {
      this.query
        .findAllCategoriesUsingGET({ storeId: user.preferred_username })
        .subscribe(res => {
          this.categories = res.content;
        });
    });
  }
  getUOM() {
    this.storage.get('user').then(user => {
      this.query
        .findUOMByStoreIdUsingGET({storeId: user.preferred_username})
        .subscribe(
          uom => (this.uom = uom.content),
          err => console.log('Error Getting UOMs', err)
        );
    });
  }
  createProduct() {
    this.commandResource
      .createProductUsingPOST(this.productDTO)
      .subscribe(
        data => console.log('product added', data),
        err => console.log('error creating product', err)
      );
  }
}
