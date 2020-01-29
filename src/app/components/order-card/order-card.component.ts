import { formatDate } from '@angular/common';
import EscPosEncoder from 'esc-pos-encoder';
import { ExpectedDeliveryComponent } from './../expected-delivery/expected-delivery.component';
import { OrderViewComponent } from './../order-view/order-view.component';
import { Storage } from '@ionic/storage';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import {
  CommandResourceService,
  QueryResourceService
} from 'src/app/api/services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order , Customer } from 'src/app/api/models';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Util } from 'src/app/services/util';

import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

declare var sunmiInnerPrinter: any;
declare var Socket: any;

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

  font;

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
            this.util.createToast('Order marked as delivered', 'checkmark');
          }, err => {
            loader.dismiss();
            this.util.createToast('Error while mark order as delivered', 'alert');
          });
      }
    );
  }

  routeAcceptOrder() {
    console.log(this.order.preOrderDate);
    if (!this.order.preOrderDate) {
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
      if (this.order.preOrderDate) {
          this.deliveryTime = this.order.preOrderDate;
        }
      const date = new Date();
        // const time: string = this.deliveryTime.slice(
        //   this.deliveryTime.indexOf('T') + 1,
        //   this.deliveryTime.indexOf('.'));
        // const tempTime: string[] = time.split(':');
        // const newTime = moment(date)
        //   .add(0, 'seconds')
        //   .add(tempTime[1], 'minutes')
        //   .add(tempTime[0], 'hours')
        //   .toISOString();
        // console.log('new time', newTime);
        // console.log('task id', openTask.taskId);

      this.command
          .acceptOrderUsingPOST({
            taskId: this.order.acceptOrderId,
            approvalDetailsDTO: {
              acceptedAt: date.toISOString(),
              decision: 'accepted',
              orderId: this.order.orderId,
              // expectedDelivery: newTime
              expectedDelivery: null
            }
          })
          .subscribe(data => {
            this.accept.emit();
            loader.dismiss();
            this.util.createToast('Order Accepted', 'checkmark');
          }, err => {
            loader.dismiss();
            this.util.createToast('Error while Accepting order', 'alert');
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

  async print() {
    const encoder = new EscPosEncoder();
    const result = encoder
      .initialize()
      .size('normal')
      .align('center')
      .bold(true)
      .text(this.order.storeId)
      .underline()
      .underline()
      .newline()
      .text('==========================')
      .bold()
      .newline()
      .text(this.order.deliveryInfo.deliveryType)
      .newline()
      .text('Due  ' + formatDate(this.order.date, 'yyyy-MM-dd', 'en') + ' ASAP / ' + formatDate(this.order.date, 'HH:mm:a', 'en'))
      .encode();

    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));

    try {
      await sunmiInnerPrinter.setFontSize(40, () => {
        sunmiInnerPrinter.sendRAWData(base64String, succes => {
          // sunmiInnerPrinter.cutPaper();
        }, error => {
          console.log(error);
        });
      });
      
    } catch (err) {
      console.error(err);
    }
  }

}
