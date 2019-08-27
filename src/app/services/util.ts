import { KeycloakService } from 'src/app/services/security/keycloak.service';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class Util {

    constructor(
        private loadingController: LoadingController,
        private toastController: ToastController,
        private navController: NavController,
        private storage: Storage,
        private alertCtrl: AlertController,
        //private keycloakService: KeycloakService
    ) { }

    async createLoader() {

        return await this.loadingController.create({
            spinner: 'bubbles'
        });
    }

    createToast(msg: string, iconName?: string) {
        this.toastController.create({
            message: msg,
            duration: 2000,
            color: 'dark',
            position: 'bottom',
            showCloseButton: true,
            keyboardClose: true,
            buttons: [
                {
                    side: 'start',
                    icon: iconName !== undefined ? iconName : 'information-circle-outline',
                }]
        }).then(data => {
            data.present();
        });
    }

    navigateRoot() {
        this.navController.navigateRoot('');
    }


    navigateToLogin() {
        this.navController.navigateRoot('login');
    }

    // getUsername(): any {
    //     this.keycloakService.getCurrentUserDetails().then(user =>{
    //         this.storage.set('user', user);
    //         return user
    //     });
    // }

    async createAlert(header: string, message: string, onConfirm?: any, onDeny?: any) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons : [
                {
                    text: 'Cancel',
                    handler: () => {
                        if (onDeny) {
                            onDeny();
                        }
                    }
                },
                {
                    text: 'Okay',
                    handler: () => {
                        if (onConfirm) {
                            onConfirm();
                        }
                    }
                }
            ]
        });
        await alert.present();
    }


}
