import { CreateEditProductComponent } from './../create-edit-product/create-edit-product.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateEditProductComponent,
      componentProps: {mode:'update'}
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
          this.presentModal()
          console.log('Edit clicked');
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
