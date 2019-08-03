import { CommandResourceService } from 'src/app/api/services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateEditProductComponent } from './../create-edit-product/create-edit-product.component';
import {  ActionSheetController, ModalController } from '@ionic/angular';
import { Product } from '../../api/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: Product;
  @Output()
  delete = new EventEmitter();

  constructor(
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private commandResource: CommandResourceService
  ) { }

  ngOnInit() {
    console.log(this.product);
    
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateEditProductComponent,
      componentProps: {mode:  'update' ,product: this.product}
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Update',
        role: 'destructive',
        icon: 'create',
        handler: () => {
          this.presentModal();
          console.log('Edit clicked');
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.commandResource.deleteProductUsingDELETE(this.product.id)
              .subscribe(data =>  this.delete.emit());
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
