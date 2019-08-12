import { BannerDTO } from './../../api/models/banner-dto';
import { Banner } from './../../api/models/banner';
import { Component, OnInit } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Store } from 'src/app/api/models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view-edit-banner',
  templateUrl: './view-edit-banner.page.html',
  styleUrls: ['./view-edit-banner.page.scss'],
})
export class ViewEditBannerPage implements OnInit {

  store: Store
  banners: Banner[];
  bannerDTO: BannerDTO;
  constructor(
    private query: QueryResourceService,
    private storage: Storage,
    private command: CommandResourceService
  ) { }

  ngOnInit() {
    this.getBanners(0);
  }

  getBanners(i){
    this.storage.get('user').then(user => {
      this.query.findBannerByStoreIdUsingGET(user.preferred_username)
        .subscribe(res => {
          res.content.forEach(p => {
            this.banners.push(p);
          });
          i++;
          if(i < res.totalPages) {
            this.getBanners(i);  
          }
        })
    })
   //this.command.createBannerUsingPOST
  }
}
