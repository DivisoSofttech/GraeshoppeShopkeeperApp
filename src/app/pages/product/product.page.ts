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

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateEditProductComponent,
      componentProps: {mode:'create'}
    });
    return await modal.present();
  }

}
