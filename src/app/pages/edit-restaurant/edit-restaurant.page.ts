import { ImageSelectorComponent } from './../../components/image-selector/image-selector.component';
import { StoreBundleDTO } from './../../api/models/store-bundle-dto';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.page.html',
  styleUrls: ['./edit-restaurant.page.scss']
})
export class EditRestaurantPage implements OnInit {
  constructor(
    private queryService: QueryResourceService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {}

  storeBundleDTO: StoreBundleDTO;

  ngOnInit() {
    this.storage.get('user').then(user => {
      this.queryService
        .getStoreBundleUsingGET({ regNo: user.preferred_username })
        .subscribe(res => {
          this.storeBundleDTO = res;
        });
    });
  }

  async uploadImage() {
    const modal = await this.modalCtrl.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });
    modal.onDidDismiss().then(data => {
      console.log('sdf', data);
      console.log(
        'base',
        data.data.image.substring(data.data.image.indexOf(',') + 1)
      );
      console.log(
        'type',
        data.data.image.slice(
          data.data.image.indexOf(':'),
          data.data.image.indexOf(';')
        )
      );
      this.storeBundleDTO.store.image = data.data.image.substring(
        data.data.image.indexOf(',') + 1
      );
      this.storeBundleDTO.store.imageContentType = data.data.imageType;
    });
    return await modal.present();
  }
}
