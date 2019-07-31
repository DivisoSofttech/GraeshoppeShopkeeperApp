/* tslint:disable */
import { Order } from './order';
export interface OrderLine {
  id?: number;
  order?: Order;
  pricePerUnit?: number;
  productId?: number;
  quantity?: number;
  total?: number;
}
