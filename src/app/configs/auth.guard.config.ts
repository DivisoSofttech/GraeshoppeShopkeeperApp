import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';


export const authConfig: AuthConfig = {
  issuer: 'http://34.75.110.195:9080/auth/realms/jhipster',
  redirectUri: window.location.origin,
  clientId: 'web_app',
  scope: 'openid profile email' ,
  //scope: 'openid profile email voucher offline_access',
  dummyClientSecret: '7ec143f5-609b-413a-9ad7-900c7351898b',
  tokenEndpoint: 'http://34.75.110.195:9080/auth/realms/jhipster/protocol/openid-connect/token',
  userinfoEndpoint: 'http://34.75.110.195:9080/auth/realms/jhipster/protocol/openid-connect/userinfo',
  oidc: false,
  requireHttps: false,
};


@Injectable()
export class AuthGuardConfig {

    constructor(
        private oauthService: OAuthService
    ) {
        this.configureWithNewConfigApi();
    }

    private configureWithNewConfigApi() {

        this.oauthService.configure(authConfig);
        this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();


        // Optional
        this.oauthService.setupAutomaticSilentRefresh();

        // this.oauthService.events.subscribe(e => {
        //   // tslint:disable-next-line:no-console
        //   console.debug('oauth/oidc event', e);
        // });

        // this.oauthService.events
        //   .pipe(filter(e => e.type === 'session_terminated'))
        //   .subscribe(e => {
        //     console.debug('Your session has been terminated!');
        //   });

        // this.oauthService.events
        //   .pipe(filter(e => e.type === 'token_received'))
        //   .subscribe(e => {
        //     // this.oauthService.loadUserProfile();
        //   });
    }
}
