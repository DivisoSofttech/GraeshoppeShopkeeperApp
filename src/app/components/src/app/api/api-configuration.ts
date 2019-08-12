/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//34.74.142.114:9080';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
