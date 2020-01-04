import { ExpectedDeliveryComponent } from './../expected-delivery/expected-delivery.component';
import { OrderViewComponent } from './../order-view/order-view.component';
import { Storage } from '@ionic/storage';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import {
  CommandResourceService,
  QueryResourceService
} from 'src/app/api/services';
import { CommandResource } from './../../api/models/command-resource';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, Product, Customer } from 'src/app/api/models';
import * as moment from 'moment/moment';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Util } from 'src/app/services/util';

import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

//declare var sunmiInnerPrinter: any;
@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Input() orderType: string;
  taskId: string;
  customer: Customer;

  @Output() accept = new EventEmitter();
  @Output() completed = new EventEmitter();

  deliveryTime: string;
  user;
  requiredPhoneVerification = false;
  constructor(
    private command: CommandResourceService,
    private modalController: ModalController,
    private file: File,
    private fileOpener: FileOpener,
    private queryResource: QueryResourceService,
    private util: Util,
    private storage: Storage,
    private printer: Printer,
    private platform: Platform,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.storage
      .get('user')
      .then(data => {
        this.user = data;
        // tslint:disable-next-line: max-line-length
        if (this.order.status.name === 'unapproved' || this.order.status.name === 'approved' || this.order.status.name === 'payment-processed') {
          console.log('Checking the order count ', this.order.status.name);
          // tslint:disable-next-line: max-line-length
          this.queryResource.orderCountByCustomerIdAndStoreIdUsingGET({ storeId: data.preferred_username, customerId: this.order.customerId })
            .subscribe(ordercount => {
              console.log('Order count is ', ordercount);
              if (ordercount === 1) {
                console.log('call enable set to true');
                this.requiredPhoneVerification = true;
              }
            });
        }
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

  routeAcceptOrder() {
    console.log(this.order.preOrderTime);
    if (!this.order.preOrderTime) {
      this.expectedTimePopover((data) => {
        this.deliveryTime = data;
        console.log(this.deliveryTime);
        this.acceptOrder();
      });
    } else {
      this.acceptOrder();
    }
  }

  acceptOrder() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource.getTaskDetailsUsingGET({
        storeId: this.user.preferred_username,
        taskName: 'Accept Order',
        orderId: this.order.orderId
      }).subscribe(openTask => {
        if (this.order.preOrderTime) {
          this.deliveryTime = this.order.preOrderTime;
        }
        const date = new Date();
        const time: string = this.deliveryTime.slice(
          this.deliveryTime.indexOf('T') + 1,
          this.deliveryTime.indexOf('.'));
        const tempTime: string[] = time.split(':');
        const newTime = moment(date)
          .add(0, 'seconds')
          .add(tempTime[1], 'minutes')
          .add(tempTime[0], 'hours')
          .toISOString();
        console.log('new time', newTime);
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
            loader.dismiss();
            this.util.createToast('Order Accepted', 'checkmark');
          }, err => {
            loader.dismiss();
            console.log(err);
          });
      },
      err => {
        loader.dismiss();
        console.log(err);
      });
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
          if (this.platform.is('android')) {
            console.log('platform is android***********');
            this.fileCreation(blob, orderDocket);
          } else {
            console.log('platform is browser***********');
            const pdfResult = orderDocket.pdf;
            const dataURI = 'data:application/pdf;base64,' + pdfResult;
            const win = window.open();
            win.document.write('<iframe src="' + dataURI  + '"  style="position: absolute; height: 100%; border: none " ></iframe>');
          }
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
            const options: PrintOptions = {
              name: 'MyDocument'
            };
            this.printer.print(this.file.externalCacheDirectory + 'items.pdf', options).then(_ => {
              console.log('printing', _);
            }).catch(e => console.log('pdf error' , e));
            // this.fileOpener
            //   .showOpenWithDialog(
            //     this.file.externalCacheDirectory + 'items.pdf',
            //     result.contentType
            //   )
            //   .then(() => console.log('Filblobe is opened'))
            //   .catch(e => console.log('Error opening file', e));
            // this.documentViewer.viewDocument(this.file.externalCacheDirectory + 'items.pdf', 'application/pdf',
            // {print: {enabled: true}, openWith: {enabled: true}});
          });
      });
  }
}

async expectedTimePopover(callback?) {
  const popover = await this.popoverController.create({
    component: ExpectedDeliveryComponent,
    translucent: false,
    backdropDismiss: false
  });

  popover.onDidDismiss()
    .then((data) => {
      callback(data.data);
    });
  await popover.present();
}
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ReceiptPage');
  // }
  // print() {
  //   this.queryResource.getOrderDocketUsingGET(this.order.orderId).subscribe(orderDocket => {
  //     try {
  //       sunmiInnerPrinter.printBitmap('data:' + orderDocket.contentType + ';base64,' + orderDocket.pdf, 50, 50);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   });
  // }

}
