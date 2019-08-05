import { StoreBundleDTO } from './../../api/models/store-bundle-dto';
import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
import { Store } from './../../api/models/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  storeBundle: StoreBundleDTO;
  constructor(
    private queryService: QueryResourceService,
    private storage: Storage
  ) { }

  options: any = [
    {
      title: 'Edit Restaurant',
      icon: 'create',
      url: ' '
    },
    {
      title: 'Change Password',
      icon: 'lock',
      url: '/password-reset'
    },
    {
      title: 'Delete Account',
      icon: 'trash',
      url: ' '
    },
  ];

  ngOnInit() {
    // this.storage.get('user').then(
    //   data => {
    //     this.queryService.getStoreBundleUsingGET({regNo: data}).subscribe(
    //       res => {
    //         this.storeBundle = res;
    //       }
    //     );
    //   }
    // );
  }

}
