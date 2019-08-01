import { CommandResourceService } from '../../api/services/command-resource.service';
import { Util } from './../../services/util';
import { StoreDTO } from './../../api/models/store-dto';
import { KeycloakService } from './../../services/security/keycloak.service';
import { IonSlides } from '@ionic/angular';
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
  @ViewChild('slides', { static: false }) slides: IonSlides;

  constructor(
    private keycloakService: KeycloakService,
    private util: Util,
    private queryResource: QueryResourceService,
    private commandResource: CommandResourceService
  ) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  // Login and Register Methods

  login() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.keycloakService.authenticate(
        { username: this.username, password: this.password },
        () => {
          loader.dismiss();
          this.util.navigateRoot();
          this.createStore(this.username);
          this.util.createToast('Logged in successfully');
        },
        () => {
          loader.dismiss();
          this.util.createToast('Invalid user credentials');
        }
      );
    });
  }

  signup() {
    this.util.createLoader().then(loader => {
      loader.present();
      const user = { username: this.username, email: this.email };
      this.keycloakService.createAccount(
        user,
        this.password,
        res => {
          // this.createStore(res.preferred_username);
          this.login();
          loader.dismiss();
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
        regNo: userName
      };
      this.queryResource.findStoreByRegNoUsingGET(userName).subscribe(
        res => {
          if (res === null) {
            this.commandResource.createStoreUsingPOST(store).subscribe(data => {
              this.util.createToast('Registration Successful');
            });
          }
        },
        err => {
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
