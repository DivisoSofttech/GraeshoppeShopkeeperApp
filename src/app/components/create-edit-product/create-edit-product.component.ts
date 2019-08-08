import { ComboLineItemDTO } from './../../api/models/combo-line-item-dto';
import { ImageSelectorComponent } from './../image-selector/image-selector.component';
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
  auxilaryLineItemDTOs: AuxilaryLineItemDTO[] = [];
  products: Product[] = [];
  nonAuxNonComboProducts: Product[] = [];
  auxilaryProduct: Product[] = [];
  categories: CategoryDTO[] = [];
  uoms: UOMDTO[] = [];
  mode = 'create';
  value = 'none';
  combo = false;
  aux = false;
  comboLineItems: ComboLineItemDTO[] = [];
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
    this.getAuxilaryItems();
    this.getUOM();
    this.getNonComboNonAuxilaryProduct();

  }
  showCombo() {
    if (this.combo === true) {
      this.combo = false;
    } else {
      this.combo = true;
    }
  }
  showAux() {
    if (this.aux === true) {
      this.aux = false;
    } else {
      this.aux = true;
    }
  }
  dismiss(data) {
    this.modalController.dismiss(data);
  }

  slide(value: string) {
    this.value = value;
    if (this.value === 'category') {
      this.slides.slideTo(1);
    } else if (this.value === 'uom') {
      this.slides.slideTo(2);
    } else {
      this.slides.slideTo(0);
      this.value = 'none';
    }
  }

  getProductDtoUsingProduct() {
    this.query.findProductUsingGET(this.product.id)
        .subscribe(productDto => this.productDTO = productDto,
        err => console.log('Error Getting ProductDTO Using Product', err));
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
      this.query.findUOMByIDPcodeUsingGET({iDPcode: user.preferred_username}).subscribe(res => {
        this.uoms = res.content;
      });
    });
  }
  createProduct() {
    this.commandResource.createProductUsingPOST(this.productDTO)
        .subscribe(data => {
          console.log('product added', data);
          this.dismiss(data);
          this.comboLineItems.forEach(
            ci => ci.productId = data.id
          );
          this.auxilaryLineItemDTOs.forEach(
            ai => ai.productId = data.id
          );
          this.saveAuxilary();
          this.saveCombo();
        },
        err => console.log('error creating product', err)
    );

  }
  updateProduct() {
    this.commandResource.updateProductUsingPUT(this.productDTO)
        .subscribe(data => {
          console.log('Product Updated', data);
          this.dismiss(data);
        });
  }
  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });

    modal.onDidDismiss()
    .then(data => {
      console.log('sdf', data);
      console.log(this.productDTO.image);
      console.log('ghf', data.data.imageType);


      this.productDTO.image = data.data.image.substring(data.data.image.indexOf(',') + 1);
      this.productDTO.imageContentType = data.data.image.slice(data.data.image.indexOf(':') + 1, data.data.image.indexOf(';'));
      console.log(this.productDTO.image);
      console.log(this.productDTO.imageContentType);

    });

    return await modal.present();
  }
  getNonComboNonAuxilaryProduct() {
    this.storage.get('user').then(user => {
      this.query.getNotAuxNotComboProductsByIDPcodeUsingGET({iDPcode: user.preferred_username}).subscribe(res => {
        this.nonAuxNonComboProducts = res.content;
      });
    });
  }
  getAuxilaryItems() {
    this.storage.get('user').then(user => {
      this.query.getAllAuxilaryProductUsingGET(user.preferred_username).subscribe(res => {
        this.auxilaryProduct = res.content;
        console.log('aux', res.content);

      });
    });
  }
  selectedComboItem(item, toggle) {

    console.log('item', item);
    console.log('toggle', toggle.detail.checked);
    const combo: ComboLineItemDTO = {
      comboItemId: item.id
    };
    if (toggle.detail.checked === true) {
      this.comboLineItems.push(combo);
    } else {
      this.comboLineItems = this.comboLineItems.filter(ci => ci.id !== item.id);
    }
  }
  selectedAuxilaryItem(item, toggle) {
    console.log('item', item);
    console.log('toggle', toggle.detail.checked);
    const aux: AuxilaryLineItemDTO = {
      auxilaryItemId: item.id
    };
    if (toggle.detail.checked === true) {
      this.auxilaryLineItemDTOs.push(aux);
    } else {
      this.auxilaryLineItemDTOs = this.auxilaryLineItemDTOs.filter(ai => ai.id !== item.id);
    }
  }

  saveAuxilary() {
    this.auxilaryLineItemDTOs.forEach(
      ai => this.commandResource.createAuxilaryLineItemUsingPOST(ai)
                .subscribe(data => console.log('auxilary', data)
                )
    );
    console.log('auxilary items', this.auxilaryLineItemDTOs);

  }
  saveCombo() {

    this.comboLineItems.forEach(
      ci => this.commandResource.createComboLineItemUsingPOST(ci)
                .subscribe(data => console.log('combo', data)
                )
    );
    console.log('combo items', this.comboLineItems);

  }
}
