import { Injectable } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class Util {

    constructor(
        private loadingController: LoadingController,
        private toastController: ToastController,
        private navController: NavController,
        private routes: Router
    ) {}

    async createLoader() {

        return await this.loadingController.create({
            spinner: 'bubbles'
        });
    }

    createToast(msg: string) {
     this.toastController.create({
            message: msg ,
            duration: 2000,
            color: 'dark',
            position: 'bottom',
            showCloseButton : true,
            keyboardClose: true,
            buttons: [
              {
                side: 'start',
                icon: 'warning',
              }]
          }).then(data => {
              data.present();
          });
    }

    navigateRoot() {
        this.navController.navigateForward('');
    }

}
