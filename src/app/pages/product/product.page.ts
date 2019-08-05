
import { CreateEditCategoryComponent } from './../../components/create-edit-category/create-edit-category.component';
import { CreateEditUomComponent } from './../../components/create-edit-uom/create-edit-uom.component';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { CreateEditProductComponent } from './../../components/create-edit-product/create-edit-product.component';
import { Component, OnInit } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';
import { ProductDTO } from '../../api/models/product-dto';
import { Product } from '../../api/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(
    private storage: Storage,
    private queryService: QueryResourceService
  ) { }

  products: Product[] =[];

  ngOnInit() {
    let iDPcode;
    this.storage.get('user').then(user => {
      iDPcode = user.preferred_username;
      this.queryService.findAllProductsUsingGET({iDPcode}).subscribe(res => {
        this.products = res.content;
      });
    });
  }
  updateProduct(product){
    console.log("product",product);
    
    const index = this.products.findIndex(p => p.id === product.id);
    this.products.splice(index,1,product);
  }
  deleteProduct(product: Product){

    this.products = this.products.filter(p=>p !== product)
  }
  onAddProduct(product) {
    this.products.push(product);
   }


}
