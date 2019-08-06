import { DeliveryInfoDTO } from './../../api/models/delivery-info-dto';
import { DeliveryInfo } from './../../api/models/delivery-info';
import { TypeDTO } from './../../api/models/type-dto';
import { AddCuisineComponent } from './../../components/add-cuisine/add-cuisine.component';
import { ImageSelectorComponent } from './../../components/image-selector/image-selector.component';
import { StoreBundleDTO } from './../../api/models/store-bundle-dto';
import {
  QueryResourceService,
  CommandResourceService
} from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  ModalController,
  PopoverController,
  AlertController
} from '@ionic/angular';
import { StoreTypeDTO } from 'src/app/api/models';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.page.html',
  styleUrls: ['./edit-restaurant.page.scss']
})
export class EditRestaurantPage implements OnInit {
  constructor(
    private queryService: QueryResourceService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private commandService: CommandResourceService,
    private alertCtrl: AlertController,
    private poOverCtrl: PopoverController
  ) {}

  storeBundleDTO: StoreBundleDTO;

  private delivery: TypeDTO = undefined;
  private collection: TypeDTO = undefined;

  deliveryChecked: boolean;
  collectionChecked: boolean;

  deliveryInfo: DeliveryInfoDTO;
  collectionInfo: DeliveryInfoDTO;

  deliveryIndex = 99;
  collectionIndex = 99;

  showAddress = false;

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.queryService
        .getStoreBundleUsingGET({ regNo: user.preferred_username })
        .subscribe(res => {
          this.storeBundleDTO = res;
          this.setDeliveryInfo();
        });
    });
  }

  async uploadImage() {
    const modal = await this.modalCtrl.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });
    modal.onDidDismiss().then(data => {
      this.storeBundleDTO.store.image = data.data.image.substring(
        data.data.image.indexOf(',') + 1
      );
      this.storeBundleDTO.store.imageContentType = data.data.imageType;
    });
    return await modal.present();
  }

  setDeliveryInfo() {
    this.storeBundleDTO.types.forEach(type => {
      if (type.name.toLowerCase() === 'delivery') {
        this.delivery = type;
        this.deliveryChecked = true;
        this.deliveryIndex = this.storeBundleDTO.types.indexOf(type);
      } else if (type.name.toLowerCase() === 'collection') {
        this.collection = type;
        this.collectionChecked = true;
        this.collectionIndex = this.storeBundleDTO.types.indexOf(type);
      }
    });
  }

  async addCuisine() {
    const pop = await this.poOverCtrl.create({
      component: AddCuisineComponent,
      translucent: true,
      componentProps: { storeId: this.storeBundleDTO.store.id }
    });
    await pop.present();
    pop.onDidDismiss().then(data => {
      console.log(data);
      this.storeBundleDTO.storeType.push(data.data);
    });
  }

  async cuisineDeleteAlert(cuisine: StoreTypeDTO) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: true,
      message: 'Delete ' + cuisine.name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.removeCuisine(cuisine);
          }
        }
      ]
    });
    return await alert.present();
  }

  removeCuisine(cuisine: StoreTypeDTO) {
    if (cuisine.id === undefined || cuisine.id === null) {
      this.storeBundleDTO.storeType.splice(
        this.storeBundleDTO.storeType.indexOf(cuisine),
        1
      );
    } else {
      this.commandService
        .deleteStoreTypeUsingDELETE(cuisine.id)
        .subscribe(res => {
          this.storeBundleDTO.storeType.splice(
            this.storeBundleDTO.storeType.indexOf(cuisine),
            1
          );
        });
    }
  }

  onChangeDeliveryInfo(info, event) {
    if (event.detail.checked) {
      if (info === 'delivery' && this.delivery === undefined) {
        this.delivery = { name: info };
        this.deliveryInfo = {
          storeId: this.storeBundleDTO.store.id,
          endTime: '',
          startingTime: ''
        };
      } else if (info === 'collection' && this.collection === undefined) {
        this.collection = { name: info };
        this.collectionInfo = {
          storeId: this.storeBundleDTO.store.id,
          endTime: '',
          startingTime: ''
        };
      }
    } else {
      if (info === 'delivery' && this.delivery !== undefined) {
        this.delivery = undefined;
        this.deliveryInfo = undefined;
      } else if (info === 'collection' && this.collection !== undefined) {
        this.collection = undefined;
        this.collectionInfo = undefined;
      }
    }
  }

  toggleAddress() {
    this.showAddress = !this.showAddress;
  }

  async saveUpdates() {
    this.connectDeliveryInfo();
    this.storeBundleDTO.types = [];
    this.storeBundleDTO.deliveryInfos = [];
    if (this.deliveryChecked) {
      this.storeBundleDTO.types.push(this.delivery);
      if (this.delivery.id !== null && this.delivery.id !== undefined) {
        this.commandService.updateTypeUsingPUT(this.delivery).subscribe(res => {
          this.deliveryInfo.typeId = res.id;
          this.storeBundleDTO.deliveryInfos.push(this.deliveryInfo);
        });
      } else {
        this.commandService.createTypeUsingPOST(this.delivery).subscribe(res => {
          this.deliveryInfo.typeId = res.id;
          this.storeBundleDTO.deliveryInfos.push(this.deliveryInfo);
        });
      }
    }
    if (this.collectionChecked) {
      this.storeBundleDTO.types.push(this.collection);
      if (this.collection.id !== null && this.collection.id !== undefined) {
        this.commandService.updateTypeUsingPUT(this.collection).subscribe(res => {
          this.collectionInfo.typeId = res.id;
          this.storeBundleDTO.deliveryInfos.push(this.collectionInfo);
        });
      } else {
        this.commandService.createTypeUsingPOST(this.collection).subscribe(res => {
          this.collectionInfo.typeId = res.id;
          this.storeBundleDTO.deliveryInfos.push(this.collectionInfo);
        });
      }
    }
  }

  async updateStoreBundle() {
    await this.saveUpdates().then(
      () => {
        this.commandService.createStoreBundleUsingPOST(this.storeBundleDTO).subscribe();
      }
    );
  }

  connectDeliveryInfo() {
    if (this.storeBundleDTO.deliveryInfos.length > 0) {
      if (this.deliveryIndex !== 99) {
        this.delivery.id = this.storeBundleDTO.deliveryInfos[
          this.deliveryIndex
        ].typeId;
        this.deliveryInfo.id = this.storeBundleDTO.deliveryInfos[
          this.deliveryIndex
        ].id;
      }
      if (this.collectionIndex !== 99) {
        this.collectionInfo.id = this.storeBundleDTO.deliveryInfos[
          this.collectionIndex
        ].id;
        this.collection.id = this.storeBundleDTO.deliveryInfos[
          this.collectionIndex
        ].typeId;
      }
    }
  }
}
