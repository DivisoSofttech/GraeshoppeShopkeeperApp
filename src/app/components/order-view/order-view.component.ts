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
  products: Product[];
  constructor(
    private modalController: ModalController,
    private queryService: QueryResourceService,
    private util: Util
  ) { }

  ngOnInit() {
    if (this.order.orderLines) {
      this.util.createLoader().then(loader => {
        this.order.orderLines.forEach(orderLine => {
          this.queryService.findProductByIdUsingGET(orderLine.productId).subscribe(res => {
            this.products.push(res);
          });
        });
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
