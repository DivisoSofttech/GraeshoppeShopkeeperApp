import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  notificationCount: number;

  constructor(
    
    private queryResource: QueryResourceService,
    private modalController: ModalController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.getNoticationCount();
  }

  
async openNotificationModal() {
  const modal = await this.modalController.create({
    component: NotificationComponent,
    cssClass: 'half-height'
  });
  return await modal.present();
}

getNoticationCount(){
  this.storage.get('user').then(user => {
    this.queryResource.getNotificationCountByReceiveridAndStatusUsingGET({status:'unread',receiverId: user.preferred_username})
        .subscribe(num => this.notificationCount=num);
  });
}
}
