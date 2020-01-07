/* tslint:disable */
import { Product } from './product';
export interface Category {
  description?: string;
  iDPcode?: string;
  id?: number;
  idpcode?: string;
  imageLink?: string;
  name?: string;
  products?: Array<Product>;
}
