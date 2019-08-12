import { ModalController } from '@ionic/angular';
import { Store } from 'src/app/api/models';
import { BannerDTO } from './../../api/models/banner-dto';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit {

  banner: BannerDTO
  constructor(
    private query: QueryResourceService,
    private command: CommandResourceService,
    private storage: Storage,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.query.findStoreByRegNoUsingGET
  }

  createBanner(){
    this.storage.get('user').then( user => 
    this.query.findStoreByRegNoUsingGET(user.preferred_username)
    .subscribe(store => {
      this.banner.storeId = store.id;
      this.command.createBannerUsingPOST(this.banner)
        .subscribe(data => console.log("banner added",data)
        ,err => console.log("error adding banner"));
    }))
  }

  dismiss(){
    this.modal.dismiss();
  }
}
