/* tslint:disable */
import { Address } from './address';
import { State } from './state';
export interface Country {
  addresses?: Array<Address>;
  code?: string;
  id?: number;
  name?: string;
  phonecode?: number;
  states?: Array<State>;
}
