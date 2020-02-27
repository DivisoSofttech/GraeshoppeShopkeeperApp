import { OrderMaster } from './../../api/models/order-master';
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
import { Order, Customer, Product } from 'src/app/api/models';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Util } from 'src/app/services/util';

import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import moment from 'moment';

declare var sunmiInnerPrinter: any;
declare var Socket: any;

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: OrderMaster;
  @Input() orderType: string;
  @Input() color: string;
  taskId: string;
  customer: Customer;

  count = 0;

  font;

  @Output() accept = new EventEmitter();
  @Output() completed = new EventEmitter();

  deliveryTime: string;
  user;
  requiredPhoneVerification = false;

  header;
  content;
  products;
  discountTotal;
  paymentStatus;
  customerOrderDetail;
  attention;
  customerDetail;
  footer;
  orderTimes;

  expecteddeliveryTime = 20;

   // products: Product[] = [];
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
      });
  }

  completeOrder() {
    this.util.createLoader().then(
      loader => {
        loader.present();
        this.command
          .markOrderAsDeliveredUsingPOST(this.order.orderNumber)
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
        if (this.deliveryTime) {
          this.acceptOrder();
        }
      });
    } else {
      this.acceptOrder();
    }
  }

  acceptOrder() {
    this.util.createLoader().then(loader => {
      loader.present();
      const date = new Date();
      const newTime = moment(date)
        .add(0, 'seconds')
        .add(this.expecteddeliveryTime, 'minutes')
        .toISOString();

      this.command
          .acceptOrderUsingPOST({
            taskId: this.order.nextTaskId,
            approvalDetailsDTO: {
              acceptedAt: date.toISOString(),
              decision: 'accepted',
              orderId: this.order.orderNumber,
              expectedDelivery: newTime
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

  alterTime(type) {
    if (type === 0) {
      if (this.expecteddeliveryTime < 180) {
        this.expecteddeliveryTime++;
      }
    } else {
      if (this.expecteddeliveryTime > 0) {
        this.expecteddeliveryTime--;
      }
    }
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
        this.queryResource.getOrderDocketUsingGET(this.order.orderNumber).subscribe(orderDocket => {
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
    console.log('count === ' + this.count);
    if (this.count === 9) {
      const encoder = new EscPosEncoder();
      const result = encoder
        .initialize()
        .bold()
        .align('center')
        .newline()
        .text(this.header)
        .newline()
        .text(this.content)
        .newline()
        .text(this.products)
        .newline()
        .text(this.discountTotal)
        .newline()
        .text(this.paymentStatus)
        .newline()
        .text(this.customerOrderDetail)
        .newline();

      if (this.order.methodOfOrder !== 'COLLECTION') {
          result
          .text(this.customerDetail)
          .newline();
          // .align('center');
      }
      if (this.order.loyaltyPoint === 1) {
        result.text(this.attention)
        .newline();
      }

      result
        .text(this.orderTimes)
        .newline();

      const data = result
        .text(this.footer)
        .newline()
        .encode();
      const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
      try {
          sunmiInnerPrinter.sendRAWData(base64String, succes => {
            sunmiInnerPrinter.cutPaper();
            this.count = 0;
          }, error => {
            console.log(error);
            this.count = 0;
          });

      } catch (err) {
        console.error(err);
        this.count = 0;
      }
    }
    }

  getDocketData() {
    this.queryResource.getDocketHeaderUsingGET(this.order.orderNumber).subscribe(header => {
      this.header = header;
      this.count++;
      this.print();
    });
    this.queryResource.getDocketContentUsingGET(this.order.orderNumber).subscribe(content => {
      this.content = content;
      this.count++;
      this.print();
    });
    this.queryResource.getProductUsingGET(this.order.orderNumber).subscribe(products => {
      this.products = products;
      this.count++;
      this.print();
    });
    this.queryResource.getDiscountAndTotalUsingGET(this.order.orderNumber).subscribe(discountTotal => {
      this.discountTotal = discountTotal;
      this.count++;
      this.print();
    });
    this.queryResource.getPaymentStatusForDocketUsingGET(this.order.orderNumber).subscribe(paymentStatus => {
      this.paymentStatus = paymentStatus;
      this.count++;
      this.print();
    });
    this.queryResource.getCustomerOrderDetailsUsingGET(this.order.orderNumber).subscribe(customerOrderDetail => {
      this.customerOrderDetail = customerOrderDetail;
      this.count++;
      this.print();
    });
    this.queryResource.getAttentionForFirstOrderUsingGET(this.order.orderNumber).subscribe(attention => {
      this.attention = attention;
      this.count++;
      this.print();
    });
    this.queryResource.getCustomerDetailsUsingGET(this.order.orderNumber).subscribe(customerDetail => {
      this.customerDetail = customerDetail;
      this.count++;
      this.print();
    });
    this.queryResource.getFooterUsingGET(this.order.orderNumber).subscribe(footer => {
      this.footer = footer;
      this.count++;
      this.print();
    });
    this.queryResource.getOrderTimesUsingGET(this.order.orderNumber).subscribe(orderTimes => {
      this.orderTimes = orderTimes;
      this.count++;
      console.log(this.orderTimes);
      this.print();
    });
  }

}
