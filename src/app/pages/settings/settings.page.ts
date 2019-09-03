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

  store: Store;
  constructor(
    private queryService: QueryResourceService,
    private storage: Storage
  ) { }

  options: { title: string, icon: string, route: string }[] = [
    {
      title: 'Edit Restaurant',
      icon: 'create',
      route: '/edit-restaurant'
    },
    {
      title: 'Edit Banner',
      icon: 'image',
      route: '/view-edit-banner'
    },
    {
      title: 'Change Location',
      icon: 'pin',
      route: '/restaurant-location'
    },
    {
      title: 'Change Password',
      icon: 'lock',
      route: '/password-reset'
    },
    {
      title: 'Delete Account',
      icon: 'trash',
      route: '/delete-account'
    }
  ];

  ngOnInit() {

    this.storage.get('user').then(
      data => {
        this.queryService.getStoreBundleUsingGET({ regNo: data.preferred_username }).subscribe(
          res => {
            this.store = res.store;
            this.store.storeTypes = res.storeType;
            console.log(this.store);
          }
        );
      }
    );
  }
}
