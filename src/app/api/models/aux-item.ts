/* tslint:disable */
import { OrderLine } from './order-line';
export interface AuxItem {
  auxItem?: string;
  id?: number;
  orderLine?: OrderLine;
  quantity?: number;
  total?: number;
}
