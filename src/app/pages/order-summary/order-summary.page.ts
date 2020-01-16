import { Util } from './../../services/util';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { ReportSummary } from 'src/app/api/models';
import { Printer , PrintOptions} from '@ionic-native/printer/ngx';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  notificationCount: number;

  user;

  fromDate: string;
  toDate: string;

  orderSummary: ReportSummary = {};

  constructor(

    private queryResource: QueryResourceService,
    private modalController: ModalController,
    private storage: Storage,
    private file: File,
    private fileOpener: FileOpener,
    private util: Util,
    private printer: Printer
  ) { }

  ngOnInit() {
    this.fromDate = formatDate(new Date().setDate( new Date().getDate() - 1 ), 'yyyy-MM-dd', 'en');
    this.toDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.storage.get('user').then(user => {
      this.user = user;
      this.getNoticationCount();
      this.getOrderSummary();
    });
  }


  async openNotificationModal() {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'half-height'
    });
    return await modal.present();
  }

  getNoticationCount() {
    this.queryResource.getNotificationCountByReceiveridAndStatusUsingGET({ status: 'unread', receiverId: this.user.preferred_username })
      .subscribe(num => this.notificationCount = num,
        err => {
          console.log('error getting notificationCount ', err);
        });
  }

  getOrderSummary() {
    this.queryResource.findStoreByRegNoUsingGET(this.user.preferred_username).subscribe(store => {
      this.queryResource.createReportSummaryUsingGET({
        storeName: this.user.preferred_username, fromDate: this.fromDate , toDate: this.toDate
      }).subscribe(orderSummary => {
        this.orderSummary = orderSummary;
        console.log('summary', this.orderSummary);
      }, err => {
        console.log('error getting summary ', err);
      });
    },
    err => {
      console.log('error getting store  ', err);
    });
  }

  dateSelected() {
    console.log('date', this.fromDate);
    if (this.fromDate.length > 12) {
      this.fromDate = this.fromDate.slice(0, this.fromDate.indexOf('T'));
    }
    if (this.toDate.length > 12) {
      this.toDate = this.toDate.slice(0, this.toDate.indexOf('T'));
    }
    this.getOrderSummary();
  }

  getOrderSummaryPdf() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResource.getOrderSummaryUsingGET({
        storeName: this.user.preferred_username,
        fromDate: this.fromDate,
        toDate: this.toDate
      }).subscribe(orderDocket => {
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
        console.log('error geting order summary', err);
        loader.dismiss();
        this.util.createToast('Error Loading Pdf', 'alert');
      });
    });
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
            this.printer.print(this.file.externalCacheDirectory + 'items.pdf', options).then();
            // this.fileOpener
            //   .showOpenWithDialog(
            //     this.file.externalCacheDirectory + 'items.pdf',
            //     result.contentType
            //   )
            //   .then(() => console.log('File is opened'))
            //   .catch(e => console.log('Error opening file', e));
            // this.documentViewer.viewDocument(this.file.externalCacheDirectory + 'items.pdf', 'application/pdf',
            // {print: {enabled: true}, openWith: {enabled: true}});
          });
      });
  }
      }

}
