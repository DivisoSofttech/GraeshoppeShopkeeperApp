/* tslint:disable */
import { City } from './city';
import { Country } from './country';
export interface State {
  cities?: Array<City>;
  country?: Country;
  id?: number;
  name?: string;
}
