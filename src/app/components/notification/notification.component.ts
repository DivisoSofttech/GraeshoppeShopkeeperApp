import { OrderViewComponent } from './../order-view/order-view.component';
import { CommandResource } from './../../api/models/command-resource';
import { Util } from 'src/app/services/util';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { ModalController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Notification, NotificationDTO } from 'src/app/api/models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  loader: HTMLIonLoadingElement;
  // show = false;
  IdpCode: string;
  // pageCount = 0;
  notifications: Notification[] = [];
  notification: NotificationDTO;
  clickedNotification: Notification;

  order;

  constructor(
    private modal: ModalController,
    private query: QueryResourceService,
    private storage: Storage,
    private util: Util,
    private command: CommandResourceService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
    this.storage.get('user').then(user => {
      this.IdpCode = user.preferred_username;
      this.getNotifications(0);
    });
    this.loader = loader;
    this.loader.present();
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  async viewOrderViewModal(notification) {
    this.clickedNotification = notification;
    this.query.findOrderMasterByOrderIdUsingGET(this.clickedNotification.targetId).subscribe(async order => {
      console.log(order);
      if (notification.status === 'unread') {
        this.updateNotification(notification);
      }
      const modal = await this.modalController.create({
        component: OrderViewComponent,
        componentProps: { order }
      });
      return await modal.present();
    });
  }


  getNotifications(i) {
    this.query.findNotificationByReceiverIdUsingGET({receiverId: this.IdpCode, page: i})
        .subscribe(res => {
          console.log(this.IdpCode);

          res.content.forEach(data => this.notifications.push(data));
          console.log('notification', res.content);
          i++;
          if (i < res.totalPages) {
            this.getNotifications(i);
          } else {
            this.loader.dismiss();
          }
        });
  }
  updateNotification(notification: Notification) {
    const notificationDto: Notification = {
      id : notification.id,
      date: notification.date,
      image: notification.image,
      imageContentType: notification.imageContentType,
      message: notification.message,
      receiverId: notification.receiverId,
      status: 'read',
      targetId: notification.targetId,
      title: notification.title,
      type: notification.type
    };
    this.command.updateNotificationUsingPUT(notificationDto)
        .subscribe(notificationDto => {
          const index = this.notifications.indexOf(notification);
          this.notifications[index] = notificationDto;
        });
  }
}
