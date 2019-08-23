import { OrderViewComponent } from './../order-view/order-view.component';
import { ModalController } from '@ionic/angular';
import { CommandResourceService } from 'src/app/api/services';
import { CommandResource } from './../../api/models/command-resource';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() taskId: string;

  @Output() accept = new EventEmitter();
  @Output() completed = new EventEmitter();

  deliveryTime: string;
  constructor(
    private command: CommandResourceService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  
  }
  completeOrder(order: Order){
    this.command.markOrderAsDeliveredUsingPOST(order.orderId).subscribe(data => this.completed.emit());
  }
  acceptOrder(){
    let date = new Date()
    this.deliveryTime = date.toISOString()
    let time: string = this.deliveryTime.slice(this.deliveryTime.indexOf('T')+1,this.deliveryTime.indexOf('.'));
    let tempTime: string[] = time.split(':');
    let newTime = moment(date)
    .add(0, 'seconds')
    .add(tempTime[1], 'minutes')
    .add(tempTime[0], 'hours')
    .toISOString();
    console.log('task id',this.taskId);
    
    this.command.acceptOrderUsingPOST({taskId: this.taskId ,approvalDetailsDTO:{
      acceptedAt: date.toISOString(),
      customerId: this.order.customerId,
      decision: 'accepted',
      orderId: this.order.orderId,
      expectedDelivery: newTime
    }}).subscribe(data => {
      this.accept.emit();
    });
  }
  async viewOrderViewModal(order) {
    if (this.orderType === 'pending') {
      const modal = await this.modalController.create({
        component: OrderViewComponent,
        componentProps: {order}
      });
      return await modal.present();
    } else {
      return;
    }
   }

}
