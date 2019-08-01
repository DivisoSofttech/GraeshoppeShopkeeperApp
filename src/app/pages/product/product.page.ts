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
    private modalController: ModalController,
    private storage: Storage,
    private queryService: QueryResourceService
  ) { }

  products: Product[];

  ngOnInit() {
    let storeId;
    this.storage.get('user').then(user => {
      storeId = user.preferred_username;
      this.queryService.findAllProductsUsingGET({storeId}).subscribe(res => {
        this.products = res.content;
      });
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateEditProductComponent,
      componentProps: {mode: 'create'}
    });
    return await modal.present();
  }

}
