import { Util } from './../../services/util';
import { StoreAddressDTO } from './../../api/models/store-address-dto';
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
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  ModalController,
  PopoverController,
  AlertController,
  IonInput,
  NavController
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
    private poOverCtrl: PopoverController,
    private util: Util,
    private navCtrl: NavController
  ) {}
  loader: HTMLIonLoadingElement;

  storeBundleDTO: StoreBundleDTO;

  private delivery: TypeDTO = undefined;
  private collection: TypeDTO = undefined;
  @ViewChild('info', { static: false }) private infoInput: IonInput;
  editInfo = false;

  deliveryChecked: boolean;
  collectionChecked: boolean;
  orderIsAuto = true;

  deliveryInfo: DeliveryInfoDTO;
  collectionInfo: DeliveryInfoDTO;

  deliveryIndex = 99;
  collectionIndex = 99;

  showAddress = false;

  ngOnInit() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.storage.get('user').then(user => {
        this.queryService
          .getStoreBundleUsingGET({ regNo: user.preferred_username })
          .subscribe(res => {
            this.storeBundleDTO = res;
            this.setDeliveryTypes();
            this.setOrderAcceptTypes();
            loader.dismiss();
          });
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
      this.storeBundleDTO.store.imageContentType = data.data.image.slice(
        data.data.image.indexOf(':') + 1,
        data.data.image.indexOf(';')
      );
      console.log(this.storeBundleDTO.store.imageContentType, 'jyuftuu');
    });
    return await modal.present();
  }

  setDeliveryTypes() {
    this.storeBundleDTO.types.forEach(type => {
      if (type.name.toLowerCase() === 'delivery') {
        this.deliveryChecked = true;
        this.delivery = type;
        this.deliveryIndex = this.storeBundleDTO.types.indexOf(type);
        this.deliveryInfo = this.getInfo(type.id);
      } else if (type.name.toLowerCase() === 'collection') {
        this.collectionChecked = true;
        this.collection = type;
        this.collectionIndex = this.storeBundleDTO.types.indexOf(type);
        this.collectionInfo = this.getInfo(type.id);
      }
    });
  }

  getInfo(id): DeliveryInfoDTO {
    if (this.storeBundleDTO.deliveryInfos.length >= 1) {
      if (this.storeBundleDTO.deliveryInfos[0].typeId === id) {
        return this.storeBundleDTO.deliveryInfos[0];
      } else if (
        this.storeBundleDTO.deliveryInfos.length >= 2 &&
        this.storeBundleDTO.deliveryInfos[1].typeId === id
      ) {
        return this.storeBundleDTO.deliveryInfos[1];
      }
    }
  }

  toggleEdit() {
    this.editInfo = !this.editInfo;
    if (this.editInfo) {
      setTimeout(() => {
        this.infoInput.setFocus();
      }, 100);
    }
  }

  async addCuisine() {
    const pop = await this.poOverCtrl.create({
      component: AddCuisineComponent,
      translucent: true,
      componentProps: { storeId: this.storeBundleDTO.store.id }
    });
    await pop.present();
    pop.onDidDismiss().then(data => {
      if (
        data.data.name !== undefined &&
        data.data.name !== null &&
        data.data.name !== ''
      ) {
        this.storeBundleDTO.storeType.push(data.data);
      }
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
    }
  }

  toggleAddress() {
    this.showAddress = !this.showAddress;
  }

  async saveUpdates() {
    this.connectDeliveryInfo();
    this.storeBundleDTO.types = [];
    this.storeBundleDTO.deliveryInfos = [];
    this.includeOrExcludeDeliveryInfo(
      this.deliveryChecked,
      this.delivery,
      this.deliveryInfo
    );
    this.includeOrExcludeDeliveryInfo(
      this.collectionChecked,
      this.collection,
      this.collectionInfo
    );
  }

  includeOrExcludeDeliveryInfo(
    checkVal: boolean,
    type: TypeDTO,
    info: DeliveryInfoDTO
  ) {
    if (checkVal) {
      this.storeBundleDTO.types.push(type);
      if (type.id !== null && type.id !== undefined) {
        this.commandService.updateTypeUsingPUT(type).subscribe(res => {
          info.typeId = res.id;
          this.storeBundleDTO.deliveryInfos.push(info);
          this.saveOrUpdateDeliveryInfo(info);
        });
      } else {
        this.commandService.createTypeUsingPOST(type).subscribe(res => {
          info.typeId = res.id;
          this.storeBundleDTO.deliveryInfos.push(info);
          this.saveOrUpdateDeliveryInfo(info);
        });
      }
    } else if (info && info.id !== null && info.id !== undefined) {
      this.commandService.deleteDeliveryInfoUsingDELETE(info.id).subscribe();
      info = undefined;
      this.commandService.deleteTypeUsingDELETE(type.id).subscribe();
      type = undefined;
    }
  }

  saveOrUpdateDeliveryInfo(info: DeliveryInfoDTO) {
    if (info.id !== null && info.id !== undefined) {
      this.commandService.updateDeliveryInfoUsingPUT(info).subscribe();
    } else {
      this.commandService.createDeliveryInfoUsingPOST(info).subscribe();
    }
  }

  updateStoreBundle() {
    if (this.hasValidContents()) {
      this.util.createLoader().then(loader => {
        this.loader = loader;
        this.loader.present();
      });
      this.saveUpdates();
      const address: StoreAddressDTO = this.storeBundleDTO.storeAddress;
      this.storeBundleDTO.store.locationName =
        address.houseNoOrBuildingName +
        ', ' +
        (address.roadNameAreaOrStreet ? address.roadNameAreaOrStreet + ', ' : '') +
        address.city +
        ', ' +
        address.state +
        ', ' +
        address.pincode;
      this.commandService
        .createStoreBundleUsingPOST(this.storeBundleDTO)
        .subscribe(
          data => {
            this.loader.dismiss();
            this.util.createToast('Store successfully updated', 'checkmark');
            this.navCtrl.navigateBack('/settings');
          },
          err => {
            this.util.createToast('Error occured while updating store');
            this.ngOnInit();
          }
        );
    } else {
      this.util.createAlert('Can\'t save', 'You skipped some mandatory fields, mandatory fields are marked with a \'*\' mark ');
    }
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

  setOrderAcceptTypes() {
    if (this.storeBundleDTO.storeSettings.orderAcceptType !== null) {
      this.orderIsAuto =
        this.storeBundleDTO.storeSettings.orderAcceptType.toLowerCase() ===
        'automatic'
          ? true
          : false;
    } else {
      this.storeBundleDTO.storeSettings.orderAcceptType = 'automatic';
    }
  }

  onChangeOrderAcceptType(autoOrManual: string, event) {
    if (autoOrManual === 'auto') {
      if (event.detail.checked) {
        this.orderIsAuto = true;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'automatic';
      } else {
        this.orderIsAuto = false;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'manual';
      }
    } else {
      if (event.detail.checked) {
        this.orderIsAuto = false;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'manual';
      } else {
        this.orderIsAuto = true;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'automatic';
      }
    }
  }

  hasValidContents(): boolean {
    if (
      !(
        this.storeBundleDTO.store.image &&
        this.storeBundleDTO.store.email &&
        this.storeBundleDTO.store.contactNo &&
        this.storeBundleDTO.store.openingTime &&
        this.storeBundleDTO.store.closingTime &&
        this.storeBundleDTO.storeAddress.name &&
        this.storeBundleDTO.storeAddress.houseNoOrBuildingName &&
        this.storeBundleDTO.storeAddress.city &&
        this.storeBundleDTO.storeAddress.pincode &&
        this.storeBundleDTO.storeAddress.state
      )
    ) {
      return false;
    }
    if (this.deliveryChecked) {
      if (!(this.deliveryInfo.startingTime && this.deliveryInfo.endTime)) {
        return false;
      }
    }
    if (this.collectionChecked) {
      if (!(this.collectionInfo.startingTime && this.collectionInfo.endTime)) {
        return false;
      }
    }
    return true;
  }
}
