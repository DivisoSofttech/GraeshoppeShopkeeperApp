import { OrderViewComponent } from './../order-view/order-view.component';
import { ModalController } from '@ionic/angular';
import { CommandResourceService } from 'src/app/api/services';
import { CommandResource } from './../../api/models/command-resource';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/api/models';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Input() orderType: string;
  deliveryTime: string;
  constructor(
    private command: CommandResourceService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    let date = new Date();
    let expectedDelivery: string;
    expectedDelivery = date.toISOString().slice(date.toISOString().indexOf('T')+1,date.toISOString().indexOf('.'));
    let time: string[] = expectedDelivery.split(':');
    let a = moment(date)
    .add(1, 'seconds')
    .add(10, 'minutes')
    .add(1, 'hours')
    .toISOString();
    console.log('old',date.toISOString());
    
    console.log('new',a);

    //new Date(date.getTime() +  expectedDelivery*60000)
    
  }

  acceptOrder(){
    let date = new Date()
    
    this.command.acceptOrderUsingPOST({taskId: 'payment-processed',approvalDetailsDTO:{
      acceptedAt: date.toISOString(),
      customerId: this.order.customerId,
      decision: 'accepted',
      orderId: this.order.orderId,

    }}).subscribe();
  }
  async viewOrderViewModal(order) {
    const modal = await this.modalController.create({
      component: OrderViewComponent,
      componentProps: {order}
    });
    return await modal.present();
   }

}
