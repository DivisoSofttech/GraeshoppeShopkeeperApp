/* tslint:disable */
import { DeliveryInfo } from './delivery-info';
import { OrderLine } from './order-line';
import { Payment } from './payment';
export interface Order {
  customerId?: string;
  date?: string;
  deliveryInfo?: DeliveryInfo;
  grandTotal?: number;
  id?: number;
  orderId?: string;
  orderLines?: Array<OrderLine>;
  payment?: Payment;
  storeId?: string;
}
