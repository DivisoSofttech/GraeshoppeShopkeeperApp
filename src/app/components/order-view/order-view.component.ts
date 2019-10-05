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
  products = {};
  auxilaries = {};
  combolineItems = {};

  constructor(
    private modalController: ModalController,
    private queryService: QueryResourceService,
    private util: Util
  ) { }

  ngOnInit() {
    console.log('sjsjhsjhs');
    if (this.order) {
      this.util.createLoader().then(loader => {
       this.queryService.findOrderMasterByOrderIdUsingGET(this.order.orderId)
       .subscribe(data => {
         console.log('Data ' , data);
        this.order.orderLines.forEach(orderLine => {
          this.queryService.findProductByIdUsingGET(orderLine.productId).subscribe(res => {
            console.log(res);
            this.products[orderLine.productId] = res;
            this.auxilaries[orderLine.productId] = [];
            this.combolineItems[orderLine.productId] = [];
          });
        });           
       },err=> {
         console.error('Unable to fetch Order Master');
       })
      });
    }
  }

  getAuxilaries(product) {

  }

  getCombolineItems(product) {

  }

  dismiss() {
    this.modalController.dismiss();
  }
}
