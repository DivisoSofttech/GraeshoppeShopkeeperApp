import { CategoryDTO } from './../../api/models/category-dto';
import { ProductDTO } from './../../api/models/product-dto';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit {
  
  product: ProductDTO = {};
  categories: CategoryDTO[] = [];
  mode = 'create';
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log("Mode = ",this.mode);
    
  }
  dismiss(){
    this.modalController.dismiss();
  }

}
