import { FilterService } from './../../services/filter.service';
import { Store } from './../../api/models/store';
import { Order } from './../../api/models/order';
import { NotificationComponent } from './../notification/notification.component';
import { DatePipe } from '@angular/common';
import { NotificationService } from './../../services/notification.service';
import { KeycloakService } from './../../services/security/keycloak.service';
import { Util } from './../../services/util';
import { ActionSheetController, ModalController, IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-tab-all',
  templateUrl: './order-tab-all.component.html',
  styleUrls: ['./order-tab-all.component.scss'],
})
export class OrderTabAllComponent implements OnInit {

  title;
  store: Store;
  user;
  loader: HTMLIonLoadingElement;
  orders: Order[] = [];

  deliveryType = 'all';

  pendingOrdersSorted = {
    today: []
  };
  confirmedOrdersSorted = {
    today: []
  };
  completedOrdersSorted = {
    today: []
  };
  pendingOrdersSortedKeys = ['today'];
  confirmedOrdersSortedKeys = ['today'];
  completedOrdersSortedKeys = ['today'];


  showPending = true;

  penCount = 0;
  conCount = 0;
  comcount = 0;
  penTotalPages = 0;
  conTotalPages = 0;
  comTotalPages = 0;

  @ViewChild(IonInfiniteScroll, null) ionInfiniteScroll: IonInfiniteScroll;
  notificationCount: any;
  constructor(
    private route: ActivatedRoute,
    private queryResource: QueryResourceService,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private util: Util,
    private keycloakService: KeycloakService,
    private notification: NotificationService,
    private datePipe: DatePipe,
    private filterService: FilterService,
    private cref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.title = this.route.snapshot.data.title;
    this.util.createLoader().then(
      loader => {
        loader.present();
        this.storage
        .get('user')
        .then(data => {
          this.user = data;
          this.filterService.filter.subscribe(a => {
            this.filter(a);
          });
          // this.initTasks();
          loader.dismiss();
        })
        .catch(err => {
          this.keycloakService.getCurrentUserDetails().then(user => {
            this.storage.set('user', user);
            this.user = user;
            this.initTasks();
            console.log('last log ');
            loader.dismiss();
          });
        });
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
    }

  initTasks() {
    this.queryResource.findStoreByRegNoUsingGET(this.user.preferred_username)
    .subscribe(store => {
      this.store = store;
      this.getNoticationCount();
      if (this.title === 'pending') {
        this.getPendingOrders(0);
      } else if (this.title === 'confirmed') {
        this.getConfirmedOrders(0);
      } else {
        this.getCompletedOrders(0);
      }
    },
    err => {
      console.log('error finding store ', err);
    }
    );
  }

  filter(filterBy) {
    this.deliveryType = filterBy;
    console.log('filterBy ', filterBy);
    this.confirmedOrdersSorted = {
      today: []
    };
    this.confirmedOrdersSortedKeys = ['today'];
    this.confirmedOrdersSorted = {today: []};
    this.getConfirmedOrders(0);

    this.completedOrdersSortedKeys = ['today'];
    this.completedOrdersSorted = {today: []};
    this.getCompletedOrders(0);

    this.pendingOrdersSorted = {today: []};
    this.pendingOrdersSortedKeys = ['today'];
    this.getPendingOrders(0);
  }

  sortOrders(o: Order , keyStore , arrayList) {
    console.log('method sort ');

    const date1: any = new Date(this.datePipe.transform(o.date, 'd/M/yy'));
    const date2: any = new Date(this.datePipe.transform(new Date() , 'd/M/yy'));
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
       arrayList.today.push(o);
    } else {
      if (keyStore.includes(this.datePipe.transform(o.date, 'd/M/yy'))) {
        arrayList[this.datePipe.transform(o.date, 'd/M/yy')].push(o);
      } else {
        keyStore.push(this.datePipe.transform(o.date, 'd/M/yy'));
        arrayList[this.datePipe.transform(o.date, 'd/M/yy')] = [];
        arrayList[this.datePipe.transform(o.date, 'd/M/yy')].push(o);
      }
    }
  }

  getPendingOrders(i) {
    console.log('method pending oders ');

    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource
        .findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGET({
          statusName: 'payment-processed-unapproved',
          page: i,
          storeId: this.user.preferred_username,
          deliveryType: this.deliveryType
        })
        .subscribe(res => {
          res.content.forEach(data =>
          {
              this.sortOrders(data , this.pendingOrdersSortedKeys , this.pendingOrdersSorted);
          }, err => {

            console.log('error geting order ', err);

          });
          i++;
          console.log('pending oders ', res);
          this.penTotalPages = res.totalPages;
          if (this.penCount + 1 === res.totalPages) {
            this.ionInfiniteScroll.disabled = true;
         } else {
           this.ionInfiniteScroll.disabled = false;
          }
          console.log('pending', i, '==',  res.totalPages );
          loader.dismiss();
        }, err => {
          loader.dismiss();
          this.util.createToast('Error getting Pending Orders', 'information-circle');
        });
    });
  }

  getConfirmedOrders(i) {
    console.log('method confirmedOders ');

    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource
        .findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGET({
          statusName: 'payment-processed-approved',
          page: i,
          storeId: this.user.preferred_username,
          deliveryType: this.deliveryType
        })
        .subscribe(res => {
          res.content.forEach(data =>
            {
              this.sortOrders(data , this.confirmedOrdersSortedKeys, this.confirmedOrdersSorted);
            });
          i++;
          console.log('confirmed oders ', res);
          this.conTotalPages = res.totalPages;
          if (this.conCount + 1 === res.totalPages) {
            this.ionInfiniteScroll.disabled = true;
         } else {
           this.ionInfiniteScroll.disabled = false;
          }
          console.log('confirmed', i, '==',  res.totalPages );
          loader.dismiss();
        }, err => {
          loader.dismiss();
          this.util.createToast('Error getting Confirmed Orders', 'information-circle');
        });
    });
  }


  getCompletedOrders(i) {
    console.log('method completed oders ');
    console.log('completed delivery type ', this.deliveryType + this.user.preferred_username);

    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource
        .findOrderByStatusNameAndStoreIdAndDeliveryTypeUsingGET({
          statusName: 'delivered',
          page: i,
          storeId: this.user.preferred_username,
          deliveryType: this.deliveryType
        })
        .subscribe(res => {
          res.content.forEach(data => {
              this.sortOrders(data , this.completedOrdersSortedKeys, this.completedOrdersSorted);
            });
          i++;
          console.log('completed oders ', res);
          this.comTotalPages = res.totalPages;
          if (this.comcount + 1 === res.totalPages) {
            this.ionInfiniteScroll.disabled = true;
         } else {
           this.ionInfiniteScroll.disabled = false;
          }
          console.log('completed', i, '==', res.totalPages );
          loader.dismiss();
        }, err => {
          loader.dismiss();
          console.log('Error getting Completed Orders', err);
          this.util.createToast('Error getting Completed Orders', 'information-circle');
        });
    });
  }

  toggleInfiniteScroll() {
    this.ionInfiniteScroll.disabled = !this.ionInfiniteScroll.disabled;
  }

  loadMore() {
    console.log('loading More Data');
    if (this.title === 'pending') {
      this.penCount++;
      this.getPendingOrders(this.penCount);
    } else if (this.title === 'confirmed') {
      this.conCount++;
      this.getConfirmedOrders(this.conCount);
    } else if (this.title === 'completed') {
      this.comcount++;
      this.getCompletedOrders(this.comcount);
    }
  }

  async openNotificationModal() {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'half-height'
    });
    return await modal.present();
  }

  getNoticationCount() {
    this.notification.notificationBehaviouralSubject
      .subscribe(count => {
        this.notificationCount = count;
      });
  }

  orderAccepted(order , key) {
    console.log('Accepted');
    this.pendingOrdersSorted[key] = this.pendingOrdersSorted[key].filter(
      po => po.orderId !== order.orderId
    );
    if (this.confirmedOrdersSortedKeys.includes(key)) {
      this.confirmedOrdersSorted[key].unshift(order);
    } else {
      this.confirmedOrdersSortedKeys.push(key);
      this.confirmedOrdersSorted[key] = [];
      this.confirmedOrdersSorted[key].unshift(order);
    }
    setInterval(() => {
      if (!this.cref['destroyed']) {
        this.cref.detectChanges();
      }
    }, 1000);
  }

  orderCompleted(order , key) {
    console.log('Completed');
    this.confirmedOrdersSorted[key] = this.confirmedOrdersSorted[key].filter(
      co => co.orderId !== order.orderId
    );
    if (this.completedOrdersSortedKeys.includes(key)) {
      this.completedOrdersSorted[key].unshift(order);
    } else {
      this.completedOrdersSortedKeys.push(key);
      this.completedOrdersSorted[key] = [];
      this.completedOrdersSorted[key].unshift(order);
    }
    setInterval(() => {
      if (!this.cref['destroyed']) {
        this.cref.detectChanges();
      }
    }, 1000);
  }

  refresh(event) {
    this.pendingOrdersSorted = {today: []};
    this.pendingOrdersSortedKeys = ['today'];
    this.confirmedOrdersSorted = {today: []};
    this.confirmedOrdersSortedKeys = ['today'];
    this.completedOrdersSorted = {today: []};
    this.completedOrdersSortedKeys = ['today'];
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
