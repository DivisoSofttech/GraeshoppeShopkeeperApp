import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommandResourceService } from '../../api/services/command-resource.service';
import { Util } from './../../services/util';
import { StoreDTO } from './../../api/models/store-dto';
import { KeycloakService } from './../../services/security/keycloak.service';
import { IonSlides, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from '../../api/services/query-resource.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.page.html',
  styleUrls: ['./login-signup.page.scss']
})
export class LoginSignupPage implements OnInit {
  username = '';
  password = '';
  email = '';
  loginTab = true;
  value = 'login';
  phone: number;
  showErrorSignup = false;
  showLoginError = false;
  @ViewChild('slides', { static: false }) slides: IonSlides;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  constructor(
    private keycloakService: KeycloakService,
    private util: Util,
    private queryResource: QueryResourceService,
    private commandResource: CommandResourceService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  // Login and Register Methods
  
  login() {
    console.log('username password is '+ this.username );
    if (!this.loginForm.invalid) {
    this.util.createLoader().then(loader => {
      loader.present();
      this.keycloakService.authenticate(
        { username: this.username, password: this.password },
        () => {
          loader.dismiss();
          this.createStore(this.username);
          this.util.createToast('Logged in successfully' , 'checkmark-circle-outline');
        },
        () => {
          loader.dismiss();
          this.util.createToast('Invalid user credentials' , 'close-circle-outline');
        }
      );
    });
    } else {
      this.showLoginError = true;
    }
  }

  signup() {
    this.username = this.signupForm.get('username').value;
    this.email = this.signupForm.get('email').value;
    this.password = this.signupForm.get('password').value;
    if (!this.signupForm.invalid) {
    this.util.createLoader().then(loader => {
      loader.present();
      const user = { username: this.username, email: this.email };
      console.log('User' , user);
      this.keycloakService.createAccount(
        user,
        this.password,
        res => {
          loader.dismiss();
          this.keycloakService.authenticate(
            { username: this.username, password: this.password },
            () => {
              loader.dismiss();
              this.createStore(this.username);
              this.util.createToast('Logged in successfully' , 'checkmark-circle-outline');
            },
            () => {
              loader.dismiss();
              this.util.createToast('Invalid user credentials' , 'close-circle-outline');
            }
          );
        },
        err => {
          loader.dismiss();
          if (err.response.status === 409) {
            this.util.createToast('User Already Exists');
            this.slideChange();
          } else {
            this.util.createToast('Cannot Register User. Please Try Later');
          }
        }
        );
      });
    } else {
      this.showErrorSignup = true;
    }
  }

    isLoggedIn() {
      this.keycloakService
      .isAuthenticated()
      .then(() => {
        this.util.navigateRoot();
      })
      .catch(() => {
        console.log('Not Logged In');
      });
    }

    createStore(userName) {
      const store: StoreDTO = {
        regNo: userName,
        email: this.email
      };
      this.util.createLoader().then(loader => {
        loader.present();
        this.queryResource.findStoreByRegNoUsingGET(userName).subscribe(
          res => {
            if (res === null) {
              this.commandResource.createStoreUsingPOST(store).subscribe(data => {
                loader.dismiss();
                this.util.createToast('Registration Successful');
                this.navCtrl.navigateRoot('/edit-restaurant');
              }, err => {
                this.util.createToast('Error reaching server');
                loader.dismiss();
                this.keycloakService.logout();
              });
            } else {
              loader.dismiss();
              this.util.navigateRoot();
            }
          },
          err => {
            loader.dismiss();
            this.keycloakService.logout();
          });
      });
      }

      // View Related Methods

      loginDisabled(): boolean {
        if (this.username === '' || this.password === '') {
      return true;
    } else {
      return false;
    }
  }

  registerDisabled(): boolean {
    if (this.username === '' || this.password === '' || this.email === '') {
      return true;
    } else {
      return false;
    }
  }

  slide(value) {
    this.value = value.detail.value;
    if (this.value === 'login') {
      this.slides.slideTo(0);
    } else {
      this.slides.slideTo(1);
    }
  }

  slideChange() {
    let currentSlide;
    this.slides.getActiveIndex().then(num => {
      currentSlide = num;
      if (this.value === 'login' && currentSlide !== 0) {
        this.value = 'signup';
      } else if (this.value === 'signup' && currentSlide !== 1) {
        this.value = 'login';
      }
    });
  }

  setSlideValue(): number {
    this.slideChange();
    return 1;
  }
}
