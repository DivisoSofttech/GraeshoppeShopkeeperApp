/* tslint:disable */
import { OrderMaster } from './order-master';
export interface OfferLine {
  discountAmount?: number;
  id?: number;
  offerRef?: string;
  orderMaster?: OrderMaster;
}
