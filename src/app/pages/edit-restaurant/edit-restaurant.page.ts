import { PreOrderSettingsDTO } from './../../api/models/pre-order-settings-dto';
import { Contact } from './../../api/models/contact';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  storeBundleDTO: StoreBundleDTO = {
    store: {
      imageLink: '',
      storeUniqueId: ''
    },
    preOrderSettings: {
      isPreOrderAvailable: false
    },
    storeAddress: {},
    storeSettings: {},
  };

  storeForm = new FormGroup({
    name: new FormControl(this.storeBundleDTO.store.name, [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(6)
    ]),
    openingTime: new FormControl('', [
      Validators.required,
    ]),
    closingTime: new FormControl('', [
      Validators.required
    ]),
    houseNoOrBuildingName: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    // state: new FormControl('', [
    //   Validators.required
    // ]),
    zipcode: new FormControl('', [
      Validators.required
    ])

  });

  showError = false;

  disableSaveState = true;
  preOrderSettings: PreOrderSettingsDTO = {};
  private delivery: TypeDTO = undefined;
  private collection: TypeDTO = undefined;
  @ViewChild('info', { static: false }) private infoInput: IonInput;
  editInfo = false;

  deliveryChecked: boolean;
  collectionChecked: boolean;
  orderIsAuto = true;
  auto = false;
  manual = false;
  advanced = false;

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
          .getStoreBundleUsingGET(user.preferred_username)
          .subscribe(res => {
            console.log("store bundle ",res);

            if (res.preOrderSettings) {
              this.preOrderSettings = res.preOrderSettings;
            } else {
              this.preOrderSettings.toTime = res.store.openingTime;
            }

            console.log('pre', res.preOrderSettings);
            this.storeBundleDTO = res;
            this.setDeliveryTypes();
            this.setOrderAcceptTypes();
            loader.dismiss();
            this.storeForm.setValue({
              name : this.storeBundleDTO.store.name,
              email: this.storeBundleDTO.store.email,
              contact: this.storeBundleDTO.store.contactNo,
              openingTime: this.storeBundleDTO.store.openingTime,
              closingTime: this.storeBundleDTO.store.closingTime,
              houseNoOrBuildingName: this.storeBundleDTO.storeAddress.houseNoOrBuildingName,
              city: this.storeBundleDTO.storeAddress.city,
              // state: this.storeBundleDTO.storeAddress.state,
              zipcode: this.storeBundleDTO.storeAddress.pincode
          });
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
      this.disableSave();
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
    const formValue = this.storeForm.value;
    this.storeBundleDTO.store.name = formValue.name;
    this.storeBundleDTO.store.email = formValue.email;
    this.storeBundleDTO.store.contactNo = formValue.contact;
    this.storeBundleDTO.store.openingTime = formValue.openingTime;
    this.storeBundleDTO.store.closingTime = formValue.closingTime;
    this.storeBundleDTO.storeAddress.houseNoOrBuildingName = formValue.houseNoOrBuildingName;
    this.storeBundleDTO.storeAddress.city = formValue.city;
    // this.storeBundleDTO.storeAddress.state = formValue.state;
    this.storeBundleDTO.storeAddress.pincode = formValue.zipcode;
    if (!this.storeForm.invalid) {
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
          // address.state +
          ', ' +
          address.pincode;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'advanced';

        // if (this.preOrderSettings.isPreOrderAvailable) {
        //   this.commandService.createPreOrderSettingsUsingPOST(this.preOrderSettings).subscribe( pre => {
        //     this.storeBundleDTO.store.preOrderSettingsId = pre.id;
        //     this.storeBundleDTO.preOrderSettings = pre;
        //   });
        // } else {
        //   this.storeBundleDTO.store.preOrderSettingsId = null;
        // }
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
              this.loader.dismiss();
            }
          );
    } else {
      this.showError = true;
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

  onChangeOrderAcceptType(type: string, event) {
    console.log(type , event.detail.checked);
    if (type === 'auto') {
      if (event.detail.checked) {
        this.auto = true;
        this.manual = false;
        this.advanced = false;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'automatic';
      } else {
        this.auto = false;
        if (!this.auto && !this.manual) {
          this.advanced = true;
        }
        this.storeBundleDTO.storeSettings.orderAcceptType = 'advanced';
      }
    } else if (type === 'advanced') {
      if (event.detail.checked) {
        this.auto = false;
        this.manual = false;
        this.advanced = true;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'advanced';
      } else {
        if (!this.auto && !this.manual) {
          this.advanced = true;
        }
        this.storeBundleDTO.storeSettings.orderAcceptType = 'advanced';
      }
    } else {
      if (event.detail.checked) {
        this.auto = false;
        this.manual = true;
        this.advanced = false;
        this.storeBundleDTO.storeSettings.orderAcceptType = 'manual';
      } else {
        this.manual = false;
        if (!this.auto && !this.manual) {
          this.advanced = true;
        }
        this.storeBundleDTO.storeSettings.orderAcceptType = 'advanced';
      }
    }
  }

  hasValidContents(): boolean {
    if (
      !(
        this.storeBundleDTO.store.name &&
        this.storeBundleDTO.store.image &&
        this.storeBundleDTO.store.email &&
        this.storeBundleDTO.store.contactNo &&
        this.storeBundleDTO.store.openingTime &&
        this.storeBundleDTO.store.closingTime &&
        this.storeBundleDTO.storeAddress.houseNoOrBuildingName &&
        this.storeBundleDTO.storeAddress.city &&
        this.storeBundleDTO.storeAddress.pincode
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

  disableSave() {
    console.log('nbm', this.storeForm.get('name').invalid);
    console.log('errors', this.storeForm.invalid);
    if (this.storeBundleDTO === null || this.storeBundleDTO.store.image === null || this.storeForm.invalid) {
      this.disableSaveState = true;
    } else {
      this.disableSaveState = false;
    }
  }
}
