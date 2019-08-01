import { CreateEditCategoryComponent } from './../../components/create-edit-category/create-edit-category.component';
import { CreateEditUomComponent } from './../../components/create-edit-uom/create-edit-uom.component';
import { ModalController } from '@ionic/angular';
import { CreateEditProductComponent } from './../../components/create-edit-product/create-edit-product.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async presentProductModal() {
    const modal = await this.modalController.create({
      component: CreateEditProductComponent,
      componentProps: {mode:'create'}
    });
    return await modal.present();
  }

  async presentUomModal() {
    const modal = await this.modalController.create({
      component: CreateEditUomComponent,
      componentProps: {mode:'create'}
    });
    return await modal.present();
  }

  async presentCategoryModal() {
    const modal = await this.modalController.create({
      component: CreateEditCategoryComponent,
      componentProps: {mode:'create'}
    });
    return await modal.present();
  }

}
