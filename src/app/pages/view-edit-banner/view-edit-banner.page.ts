import { CropperSettings } from 'ngx-img-cropper';
import { ModalController } from '@ionic/angular';
import { BannerDTO } from './../../api/models/banner-dto';
import { Banner } from './../../api/models/banner';
import { Component, OnInit } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Store } from 'src/app/api/models';
import { Storage } from '@ionic/storage';
import { ImageSelectorComponent } from 'src/app/components/image-selector/image-selector.component';

@Component({
  selector: 'app-view-edit-banner',
  templateUrl: './view-edit-banner.page.html',
  styleUrls: ['./view-edit-banner.page.scss'],
})
export class ViewEditBannerPage implements OnInit {

  store: Store
  banners: Banner[] =[];
  bannerDTO: BannerDTO ={};
  cropperSettings: CropperSettings
  constructor(
    private query: QueryResourceService,
    private storage: Storage,
    private modalController: ModalController,
    private command: CommandResourceService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.compressRatio = 1.6;
   }

  ngOnInit() {
    this.getBanners(0);
  }
  async viewAddBannerModal(){
    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      componentProps: {cropperSettings: this.cropperSettings}
    });
    modal.onDidDismiss()
    .then(data => {
      this.bannerDTO.file = data.data.image.substring(data.data.image.indexOf(',') + 1);
      this.bannerDTO.fileContentType = data.data.image.slice(data.data.image.indexOf(':') + 1, data.data.image.indexOf(';'));
      this.createBanner();
    });
    return await modal.present();
   }
   createBanner(){
    this.storage.get('user').then( user => 
    this.query.findStoreByRegNoUsingGET(user.preferred_username)
    .subscribe(store => {
      this.bannerDTO.storeId = store.id;
      this.command.createBannerUsingPOST(this.bannerDTO)
        .subscribe(data => {
          console.log("banner added",data);
          this.banners.push(this.bannerDTO);
        }
        ,err => console.log("error adding banner"));
    }))
  }
  getBanners(i){
    this.storage.get('user').then(user => {
      this.query.findBannerByStoreIdUsingGET(user.preferred_username)
        .subscribe(res => {
          console.log("banners",res.content);
          res.content.forEach(p => {
            this.banners.push(p);
          });
          i++;
          if(i < res.totalPages) {
            this.getBanners(i);  
          }
        })
    })
  }
  deleteBanner(banner){
    this.command.deleteBannerUsingDELETE(banner.id)
        .subscribe(data => {
          console.log('banner deleted');
          this.banners = this.banners.filter(b => b.id != banner.id);
        });
  }

  
}
