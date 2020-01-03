import { Util } from './../../services/util';
import { QueryResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Order, Product } from 'src/app/api/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {

  order: Order = {};

  products = [];
  auxilaries = [];
  comboLineItems = [];

  constructor(
    private modalController: ModalController,
    private queryService: QueryResourceService,
    private util: Util
  ) { }

  ngOnInit() {
    console.error(this.order);
    this.findAllorderLines();
  }

  findAllorderLines() {
    this.queryService.findOrderLinesByOrderNumberUsingGET(this.order.orderId).subscribe(orderLines => {
      this.order.orderLines = orderLines;
      console.log('orderLines' , orderLines);
    });
  }
  
  dismiss() {
    this.modalController.dismiss();
  }
}
