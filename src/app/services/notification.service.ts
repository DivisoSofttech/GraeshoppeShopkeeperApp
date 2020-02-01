import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {  Subscription } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { NotificationDTO } from '../api/models';
import { QueryResourceService } from '../api/services';
import { BehaviorSubject } from 'rxjs';
import { AudioServiceService } from './audio-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationCount = 0;
  connectSubscription: Subscription;
  notificationListenSubscription: Subscription;
  notificationBehaviouralSubject: BehaviorSubject<number> =  new BehaviorSubject(this.notificationCount);

  constructor(private socket: Socket,
              private localNotifications: LocalNotifications,
              private platform: Platform,
              private navCtrl: NavController,
              private queryResource: QueryResourceService,
              private audioService: AudioServiceService,
              private alertControll: AlertController) {
    this.socket.disconnect();
    this.onConnect().subscribe(data => {
      console.log('Socket has been connected successfully');
    });

  }

  connectToNotification() {
    console.log('Socket connected manually');
    this.socket.connect();
  }

  onConnect() {
     return this.socket.fromEvent('connect');
  }

  subscribeToMyNotifications(user) {
    this.getNoticationCount(user);
    console.log('Start listening to my notifications ', user);
    this.localNotifications.on('click').subscribe(event => {
      console.log('Notification clicked', event);
      this.navCtrl.navigateForward('order');
    });
    // this.localNotifications.on('accept').subscribe(event => {
    //   console.log('Accept clicked', event);

    // });
    // this.localNotifications.on('reject').subscribe(event => {
    //   console.log('Reject clicked', event);
    // });
    return this.socket
         .fromEvent(user).subscribe((notification: NotificationDTO) => {
           console.log('Notifications Are subscribing ........');
           this.notificationCount++;
           this.notificationBehaviouralSubject.next(this.notificationCount);
           console.log('Notification count is ', this.notificationCount);
           console.log('notification is ', notification);
           this.platform.ready().then(() => {
              this.localNotifications.schedule({
                title: notification.title,
                text: notification.message + '\nTracking ID is ' + notification.targetId,
                foreground: true,
                wakeup: true,
                lockscreen: true,
                sound: 'file://assets/beep.mp3',
                icon: 'file://assets/images/logo.png'
              //   actions: [
              //     { id: 'accept', title: 'Accept' },
              //     { id: 'reject',  title: 'Reject' }
              // ]
              });
              this.audioService.playSoundLoop('orderrequest');
              this.presentAlert(notification.message + '\nTracking ID is ' + notification.targetId, () => {
                console.log('OnDeny called sound is stopping');
                this.audioService.stopPlayingSound('orderrequest');
              });
            });
        });
  }

  async presentAlert(message: string, onDeny?: any) {
    const alert = await this.alertControll.create({
      message,
      animated: true,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
              if (onDeny) {
                onDeny();
              }
          }
      },
      ]
    });
    await alert.present();
  }

 getNoticationCount(user) {
      this.queryResource
        .getNotificationCountByReceiveridAndStatusUsingGET({
          status: 'unread',
          receiverId: user
        })
        .subscribe(num => {
          this.notificationCount = num;
          this.notificationBehaviouralSubject.next(num);
          console.log('not', num);

        });
  }

disconnectToMyNotifications() {
    console.log('Socket connection is disconnects');
    if (this.connectSubscription !== undefined) {
      this.connectSubscription.unsubscribe();
    }
    if (this.notificationListenSubscription !== undefined) {
      this.notificationListenSubscription.unsubscribe();
    }
    this.socket.disconnect();
  }

}
