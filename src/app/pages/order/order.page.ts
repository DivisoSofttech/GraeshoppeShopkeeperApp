import { Component, OnInit } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user;

  constructor(
    private queryResource: QueryResourceService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user')
    .then((data) =>{
      this.user = data;
      this.getOrders();
     });
  }

  getOrders() {
    this.queryResource.findOrderLineByStoreIdUsingGET({
      storeId: this.user.preffered_username
    })
  }



}
