import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { Util } from './../../services/util';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Order, Store, OpenTask } from 'src/app/api/models';
import { IonInfiniteScroll, IonSlides, ActionSheetController, ModalController } from '@ionic/angular';
import { OrderViewComponent } from 'src/app/components/order-view/order-view.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  store: Store;
  user;
  tasks: OpenTask[] =[];
  loader: HTMLIonLoadingElement;
  orders: Order[] = [{
    orderId: '78',
    customerId: '564654',
    deliveryInfo: {
      startingTime : '12.30Am',
      deliveryAddress: {
        addressLine1 : '1/123,pathiripala'
      }
    },
    paymentRef: 'cash'


  }];
  pendingOrders: Order[] = [];
  confirmedOrders: Order[] = [];
  completedOrders: Order[] = [];

  currentPage = 'pending';
  pageCount = 0;

  @ViewChild(IonInfiniteScroll, null) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild('slides', null) slides: IonSlides;
  notificationCount: any;
  constructor(
    private queryResource: QueryResourceService,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private file: File, private fileOpener: FileOpener,
    private util: Util,
    private command: CommandResourceService
  ) { }

  ngOnInit() {
    this.storage.get('user')
    .then((data) => {
      this.user = data;
      this.queryResource.findStoreByRegNoUsingGET(data.preferred_username)
          .subscribe(store =>{
            this.store = store; 
            this.getNoticationCount();        
            if(store.storeSettings.orderAcceptType!='automatic'){
              this.getPendingOrders();
            }
            this.getConfirmedOrders(0);
            this.getCompletedOrders(0);
            if(store.storeSettings.orderAcceptType=='automatic'){
              this.slides.slideTo(1);
            }
          })
     
     });
  }
  async filterActionsheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter',
      cssClass: 'action-sheets',
      buttons: [{
        text: 'Collection',
        cssClass: 'action-sheets',
        handler: () => {
          console.log('Collection clicked');
        }
      }, {
        text: 'Delivery',
        handler: () => {
          console.log('Delivery clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  getPendingOrders() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
    });
   
    this.queryResource.getOpenTasksUsingGET({
      assignee: this.user.preferred_username,
      name: 'Accept Order'
    }).subscribe(listOfTasks => {
      
      listOfTasks.forEach( opentask =>{
        this.tasks.push(opentask);
        this.queryResource.findOrderByOrderIdUsingGET(opentask.orderId)
            .subscribe(order => this.pendingOrders.push(order));
      });
      this.loader.dismiss();
    });
  }
  getConfirmedOrders(i){
    this.queryResource.findOrderByStatusNameUsingGET({statusName: 'payment-processed',page: i ,storeId: this.user.preferred_username})
        .subscribe(res => {
          res.content.forEach(data => this.confirmedOrders.push(data));
          i++;
          if(i < res.totalPages){
            this.getConfirmedOrders(i);
          }
        })
  }

  getCompletedOrders(i){
    this.queryResource.findOrderByStatusNameUsingGET({statusName: 'delivered',page: i,storeId: this.user.preferred_username})
        .subscribe(res =>{
          res.content.forEach(data => this.completedOrders.push(data));
          i++;
          if(i<res.totalPages){
            this.getCompletedOrders(i);
          }
        })
  }
  getOrders(i , limit: boolean) {
    this.queryResource.findOrderLineByStoreIdUsingGET({
      storeId: this.user.preferred_username,
      page: i
    }).subscribe(porders => {
      porders.content.forEach(o => {
        this.orders.push(o);
      });

      i++;

      if (limit === false) {
        // Load All Pages Recursively
        if (i < porders.totalPages) {
          this.getOrders(i , limit);
        }
      }

      if (i === porders.totalPages) {

        // Disable infinite Scroll
        console.log('All Pages Retrieved PageCount' , porders.totalPages);
        this.toggleInfiniteScroll();
      }
    });
  }

  toggleInfiniteScroll() {
    this.ionInfiniteScroll.disabled = !this.ionInfiniteScroll.disabled;
  }

  loadMoreOrders() {

    this.pageCount++;
    this.getOrders(this.pageCount , true);
  }

  segmentChange(ev) {
    if (ev.detail.value === 'pending') {
      this.slides.slideTo(0);
    } else if (ev.detail.value === 'confirmed') {
      this.slides.slideTo(1);
    } else if (ev.detail.value === 'completed') {
    this.slides.slideTo(2);
    }
  }
  slideChange() {
    let index: any;
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
    }

    getOrderMaster(orderId,statusName) {
      console.log(orderId);
      this.queryResource.findOrderMasterByOrderIdUsingGET({orderId: orderId,status: statusName}).subscribe(
        orderMaster => {
          this.queryResource.getOrderDocketUsingGET(orderMaster.id).subscribe(
            orderDocket => {
              console.log(orderDocket.pdf, orderDocket.contentType);
              const byteCharacters = atob(orderDocket.pdf);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: orderDocket.contentType });
              console.log('blob is' + blob);
              this.fileCreation(blob, orderDocket);
            }
          );
        }
      );
    }
    fileCreation(blob, result) {
      this.file
      .createFile(this.file.externalCacheDirectory, 'items.pdf', true)
      .then(() => {
        console.log('file created' + blob);

        this.file
          .writeFile(this.file.externalCacheDirectory, 'items.pdf', blob, {
            replace: true
          })
          .then(value => {
            console.log('file writed' + value);
            this.fileOpener
              .showOpenWithDialog(
                this.file.externalCacheDirectory + 'items.pdf',
                result.contentType
              )
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e));
            // this.documentViewer.viewDocument(this.file.externalCacheDirectory + 'items.pdf', 'application/pdf',
            // {print: {enabled: true}, openWith: {enabled: true}});
          });
      });
    }
    async openNotificationModal() {
      const modal = await this.modalController.create({
        component: NotificationComponent,
        cssClass: 'half-height'
      });
      return await modal.present();
    }
    getNoticationCount(){
      this.storage.get('user').then(user => {
        this.queryResource.getNotificationCountByReceiveridAndStatusUsingGET({status:'unread',receiverId: user.preferred_username})
            .subscribe(num => this.notificationCount=num);
      });
    }
    orderAccepted(order){
      this.pendingOrders = this.pendingOrders.filter(po => po.orderId != order.orderId);
    }
    orderCompleted(order){
      this.confirmedOrders = this.pendingOrders.filter(co => co.orderId != order.orderId);
    }

}
