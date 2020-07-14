import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { Injectable } from '@angular/core';


@Injectable()
export class KeycloakAdminConfig {


    kcAdminClient: KeycloakAdminClient;

    constructor() {
      this.kcAdminClient = new KeycloakAdminClient();
      this.kcAdminClient.setConfig({
        baseUrl: 'http://34.75.110.195:9080/auth'
      });
    }

    refreshClient() {
      return this.configureKeycloakAdmin();
    }

    configureKeycloakAdmin() {
     return  this.kcAdminClient.auth({
        username: 'admin',
        password: 'FSR4gqnPbf6V5Ez',
        grantType: 'password',
        clientId: 'admin-cli',
        clientSecret: '46c38386-f577-4747-bcd4-922100638f23'
      });
    }
}

