import { Storage } from '@ionic/storage';
import { OrderViewComponent } from './../order-view/order-view.component';
import { ModalController } from '@ionic/angular';
import {
  CommandResourceService,
  QueryResourceService
} from 'src/app/api/services';
import { CommandResource } from './../../api/models/command-resource';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, Product } from 'src/app/api/models';
import * as moment from 'moment/moment';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Util } from 'src/app/services/util';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Input() orderType: string;
  taskId: string;

  @Output() accept = new EventEmitter();
  @Output() completed = new EventEmitter();

  deliveryTime: string;
  user;
  constructor(
    private command: CommandResourceService,
    private modalController: ModalController,
    private file: File,
    private fileOpener: FileOpener,
    private queryResource: QueryResourceService,
    private util: Util,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage
        .get('user')
        .then(data => {
          this.user = data;
        });
  }

  completeOrder(order: Order) {
    this.util.createLoader().then(
      loader => {
        loader.present();
        this.command
          .markOrderAsDeliveredUsingPOST(order.orderId)
          .subscribe(data => {
            this.completed.emit();
            loader.dismiss();
          });
      }
    );
  }
  acceptOrder() {
    this.queryResource.getTaskDetailsUsingGET({
      taskName: 'Accept Order',
      orderId: this.order.orderId,
      storeId: this.user.preferred_username
    }).subscribe(openTask => {
      this.util.createLoader().then(
        loader => {
          loader.present();
          const date = new Date();
          this.deliveryTime = date.toISOString();
          const time: string = this.deliveryTime.slice(
        this.deliveryTime.indexOf('T') + 1,
        this.deliveryTime.indexOf('.')
      );
          const tempTime: string[] = time.split(':');
          const newTime = moment(date)
        .add(0, 'seconds')
        .add(tempTime[1], 'minutes')
        .add(tempTime[0], 'hours')
        .toISOString();
          console.log('task id', openTask.taskId);

          this.command
        .acceptOrderUsingPOST({
          taskId: openTask.taskId,
          approvalDetailsDTO: {
            acceptedAt: date.toISOString(),
            customerId: this.order.customerId,
            decision: 'accepted',
            orderId: this.order.orderId,
            expectedDelivery: newTime
          }
        })
        .subscribe(data => {
          this.accept.emit();
          this.util.createToast('Order Accepted', 'checkmark');
          loader.dismiss();
        }, err => {
          console.log(err);
          loader.dismiss();
        });
        }
      );
    });
  }
  
  async viewOrderViewModal(order) {
    const modal = await this.modalController.create({
      component: OrderViewComponent,
      componentProps: { order: this.order }
    });
    return await modal.present();
  }

  getOrderMaster() {
    if (this.orderType === 'confirmed') {
      this.util.createLoader().then(loader => {
        loader.present();
        this.queryResource.getOrderDocketUsingGET(this.order.orderId).subscribe(orderDocket => {
          console.log(orderDocket.pdf, orderDocket.contentType);
          const byteCharacters = atob(orderDocket.pdf);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: orderDocket.contentType });
          console.log('blob is' + blob);
          this.fileCreation(blob, orderDocket);
          loader.dismiss();
        }, err => {
          console.log(err);
          loader.dismiss();
          this.util.createToast('Error Loading Pdf', 'alert');
        });
      });
    }
  }
  fileCreation(blob, result) {
    const res = this.file.createFile(this.file.externalCacheDirectory, 'items.pdf', true);
    if (res !== undefined) {
        res
      .then(() => {
        console.log('file created' + blob);

        this.file
          .writeFile(this.file.externalCacheDirectory, 'items.pdf', blob, {
            replace: true
          })
          .then(value => {
            console.log('file writed' + value);
            this.fileOpener
              .showOpenWithDialog(
                this.file.externalCacheDirectory + 'items.pdf',
                result.contentType
              )
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e));
            // this.documentViewer.viewDocument(this.file.externalCacheDirectory + 'items.pdf', 'application/pdf',
            // {print: {enabled: true}, openWith: {enabled: true}});
          });
      });
  }
      }

}
