import { MaterialModule } from './components/material.module';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImageCropperModule } from 'ngx-img-cropper';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './services/security/auth-interceptor';
import { ConfigsModule } from './configs/configs.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Util } from './services/util';
import { Camera } from '@ionic-native/camera/ngx';
import { ComponentsModule } from './components/components.module';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiModule } from './api/api.module';
const config: SocketIoConfig = { url: 'http://dev.ci1.divisosofttech.com:9999', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PasswordResetComponent],
  imports: [
    ImageCropperModule,
    BrowserModule,
    HttpClientModule,
    ConfigsModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    OAuthModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdjkfcPlWTwnUq1W1YLIXMNJtMjdOXVXk',
      libraries: ['places', 'geometry']
    }),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ApiModule.forRoot({rootUrl: 'https://dev.ci1.divisosofttech.com:9080'}),
  ],
  providers: [
    Base64,
    Crop,
    ImagePicker,
    Camera,
    StatusBar,
    Util,
    SplashScreen,
    Geolocation,
    GoogleMapsAPIWrapper,
    LocalNotifications,
    File,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
