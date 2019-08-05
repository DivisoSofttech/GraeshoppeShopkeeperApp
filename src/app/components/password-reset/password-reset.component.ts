import { Component, OnInit } from '@angular/core';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'src/app/services/security/keycloak.service';
import { Storage } from '@ionic/storage';
import { Util } from 'src/app/services/util';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {

  user;
  oldPassword
  password;
  rePassword;


  passwordMatch = true;
  passwordValid = true;
  oldPasswordInvalid = false;
  buttonDisabled = true;

  constructor(
   private keycloak: KeycloakService,
   private storage: Storage,
   private util: Util
  ) { }

  ngOnInit() {
    this.storage.get('user')
    .then(user => {
      this.user = user;
    })
  }

  checkInputMatch() {
    if(this.password === this.rePassword) {
      this.passwordMatch = true;
      this.buttonDisabled = false;
    } else {
      this.passwordMatch= false;
      this.buttonDisabled = true;
    }
  }

  checkPasswordValid() {
    const regx = /^[A-Za-z]\w{7,14}$/;
    if(regx.test(this.password)) {
      console.log('true)');
      this.passwordValid = true;
      this.buttonDisabled = false;
    } else {
      console.log('false');
      this.passwordValid = false;
      this.buttonDisabled = true;
    }
  }

  updatePassword() {

    let changePasswordFunc = ()=>{
      this.keycloak.resetPassword(this.password,
        ()=>{alert('Password Updated');},
        ()=>{alert('Password Updation Failed');});
    }

    changePasswordFunc();
  }


}
