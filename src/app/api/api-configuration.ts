/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//dev.ci1.divisosofttech.com:9080';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
