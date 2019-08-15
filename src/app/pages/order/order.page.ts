import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Order } from 'src/app/api/models';
import { IonInfiniteScroll, IonSlides, ActionSheetController, ModalController } from '@ionic/angular';
import { OrderViewComponent } from 'src/app/components/order-view/order-view.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user;

  orders: Order[] = [{
    customerId: '564654',
    
  }];
  pendingOrders: Order[] = [];

  currentPage = 'pending';
  pageCount = 0;

  @ViewChild(IonInfiniteScroll,null) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild('slides',null) slides: IonSlides;
  constructor(
    private queryResource: QueryResourceService,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.storage.get('user')
    .then((data) => {
      this.user = data;
      this.getOrders(0 , true);
      this.getPendingOrders();
     });
  }
  async viewOrderViewModal(order){
    const modal = await this.modalController.create({
      component: OrderViewComponent,
      componentProps: {order: order}
    });
    return await modal.present();
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
  getPendingOrders(){
        this.queryResource.getTasksUsingGET({
          assignee: 'sulthan',
          name:'',
          nameLike:'',
          assigneeLike:'',
          candidateGroup:'',
          candidateGroups:'',
          candidateUser:'',
          createdAfter:'',
          createdBefore:'',
          createdOn:''
        }).subscribe(orders => {
          this.pendingOrders = orders;
          console.log("pending orders",orders);
          
        });

      
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

}
