import { Util } from 'src/app/services/util';
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
import { Product, ProductBundle } from 'src/app/api/models';
import { Storage } from '@ionic/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit {
  loader: HTMLIonLoadingElement;
  productbundle: ProductBundle = {};
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
  deleteAuxilaries: AuxilaryLineItemDTO[]=[];
  deleteCombos: ComboLineItemDTO[]=[];
  oldAux: number = 0;
  oldCombo: number = 0;
  constructor(
    private modalController: ModalController,
    private query: QueryResourceService,
    private storage: Storage,
    private commandResource: CommandResourceService,
    private util: Util
  ) { }

  ngOnInit() {

    this.getCategories();
    this.getAuxilaryItems();
    this.getUOM();
    this.getNonComboNonAuxilaryProduct();
    if (this.mode === 'update') {
      this.getProductDtoUsingProduct();
      this.query.getProductBundleUsingGET(this.product.id)
      .subscribe(productBundle => {
        this.productbundle = productBundle;
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
      this.getCategories();
      this.getUOM();
    }
  }

  getProductAux() {
    this.query.getProductBundleUsingGET(this.product.id)
      .subscribe(productBundle => {
        productBundle.auxilaryLineItems.forEach(aux => {
          this.query.findAuxilaryLineItemUsingGET(aux.id)
            .subscribe(auxDto => {
              this.auxilaryLineItemDTOs.push(auxDto);
              this.oldAux++;
              this.auxilaryProduct.forEach(data => {
                if(data.id === auxDto.auxilaryItemId){
                  this.checkAuxArray[this.auxilaryProduct.indexOf(data)] = true;
                }
              })
            });
        });
      });
  }

  getProductCombo() {
    this.query.getProductBundleUsingGET(this.product.id)
      .subscribe(productBundle => {
        productBundle.comboLineItems.forEach(combo => {
          this.query.findCombolineItemUsingGET(combo.id)
            .subscribe(comboDto => {
              this.comboLineItems.push(comboDto);
              this.oldCombo++;
              this.nonAuxNonComboProducts.forEach(data => {
                if(data.id === comboDto.comboItemId){
                  this.checkComboArray[this.nonAuxNonComboProducts.indexOf(data)]=true;
                }
              });
            })
        });
      });
  }

  getProductDtoUsingProduct() {
    this.query.findProductUsingGET(this.product.id)
      .subscribe(productDto => this.productDTO = productDto,
        err => console.log('Error Getting ProductDTO Using Product', err));
  }
  getCategories() {
    this.storage.get('user').then(user => {
      this.query
        .findAllCategoriesWithOutImageUsingGET({ iDPcode: user.preferred_username })
        .subscribe(res => {
          this.categories = res;
        });
    });
  }
  getUOM() {
    this.storage.get('user').then(user => {
      this.query.findUOMByIDPcodeUsingGET({ iDPcode: user.preferred_username }).subscribe(res => {
        this.uoms = res.content;
      });
    });
  }
  createProduct() {
    this.util.createLoader()
      .then(loader => {
        this.loader = loader;
        this.loader.present();
      });
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
        this.loader.dismiss();
      },
        err => {
          console.log('error creating product', err);
          this.loader.dismiss();
        }
      );

  }
  updateProduct() {
    this.util.createLoader()
      .then(loader => {
        this.loader = loader;
        this.loader.present();
      });
    this.commandResource.updateProductUsingPUT(this.productDTO)
      .subscribe(data => {
        this.comboLineItems.forEach(
          ci => ci.productId = data.id
        );
        this.auxilaryLineItemDTOs.forEach(
          ai => ai.productId = data.id
        );
        this.saveAuxilary();
        this.saveCombo();
        this.deleteAuxilaries.forEach(aux => 
          this.commandResource.deleteAuxilaryLineIteamUsingDELETE(aux.id).subscribe()
        )
        this.deleteCombos.forEach(com =>
          this.commandResource.deleteComboLineItemUsingDELETE(com.id).subscribe()
        )
        this.dismiss(data);
        this.loader.dismiss();
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
        this.productDTO.imageContentType = data.data.image.slice(data.data.image.indexOf(':') + 1, data.data.image.indexOf(';'));

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
  getAuxilaryItems() {
    this.storage.get('user').then(user => {
      this.query.getAllAuxilaryProductUsingGET(user.preferred_username).subscribe(res => {
        this.auxilaryProduct = res.content;
        this.checkAuxArray.push(false);
        console.log('aux',res.content);
        if (this.mode === 'update') {
          this.getProductAux();
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
      this.deleteCombos = this.deleteCombos.filter(ci => ci.id !== item.id);
    } else {
      this.deleteCombos.push(item);
      this.comboLineItems = this.comboLineItems.filter(ci => ci.id !== item.id);
    }
    console.log('delete combo',this.deleteCombos);
    
  }
  selectedAuxilaryItem(item, toggle) {
    const aux: AuxilaryLineItemDTO = {
      auxilaryItemId: item.id
    };
    if (toggle.detail.checked === true) {
      this.auxilaryLineItemDTOs.push(aux);
      this.deleteAuxilaries = this.deleteAuxilaries.filter(ai => ai.id !== item.id);
    } else {
      this.deleteAuxilaries.push(item);
      this.auxilaryLineItemDTOs = this.auxilaryLineItemDTOs.filter(ai => ai.id !== item.id);
    }
    console.log('delete aux',this.deleteAuxilaries);
    
  }

  saveAuxilary() {

    if(this.mode==='update'){
      for(let i=this.oldAux;i<this.auxilaryLineItemDTOs.length;i++){
        this.commandResource.createAuxilaryLineItemUsingPOST(this.auxilaryLineItemDTOs[i])
        .subscribe(data => console.log('auxilary', data)
        )
      }
    }
    else{
      this.auxilaryLineItemDTOs.forEach(
        ai => this.commandResource.createAuxilaryLineItemUsingPOST(ai)
          .subscribe(data => console.log('auxilary', data)
          )
      );
    }
  }
  saveCombo() {

    if(this.mode==='update'){
      console.log(this.oldCombo);
      
      for(let i=this.oldCombo;i<this.comboLineItems.length;i++){
        this.commandResource.createComboLineItemUsingPOST(this.comboLineItems[i])
            .subscribe(data => console.log('combo', data)
            )
      }
    }
    else{
      this.comboLineItems.forEach(
        ci => this.commandResource.createComboLineItemUsingPOST(ci)
          .subscribe(data => console.log('combo', data)
          )
      );
    }

  }
}
