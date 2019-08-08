import { Component, OnInit } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { Order } from 'src/app/api/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user;

  orders: Order[] = [];

  pageCount = 0;

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

  }

  loadMoreOrders() {
    this.pageCount++;
    this.getOrders(this.pageCount , true);
  }



}
