import { DiscountDTO } from './../../api/models/discount-dto';
import { Util } from 'src/app/services/util';
import { ComboLineItemDTO } from './../../api/models/combo-line-item-dto';
import { ImageSelectorComponent } from './../image-selector/image-selector.component';
import { AuxilaryLineItemDTO } from './../../api/models/auxilary-line-item-dto';
import { UOMDTO } from './../../api/models/uomdto';
import { CategoryDTO } from './../../api/models/category-dto';
import { ProductDTO } from './../../api/models/product-dto';
import { ModalController, PopoverController, IonSlides, IonContent, IonSelectOption } from '@ionic/angular';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  QueryResourceService,
  CommandResourceService
} from 'src/app/api/services';
import { Product, ProductBundle } from 'src/app/api/models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditProductComponent implements OnInit {
  loader: HTMLIonLoadingElement;
  productbundle: ProductBundle = {
    product : {
      category: {
        name : undefined
      }
    }
  };
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
  auxSelected: boolean;
  checkComboArray: boolean[] = [];
  checkAuxArray: boolean[] = [];
  comboLineItems: ComboLineItemDTO[] = [];
  @ViewChild('slides', { static: false }) slides: IonSlides;
  deleteAuxilaries: AuxilaryLineItemDTO[] = [];
  deleteCombos: ComboLineItemDTO[] = [];
  discount: DiscountDTO = {};
  oldAux = 0;
  oldCombo = 0;
  @ViewChild('content', {static: false}) content: IonContent;
  imageContentType;

  constructor(
    private modalController: ModalController,
    private query: QueryResourceService,
    private storage: Storage,
    private commandResource: CommandResourceService,
    private util: Util,
    private ref: ChangeDetectorRef,
  ) {
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1000);
   }

  ngOnInit() {
    this.getCategories();
    this.getAuxilaryItems(0);
    this.getUOM();
    this.getNonComboNonAuxilaryProduct();
    if (this.mode === 'update') {
      this.getProductDtoUsingProduct();
      this.query.getProductBundleByIdUsingGET(this.product.id)
        .subscribe(productBundle => {
          console.log('product' , this.product);
          console.log('productBundle ', productBundle);
          this.productbundle = productBundle;
          if (productBundle.discount) {
            this.productDTO.discountId = productBundle.discount.id;
          }
          if (productBundle.discount) {
            this.discount = productBundle.discount;
          }
        });
    }
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
    this.ref.detach();
    this.modalController.dismiss(data);
  }

  slide(value: string) {
    this.value = value;
    if (this.value === 'category') {
      this.slides.slideTo(1);
      this.content.scrollToTop(0);
    } else if (this.value === 'uom') {
      this.slides.slideTo(2);
      this.content.scrollToTop(0);
    } else {
      this.slides.slideTo(0);
      this.value = 'none';
      this.getCategories();
      this.getUOM();
    }
  }

  addSelectedCategory($event) {
    console.log($event);
    this.productDTO.categoryId = $event.id;
    console.log(this.productDTO.categoryId);

  }

  getProductAux() {
    this.query.getProductBundleByIdUsingGET(this.product.id)
      .subscribe(productBundle => {
        productBundle.auxilaryLineItems.forEach(aux => {
          this.query.findAuxilaryLineItemByIdUsingGET(aux.id)
            .subscribe(auxDto => {
              this.auxilaryLineItemDTOs.push(auxDto);
              this.oldAux++;
              this.auxilaryProduct.forEach(data => {
                if (data.id === auxDto.auxilaryItemId) {
                  this.oldAux++;
                  this.checkAuxArray[this.auxilaryProduct.indexOf(data)] = true;
                }
              });
            });
        });
      });
  }

  getProductCombo() {
    this.query.getProductBundleByIdUsingGET(this.product.id)
      .subscribe(productBundle => {
        productBundle.comboLineItems.forEach(combo => {
          this.query.findCombolineItemByIdUsingGET(combo.id)
            .subscribe(comboDto => {
              this.comboLineItems.push(comboDto);
              this.oldCombo++;
              this.nonAuxNonComboProducts.forEach(data => {
                if (data.id === comboDto.comboItemId) {
                  this.oldCombo++;
                  this.checkComboArray[this.nonAuxNonComboProducts.indexOf(data)] = true;
                }
              });
            });
        });
      });
  }

  getProductDtoUsingProduct() {
    this.query.findProductDTOByIdUsingGET(this.product.id)
      .subscribe(productDto => { this.productDTO = productDto;
                                 console.log('product dto ', this.productDTO); },
        err => console.log('Error Getting ProductDTO Using Product', err));
  }
  getCategories() {
    this.storage.get('user').then(user => {
      this.query
        .findAllCategoryDTOsByIdpCodeUsingGET( {idpCode: user.preferred_username })
        .subscribe(res => {
          this.categories = res.content;
          console.log('get categoies', res      );

        });
    });
  }
  getUOM() {
    this.storage.get('user').then(user => {
      this.query.findUOMByIdpCodeUsingGET({ idpCode: user.preferred_username }).subscribe(res => {
        this.uoms = res.content;
      });
    });
  }
  createProduct() {
    if (this.productDTO.isAuxilaryItem === true) {
      this.productDTO.categoryId = null;
    }
    this.util.createLoader()
      .then(loader => {
        this.loader = loader;
        this.loader.present();
      });
    this.commandResource.createDiscountUsingPOST(this.discount).subscribe(discount => {
      this.productDTO.discountId = discount.id;
      this.productDTO.name = this.productDTO.name[0].toUpperCase() + this.productDTO.name.slice(1, this.productDTO.name.length);
      this.commandResource.createProductUsingPOST(this.productDTO)
        .subscribe(data => {
          this.dismiss(data);
          this.comboLineItems.forEach(
            ci => ci.productId = data.id
          );
          this.auxilaryLineItemDTOs.forEach(
            ai => ai.productId = data.id
          );

          this.saveAuxilary();
          this.saveCombo();
          this.util.createToast('Product Created Successfully', 'checkmark');
          this.loader.dismiss();
        },
          err => {
            console.log('error creating product', err);
            this.loader.dismiss();
            this.util.createToast('Product Creation Error', 'alert');
          }
        );
    });

  }
  updateProduct() {
    if (this.productDTO.isAuxilaryItem === true) {
      this.productDTO.categoryId = null;
    }
    this.util.createLoader()
      .then(loader => {
        this.loader = loader;
        this.loader.present();
      });
    this.productDTO.name = this.productDTO.name[0].toUpperCase() + this.productDTO.name.slice(1, this.productDTO.name.length);
    this.commandResource.updateProductUsingPUT(this.productDTO)
      .subscribe(data => {
        this.productbundle.comboLineItems.forEach(combo =>
          this.query.findCombolineItemByIdUsingGET(combo.id)
            .subscribe(comboDto =>
              this.comboLineItems = this.comboLineItems.filter(com => com.comboItemId !== comboDto.comboItemId)
            )
        );
        if (this.discount.rate == null) {
          this.commandResource.deleteDiscountUsingDELETE(this.discount.id).subscribe();
        } else {
          this.commandResource.updateDiscountUsingPUT(this.discount).subscribe();
        }

        this.auxilaryLineItemDTOs.forEach(
          ai => ai.productId = data.id
        );
        this.comboLineItems.forEach(
          ci => ci.productId = data.id
        );
        for (let i = this.oldAux; i < this.auxilaryLineItemDTOs.length; i++) {
          this.commandResource.createAuxilaryLineItemUsingPOST(this.auxilaryLineItemDTOs[i])
            .subscribe(data => console.log('auxilary', data)
              , err => console.log('error creating Auxilary')
            );
        }
        for (let i = this.oldCombo; i < this.comboLineItems.length; i++) {
          this.commandResource.createComboLineItemUsingPOST(this.comboLineItems[i])
            .subscribe(data => console.log('combo', data)
              , err => console.log('error creating Combo')
            );
        }


        this.deleteAuxilaries.forEach(aux =>
          this.commandResource.deleteAuxilaryLineIteamUsingDELETE(aux.id).subscribe()
        );
        this.deleteCombos.forEach(com =>
          this.commandResource.deleteComboLineItemUsingDELETE(com.id).subscribe()
        );
        this.dismiss(data);
        this.util.createToast('Product Updation Success', 'checkmark');
        this.loader.dismiss();
      }, err => {
        this.util.createToast('Product Updation Error', 'alert');
      });
  }
  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });

    modal.onDidDismiss()
      .then(data => {
        this.productDTO.image = data.data.image.substring(data.data.image.indexOf(',') + 1);
        this.imageContentType = data.data.image.slice(data.data.image.indexOf(':') + 1, data.data.image.indexOf(';'));

      });

    return await modal.present();
  }
  getNonComboNonAuxilaryProduct() {
    this.storage.get('user').then(user => {
      this.query.getNotAuxNotComboProductsByIDPcodeUsingGET({ iDPcode: user.preferred_username }).subscribe(res => {
        this.nonAuxNonComboProducts = res.content;
        this.checkComboArray.push(false);
        if (this.mode === 'update') {
          this.getProductCombo();
        }
      });
    });
  }
  getAuxilaryItems(i) {
    this.storage.get('user').then(user => {
      this.query.getAllAuxilaryProductUsingGET({
        storeId: user.preferred_username,
        page: i
      }).subscribe(res => {
        this.auxilaryProduct = res.content;
        console.log(this.auxilaryProduct);
        this.checkAuxArray.push(false);
        if (this.mode === 'update') {
          this.getProductAux();
        }
        i++;
        if (i < res.totalPages) {
          this.getAuxilaryItems(i);
        }

      });
    });
  }
  selectedComboItem(item, toggle) {

    const combo: ComboLineItemDTO = {
      comboItemId: item.id
    };
    if (toggle.detail.checked === true) {
      this.comboLineItems.push(combo);
      this.deleteCombos = this.deleteCombos.filter(ci => ci.comboItemId !== item.id);
    } else {
      this.comboLineItems.forEach(data => {
        if (data.comboItemId === item.id && data.id != null) {
          this.deleteCombos.push(data);
        }
      });
      this.comboLineItems = this.comboLineItems.filter(ci => ci.id !== item.id);
    }

  }
  selectedAuxilaryItem(item, toggle) {
    const aux: AuxilaryLineItemDTO = {
      auxilaryItemId: item.id
    };
    if (toggle.detail.checked === true) {
      this.auxilaryLineItemDTOs.push(aux);
      this.deleteAuxilaries = this.deleteAuxilaries.filter(ai => ai.auxilaryItemId !== item.id);
    } else {
      this.auxilaryLineItemDTOs.forEach(data => {
        if (data.auxilaryItemId === item.id && data.id != null) {
          this.deleteAuxilaries.push(data);
        }
      });
      this.auxilaryLineItemDTOs = this.auxilaryLineItemDTOs.filter(ai => ai.id !== item.id);
    }

  }

  saveAuxilary() {
    this.auxilaryLineItemDTOs.forEach(
      ai => this.commandResource.createAuxilaryLineItemUsingPOST(ai)
        .subscribe(data => console.log('auxilary', data)
          , err => console.log('error creating auxilary')

        )
    );

  }
  saveCombo() {
    this.comboLineItems.forEach(
      ci => this.commandResource.createComboLineItemUsingPOST(ci)
        .subscribe(data => console.log('combo', data)
          , err => console.log('error creating combo')
        )
    );
  }
  createDisabled() {
    if (this.mode === 'update') {
      // tslint:disable-next-line: max-line-length
      if (this.productDTO.sellingPrice == null || this.productDTO.categoryId == null || this.productDTO.name == null || this.productDTO.name === '') {
        return true;
      }
    } else {
      // tslint:disable-next-line: max-line-length
      if (this.productDTO.sellingPrice == null || this.productDTO.categoryId == null || this.productDTO.image == null || this.productDTO.name == null || this.productDTO.name === '') {
        return true;
      }
    }
    return false;
  }

  createAuxilaryDisabled() {
    if (this.mode === 'update') {
      // tslint:disable-next-line: max-line-length
      if (this.productDTO.sellingPrice == null || this.productDTO.name == null || this.productDTO.name === '') {
        return true;
      }
      return false;
    } else {
      // tslint:disable-next-line: max-line-length
      if (this.productDTO.sellingPrice == null || this.productDTO.image == null || this.productDTO.name == null || this.productDTO.name === '') {
        return true;
      }
      return false;
    }
  }

  selectedCategory(categoryid): boolean {
    console.log(categoryid + ' === '+this.productDTO.categoryId);
    
    if (this.productDTO.categoryId == categoryid) {
      return true;
    }
    return false;
  }
}
