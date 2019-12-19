import { KeycloakService } from 'src/app/services/security/keycloak.service';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { Util } from './../../services/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  QueryResourceService,
} from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Order, Store, OpenTask } from 'src/app/api/models';
import {
  IonInfiniteScroll,
  IonSlides,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {
  store: Store;
  user;
  tasks: OpenTask[] = [];
  loader: HTMLIonLoadingElement;
  orders: Order[] = [
    {
      orderId: '78',
      customerId: '564654',
      deliveryInfo: {
        startingTime: '12.30Am',
        deliveryAddress: {
          addressLine1: '1/123,pathiripala'
        }
      },
      paymentRef: 'cash'
    }
  ];

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
  currentPage = 'pending';
  penCount = 0;
  conCount = 0;
  comcount = 0;
  penTotalPages = 0;
  conTotalPages = 0;
  comTotalPages = 0;
  showFooter = false;


  @ViewChild(IonInfiniteScroll, null) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', null) slides: IonSlides;
  notificationCount: any;
  constructor(
    private queryResource: QueryResourceService,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private util: Util,
    private keycloakService: KeycloakService,
    private notification: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    console.log('method ngOninit ');

    this.util.createLoader().then(
      loader => {
        loader.present();
        this.storage
        .get('user')
        .then(data => {
          this.user = data;
          this.initTasks();
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

  initTasks() {
    console.log('method initTasks ');
    this.queryResource.findStoreByRegNoUsingGET(this.user.preferred_username)
    .subscribe(store => {
      this.store = store;
      this.hidePending();
      this.getNoticationCount();
      if (store.storeSettings.orderAcceptType !== 'automatic') {
        this.getPendingOrders(0);
      } else {
        this.currentPage = 'confirmed';
      }
      this.getConfirmedOrders(0);
      console.log('hi');
      this.getCompletedOrders(0);
      console.log('hi');

    },
    err => {

      console.log('error finding store ', err);

    }
    );
  }

  filter(filterBy) {
    console.log('method filterBy ');

    this.deliveryType = filterBy;
    console.log('filterBy ', filterBy);
    this.confirmedOrdersSorted = {
      today: []
    };
    this.confirmedOrdersSortedKeys = ['today'];
    this.confirmedOrdersSorted = {today: []};
    this.getConfirmedOrders(0);
    console.log('hi');

    this.completedOrdersSortedKeys = ['today'];
    this.completedOrdersSorted = {today: []};
    this.getCompletedOrders(0);
    console.log('hi');

    this.pendingOrdersSorted = {today: []};
    this.pendingOrdersSortedKeys = ['today'];
    this.getPendingOrders(0);
  }

  color(type): string {
    if (this.deliveryType === type) {
      return 'primary';
    }
    return 'warning';
  }

  sortOrders(o: Order , keyStore , arrayList) {
    console.log('method sort ');

    const date1: any = new Date(this.datePipe.transform(o.date, 'M/d/yy'));
    const date2: any = new Date(this.datePipe.transform(new Date() , 'M/d/yy'));
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
       arrayList.today.push(o);
    } else {
      if (keyStore.includes(this.datePipe.transform(o.date, 'M/d/yy'))) {
        arrayList[this.datePipe.transform(o.date, 'M/d/yy')].push(o);
      } else {
        keyStore.push(this.datePipe.transform(o.date, 'M/d/yy'));
        arrayList[this.datePipe.transform(o.date, 'M/d/yy')] = [];
        arrayList[this.datePipe.transform(o.date, 'M/d/yy')].push(o);
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
          this.penTotalPages = res.totalPages;
          if (this.comcount + 1 === res.totalPages) {
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
          console.log('completedsdkfk oders ', res);
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
  getOrders(i, limit: boolean) {
    console.log('method getOders ');

    this.queryResource
      .findOrderLineByStoreIdUsingGET({
        storeId: this.user.preferred_username,
        page: i
      })
      .subscribe(porders => {
        porders.content.forEach(o => {
          this.orders.push(o);
        });

        i++;

        if (limit === false) {
          // Load All Pages Recursively
          if (i < porders.totalPages) {
            this.getOrders(i, limit);
          }
        }

        if (i === porders.totalPages) {
          // Disable infinite Scroll
          console.log('All Pages Retrieved PageCount', porders.totalPages);
          this.toggleInfiniteScroll();
        }
      });
  }

  toggleInfiniteScroll() {
    this.ionInfiniteScroll.disabled = !this.ionInfiniteScroll.disabled;
  }

  loadMore() {
    console.log('loading More Data');
    if (this.currentPage === 'pending') {
      this.penCount++;
      this.getPendingOrders(this.penCount);
    } else if (this.currentPage === 'confirmed') {
      this.conCount++;
      this.getConfirmedOrders(this.conCount);
    } else if (this.currentPage === 'completed') {
      this.comcount++;
      this.getCompletedOrders(this.comcount);
    }
  }

  segmentChange(ev) {
    if (this.showPending) {
      if (ev.detail.value === 'pending') {
        this.slides.slideTo(0);
        if (this.penCount + 1 === this.penTotalPages) {
           this.ionInfiniteScroll.disabled = true;
        } else {
          this.ionInfiniteScroll.disabled = false;
         }
      } else if (ev.detail.value === 'confirmed') {
        this.slides.slideTo(1);
        if (this.conCount + 1 === this.conTotalPages) {
          this.ionInfiniteScroll.disabled = true;
       } else {
        this.ionInfiniteScroll.disabled = false;
       }
      } else if (ev.detail.value === 'completed') {
        this.slides.slideTo(2);
        if (this.comcount + 1 === this.comTotalPages) {
          this.ionInfiniteScroll.disabled = true;
       } else {
        this.ionInfiniteScroll.disabled = false;
       }
      }
    } else {
      if (ev.detail.value === 'confirmed') {
        this.slides.slideTo(0);
        if (this.conCount + 1 === this.conTotalPages) {
          this.ionInfiniteScroll.disabled = true;
       } else {
        this.ionInfiniteScroll.disabled = false;
       }
      } else if (ev.detail.value === 'completed') {
        this.slides.slideTo(1);
        if (this.conCount + 1 === this.conTotalPages) {
          this.ionInfiniteScroll.disabled = true;
       } else {
        this.ionInfiniteScroll.disabled = false;
       }
      }
    }
  }
  slideChange() {
    let index: any;
    if (this.showPending) {
      this.slides.getActiveIndex().then(num => {
        index = num;
        if (index === 0) {
          this.currentPage = 'pending';
        } else if (index === 1) {
          this.currentPage = 'confirmed';
        } else if (index === 2) {
          this.currentPage = 'completed';
        }
      });
    } else {
      this.slides.getActiveIndex().then(num => {
        index = num;
        if (index === 0) {
          this.currentPage = 'confirmed';
        } else if (index === 1) {
          this.currentPage = 'completed';
        }
      });
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
    this.pendingOrdersSorted[key] = this.pendingOrdersSorted[key].filter(
      po => po.orderId !== order.orderId
    );
    if (this.confirmedOrdersSortedKeys.includes(key)) {
      this.confirmedOrdersSorted[key].push(order);
    } else {
      this.confirmedOrdersSortedKeys.push(key);
      this.confirmedOrdersSorted[key] = [];
      this.confirmedOrdersSorted[key].push(order);
    }
  }

  orderCompleted(order , key) {
    this.confirmedOrdersSorted[key] = this.confirmedOrdersSorted[key].filter(
      co => co.orderId !== order.orderId
    );
    if (this.completedOrdersSortedKeys.includes(key)) {
      this.completedOrdersSorted[key].push(order);
    } else {
      this.completedOrdersSortedKeys.push(key);
      this.completedOrdersSorted[key] = [];
      this.completedOrdersSorted[key].push(order);
    }
  }

  hidePending() {
    if (this.store.storeSettings.orderAcceptType === 'automatic') {
      this.showPending = false;
    }
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

  showFoo() {
    this.showFooter = !this.showFooter;
  }


}
