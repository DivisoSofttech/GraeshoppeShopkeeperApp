import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Order } from 'src/app/api/models';
import { IonInfiniteScroll, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user;

  orders: Order[] = [];
  currentPage = 'delivery';
  pageCount = 0;

  @ViewChild(IonInfiniteScroll,null) ionInfiniteScroll: IonInfiniteScroll;
  @ViewChild('slides',null) slides: IonSlides;
  constructor(
    private queryResource: QueryResourceService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user')
    .then((data) => {
      this.user = data;
      this.getOrders(0 , true);
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
    if (ev.detail.value === 'delivery') {
      this.slides.slideTo(0);
    } else if (ev.detail.value === 'collections') {
      this.slides.slideTo(1);
    }
  }
  slideChange() {
    let index: any;
    this.slides.getActiveIndex().then(num => {
      index = num;
      if (index === 0) {
        this.currentPage = 'delivery';
      } else if (index === 1) {
        this.currentPage = 'collections';
      }   
     });
    }

}
