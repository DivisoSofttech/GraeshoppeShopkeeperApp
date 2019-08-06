import { Component, OnInit } from '@angular/core';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'src/app/services/security/keycloak.service';
import { Storage } from '@ionic/storage';
import { Util } from 'src/app/services/util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {

  user;
  oldPassword;
  password;
  rePassword;


  passwordMatch = true;
  passwordValid = true;
  oldPasswordInvalid = false;
  buttonDisabled = true;

  loader: HTMLIonLoadingElement;

  constructor(
   private keycloak: KeycloakService,
   private storage: Storage,
   private util: Util,
   private navc: NavController
  ) { }

  ngOnInit() {
    this.storage.get('user')
    .then(user => {
      this.user = user;
    });
  }

  checkInputMatch() {
    if (this.password === this.rePassword) {
      this.passwordMatch = true;
      this.buttonDisabled = false;
    } else {
      this.passwordMatch = false;
      this.buttonDisabled = true;
    }
  }

  checkPasswordValid() {
    // const regx = /^[A-Za-z]\w{7,14}$/;
    // if (regx.test(this.password)) {
    //   console.log('true)');
    //   this.passwordValid = true;
    //   this.buttonDisabled = false;
    // } else {
    //   console.log('false');
    //   this.passwordValid = false;
    //   this.buttonDisabled = true;
    // }
    return true;
  }

  updatePassword() {

    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      if(this.oldPassword === undefined) {
        alert('Enter Old Password')
      } else {
        let changePasswordFunc = ()=>{
          this.keycloak.resetPassword(this.password,
            ()=>{this.loader.dismiss()
              .then(() =>{
                alert('Password Updated');
                this.navc.back();
              })},
            ()=>{this.loader.dismiss();alert('Password Updation Failed');});
        }
        this.loader.present();
        this.keycloak.authenticate({ username: this.user.preferred_username , password: this.oldPassword}, 
        ()=>{
          changePasswordFunc();
        },
        ()=>{
          this.loader.dismiss();
          alert('Invalid Old Password');
        });  
      }
    })
   
  }
}
