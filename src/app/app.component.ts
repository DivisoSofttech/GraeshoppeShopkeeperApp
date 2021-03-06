import { Store } from './api/models/store';
import { QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Util } from './services/util';
import { KeycloakService } from './services/security/keycloak.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public appPages = [
    // {
    //   title: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'analytics'
    // },
    {
      title: 'Product',
      url: '/product',
      icon: 'logo-buffer'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'logo-buffer'
    },
    {
      title: 'Category',
      url: '/category',
      icon: 'filing'
    },
    {
      title: 'Offers',
      url: '/offers',
      icon: 'pricetags'
    },
    // {
    //   title: 'Stock Dairy',
    //   url: '/stock-dairy',
    //   icon: 'book'
    // },
    {
      title: 'Order',
      url: '/order',
      icon: 'list-box'
    },
    {
      title: 'Order Summary',
      url: '/order-summary',
      icon: 'browsers'
    },
    // {
    //   title: 'UOM',
    //   url: '/uom',
    //   icon: 'speedometer'
    // },
    // {
    //   title: 'Sale',
    //   url: '/sale',
    //   icon: 'pricetags'
    // },
    // {
    //   title: 'Reports',
    //   url: '/reports',
    //   icon: 'apps'
    // },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
  ];
  store: Store = {
    storeUniqueId: '',
    imageLink: ''
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: Util,
    private keycloakService: KeycloakService,
    private localNotifications: LocalNotifications,
    private storage: Storage,
    private query: QueryResourceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.localNotifications.hasPermission()) {
        console.log('Local Notifications has permission');
      } else {
        this.localNotifications.requestPermission().then(permission => {
          console.log('Permission has been granted', permission);
        });
      }
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#FFFFFF');
      this.splashScreen.hide();
      this.storage.get('user').then(user => {
        this.query.findStoreByRegNoUsingGET(user.preferred_username).subscribe(store => {
          this.store = store;
        });
      });
    });
  }

  logout() {
    this.keycloakService.logout();
    this.util.createToast('You\'ve been logged out');
  }

  exitApp() {
    this.util.createAlert('Exit App', 'Are you sure?',
    (confirm) => {
      // tslint:disable-next-line: no-string-literal
      navigator['app'].exitApp();
    }, (deny) => {
    });
  }
}
