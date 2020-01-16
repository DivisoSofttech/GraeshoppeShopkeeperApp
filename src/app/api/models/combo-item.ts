/* tslint:disable */
import { OrderLine } from './order-line';
export interface ComboItem {
  comboItem?: string;
  id?: number;
  orderLine?: OrderLine;
  productId?: number;
  quantity?: number;
}
