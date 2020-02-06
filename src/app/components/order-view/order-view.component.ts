import { OrderMaster } from './../../api/models/order-master';
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

  order: OrderMaster = {};


  products = [];
  auxilaries = [];
  comboLineItems = [];

  discount = 0;

  constructor(
    private modalController: ModalController,
    private queryService: QueryResourceService,
    private util: Util
  ) { }

  ngOnInit() {
    console.error(this.order);
    this.findAllorderLines();
    this.findAllofferLines();
  }

  findAllorderLines() {
    this.queryService.findOrderLinesByOrderNumberUsingGET(this.order.orderNumber).subscribe(orderLines => {
      this.order.orderLines = orderLines;
    });
  }

  findAllofferLines() {
    this.queryService.findOfferLineByOrderNumberUsingGET(this.order.orderNumber).subscribe(offers => {
      this.order.offerLines = offers;
      console.log(offers);
      offers.forEach(o => {
        this.discount = this.discount + o.discountAmount;
      })
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
