import { DeliveryInfoDTO } from './../../api/models/delivery-info-dto';
import { DeliveryInfo } from './../../api/models/delivery-info';
import { TypeDTO } from './../../api/models/type-dto';
import { AddCuisineComponent } from './../../components/add-cuisine/add-cuisine.component';
import { ImageSelectorComponent } from './../../components/image-selector/image-selector.component';
import { StoreBundleDTO } from './../../api/models/store-bundle-dto';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
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

  deliveryInfo: DeliveryInfoDTO;
  collectionInfo: DeliveryInfoDTO;

  deliveryIndex;
  collectionIndex;

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
      this.queryService.findAllDeliveryTypesByStoreIdUsingGET(this.storeBundleDTO.store.regNo).subscribe(
        res => {
          res.forEach(type => {
            if (type.name.toLowerCase() === 'delivery') {
              this.delivery = type;
              this.deliveryIndex = res.indexOf(type);
            } else {
              this.collection = type;
              this.collectionIndex = res.indexOf(type);
            }
          });
        }
      );
  }

  async addCuisine() {
    const pop = await this.poOverCtrl.create({
      component: AddCuisineComponent,
      translucent: true,
      componentProps: {storeId: this.storeBundleDTO.store.id}
    });
    await pop.present();
    pop.onDidDismiss().then(data => {
      console.log(data);
      this.storeBundleDTO.storeType.push(data.data);
    });
  }

  removeCuisine(cuisine: StoreTypeDTO) {
    if (cuisine.id === undefined || cuisine.id === null) {
      this.storeBundleDTO.storeType.splice(
        this.storeBundleDTO.storeType.indexOf(cuisine),
        1
      );
    } else {
      this.commandService.deleteStoreTypeUsingDELETE(cuisine.id).subscribe(
        res => {
          this.storeBundleDTO.storeType.splice(
            this.storeBundleDTO.storeType.indexOf(cuisine),
            1
          );
        }
      );
    }
  }

  onChangeDeliveryInfo(info, event) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      if (info === 'delivery' && this.delivery === undefined) {
        this.delivery = {name: info};
        this.deliveryInfo = {storeId: this.storeBundleDTO.store.id, endTime: '06:00 pm', startingTime: '09:00 am'};
      } else if (info === 'collection' && this.collection === undefined) {
        this.collection = {name: info};
        this.collectionInfo = {storeId: this.storeBundleDTO.store.id, endTime: '06:00 pm', startingTime: '09:00 am'};
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
}
