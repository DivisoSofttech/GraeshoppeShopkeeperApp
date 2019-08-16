import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImageCropperModule } from 'ngx-img-cropper';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './services/security/auth-interceptor';
import { ConfigsModule } from './configs/configs.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Util } from './services/util';
import { Camera } from '@ionic-native/camera/ngx';
import { ComponentsModule } from './components/components.module';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PasswordResetComponent],
  imports: [
    ImageCropperModule,
    BrowserModule,
    HttpClientModule,
    ConfigsModule,
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
    })
  ],
  providers: [
    Camera,
    StatusBar,
    Util,
    SplashScreen,
    Geolocation,
    GoogleMapsAPIWrapper,
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
