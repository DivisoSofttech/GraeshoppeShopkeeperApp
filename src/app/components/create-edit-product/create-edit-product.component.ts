import { CreateEditCategoryComponent } from './../create-edit-category/create-edit-category.component';
import { UOMDTO } from './../../api/models/uomdto';
import { CategoryDTO } from './../../api/models/category-dto';
import { ProductDTO } from './../../api/models/product-dto';
import { ModalController, PopoverController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Product } from 'src/app/api/models';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit {
  
  product: Product = {};
  productDTO: ProductDTO = {};
  categories: CategoryDTO[] = [];
  uom: UOMDTO[] = [];
  mode = 'create';
  value: string = '';
  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(
    private modalController: ModalController,
    private query: QueryResourceService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    if(this.mode=='update'){
      this.getProductDtoUsingProduct();
    }
    this.getCategories();
    this.getUOM();
  }

  dismiss(){
    this.modalController.dismiss();
  }

  slide(value: string) {
    this.value = value;
    if (this.value === 'category') {
      this.slides.slideTo(1);
    } else {
      this.slides.slideTo(0);
      this.value = '';
    }
  }

  async addCategoryPopoverModal(ev: any){
    const popover = await this.popoverController.create({
      component: CreateEditCategoryComponent,
      event: ev,
      componentProps: {mode:  'create' ,pop: true},
      translucent: true
    });
    return await popover.present();
  }

  getProductDtoUsingProduct(){
    this.query.findProductUsingGET(this.product.id)
        .subscribe(productDto => this.productDTO = productDto,
        err => console.log("Error Getting ProductDTO Using Product",err))
  }
  getCategories(){
    this.query.findAllCategoriesUsingGET({})
        .subscribe(categories => this.categories=categories,
        err => console.log("Error Getting Categories",err))
  }
  getUOM(){
    this.query.findAllUomUsingGET({})
        .subscribe(uom => this.uom = uom,
        err => console.log("Error Getting UOMs",err))
  }
}
