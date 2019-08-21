import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {

  constructor(
    private file: File,
    private fileOpener: FileOpener,
    public toastController: ToastController,
    private queryResource: QueryResourceService,
    private platform: Platform,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  
async openNotificationModal() {
  const modal = await this.modalController.create({
    component: NotificationComponent,
    cssClass: 'half-height'
  });
  return await modal.present();
}

}
