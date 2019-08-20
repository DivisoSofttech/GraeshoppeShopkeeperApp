import { Util } from 'src/app/services/util';
import { QueryResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/api/models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  loader: HTMLIonLoadingElement;

  IdpCode: string;
  //pageCount = 0;
  notifications: Notification[] = [];
  constructor(
    private modal: ModalController,
    private query: QueryResourceService,
    private storage: Storage,
    private util: Util
  ) { }
 
  ngOnInit() {
    this.storage.get('user').then(user => this.IdpCode = user.preferred_username);
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      this.loader.present();
      this.getNotifications(0);
    });
  }
   
  dismiss(){
    this.modal.dismiss();
  }

  getNotifications(i){
    this.query.findNotificationByReceiverIdUsingGET({receiverId: this.IdpCode})
        .subscribe(res => {
          res.content.forEach(data => this.notifications.push(data));
          console.log('notification',this.notifications);
          i++;
          if(i < res.totalPages) {
            this.getNotifications(i);  
          } else {
            this.loader.dismiss();
          }
        });
  }
}
