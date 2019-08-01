/* tslint:disable */
import { Country } from './country';
import { Customer } from './customer';
export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  addressType?: string;
  alternatePhone?: number;
  city?: string;
  cityOrTown?: string;
  country?: Country;
  customer?: Customer;
  customerId?: string;
  houseNoOrBuildingName?: string;
  id?: number;
  landmark?: string;
  name?: string;
  phone?: number;
  pincode?: number;
  postCode?: string;
  roadNameAreaOrStreet?: string;
  state?: string;
  zipcode?: string;
}