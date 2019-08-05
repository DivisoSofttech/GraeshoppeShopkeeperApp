import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEditProductComponent } from '../create-edit-product/create-edit-product.component';
import { CreateEditUomComponent } from '../create-edit-uom/create-edit-uom.component';
import { CreateEditCategoryComponent } from '../create-edit-category/create-edit-category.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  @Output() productAdd = new EventEmitter();

  @Output() uomAdd = new EventEmitter();

  @Output() categoryAdd = new EventEmitter();

  user;

  constructor(
    private modalController: ModalController,
    private storage: Storage
  ) { }

  ngOnInit() {

    this.storage.get('user')
    .then(data => {
        this.user = data;
     });
  }

  async presentProductModal() {
    const modal = await this.modalController.create({
      component: CreateEditProductComponent,
      componentProps: {mode: 'create' , storeIdpcode: this.user.preferred_username}
    });

    modal.onDidDismiss().then(
     data => {
       if(data.data != undefined) {
        this.productAdd.emit(data.data);
       } else {
         // Error
       }
      }
    );
    return await modal.present();
  }

  async presentUomModal() {
    const modal = await this.modalController.create({
      component: CreateEditUomComponent,
      componentProps: {mode:'create', storeIdpcode: this.user.preferred_username}
    });

    modal.onDidDismiss().then(
      data => {
        if(data.data != undefined) {
         this.uomAdd.emit(data.data);
        } else {
          // Error
        }
      }
     ); 
    return await modal.present();
  }

  async presentCategoryModal() {
    const modal = await this.modalController.create({
      component: CreateEditCategoryComponent,
      componentProps: {mode:'create' , storeIdpcode: this.user.preferred_username}
    });
    
    modal.onDidDismiss().then(
      data => {
        if(data.data != undefined) {
         this.categoryAdd.emit(data.data);
        } else {
          // Error
        }
      }
     );

    return await modal.present();
  }

}
