import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { ReportSummary } from 'src/app/api/models';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  notificationCount: number;

  user;

  date: string;

  orderSummary: ReportSummary = {};

  constructor(

    private queryResource: QueryResourceService,
    private modalController: ModalController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.storage.get('user').then(user => {
      this.user = user;
      this.getNoticationCount();
      this.getOrderSummary();
    })
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
      .subscribe(num => this.notificationCount = num);
  }

  getOrderSummary() {
    this.queryResource.createReportSummaryUsingGET({ storeId: this.user.preferred_username, date: this.date }).subscribe(orderSummary => {
      this.orderSummary = orderSummary;
      console.log('date', this.date);
      console.log('summary', this.orderSummary);
    }, err => {
      console.log(err);

      console.log('date', this.date);
      console.log('summary', this.orderSummary);
    })
  }
  
  dateSelected(){
    this.date = this.date.slice(0,this.date.indexOf('T'));
    this.getOrderSummary();
  }
  
}
