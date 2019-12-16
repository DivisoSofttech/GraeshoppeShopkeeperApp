/* tslint:disable */
import { Order } from './order';
export interface Offer {
  description?: string;
  id?: number;
  offerRef?: string;
  order?: Order;
  orderDiscountAmount?: number;
  state?: string;
}
