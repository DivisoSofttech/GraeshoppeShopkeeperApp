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
  pendingOrders: Order[] = [];
  confirmedOrders: Order[] = [];
  completedOrders: Order[] = [];
  deliveryType = 'all';

  showPending = true;
  currentPage = 'pending';
  penCount = 0;
  conCount = 0;
  comcount = 0;
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
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.util.createLoader().then(
      loader => {
        this.pendingOrders = [];
        this.completedOrders = [];
        this.confirmedOrders = [];
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
            loader.dismiss();
          });
        });
      }
    );
  }

  initTasks() {
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
      this.getCompletedOrders(0);
    });
  }

  filter(filterBy) {
    this.deliveryType = filterBy;
    this.confirmedOrders = [];
    this.getConfirmedOrders(0);
    this.completedOrders = [];
    this.getCompletedOrders(0);
    this.pendingOrders = [];
    this.getPendingOrders(0);
  }

  color(type): string {
    if (this.deliveryType === type) {
      return 'primary';
    }
    return 'warning';
  }

  // getPendingOrders() {
  //   this.util.createLoader().then(loader => {
  //     this.loader = loader;
  //     this.loader.present();
  //     this.queryResource
  //       .getOpenTasksUsingGET({
  //         assignee: this.user.preferred_username,
  //         name: 'Accept Order'
  //       })
  //       .subscribe(
  //         listOfTasks => {
  //           listOfTasks.forEach(opentask => {
  //             this.tasks.push(opentask);
  //             this.queryResource
  //               .findOrderByOrderIdUsingGET(opentask.orderId)
  //               .subscribe(order => this.pendingOrders.push(order));
  //           });
  //           this.loader.dismiss();
  //         }, err => {
  //           this.loader.dismiss();
  //           this.util.createToast('Error getting Confirmed Orders', 'information-circle');
  //         });
  //   });
  // }

  getPendingOrders(i) {
    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource
        .findOrderByStatusNameUsingGET({
          statusName: 'unapproved',
          page: i,
          storeId: this.user.preferred_username,
          deliveryType: this.deliveryType
        })
        .subscribe(res => {
          res.content.forEach(data => this.pendingOrders.push(data));
          i++;
          if (i === res.totalPages) {
            this.toggleInfiniteScroll();
          }
          loader.dismiss();
        }, err => {
          loader.dismiss();
          this.util.createToast('Error getting Pending Orders', 'information-circle');
        });
    });
  }

  getConfirmedOrders(i) {
    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource
        .findOrderByStatusNameUsingGET({
          statusName: 'payment-processed',
          page: i,
          storeId: this.user.preferred_username,
          deliveryType: this.deliveryType
        })
        .subscribe(res => {
          res.content.forEach(data => this.confirmedOrders.push(data));
          i++;
          if (i === res.totalPages) {
            this.toggleInfiniteScroll();
          }
          loader.dismiss();
        }, err => {
          loader.dismiss();
          this.util.createToast('Error getting Confirmed Orders', 'information-circle');
        });
    });
  }


  getCompletedOrders(i) {
    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource
        .findOrderByStatusNameUsingGET({
          statusName: 'delivered',
          page: i,
          storeId: this.user.preferred_username,
          deliveryType: this.deliveryType
        })
        .subscribe(res => {
          res.content.forEach(data => this.completedOrders.push(data));
          i++;
          if (i === res.totalPages) {
            this.toggleInfiniteScroll();
          }
          loader.dismiss();
        }, err => {
          loader.dismiss();
          this.util.createToast('Error getting Completed Orders', 'information-circle');
        });
    });
  }
  getOrders(i, limit: boolean) {
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
      } else if (ev.detail.value === 'confirmed') {
        this.slides.slideTo(1);
      } else if (ev.detail.value === 'completed') {
        this.slides.slideTo(2);
      }
    } else {
      if (ev.detail.value === 'confirmed') {
        this.slides.slideTo(0);
      } else if (ev.detail.value === 'completed') {
        this.slides.slideTo(1);
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
  orderAccepted(order) {
    this.pendingOrders = this.pendingOrders.filter(
      po => po.orderId !== order.orderId
    );
  }
  orderCompleted(order) {
    this.confirmedOrders = this.confirmedOrders.filter(
      co => co.orderId !== order.orderId
    );
    this.completedOrders.push(order);
  }

  hidePending() {
    if (this.store.storeSettings.orderAcceptType === 'automatic') {
      this.showPending = false;
    }
  }

  refresh(event) {
    this.pendingOrders = [];
    this.confirmedOrders = [];
    this.completedOrders = [];
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  showFoo() {
    this.showFooter = !this.showFooter;
  }


}
