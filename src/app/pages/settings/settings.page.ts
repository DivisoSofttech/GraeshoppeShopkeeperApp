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
      icon: 'create'
    },
    {
      title: 'Change Password',
      icon: 'lock'
    },
    {
      title: 'Delete Account',
      icon: 'trash'
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
