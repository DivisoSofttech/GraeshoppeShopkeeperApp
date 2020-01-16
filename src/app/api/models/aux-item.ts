/* tslint:disable */
import { OrderLine } from './order-line';
export interface AuxItem {
  auxItem?: string;
  id?: number;
  orderLine?: OrderLine;
  productId?: number;
  quantity?: number;
  total?: number;
}
